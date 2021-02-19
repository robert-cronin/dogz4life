import fs from "fs";
import os from "os";
import url from "url";
import util from "util";
import path from "path";
import http from "http";
import https from "https";
import crypto from "crypto";
import express from "express";
import passport from "passport";
import { env, loadEnv } from "./env";
import querystring from "querystring";
import session from "express-session";
import cookieParser from "cookie-parser";
import Auth0Strategy from "passport-auth0";
import FileStore from "session-file-store";
import ContactManager from "./ContactManager";
import SquareAPIControl from "./SquareAPIControl";
import { Database } from "sqlite3";
import { Customer } from "square";
loadEnv();

interface PetInfoDetails {
  // general info
  name: string;
  type: string;
  gender: string;
  desexed?: boolean;
  weight?: number;
  coatColor?: string;
  birthday?: string;
  allergies?: string;
  additionalGeneralNotes?: string;
  vaccinationRecord?: string;
  dateAdministered?: string;
  dateNextDue?: string;
  // health flags
  healthFlags?: string;
  additionalHealthNotes?: string;
}

class Server {
  app: express.Express;
  contactManager: ContactManager;
  squareAPIControl: SquareAPIControl;
  db: Database;
  dbPath: string = path.join(__dirname, "..", "..", "sql", "dogz4life.db");
  baseUrl = "/site";

  createTables() {
    try {
      // Read the SQL file
      const dataSql = fs
        .readFileSync(path.join(__dirname, "../../sql/dogz4life.sql"))
        .toString();

      // Convert the SQL string to array so that you can run them one at a time.
      // You can split the strings using the query delimiter i.e. `;` in // my case I used `);` because some data in the queries had `;`.
      const dataArr = dataSql.toString().split(");");

      // db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
      this.db.serialize(() => {
        // db.run runs your SQL query against the DB
        this.db.run("PRAGMA foreign_keys=OFF;");
        this.db.run("BEGIN TRANSACTION;");
        // Loop through the `dataArr` and db.run each query
        dataArr.forEach((query) => {
          if (query.match(/([\w]+)/)) {
            // Add the delimiter back to each query before you run them
            // In my case the it was `);`
            query += ");";

            this.db.run(query, (err) => {
              if (err) throw err;
            });
          }
        });
        this.db.run("COMMIT;");
      });
    } catch (error) {
      console.log(error);
    }
  }

  constructor() {
    this.db = new Database(this.dbPath);
    this.createTables();
    this.app = express();
    this.app.use(express.json());
    this.contactManager = new ContactManager();
    this.squareAPIControl = new SquareAPIControl();

    // // redirection
    // this.redirectToHttps();
    this.redirectToSquareSite();

    // auth routes
    this.setupSession();
    this.setupPassport();
    this.setStaticRoutes();
    this.setUserRoutes();
    this.setAuthorizationRoutes();

    // // // make user available in routes
    // // this.app.use(this.userAvailable);

    // square routes
    this.setBookingRoutes();

    // pet routes
    this.setPetRoutes();

    // contact us route
    this.setContactUsRoute();
  }

  start() {
    // run http server (port 80)
    const httpServer = http.createServer(this.app);
    httpServer.listen(80, "0.0.0.0");

    // run https server (port 443)
    const sslPath =
      env.NODE_ENV == "production"
        ? "/etc/letsencrypt/live/dogz4life.com.au"
        : path.resolve(__dirname, "../../tmp");

    const key = fs.readFileSync(path.join(sslPath, "privkey.pem"));
    const cert = fs.readFileSync(path.join(sslPath, "cert.pem"));
    const httpsServer = https.createServer({ key, cert }, this.app);
    httpsServer.listen(443, "0.0.0.0");
  }

  private setupSession() {
    this.app.use(cookieParser());
    // session
    this.app.use(
      session({
        secret: env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new (FileStore(session))(),
      })
    );
  }

