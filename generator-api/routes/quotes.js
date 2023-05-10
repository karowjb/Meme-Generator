const express = require("express");
const dbConn = require("../dbconnect.js");

const router = express.Router();

router.get("/quotes", async (req, res) => {
    try {
        dbConn.then((conn) => {
            console.log(
                "Connected to MariaDB database with threadId: " + conn.threadId
            );
            conn.query("SELECT * FROM quotes").then((rows) => {
                let randVal = Math.floor(Math.random() * rows.length);
                res.send(rows[randVal]);
                conn.release();
            });
        });
    } catch (err) {
        throw err;
    }
});
router.get("/quotesall", async (req, res) => {
    try {
        dbConn.then((conn) => {
            console.log(
                "Connected to MariaDB database with threadId: " + conn.threadId
            );
            conn.query("SELECT * FROM quotes").then((rows) => {
                res.send(rows);
                conn.release();
            });
        });
    } catch (err) {
        throw err;
    }
});

module.exports = router;
