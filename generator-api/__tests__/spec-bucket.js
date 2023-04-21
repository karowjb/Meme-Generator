const AWS = require("aws-sdk");
jest.mock("aws-sdk");
const supertest = require("supertest");
const app = require("../server");

request = supertest(app);
AWS.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.ACCESSSECRET,
    region: process.env.AWSREGION,
});
describe("POST /bucket endpoint", () => {
    it("should return a signed URL for an S3 object", async () => {
        const fakeRequestBody = { name: "example-object-key" };
        const expectedUrl = "https://example.com/signed-url";
        // mock AWS S3 API calls
        AWS.S3.prototype.getSignedUrl = jest.fn((operation, params) => {
            return expectedUrl;
        });

        // make the request to the test server
        const response = await request.post("/bucket");

        // assert the response
        expect(response.status).toBe(200);
    }, 10000);
});

describe("GET /buckets endpoint", () => {
    it("should return a list of S3 objects in the specified bucket", async () => {
        const expectedContents = [{ key: "object1" }, { key: "object2" }];
        const s3 = new AWS.S3({
            encryption: {
                S3ManagedEncryption: process.env.ENCRYPTION,
            },
        });
        // mock AWS S3 API calls
        AWS.S3.prototype.listObjectsV2 = jest.fn((params, callback) => {
            callback(null, { Contents: expectedContents });
        });

        // make the request to the test server
        const response = await request.get("/buckets");

        // assert the response
        expect(response.status).toBe(200);
    }, 10000);

    it("should handle errors when listing objects in the bucket", async () => {
        // mock AWS S3 API calls
        const s3 = new AWS.S3({
            encryption: {
                S3ManagedEncryption: process.env.ENCRYPTION,
            },
        });
        AWS.S3.prototype.listObjectsV2 = jest.fn((params, callback) => {
            callback(new Error("test error"));
        });

        // make the request to the test server
        const response = await request.get("/buckets");

        // assert the response
        expect(response.status).toBe(500);
    }, 10000);
});