  private setupPassport() {
    // security
    // Configure Passport to use Auth0
    const strategy = new Auth0Strategy(
      {
        domain: env.AUTH0_DOMAIN,
        clientID: env.AUTH0_CLIENT_ID,
        clientSecret: env.AUTH0_CLIENT_SECRET,
        callbackURL:
          env.NODE_ENV == "production"
            ? `https://dogz4life.com.au${this.baseUrl}/callback`
            : `https://localhost${this.baseUrl}/callback`,
      },
      (accessToken, refreshToken, extraParams, profile, done) => {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
      }
    );
    passport.use(strategy);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // You can use this section to keep a smaller payload
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
      const modifiedUser = user as any;
      try {
        const user = await this.getOrCreateUser(
          modifiedUser.user_id,
          modifiedUser.emails[0].value
        );
        const customId = user.CUSTOMER_ID;
        const customer = await this.squareAPIControl.retrieveCustomer(customId);
        modifiedUser.customer_details = customer;
      } catch (error) {
        console.log(error);
      }
      done(null, user);
    });
  }

  private setStaticRoutes() {
    // serve static resources
    this.app.use("/site", express.static(path.join(__dirname, "..", "client")));
  }

  private setAuthorizationRoutes() {
    // Perform the login, after login Auth0 will redirect to callback
    console.log(`${this.baseUrl}/login`);
    
    this.app.get(
      `${this.baseUrl}/login`,
      passport.authenticate("auth0", {
        scope: "openid email profile",
      }),
      (req, res) => {
        res.redirect("/");
      }
    );
    this.app.get(`${this.baseUrl}/logged_in`, (req, res) => {
      console.log(req.user);
    });

    this.app.get(`${this.baseUrl}/callback`, (req, res, next) => {
      passport.authenticate("auth0", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log("no error");

          const returnTo = req.session["returnTo"];
          console.log("the returnTo address:", returnTo);

          delete req.session["returnTo"];
          res.redirect(returnTo || `${this.baseUrl}/user`);
        });
      })(req, res, next);
    });

    // Perform session logout and redirect to homepage
    this.app.get(`${this.baseUrl}/logout`, (req, res) => {
      req.logout();
      let returnTo = req.protocol + "://" + req.hostname;
      const port = req.connection.localPort;
      if (port !== undefined && port !== 80 && port !== 443) {
        returnTo += ":" + port;
      }
      const logoutURL = new url.URL(
        util.format("https://%s/v2/logout", env.AUTH0_DOMAIN)
      );
      const searchString = querystring.stringify({
        client_id: env.AUTH0_CLIENT_ID,
        returnTo: returnTo,
      });
      logoutURL.search = searchString;

      res.redirect(logoutURL.toString());
    });
  }

  private async createUser(userId: string, email: string): Promise<void> {
    return await new Promise<void>(async (resolve, reject) => {
      // check if there is an existing customer with this email
      const searchCustomers = await this.squareAPIControl.searchCustomers({
        limit: 1,
        query: { filter: { emailAddress: { exact: email } } },
      });
      let customer: Customer;
      if (searchCustomers.length >= 1) {
        customer = searchCustomers[0];
      } else {
        customer = await this.squareAPIControl.createCustomer({
          referenceId: userId,
          emailAddress: email,
        });
      }
      this.db.run(
        `INSERT INTO user (USER_ID, CUSTOMER_ID) VALUES ('${userId}','${customer.id}');`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  private async getUser(userId: string): Promise<any | null> {
    return await new Promise<any | null>((resolve, reject) => {
      this.db.get(
        `select * from user where USER_ID='${userId}';`,
        (err, row) => {
          if (err) {
            resolve(null);
          } else {
            console.log(row);
            resolve(row);
          }
        }
      );
    });
  }

  private async getOrCreateUser(userId: string, email: string): Promise<any> {
    let user = await this.getUser(userId);
    if (!user) {
      try {
        await this.createUser(userId, email);
        user = await this.getUser(userId);
      } catch (error) {}
    }
    return user;
  }

  private setUserRoutes() {
    /* GET user profile. */
    this.app.get(`${this.baseUrl}/user`, async (req, res, next) => {
      let response: any;
      if (!req.user) {
        response = {
          error: "unauthenticated",
        };
      } else {
        const { _raw, _json, ...userProfile } = req.user as any;
        response = userProfile;
      }
      res.send(JSON.stringify(response, null, 2));
    });

    // POST new user
    this.app.get(
      `${this.baseUrl}/user/new`,
      this.secured,
      async (req, res, next) => {
        const { _raw, _json, ...userProfile } = req.user as any;
        const {
          name: { familyName, givenName },
          emails,
          nickname,
          user_id,
          ...rest
        } = userProfile;
        const response = await this.squareAPIControl.createCustomer({
          givenName,
          familyName,
          nickname,
          referenceId: user_id,
          emailAddress: emails[0].value,
        });
        res.send(JSON.stringify(response, null, 2));
      }
    );
  }

  private setBookingRoutes() {
    this.app.get(
      `${this.baseUrl}/api/catalog/list`,
      this.secured,
      async (req, res) => {
        try {
          const items = await this.squareAPIControl.listCatalog();
          res.send(JSON.stringify(items, undefined, 2));
        } catch (error) {
          res.emit("error", error);
        }
      }
    );
    this.app.post(
      `${this.baseUrl}/api/booking/availability`,
      this.secured,
      async (req, res) => {
        try {
          const filter = req.body;
          const items = await this.squareAPIControl.listBookingAvailability({
            query: {
              filter: {
                startAtRange: {
                  startAt: filter.startAt,
                  endAt: filter.endAt,
                },
                locationId: filter.locationId,
                segmentFilters: filter.segmentFilters.map((s) => {
                  return { serviceVariationId: s.serviceVariationId };
                }),
              },
            },
          });
          res.send(JSON.stringify(items, undefined, 2));
        } catch (error) {
          res.emit("error", error);
        }
      }
    );
    this.app.post(
      `${this.baseUrl}/api/booking/new`,
      this.secured,
      async (req, res) => {
        try {
          const body = req.body;
          console.log(body);

          const booking = {
            appointmentSegments: body.appointmentSegments.map((a) => {
              return {
                teamMemberId: a.teamMemberId,
                serviceVariationId: a.serviceVariationId,
                serviceVariationVersion: a.serviceVariationVersion,
                durationMinutes: a.durationMinutes,
              };
            }),
            startAt: body.startAt,
            locationId: body.locationId,
            customerId: (req.user as any).customer_details.id,
            customerNote: body.customerNote ?? "",
          };
          const items = await this.squareAPIControl.newBooking({
            booking,
            idempotencyKey: crypto.randomBytes(32).toString("base64"),
          });
          res.send(JSON.stringify(items, undefined, 2));
        } catch (error) {
          res.emit("error", error);
        }
      }
    );
  }

  //////////
  // Pets //
  //////////
  private async getPetInfoList(userId: string): Promise<PetInfoDetails[]> {
    return await new Promise<PetInfoDetails[]>((resolve, reject) => {
      this.db.all(
        `select * from user as u INNER JOIN pet as p ON u.CUSTOMER_ID = p.CUSTOMER_ID where USER_ID='${userId}';`,
        (err, rows) => {
          if (err) {
            resolve([]);
          } else {
            console.log(rows);
            resolve(rows ?? []);
          }
        }
      );
    });
  }
  private async createPetInfo(
    userId: string,
    petInfo: PetInfoDetails
  ): Promise<void> {
    return await new Promise<void>(async (resolve, reject) => {
      console.log("heyyy");

      try {
        const user = await this.getUser(userId);
        const fields: string[] = ["CUSTOMER_ID"];
        const values: string[] = [user.CUSTOMER_ID];
        for (const key of Object.keys(petInfo)) {
          const value: any | undefined = petInfo[key];
          if (value) {
            fields.push(key);
            values.push(value);
          }
        }

        const fieldsString = fields.reduce(
          (prev, curr) => `${prev ? `${prev}, ` : ""}'${curr}'`,
          ""
        );
        const valuesString = values.reduce(
          (prev, curr) => `${prev ? `${prev}, ` : ""}'${curr}'`,
          ""
        );

        this.db.exec(
          `insert into pet (${fieldsString}) values (${valuesString})`,
          (err) => {
            if (err) {
              reject();
            } else {
              resolve();
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  private setPetRoutes() {
    this.app.get(
      `${this.baseUrl}/logged_in/api/pets/list`,
      this.secured,
      async (req, res) => {
        try {
          const userId = (req.user as any).user_id;
          const petInfoList = await this.getPetInfoList(userId);
          res.send(JSON.stringify(petInfoList, undefined, 2));
        } catch (error) {
          res.emit("error", error);
        }
      }
    );
    this.app.post(
      `${this.baseUrl}/api/pets/new`,
      this.secured,
      async (req, res) => {
        try {
          const userId = (req.user as any).user_id;
          const petInfo = req.body;
          await this.createPetInfo(userId, petInfo);
          res.end();
        } catch (error) {
          res.emit("error", error);
        }
      }
    );
  }

  private setContactUsRoute() {
    this.app.get(`${this.baseUrl}/api/contact_us`, async (req, res) => {
      const { fromEmail, name, message } = req.body;
      const info = await this.contactManager.sendContactMail(
        fromEmail,
        name,
        message
      );
      res.send(JSON.stringify(info, undefined, 2));
    });
  }

  private redirectToHttps() {
    // redirect to https
    this.app.use("*", (req, res, next) => {
      console.log("redirecting");

      if (req.headers["x-forwarded-proto"] !== "https") {
        console.log("redirecting2");
        // the statement for performing our redirection
        const redirectUrl = "https://" + req.headers.host + req.url;
        console.log(redirectUrl);

        return res.redirect(redirectUrl);
      } else {
        return next();
      }
    });
  }

  private redirectToSquareSite() {
    this.app.get("/", (req, res) => {
      console.log(req.originalUrl);

      return res.redirect("https://dogz-4-life.square.site/");
    });
  }

  // ====== Helper Methods ====== //
  private secured(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.user) {
      return next();
    }
    req.session["returnTo"] = req.originalUrl;
    res.redirect(`${this.baseUrl}/login`);
  }
}

const server = new Server();
server.start();
