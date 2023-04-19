const express = require("express");
const { default: axios } = require("axios");
const dbConn = require("../dbconnect.js");
const router = express.Router();

router.get("/memes", async (req, res) => {
    try {
        dbConn
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
                        console.log(response);
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
        dbConn
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
