const express = require("express");
const mariadb = require("mariadb");

const router = express.Router();
const pool = mariadb.createPool({
    host: process.env.HOST, // Replace with your MariaDB server host
    user: "root", // Replace with your MariaDB username
    password: process.env.PASSWORD, // Replace with your MariaDB password
    database: process.env.DATABASE, // Replace with your MariaDB database name
    connectionLimit: 5, // Replace with the maximum number of connections
});

router.get("/quotes", async (req, res) => {
    try {
        pool.getConnection()
            .then((conn) => {
                console.log(
                    "Connected to MariaDB database with threadId: " +
                        conn.threadId
                );
                conn.query("SELECT * FROM quotes")
                    .then((rows) => {
                        console.log(`Length: ${rows.length}`);
                        let randVal = Math.floor(Math.random() * rows.length);
                        console.log(rows); // Log the result rows to the console
                        res.send(rows[randVal]);
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
router.get("/quotesall", async (req, res) => {
    try {
        pool.getConnection()
            .then((conn) => {
                console.log(
                    "Connected to MariaDB database with threadId: " +
                        conn.threadId
                );
                conn.query("SELECT * FROM quotes")
                    .then((rows) => {
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
