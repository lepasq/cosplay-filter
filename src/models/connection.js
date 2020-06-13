let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,
    host: process.env.HOST,
    user: process.env.USR,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


 pool.query('SELECT c.*, c.name, GROUP_CONCAT(t.tag) as tags  FROM Cosplay.Character c, Cosplay.Tag t WHERE t.cid = c.id GROUP BY c.id;', (err, rows, fields) => {
     if(err) {
         throw err;
     }
     for(let i = 0; i<rows.length; i++) {
         console.log(rows[i]);
     }
 });
