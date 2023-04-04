// const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const express = require("express");
var app = express();
const router = express.Router();
const uploadImageToS3 = require("../utils/s3Upload");
const { default: axios } = require("axios");

router.post("/bucket", async (req, res) => {
    // Configure the AWS SDK with your access key and secret access key
    AWS.config.update({
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.ACCESSSECRET,
        region: "us-east-1",
    });
    // Create an S3 client object
    const s3 = new AWS.S3({
        encryption: {
            S3ManagedEncryption: "AES256",
        },
    });
    // Set the name of the S3 bucket you want to access
    console.log("Accessing bucket");
    const bucketName = "capstone-memegenerator";
    const objectKey = req.body["name"];
    const params = {
        Bucket: bucketName,
        Key: objectKey,
    };
    const url = s3.getSignedUrl("getObject", params);
    res.send(url);
});

router.get("/buckets", async (req, res) => {
    // Configure the AWS SDK with your access key and secret access key
    AWS.config.update({
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.ACCESSSECRET,
        region: "us-east-1",
    });
    // Create an S3 client object
    const s3 = new AWS.S3({
        encryption: {
            S3ManagedEncryption: "AES256",
        },
    });
    // Set the name of the S3 bucket you want to access
    console.log("Accessing bucket");
    const bucketName = "capstone-memegenerator";

    const params = {
        Bucket: bucketName,
    };
    s3.listObjectsV2(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data.Contents);
        }
    });
});

module.exports = router;
