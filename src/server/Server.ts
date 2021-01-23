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
import { auth } from "express-openid-connect";
import SquareAPIControl from "./SquareAPIControl";

class Server {
  app: express.Express;
  squareAPIControl: SquareAPIControl;

  constructor() {
    this.app = express();
    this.squareAPIControl = new SquareAPIControl();

    // setting routes
    this.setupSession();
    this.setupPassport();
    this.setStaticRoutes();
    this.setUserRoutes()
    // this.setSquareRoutes();
    this.setAuthorizationRoutes();

    // redirection
    // this.redirectToHttps();
    // this.redirectToSquareSite();

  }

  start() {
    // run http server (port 80)
    const httpServer = http.createServer(this.app);
    httpServer.listen(80, "0.0.0.0");

    // // run https server (port 443)
    // const key = fs.readFileSync(
    //   "/etc/letsencrypt/live/dogz4life.com.au/privkey.pem"
    // );
    // const cert = fs.readFileSync(
    //   "/etc/letsencrypt/live/dogz4life.com.au/cert.pem"
    // );
    // const httpsServer = https.createServer({ key, cert }, this.app);
    // httpsServer.listen(443, "0.0.0.0");
  }

  private setupSession() {
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    this.app.use(
      auth({
        authRequired: false,
        auth0Logout: true,
        secret: process.env.AUTH0_CLIENT_SECRET,
        baseURL: "http://localhost/api",
        clientID: process.env.AUTH0_CLIENT_ID,
        issuerBaseURL: "https://dev-h3edly4h.au.auth0.com",
      })
    );
  }

  private setupPassport() {
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
      })
    );

    // security
    // Configure Passport to use Auth0
    const strategy = new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
          process.env.AUTH0_CALLBACK_URL || "http://localhost/api/callback",
      },
      function (accessToken, refreshToken, extraParams, profile, done) {
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
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  }

  private setStaticRoutes() {
    // serve static resources
    this.app.use(express.static(path.join(__dirname, "..", "client")));
  }

  private setAuthorizationRoutes() {
    // Perform the final stage of authentication and redirect to previously requested URL or '/user'
    this.app.get("/api/callback", (req, res, next) => {
      console.log('sdkfjngskjfng');
      console.log('rrrrrrrrr');
      
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

    // this.app.get("/api/login", async (req, res) => {
    //   try {
    //     res.redirect(
    //       `https://squareup.com/oauth2/authorize?client_id=${process.env.SQUARE_APPLICATION_ID}`
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    // this.app.post("/api/callback", async (req, res) => {
    //   try {
    //     console.log(req.body);

    //     console.log("skjdnfksjdnf");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  }

  private setUserRoutes() {
    /* GET user profile. */
    this.app.get("/user", this.secured, (req, res, next) => {
      const { _raw, _json, ...userProfile } = req.user as any;
      res.render("user", {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: "Profile page",
      });
    });
  }

  private setSquareRoutes() {
    this.app.get("/api/login/authorization", async (req, res) => {
      const code = req.query.code as string;
      try {
        // const accessToken = await this.squareAPIControl.getAccessToken(code);
        // res.send(accessToken);
      } catch (error) {
        console.log(error);
      }
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
  private secured(req, res, next) {
    if (req.user) {
      return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
  }
}

const server = new Server();
server.start();
