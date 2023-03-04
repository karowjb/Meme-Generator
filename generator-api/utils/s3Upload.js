const AWS = require("aws-sdk");
function uploadToS3(bucketName, key, data) {
    // Configure the AWS SDK with your access and secret key.
    AWS.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.accessSecret,
    });

    // Create a new S3 object and specify the bucket name and key.
    const s3 = new AWS.S3();
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: imageFile,
        ACL: "public-read",
        ContentType: imageFile.type,
    };

    // Upload the image to S3.
    return s3.upload(params).promise();
}

module.exports = uploadToS3;
