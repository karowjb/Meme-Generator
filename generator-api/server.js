const express = require("express");
const dotenv = require("dotenv");
var app = express();
bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

app.use(bodyParser.json());
dotenv.config();

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/", (health = require("./routes/health.js")));
app.use("/", (memes = require("./routes/memes.js")));
app.use("/", (bucket = require("./routes/bucket.js")));
app.use("/", (quotes = require("./routes/quotes.js")));

module.exports = app;
