const express = require("express");
var app = express();
const router = express.Router();

router.get("/health", (req, res) => {
    // res.sendStatus(200).send("This is your daily health check");
    res.send("This is your daily health check");
});
module.exports = router;
