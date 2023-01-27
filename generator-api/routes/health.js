const express = require("express")
const dotenv = require('dotenv')
var app = express()
const router = express.Router()

router.get("/health", (req, res) => {
    res.send("This is your daily health check")
})
module.exports = router