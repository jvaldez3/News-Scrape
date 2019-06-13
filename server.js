const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlbars");

app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

mongoose.connect("mongodb://localhost/scrapeThis", {
    useNewUrlParser: true
});

app.listen(PORT, function () {
    console.log("App running at localhost:" + PORT)
})