const supertest = require("supertest");
const express = require("express");
const app = require("../server");

request = supertest(app);

it("Gets the health endpoint", async () => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/health");
    expect(res.status).toBe(200);
    expect(res.text).toBe("This is your daily health check");
});
