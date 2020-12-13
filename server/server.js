const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();

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

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);