const request = require('supertest');

const data = {
    permissions:[
       "create-edit structures",
       "read structures",
       "delete structures",
       "create-edit workplaces",
       "read workplaces",
       "delete workplaces",
       "create-edit employees",
       "read employees",
       "delete employees"
    ],
    name:"Test",
    surname:"Testavicius",
    email:"test.testavicius@gmail.com",
    confirmed_email:"test.testavicius@gmail.com",
    password:"$2a$10$WeVBJbKABIBjs4oqQ0sz2.JNk.fKLvARHwaR146Q2Z8On7RKid6Sy"
 }

 const updateData = {
    permissions:[
       "create-edit structures",
       "read structures",
       "delete structures",
       "create-edit workplaces",
       "read workplaces",
       "delete workplaces"
    ],
    name:"Test2",
    surname:"Testavicius2",
    email:"test2.testavicius2@gmail.com",
    confirmed_email:"test2.testavicius2@gmail.com",
    password:"$2a$10$WeVBJbKABIBjs4oqQ0sz2.JNk.fKLvARHwaR146Q2Z8On7RKid6Sy"
 }

describe("Users API test", () => {
    
    it("Make User login to system", async () => {
        await request("http://localhost:6000").post("/api/login")
        .send({
            name: "Admin",
            password: "admin01"
        })
		.expect(200)
    })

    it("GET users data from DB", async () => {
        await request("http://localhost:6000").get("/api/users")
		.expect(200)
    })

    it("POST user data to DB", async () => {
        await request("http://localhost:6000").post("/api/users")
        .send(data)
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body.savedUser._id
        }).catch((err) => {})
    })

    it("GET user data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/users/${this.addedElementID}/edit`)
		.expect(200)
    })

    it("PATCH user data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/users/${this.addedElementID}`)
        .send(updateData)
		.expect(200)
    })

    it("DELETE user data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/users/${this.addedElementID}`)
		.expect(200)
    })
})