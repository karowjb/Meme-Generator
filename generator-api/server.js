const express = require('express')
const dotenv = require('dotenv')
var app = express(), bodyParser = require("body-parser")

app.use(bodyParser.json());
dotenv.config()

app.use("/", health = require("./routes/health.js"))

module.exports = app