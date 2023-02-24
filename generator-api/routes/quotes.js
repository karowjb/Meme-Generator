const express = require("express")
const dotenv = require('dotenv')
const database = require('../database.js')

var app = express()
const router = express.Router()

router.get("/quotes", async (req, res) => {
    try{
        const result = await database.pool.query("Select * from quotes");
        res.send(result);
    }
    catch(err){
        throw err;
    }
})

router.post('/quotes', async (req, res) => {
    try {
        let input = req.body;
        const result = await database.pool.query(`insert into quotes (Name, Category) values ('${input.name}', '${input.category}')`)
        let msg = `Affected rows: ${result.affectedRows}`
        res.send(msg)
    }
    catch(err){
        throw err;
    }
})

module.exports = router