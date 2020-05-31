const express = require("express");
const apiRouter = require("./src/api/apiRouter");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.use("/", apiRouter);


app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

module.exports = app;
