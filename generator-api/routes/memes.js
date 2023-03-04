const express = require("express");
const dotenv = require("dotenv");
// const database = require("../database.js");
const mariadb = require("mariadb");
const { default: axios } = require("axios");
var app = express();
const router = express.Router();

const pool = mariadb.createPool({
    host: "localhost", // Replace with your MariaDB server host
    user: "root", // Replace with your MariaDB username
    password: "interstellar", // Replace with your MariaDB password
    database: "memegen", // Replace with your MariaDB database name
    connectionLimit: 5, // Replace with the maximum number of connections
});
async function getBase64(url) {
    return axios
        .get(url, {
            responseType: "arraybuffer",
        })
        .then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
        );
}
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
                        // console.log(rows); // Log the result rows to the console
                        res.set("Access-Control-Allow-Origin", "*");
                        // console.log(rows[randVal][Image])
                        let test = await getBase64(rows[randVal]["image"]);
                        // console.log(test);
                        // res.send(rows[randVal]);
                        res.send({ image: test });
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

router.post("/memes", async (req, res) => {
    try {
        pool.getConnection()
            .then((conn) => {
                console.log(
                    "Connected to MariaDB database with threadId: " +
                        conn.threadId
                );
                conn.query(
                    `INSERT INTO memegen.memes (name, image, memeType) VALUES('ajkdbc', 'ajdbcaksakdjsbc;akdsdbcka;jdbc;ka', ${0});`
                )
                    .then((result) => {
                        console.log(
                            "Inserted " +
                                result.affectedRows +
                                " row(s) with id " +
                                result.insertId
                        );
                        res.sendStatus(200);
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
