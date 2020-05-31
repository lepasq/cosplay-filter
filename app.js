const express = require("express");
const apiRouter = require("./src/api/apiRouter");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;


app.use("/", apiRouter);
app.use('/', express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

module.exports = app;
