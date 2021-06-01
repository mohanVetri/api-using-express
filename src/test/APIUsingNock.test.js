const { test, expect } = require("@jest/globals");
const request = require('supertest');
const nock = require('nock');
let expected = {
    title: "this is title",
    body: "this is body",
    userId: 2
}
let data = {
    title: "this is title",
    body: "this is body",
    userId: 3
}
let userList = [{
    title: "this is title",
    body: "this is body",
    userId: 1
}, {
    title: "this is title",
    body: "this is body",
    userId: 2
}, {
    title: "this is title",
    body: "this is body",
    userId: 3
}, {
    title: "this is title",
    body: "this is body",
    userId: 4
}, {
    title: "this is title",
    body: "this is body",
    userId: 5
}]

describe("test Suite for axios", () => {
    afterAll(() => {
        nock("http://127.0.0.1:8081").done();
    })
    test('testing the STATUS CODE of get method for specific User', async () => {
        nock("http://127.0.0.1:8081").get('/userList/2').reply(200, expected)
        const response = await request("http://127.0.0.1:8081").get('/userList/2');
        expect(response.statusCode).toBe(200);
    })

    test('testing the RESPONSE of get method for specific User', async () => {
        nock("http://127.0.0.1:8081").get('/userList/2').reply(200, expected)
        const response = await request("http://127.0.0.1:8081").get('/userList/2');
        expect(response.body).toEqual(expected);
    })

    test('testing the STATUS CODE of get method for UserList', async () => {
        nock("http://127.0.0.1:8081").get('/userList').reply(200, userList)
        const response = await request("http://127.0.0.1:8081").get('/userList');
        expect(response.statusCode).toBe(200);
    })

    test('testing the RESPONSE of get method for UserList', async () => {
        nock("http://127.0.0.1:8081").get('/userList').reply(200, userList)
        const response = await request("http://127.0.0.1:8081").get('/userList');
        expect(response.body).toEqual(userList);
    })

    test('testing the STATUS CODE of post method', async () => {
        nock("http://127.0.0.1:8081").post('/').reply(201, "Successfully Created!!")
        const response = await request("http://127.0.0.1:8081").post('/').type('json').send(data);
        expect(response.statusCode).toBe(201);
    })

    test('testing the RESPONSE of post method', async () => {
        nock("http://127.0.0.1:8081").post('/').reply(201, "Successfully Created!!")
        const response = await request("http://127.0.0.1:8081").post('/').type('json').send(data);
        expect(response.text).toEqual("Successfully Created!!");
    })

    test('testing the STATUS CODE of put method', async () => {
        nock("http://127.0.0.1:8081").put('/userList/3').reply(200, "Updated Successfully!!")
        const response = await request("http://127.0.0.1:8081").put('/userList/3').type('json').send(data);
        expect(response.statusCode).toBe(200);
    })

    test('testing the RESPONSE of put method', async () => {
        nock("http://127.0.0.1:8081").put('/userList/3').reply(200, "Updated Successfully!!")
        const response = await request("http://127.0.0.1:8081").put('/userList/3').type('json').send(data);
        expect(response.text).toEqual("Updated Successfully!!");
    })

    test('testing the STATUS CODE of delete method', async () => {
        nock("http://127.0.0.1:8081").delete('/userList/2').reply(200, "Deleted Successfully!!")
        const response = await request("http://127.0.0.1:8081").delete('/userList/2');
        expect(response.statusCode).toBe(200);
    })

    test('testing the RESPONSE of delete method', async () => {
        nock("http://127.0.0.1:8081").delete('/userList/3').reply(200, "Deleted Successfully!!")
        const response = await request("http://127.0.0.1:8081").delete('/userList/3');
        expect(response.text).toEqual("Deleted Successfully!!");
    })


})