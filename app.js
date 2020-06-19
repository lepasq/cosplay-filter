const express = require("express");
require('dotenv').config({path: __dirname + '/.env'})
const apiRouter = require("./src/api/apiRouter");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use("/", apiRouter);
app.use('/', express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});

module.exports = app;
