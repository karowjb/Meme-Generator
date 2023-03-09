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
    // const param = {
    //     Bucket: bucketName,
    // };
    const params = {
        Bucket: bucketName,
        Key: objectKey,
    };

    // s3.listObjectsV2(param, function (err, data) {
    //     if (err) {
    //         console.log(err, err.stack);
    //     } else {
    //         console.log(data.Contents);
    //     }
    // });

    const url = s3.getSignedUrl("getObject", params);

    // console.log(`This is the url: ${url}`);
    res.send(url);
    // const response = await axios
    //     .get(url, {
    //         responseType: "arraybuffer", // Set the response type to arraybuffer to get the binary data
    //     })
    //     .then((response) => {
    //         // Handle the response
    //         const data = response.data; // The binary data of the object
    //         let img = Buffer.from(response.data, "binary").toString("base64");
    //         // console.log(img);
    //         // res.setHeader("Content-Type", "img/png");
    //         // localStorage.setItem("tester", img);
    //         res.sendStatus(200);
    //     })
    //     .catch((error) => {
    //         // Handle the error
    //     });
    // res.send(response);
    // console.log(response);
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
    // const url = s3.getSignedUrl("getObject", params);
    s3.listObjectsV2(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data.Contents);
        }
    });
    // console.log(url);
    // const response = await axios
    //     .get(url, {
    //         responseType: "arraybuffer", // Set the response type to arraybuffer to get the binary data
    //     })
    //     .then((response) => {
    //         // Handle the response
    //         const data = response.data; // The binary data of the object
    //         let img = Buffer.from(response.data, "binary").toString("base64");
    //         // console.log(img);
    //         // res.setHeader("Content-Type", "img/png");
    //         // localStorage.setItem("tester", img);
    //         res.sendStatus(200);
    //     })
    //     .catch((error) => {
    //         // Handle the error
    //     });
    // // res.send(response);
    // console.log(response);
});

module.exports = router;
