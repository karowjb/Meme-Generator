const express = require('express')
const dotenv = require('dotenv')
var app = express(), bodyParser = require("body-parser")
const swaggerUi = require("swagger-ui-express")
const swaggerFile = require('./swagger_output.json')

app.use(bodyParser.json());
dotenv.config()

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/", health = require("./routes/health.js"))
app.use("/", memes = require("./routes/memes.js"))


module.exports = app