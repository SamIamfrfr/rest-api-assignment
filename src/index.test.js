const request = require("supertest");
const app = require("./index1"); // Import your Express app

describe("Basic API Tests", () => {
    test("GET / should return 'Hello World!'", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World!");
    });
});
