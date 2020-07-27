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
    let tagList = tags.split(";").filter(a => !a.includes("=")).toString();
    let equalsList = tags.split(";").filter(a => a.includes("="));
    let query = 'SELECT DISTINCT c.*, ' +
        'SUM(MATCH(t.tag) ' +
        'AGAINST ("' + tagList.split(",").join(" ") + '" IN NATURAL LANGUAGE MODE)) as tscore ' +
        'FROM Cosplay.Character c, Cosplay.Tag t ' +
        'WHERE t.cid = c.id ' +
        generateEqualQuery(equalsList) +
        'AND MATCH(t.tag) ' +
        'AGAINST ("' + tagList.split(",").join(" ")  + '"  IN NATURAL LANGUAGE MODE) ' +
        'GROUP BY c.id ' +
        'ORDER BY tscore DESC ' +
        'LIMIT 20;';
    return pool.query(query, (err, rows) => {
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


function generateEqualQuery(equalParam) {
    let query = "";
    for(let i = 0; i<equalParam.length; i++) {
        let param =  equalParam[i].split("=");
        query += "AND " + param[0] + " ='" + param[1] + "' "
    }
    return query;
}


module.exports = {pool};
