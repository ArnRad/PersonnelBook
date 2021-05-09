const request = require('supertest');

const data = {
    name:"TestSubGroup",
    group_id: ["60917506e1a4cf0960e61678"]
 }

 const updateData = {
    name:"Test2SubGroup",
    region_id: ["60917506e1a4cf0960e61678"]
 }

describe("Subgroup API test", () => {
    
    it("GET subgroups data from DB", async () => {
        await request("http://localhost:6000").get("/api/subgroups")
		.expect(200)
    })

    it("POST subgroup data to DB", async () => {
        await request("http://localhost:6000").post("/api/subgroups")
        .send(data)
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body._id
        }).catch((err) => {})
    })

    it("GET subgroup data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/subgroups/${this.addedElementID}`)
		.expect(200)
    })

    it("PATCH subgroup data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/subgroups/${this.addedElementID}`)
        .send(updateData)
		.expect(200)
    })

    it("DELETE subgroup data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/subgroups/${this.addedElementID}`)
		.expect(200)
    })
})