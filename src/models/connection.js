let mysql = require('mysql2');

let pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,
    host: process.env.HOST,
    user: process.env.USR,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


pool.getAllCharacters = (callback) => {
    return pool.query('SELECT c.*, c.name, GROUP_CONCAT(t.tag SEPARATOR ", ") as tags  FROM Cosplay.Character c, Cosplay.Tag t WHERE t.cid = c.id GROUP BY c.id;', (err, rows) => {
        if (err) {
            throw err;
        } else {
            callback(JSON.stringify(rows));
        }
    });
}

pool.getRankedCharacters = (tags, callback) => {
    return pool.query('SELECT DISTINCT c.*, ' +
        'SUM(MATCH(t.tag) ' +
        'AGAINST ("' + tags.replace(";", " ") + '" IN NATURAL LANGUAGE MODE)) as tscore ' +
        'FROM Cosplay.Character c, Cosplay.Tag t ' +
        'WHERE t.cid = c.id ' +
        'AND MATCH(t.tag) ' +
        'AGAINST ("' + tags.replace(";", " ") + '"  IN NATURAL LANGUAGE MODE) ' +
        'GROUP BY c.id ' +
        'ORDER BY tscore DESC ' +
        'LIMIT 20;', (err, rows) => {
        if (err) {
            throw err;
        } else {
            callback(JSON.stringify(rows));
        }
    });
}

/*
SELECT DISTINCT c.*,
       SUM(MATCH(t.tag)
             AGAINST ('mario gaming' IN NATURAL LANGUAGE MODE)) as tscore
FROM Cosplay.Character c, Cosplay.Tag t
WHERE t.cid = c.id
  AND MATCH(t.tag)
            AGAINST ('mario gaming' IN NATURAL LANGUAGE MODE)
GROUP BY c.id
ORDER BY tscore DESC
LIMIT 20;
 */


module.exports = {pool};
