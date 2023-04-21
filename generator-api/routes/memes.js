const express = require("express");
const { default: axios } = require("axios");
const dbConn = require("../dbconnect.js");
const router = express.Router();

router.get("/memes", async (req, res) => {
    try {
        dbConn.then((conn) => {
            conn.query("SELECT * FROM memes").then(async (rows) => {
                let randVal = Math.floor(Math.random() * rows.length);
                let response = await axios.post(
                    "http://localhost:5555/bucket",
                    (data = { name: `${rows[randVal]["name"]}` })
                );
                // console.log(response);
                conn.release();
                res.send({ image: response.data });
            });
        });
        (await dbConn).end;
    } catch (err) {
        throw err;
    }
});

router.get("/memesall", async (req, res) => {
    try {
        dbConn.then((conn) => {
            conn.query("SELECT * FROM memes").then(async (rows) => {
                conn.release();
                res.send(rows);
            });
        });
        (await dbConn).release;
    } catch (err) {
        throw err;
    }
});
module.exports = router;
