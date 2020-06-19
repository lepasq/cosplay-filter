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

pool.getRankedCharacters = () => {

}

module.exports = {pool};
