const request = require('supertest');
const express = require("express")
const multer = require("multer")

const data = {
    name:"test",
    lastname:"test",
    mobile_number:"86",
    work_number:"86",
    email:"test@test.com",
    gender:"Vyras",
    position:"test",
    workplace_id:"6091703254600e44302dd6f7",
    division_id:"609170e054600e44302dd6f9",
    subdivision_id:"6091710154600e44302dd6ff",
    region_id:"609174f4e1a4cf0960e61674",
    group_id:"60917506e1a4cf0960e61678",
    subgroup_id:"60917541e1a4cf0960e6167e"
 }

 const data2 = {
    name:"test2",
    lastname:"test2",
    mobile_number:"8656124545",
    work_number:"8656124545",
    email:"test2@test.com",
    gender:"Vyras",
    position:"test2",
    workplace_id:"6091703254600e44302dd6f7",
    division_id:"609170e054600e44302dd6f9",
    subdivision_id:"6091710154600e44302dd6ff",
    region_id:"609174f4e1a4cf0960e61674",
    group_id:"60917506e1a4cf0960e61678",
    subgroup_id:"60917541e1a4cf0960e6167e"
 }

describe("Employees API test", () => {

    it("GET employee data from DB", async () => {
        await request("http://localhost:6000").get("/api/employees")
		.expect(200)
    })

    it("POST employee data to DB", async () => {
        await request("http://localhost:6000").post("/api/employees")
        .field('name', data.name)
        .field('lastname', data.lastname)
        .field('mobile_number', data.mobile_number)
        .field('work_number', data.work_number)
        .field('email', data.email)
        .field('gender', data.gender)
        .field('position', data.position)
        .field('workplace_id', data.workplace_id)
        .field('subdivision_id', data.subdivision_id)
        .field('division_id', data.division_id)
        .field('region_id', data.region_id)
        .field('group_id', data.group_id)
        .field('subgroup_id', data.subgroup_id)
        .attach('file', "./uploads/images/1620565660301eric-weber-nQOQVJW7EY8-unsplash.jpg")
		.expect(200)
        .then((response) => {
            this.addedElementID = response.body._id
        }).catch((err) => {
            console.log(err)
        })
    })

    it("GET employee data by specify ID from DB", async () => {
        await request("http://localhost:6000").get(`/api/employees/${this.addedElementID}`)
		.expect(200)
    })

    it("PATCH employee data by specify ID to DB", async () => {
        await request("http://localhost:6000").patch(`/api/employees/${this.addedElementID}`)
        .field('name', data2.name)
        .field('lastname', data2.lastname)
        .field('mobile_number', data2.mobile_number)
        .field('work_number', data2.work_number)
        .field('email', data2.email)
        .field('gender', data2.gender)
        .field('position', data2.position)
        .field('workplace_id', data2.workplace_id)
        .field('subdivision_id', data2.subdivision_id)
        .field('division_id', data2.division_id)
        .field('region_id', data2.region_id)
        .field('group_id', data2.group_id)
        .field('subgroup_id', data2.subgroup_id)
        .attach('file', "./uploads/images/1620565660301eric-weber-nQOQVJW7EY8-unsplash.jpg")
		.expect(200)
    })

    it("DELETE employee data by specify ID from DB", async () => {
        await request("http://localhost:6000").delete(`/api/employees/${this.addedElementID}`)
		.expect(200)
    })
})