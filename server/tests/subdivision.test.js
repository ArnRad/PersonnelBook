const request = require('supertest');

const data = {
    name:"TestSubDivision",
    division_id: ["6091710154600e44302dd6ff"],
    workplace_id: ["6091703254600e44302dd6f7"]
 }

 const updateData = {
    name:"Test2SubDivision",
    division_id: ["6091710154600e44302dd6ff"],
    workplace_id: ["6091703254600e44302dd6f7"]
 }

describe("Subdivisions API test", () => {
    
    it("GET subdivisions data from DB", async () => {
        await request("http://localhost:6000").get("/api/subdivisions")
		.expect(200)
    })

    it("POST subdivision data to DB", async () => {
        await request("http://localhost:6000").post("/api/subdivisions")
        .send(data)
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body._id
        }).catch((err) => {})
    })

    it("GET subdivision data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/subdivisions/${this.addedElementID}`)
		.expect(200)
    })

    it("PATCH subdivision data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/subdivisions/${this.addedElementID}`)
        .send(updateData)
		.expect(200)
    })

    it("DELETE subdivision data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/subdivisions/${this.addedElementID}`)
		.expect(200)
    })
})