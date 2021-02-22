const mysql = require('mysql2');

const pool = mysql.createPool({
    database: "mydb",
    user: "user",
    password: "password",
    host: "localhost",
    port: "3306"
});

module.exports = pool.promise();