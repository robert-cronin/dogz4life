const express = require('express')
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const fs = require("fs");
const http = require("http");
const https = require("https");

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
    app.use('/', express.static(path.join(__dirname, "..", "build")));


    // react routes
    const reactRoutes = [
        "/",
        "/home",
        "/about",
        "/contact",
        "/booking/new",
        "/about/grooming",
        "/about/massage",
        "/about/training",
        "/about/nutrition",
    ];

    for (const route of reactRoutes) {
        app.get(route, (req, res) => {
            res.sendFile(path.join(__dirname, "..", "build", "index.html"));
        });
    }

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