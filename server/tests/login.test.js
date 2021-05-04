const request = require('supertest');

describe("Login test", () => {
    it("Check if Login API is working", async () => {
        await request("http://localhost:5000").post("/api/login")
        .send({
            name: "Admin",
            password: "admin01"
        })
		.expect(200)
    })
})