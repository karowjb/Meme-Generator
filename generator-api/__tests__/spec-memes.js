const supertest = require("supertest");
const express = require("express");
const app = require("../server");
const { default: axios } = require("axios");
jest.mock("axios");

request = supertest(app);

it("Gets the memes endpoint", async () => {
    // Sends GET Request to /test endpoint
    axios.post.mockResolvedValue({
        data: "https://capstone-memegenerator.s3.amazonaws.com/kevin.jpg?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1681918669&Signature=TDcIZfCefjSwnxPXiTmTAX%2BWBjw%3D",
    });
    const res = await request.get("/memes");
    expect(res.status).toBe(200);
    expect(res.text).toBe(
        '{"image":"https://capstone-memegenerator.s3.amazonaws.com/kevin.jpg?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1681918669&Signature=TDcIZfCefjSwnxPXiTmTAX%2BWBjw%3D"}'
    );
});
it("Gets the memes endpoint", async () => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/memesall");
    expect(res.status).toBe(200);
    // expect(res.text).toBe(
    //     '[{"memeId":1,"name":"test.png","memeType":0,"image":"https://capstone-memegenerator.s3.amazonaws.com/test.png?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1678322278&Signature=lCiMT7C2ead4zqbRaHjhKA5Me7E%3D"},{"memeId":2,"name":"danger.jpg","memeType":0,"image":"https://capstone-memegenerator.s3.amazonaws.com/meme.png?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1678321892&Signature=99BBtfUkeSBn1LwVjjZHUOm6teY%3D"},{"memeId":3,"name":"kevin.jpg","memeType":0,"image":"https://capstone-memegenerator.s3.amazonaws.com/test.png?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1678322278&Signature=lCiMT7C2ead4zqbRaHjhKA5Me7E%3D"},{"memeId":4,"name":"meme.png","memeType":0,"image":"https://capstone-memegenerator.s3.amazonaws.com/meme.png?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1678321892&Signature=99BBtfUkeSBn1LwVjjZHUOm6teY%3D"},{"memeId":5,"name":"test.png","memeType":0,"image":"https://capstone-memegenerator.s3.amazonaws.com/test.png?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1678322278&Signature=lCiMT7C2ead4zqbRaHjhKA5Me7E%3D"},{"memeId":6,"name":"meme.png","memeType":0,"image":"https://capstone-memegenerator.s3.amazonaws.com/meme.png?AWSAccessKeyId=AKIAVYN2RNW3VXRHJ7OL&Expires=1678321892&Signature=99BBtfUkeSBn1LwVjjZHUOm6teY%3D"}]'
    // );
});
