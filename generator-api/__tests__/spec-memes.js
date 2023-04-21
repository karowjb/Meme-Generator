const axios = require("axios");
const supertest = require("supertest");
const app = require("../server");
// let dbConn = require("../dbconnect");
request = supertest(app);
jest.mock("axios");
let dbConn = require("../dbconnect");

// Set up a mock pool for testing
describe("GET /memes", () => {
    it("should return a random meme image", async () => {
        const mockMeme = {
            name: "Mock Meme",
            url: "http://example.com/mock-meme.jpg",
        };
        const mockResponse = { data: mockMeme };
        console.log("In spec-memes");
        // Mock the response from the /bucket endpoint
        axios.post.mockResolvedValue(mockResponse);

        // Mock the query result from the database
        dbConn = jest.fn().mockResolvedValue({
            then: jest.fn().mockResolvedValue({}),
            conn: jest.fn().mockResolvedValue({
                query: jest.fn().mockResolvedValue([
                    {
                        name: "Mock Meme 1",
                        url: "http://example.com/mock-meme-1.jpg",
                    },
                    {
                        name: "Mock Meme 2",
                        url: "http://example.com/mock-meme-2.jpg",
                    },
                ]),
            }),

            release: jest.fn(),
        });
        const response = await request.get("/memes");

        // Expect the response to have a 200 status code
        expect(response.status).toBe(200);
        // Expect the response body to have an image property with the mock meme data
        expect(response.body).toHaveProperty("image", mockMeme);
    }, 10000);
});

describe("GET /memesall", () => {
    it("should return all memes", async () => {
        const mockMemes = [
            { name: "Mock Meme 1", url: "http://example.com/mock-meme-1.jpg" },
            { name: "Mock Meme 2", url: "http://example.com/mock-meme-2.jpg" },
        ];
        console.log("In spec-memesall");
        // Mock the response from the /bucket endpoint

        // Mock the query result from the database
        dbConn = jest.fn().mockResolvedValue({
            // conn: jest.fn().mockResolvedValue("bad"),
            // then: jest.fn().mockResolvedValue("bad"),
            // query: jest.fn().mockResolvedValue("bad"),
            // then: jest.fn().mockResolvedValue({
            //     conn: jest.fn().mockResolvedValue({
            //         query: jest.fn().mockResolvedValue([
            //             {
            //                 name: "Mock Meme 1",
            //                 url: "http://example.com/mock-meme-1.jpg",
            //             },
            //             {
            //                 name: "Mock Meme 2",
            //                 url: "http://example.com/mock-meme-2.jpg",
            //             },
            //         ]),
            //     }),
            // }),
            // release: jest.fn(),
        });

        const response = await request.get("/memesall");

        // Expect the response to have a 200 status code
        expect(response.status).toBe(200);
        // Expect the response body to have an images property with an array of mock memes
        // expect(response.body).toHaveProperty("images", mockMemes);
    });
});
