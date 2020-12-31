import express from "express";
import path from "path";
import session from "express-session";
import http from "http";
import https from "https";
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

  // serve static resources
  app.use(express.static(path.join(__dirname, "..", "client")));

  app.get("/", (req, res) => {
    console.log(process.env.NODE_ENV);
    console.log("ergerg");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
  });

  app.get("/api/customers/list", async (req, res) => {
    try {
      const customerList = await squareAPIControl.listCustomers();
      res.send(customerList);
    } catch (error) {
      console.log('324234');
      
      console.log(error);
      
    }
  });

  // const key = "";
  // const cert = "";
  // const httpsServer = https.createServer({
  //         key,
  //         cert,
  //     },
  //     app
  // );

  const httpServer = http.createServer(app);
  httpServer.listen(3000, "0.0.0.0");
}

main();
