const request = require('supertest');

const data = {
    name:"TestGroup",
    region_id: ["609174f4e1a4cf0960e61674"]
 }

 const updateData = {
    name:"Test2Group",
    region_id: ["609174f4e1a4cf0960e61674"]
 }

describe("Group API test", () => {
    
    it("GET groups data from DB", async () => {
        await request("http://localhost:6000").get("/api/groups")
		.expect(200)
    })

    it("POST group data to DB", async () => {
        await request("http://localhost:6000").post("/api/groups")
        .send(data)
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body._id
        }).catch((err) => {})
    })

    it("GET group data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/groups/${this.addedElementID}`)
		.expect(200)
    })

    it("PATCH group data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/groups/${this.addedElementID}`)
        .send(updateData)
		.expect(200)
    })

    it("DELETE group data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/groups/${this.addedElementID}`)
		.expect(200)
    })
})