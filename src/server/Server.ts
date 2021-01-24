import fs from "fs";
import url from "url";
import util from "util";
import path from "path";
import http from "http";
import https from "https";
import express from "express";
import passport from "passport";
import querystring from "querystring";
import session from "express-session";
import Auth0Strategy from "passport-auth0";
import FileStore from "session-file-store";
import { auth } from "express-openid-connect";
import SquareAPIControl from "./SquareAPIControl";

class Server {
  app: express.Express;
  squareAPIControl: SquareAPIControl;

  constructor() {
    this.app = express();
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
    this.setCatalogRoutes();

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
    // session
    this.app.use(
      session({
        // TODO: change to env variable
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: true,
        },
        store: new (FileStore(session))
      })
    );
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    this.app.use(
      auth({
        authRequired: false,
        auth0Logout: true,
        secret: process.env.AUTH0_CLIENT_SECRET,
        baseURL: "https://localhost/",
        clientID: process.env.AUTH0_CLIENT_ID,
        issuerBaseURL: "https://dev-h3edly4h.au.auth0.com",
      })
    );
  }

  private setupPassport() {
    // security
    // Configure Passport to use Auth0
    const strategy = new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        state: false,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
          process.env.AUTH0_CALLBACK_URL || "https://localhost/callback",
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

    this.app.use("/callback", (req, res, next) => {
      console.log("ejuhrgbjuehbgruehrbgjuehgbr");
      res.send("skdjfnksjndf");

      passport.authenticate("auth0", (err, user, info) => {
        console.log("auth0");
        console.log("skdfjngjksnrtfgikswjtfnrghjsrdtgh");

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
          const returnTo = req.session["returnTo"];
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
        util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN)
      );
      const searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo,
      });
      logoutURL.search = searchString;

      res.redirect(logoutURL.toString());
    });
  }

  private setUserRoutes() {
    /* GET user profile. */
    this.app.get("/user", this.secured, (req, res, next) => {
      const { _raw, _json, ...userProfile } = req.user as any;
      res.send(JSON.stringify(userProfile, null, 2));
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

  private setCatalogRoutes() {
    this.app.get("/api/catalog/list", this.secured, async (req, res) => {
      const items = await this.squareAPIControl.listCatalog();
      res.send(JSON.stringify(items, undefined, 2));
    });
  }

  private redirectToHttps() {
    // redirect to https
    this.app.use((req, res, next) => {
      if (
        process.env.NODE_ENV === "production" &&
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
  private secured(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log("secured");
    console.log(req);

    if (req.user) {
      return next();
    }
    req.session["returnTo"] = req.originalUrl;
    res.redirect("/login");
  }
}

const server = new Server();
server.start();
