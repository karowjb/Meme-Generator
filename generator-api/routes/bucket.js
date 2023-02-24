// const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const express = require("express");
var app = express();
const router = express.Router();

router.get("/bucket", (req, res) => {
    AWS.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.accessSecret,
    });
    var s3 = new AWS.S3();
    var filePath = "./data/file.txt";
    var params = {
        Bucket: "capstone-memegenerator",
        Body: fs.createReadStream(filePath),
        Key: "folder/" + Date.now() + "_" + path.basename(filePath),
    };
    s3.upload(params, function (err, data) {
        //handle error
        if (err) {
            console.log("Error", err);
        }
        //success
        if (data) {
            console.log("Uploaded in:", data.Location);
        }
    });
    res.send("Data sent to AWS");
});
module.exports = router;
