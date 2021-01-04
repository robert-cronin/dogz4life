import fs from 'fs';
import path from "path";
import http from "http";
import https from "https";
import express from "express";
import session from "express-session";
import SquareAPIControl from "./SquareAPIControl";

async function main() {
  const app = express();
  const memory = new session.MemoryStore();
  const squareAPIControl = new SquareAPIControl();

  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      // TODO: change to env variable
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
      },
    })
  );

  // // serve static resources
  // app.use(express.static(path.join(__dirname, "..", "client")));

  // // redirect to https
  // app.use((req, res, next) => {
  //   if (
  //     process.env.NODE_ENV === "production" &&
  //     req.headers["x-forwarded-proto"] !== "https"
  //   ) {
  //     // the statement for performing our redirection
  //     return res.redirect("https://" + req.headers.host + req.url);
  //   } else {
  //     return next();
  //   }
  // });

  app.get("/", (req, res) => {
    console.log('kdsjfngkdjngf');
    
    // res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    return res.redirect("https://dogz-4-life.square.site/");
  });

  // app.get("/api/customers/list", async (req, res) => {
  //   try {
  //     const customerList = await squareAPIControl.listCustomers();
  //     res.send(customerList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // run http server (port 80)
  const httpServer = http.createServer(app);
  httpServer.listen(80, "0.0.0.0");

  // run https server (port 443)
  const key = fs.readFileSync("/etc/letsencrypt/live/dogz4life.com.au/privkey.pem")
  const cert = fs.readFileSync("/etc/letsencrypt/live/dogz4life.com.au/cert.pem")
  const httpsServer = https.createServer(
    {
      key,
      cert,
    },
    app
  );
  httpsServer.listen(443, "0.0.0.0");
}

main();
