const express = require("express");
const apiRouter = require("./src/api/apiRouter");
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const mysql = require('./src/models/connection.js');
const PORT = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true
    })
);

app.use("/", apiRouter);
app.use('/', express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

module.exports = app;
