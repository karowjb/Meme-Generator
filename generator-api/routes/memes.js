const express = require("express");
const mariadb = require("mariadb");
const { default: axios } = require("axios");
const router = express.Router();

const pool = mariadb.createPool({
    host: process.env.HOST, // Replace with your MariaDB server host
    user: "root", // Replace with your MariaDB username
    password: process.env.PASSWORD, // Replace with your MariaDB password
    database: process.env.DATABASE, // Replace with your MariaDB database name
    connectionLimit: 5, // Replace with the maximum number of connections
});
router.get("/memes", async (req, res) => {
    try {
        pool.getConnection()
            .then((conn) => {
                console.log(
                    "Connected to MariaDB database with threadId: " +
                        conn.threadId
                );
                conn.query("SELECT * FROM memes")
                    .then(async (rows) => {
                        let randVal = Math.floor(Math.random() * rows.length);
                        let response = await axios.post(
                            "http://localhost:5555/bucket",
                            (data = { name: `${rows[randVal]["name"]}` })
                        );
                        res.send({ image: response.data });
                        conn.release();
                    })
                    .catch((err) => {
                        console.error(
                            "Error executing SELECT statement: " + err.stack
                        );
                        conn.release();
                    });
            })
            .catch((err) => {
                console.error(
                    "Error connecting to MariaDB database: " + err.stack
                );
            });
    } catch (err) {
        throw err;
    }
});
router.get("/memesall", async (req, res) => {
    try {
        pool.getConnection()
            .then((conn) => {
                console.log(
                    "Connected to MariaDB database with threadId: " +
                        conn.threadId
                );
                conn.query("SELECT * FROM memes")
                    .then(async (rows) => {
                        res.send(rows);
                        conn.release();
                    })
                    .catch((err) => {
                        console.error(
                            "Error executing SELECT statement: " + err.stack
                        );
                        conn.release();
                    });
            })
            .catch((err) => {
                console.error(
                    "Error connecting to MariaDB database: " + err.stack
                );
            });
    } catch (err) {
        throw err;
    }
});
module.exports = router;
