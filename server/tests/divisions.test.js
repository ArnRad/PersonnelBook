const request = require('supertest');

const data = {
    name:"TestDivision",
    workplace_id: ["6091703254600e44302dd6f7"]
 }

 const updateData = {
    name:"Test2Division",
    workplace_id: ["6091703254600e44302dd6f7"]
 }

describe("Divisions API test", () => {
    
    it("GET divisions data from DB", async () => {
        await request("http://localhost:6000").get("/api/divisions")
		.expect(200)
    })

    it("POST division data to DB", async () => {
        await request("http://localhost:6000").post("/api/divisions")
        .send(data)
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body._id
        }).catch((err) => {})
    })

    it("GET division data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/divisions/${this.addedElementID}`)
		.expect(200)
    })

    it("PATCH division data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/divisions/${this.addedElementID}`)
        .send(updateData)
		.expect(200)
    })

    it("DELETE division data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/divisions/${this.addedElementID}`)
		.expect(200)
    })
})