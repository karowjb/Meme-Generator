const mariadb = require("mariadb")
const dotenv = require('dotenv')
dotenv.config({path: "vars/.env"})
const pool = mariadb.createPool({
    host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password
});

module.exports = Object.freeze({
    pool:pool
});
