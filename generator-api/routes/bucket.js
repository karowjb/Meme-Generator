// const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const express = require("express");
var app = express();
const router = express.Router();
const uploadImageToS3 = require("../utils/s3Upload");

router.get("/bucket", (req, res) => {
    // Configure the AWS SDK with your access key and secret access key
    AWS.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.accessSecret,
    });
    // Create an S3 client object
    const s3 = new AWS.S3();
    // Set the name of the S3 bucket you want to access
    const bucketName = "capstone-memegenerator";
    // List the contents of the bucket
    s3.listObjects({ Bucket: bucketName }, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            res.sendStatus(500);
        } else {
            console.log(`Contents of ${bucketName}:`);
            data.Contents.forEach((item) => console.log(item.Key));
            res.sendStatus(200);
        }
    });
});

router.post("/bucket", (req, res) => {
    const bucketName = "your-bucket-name";
    const key = "../images/kevin.jpg";
    const imageFile = "thisisatest";

    uploadImageToS3(bucketName, key, imageFile)
        .then((data) => console.log("Upload successful:", data))
        .catch((error) => console.error("Upload failed:", error));

    res.sendStatus(200);
});
module.exports = router;
