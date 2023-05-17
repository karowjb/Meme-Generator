const express = require("express");
var app = express();
const router = express.Router();

router.get("/health", (req, res) => {
    //Endpoint to check status of the API
    res.send("This is your daily health check");
});
module.exports = router;
