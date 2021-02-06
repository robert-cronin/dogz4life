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
loadEnv();

class Server {
  app: express.Express;
  contactManager: ContactManager;
  squareAPIControl: SquareAPIControl;
  db: Database;
  dbPath: string = path.join(__dirname, "..", "..", "tmp", "dogz4life.db");

  createTables() {
    try {
      this.db.run(`CREATE TABLE users (
        USER_ID TEXT
      )`);
    } catch (error) {
      console.log(error);
      
    }
  }

  constructor() {
    this.db = new Database(this.dbPath);
    this.createTables();
    // this.db.serialize(() => {
    //   this.db.run("CREATE TABLE lorem (info TEXT)");

    //   var stmt = this.db.prepare("INSERT INTO lorem VALUES (?)");
    //   for (let i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    //   }
    //   stmt.finalize();

    //   this.db.all("SELECT rowid AS id, info FROM lorem", function (err, row) {
    //     console.log(row.id + ": " + row.info);
    //   });
    // });
    this.app = express();
    this.app.use(express.json());
    this.contactManager = new ContactManager();
    this.squareAPIControl = new SquareAPIControl();
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

    // contact us route
    this.setContactUsRoute();

    // // redirection
    // // this.redirectToHttps();
    // // this.redirectToSquareSite();
  }

  start() {
    // run http server (port 80)
    const httpServer = http.createServer(this.app);
    httpServer.listen(80, "0.0.0.0");

    // run https server (port 443)
    // const sslPath = "/etc/letsencrypt/live/dogz4life.com.au";
    const sslPath = path.resolve(__dirname, "../../tmp");

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
        callbackURL: "https://localhost/callback",
        // callbackURL:
        //   env.AUTH0_CALLBACK_URL || "https://localhost/callback",
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
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }

  private setStaticRoutes() {
    // serve static resources
    this.app.use(express.static(path.join(__dirname, "..", "client")));
  }

  private setAuthorizationRoutes() {
    // Perform the login, after login Auth0 will redirect to callback
    this.app.get(
      "/login",
      passport.authenticate("auth0", {
        scope: "openid email profile",
      }),
      (req, res) => {
        res.redirect("/");
      }
    );
    this.app.get("/logged_in", (req, res) => {
      console.log(req.user);
    });

    this.app.get("/callback", (req, res, next) => {
      passport.authenticate("auth0", (err, user, info) => {
        if (err) {
          console.log("error");
          console.log(err);

          return next(err);
        }
        if (!user) {
          console.log("not user");

          return res.redirect("/login");
        }
        console.log("logging in");

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log("no error");

          const returnTo = req.session["returnTo"];
          console.log("the returnTo address:", returnTo);

          delete req.session["returnTo"];
          res.redirect(returnTo || "/user");
        });
      })(req, res, next);
    });

    // Perform session logout and redirect to homepage
    this.app.get("/logout", (req, res) => {
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

  private setUserRoutes() {
    /* GET user profile. */
    this.app.get("/user", (req, res, next) => {
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
    this.app.get("/user/new", this.secured, async (req, res, next) => {
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
    });
  }

  private setBookingRoutes() {
    this.app.get("/api/catalog/list", async (req, res) => {
      try {
        const items = await this.squareAPIControl.listCatalog();
        res.send(JSON.stringify(items, undefined, 2));
      } catch (error) {
        res.emit("error", error);
      }
    });
    this.app.post("/api/booking/availability", async (req, res) => {
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
    });
    this.app.post("/api/booking/new", this.secured, async (req, res) => {
      try {
        const body = req.body;
        const items = await this.squareAPIControl.newBooking({
          booking: {
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
            customerId: "some customer id",
            customerNote: body.customerNote ?? "",
          },
          idempotencyKey: crypto.randomBytes(32).toString("base64"),
        });
        res.send(JSON.stringify(items, undefined, 2));
      } catch (error) {
        res.emit("error", error);
      }
    });
  }

  private setContactUsRoute() {
    this.app.get("/api/contact_us", async (req, res) => {
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
    this.app.use((req, res, next) => {
      if (
        env.NODE_ENV === "production" &&
        req.headers["x-forwarded-proto"] !== "https"
      ) {
        // the statement for performing our redirection
        return res.redirect("https://" + req.headers.host + req.url);
      } else {
        return next();
      }
    });
  }

  private redirectToSquareSite() {
    this.app.get("/", (req, res) => {
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
    res.redirect("/login");
  }
}

const server = new Server();
server.start();
