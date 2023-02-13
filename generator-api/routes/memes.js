const express = require("express")
const dotenv = require('dotenv')
const database = require('../database.js')

var app = express()
const router = express.Router()

router.get("/memes", async (req, res) => {
    try{
        const result = await database.pool.query("Select * from memes");
        res.send(result);
    }
    catch(err){
        throw err;
    }
})

router.post('/memes', async (req, res) => {
    try {
        let input = req.body;
        const result = await database.pool.query(`insert into memes (Name, Category) values ('${input.name}', '${input.category}')`)
        let msg = `Affected rows: ${result.affectedRows}`
        res.send(msg)
    }
    catch(err){
        throw err;
    }
})

module.exports = router