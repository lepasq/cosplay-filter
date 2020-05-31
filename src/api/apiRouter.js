const express = require("express");
const path = require("path");
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../index.html'));
});


module.exports = apiRouter;
