import express from 'express';
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import fs from "fs";
import http from "http";
import https from "https";

async function main() {
    const app = express();
    const memory = new session.MemoryStore();

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
    app.use(express.static(path.join(__dirname, "..", "build")));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "..", "build", "index.html"));
    });

    const httpServer = http.createServer(app);
    httpServer.listen(8080, "0.0.0.0");

    // const key = "";
    // const cert = "";
    // const httpsServer = https.createServer({
    //         key,
    //         cert,
    //     },
    //     app
    // );
}

main();