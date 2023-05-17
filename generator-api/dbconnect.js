// Setting database connection for the app
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: process.env.HOST, // Replace with your MariaDB server host
    user: "root", // Replace with your MariaDB username
    password: process.env.PASSWORD, // Replace with your MariaDB password
    database: process.env.DATABASE, // Replace with your MariaDB database name
    connectionLimit: 5, // Replace with the maximum number of connections
});
let dbConn = pool.getConnection();
module.exports = dbConn;
