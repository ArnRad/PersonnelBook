const request = require('supertest');

const data = {
    name:"TestRegion",
    subdivision_id: ["6091710b54600e44302dd700"]
 }

 const updateData = {
    name:"Test2Region",
    subdivision_id: ["6091710b54600e44302dd700"]
 }

describe("Regions API test", () => {
    
    it("GET regions data from DB", async () => {
        await request("http://localhost:6000").get("/api/regions")
		.expect(200)
    })

    it("POST region data to DB", async () => {
        await request("http://localhost:6000").post("/api/regions")
        .send(data)
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body._id
        }).catch((err) => {})
    })

    it("GET region data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/regions/${this.addedElementID}`)
		.expect(200)
    })

    it("PATCH region data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/regions/${this.addedElementID}`)
        .send(updateData)
		.expect(200)
    })

    it("DELETE region data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/regions/${this.addedElementID}`)
		.expect(200)
    })
})