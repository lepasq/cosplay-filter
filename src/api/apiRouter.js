const express = require("express");
const path = require('path');
const apiRouter = express.Router();
const connection = require('../models/connection');


apiRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../index.html'));
});


apiRouter.get('/api/characters', (req, res) => {
    let tags = req.query.tags;
    connection.pool.getRankedCharacters(tags, (rows, err) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        return res.send(rows);
    });
});


module.exports = apiRouter;
