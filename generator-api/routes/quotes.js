const express = require("express");
const dotenv = require("dotenv");
const mariadb = require("mariadb");
// const Math = require("math");
// const database = require("../database.js");

var app = express();
const router = express.Router();
const pool = mariadb.createPool({
    host: "localhost", // Replace with your MariaDB server host
    user: "root", // Replace with your MariaDB username
    password: "interstellar", // Replace with your MariaDB password
    database: "memegen", // Replace with your MariaDB database name
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

router.post("/quotes", async (req, res) => {
    // try {
    //     let input = req.body;
    //     const result = await database.pool.query(
    //         `insert into quotes (Name, Category) values ('${input.name}', '${input.category}')`
    //     );
    //     let msg = `Affected rows: ${result.affectedRows}`;
    //     res.send(msg);
    // } catch (err) {
    //     throw err;
    // }
});

module.exports = router;
