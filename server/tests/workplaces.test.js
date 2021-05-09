const request = require('supertest');

const data = {
    street:"Test pr.",
    number:"99",
    city:"Test",
    country:"Test"
 }

 const updateData = {
    street:"Test2 pr.",
    number:"992",
    city:"Test2",
    country:"Test2"
 }

describe("Workplaces API test", () => {
    
    it("GET workplaces data from DB", async () => {
        await request("http://localhost:6000").get("/api/workplaces")
		.expect(200)
    })

    it("POST workplace data to DB", async () => {
        await request("http://localhost:6000").post("/api/workplaces")
        .send(data)
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body._id
        }).catch((err) => {})
    })

    it("GET workplace data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/workplaces/${this.addedElementID}`)
		.expect(200)
    })

    it("PATCH workplace data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/workplaces/${this.addedElementID}`)
        .send(updateData)
		.expect(200)
    })

    it("DELETE workplace data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/workplaces/${this.addedElementID}`)
		.expect(200)
    })
})