const supertest = require("supertest");
const express = require("express");
const app = require("../server");
const dbConn = require("../dbconnect.js");
mockDbConn = jest.fn();

request = supertest(app);

it("Gets the quotes endpoint", async () => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/quotes");
    expect(res.status).toBe(200);
    // expect(res.text).toBe(
    //     '{"quoteId":3,"name":"memes","quoteContent":"Ha ha this is a memem","quoteType":0}'
    // );
});

it("Gets the quotes/all endpoint", async () => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/quotesall");
    expect(res.status).toBe(200);
    // expect(res.text).toBe(
    //     '[{"quoteId":1,"name":"Funny","quoteContent":"This is a funny memem","quoteType":0},{"quoteId":2,"name":"Boring","quoteContent":"Sadmemem","quoteType":1},{"quoteId":3,"name":"memes","quoteContent":"Ha ha this is a memem","quoteType":0},{"quoteId":4,"name":"Sick","quoteContent":"“I\'m sick of following my dreams, man. I\'m just going to ask where they\'re going and hook up with ’em later.\\n—Mitch Hedberg","quoteType":1},{"quoteId":5,"name":"Funny","quoteContent":"Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes.”\\n—Jack Handey","quoteType":1},{"quoteId":6,"name":"Funny","quoteContent":"Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.\\n—Will Ferrell","quoteType":1},{"quoteId":7,"name":"Funny","quoteContent":"Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.\\n—Will Ferrell","quoteType":1},{"quoteId":8,"name":"Funny","quoteContent":"Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.\\n—Will Ferrell","quoteType":1},{"quoteId":9,"name":"Funny","quoteContent":"Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.\\n—Will Ferrell","quoteType":1}]'
    // );
});
