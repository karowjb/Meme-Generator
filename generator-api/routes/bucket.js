const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();

router.post("/bucket", async (req, res) => {
    // Configure the AWS SDK with your access key and secret access key
    AWS.config.update({
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.ACCESSSECRET,
        region: process.env.AWSREGION,
    });
    // Create an S3 client object
    const s3 = new AWS.S3({
        encryption: {
            S3ManagedEncryption: process.env.ENCRYPTION,
        },
    });
    // Set the name of the S3 bucket you want to access
    console.log("Accessing bucket");
    const bucketName = process.env.S3BUCKETNAME;
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
        region: process.env.AWSREGION,
    });
    // Create an S3 client object
    const s3 = new AWS.S3({
        encryption: {
            S3ManagedEncryption: process.env.ENCRYPTION,
        },
    });
    // Set the name of the S3 bucket you want to access
    console.log("Accessing bucket");
    const bucketName = process.env.S3BUCKETNAME;

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
