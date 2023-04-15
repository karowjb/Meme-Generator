const supertest = require("supertest");
const express = require("express");
const app = require("../server");

request = supertest(app);
jest.mock("aws-sdk", () => {
    return { S3: jest.fn() };
});

it("Gets the bucket endpoint", async () => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/bucket");
    expect(res.status).toBe(200);
    expect(res.text).toBe("This is your daily health check");
});
it("Gets the buckets endpoint", async () => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/buckets");
    expect(res.status).toBe(200);
    expect(res.text).toBe("This is your daily health check");
});
