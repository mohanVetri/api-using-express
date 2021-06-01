const { app, server } = require('../UserDetailsAPI')
const request = require('supertest');
const fileSystem = require('fs');
const { test, expect } = require('@jest/globals');
const { response } = require('express');


describe("testSuite for the server", () => {

    afterAll(async () => {
        await server.close();
    })

    test("testing the STATUS CODE for POST method & NEW USER DETAIL in '/'", async () => {
        let data = JSON.stringify({
            title: 'this is title',
            body: 'this is body',
            userId: 101,
        });
        const response = await request(app).post('/').type('json').send(data);
        expect(response.statusCode).toBe(201);
        let userList = JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8'));
        let newUserList = userList.filter(userDetails => {
            return userDetails.userId != 101
        });
        fileSystem.writeFileSync("./userList.json", JSON.stringify(newUserList));
    })

    test("testing the RESPONSE BODY for POST method & NEW USER DETAIL in '/'", async () => {
        let data = JSON.stringify({
            title: 'this is title',
            body: 'this is body',
            userId: 101,
        });
        const response = await request(app).post('/').type('json').send(data);
        expect(response.text).toBe("Successfully Created!!");
    })

    test("testing the STATUS CODE for POST method & EXISTING USER DETAIL in '/'", async () => {
        let data = JSON.stringify({
            title: 'this is title',
            body: 'this is body',
            userId: 101,
        });
        const response = await request(app).post('/').type('json').send(data);
        expect(response.statusCode).toBe(403);
    })

    test("testing the RESPONSE BODY for POST method & EXISTING USER DETAIL in '/'", async () => {
        let data = JSON.stringify({
            title: 'this is title',
            body: 'this is body',
            userId: 101,
        });
        const response = await request(app).post('/').type('json').send(data);
        expect(response.text).toBe("UserId is already existed!!");
    })

    test("testing the STATUS CODE for POST method & INVALID USER DETAIL in '/'", async () => {
        let data = JSON.stringify({
            title: 'this is title',
            head: 'this is body',
            userId: 22,
        });
        const response = await request(app).post('/').type('json').send(data);
        expect(response.statusCode).toBe(403);
    })

    test("testing the RESPONSE BODY for POST method & INVALID USER DETAIL in '/'", async () => {
        let data = JSON.stringify({
            title: 'this is title',
            head: 'this is body',
            userId: 22,
        });
        const response = await request(app).post('/').type('json').send(data);
        expect(response.text).toBe("Not a Valid UserDetail");
    })

    test("testing the statusCode GET method for '/userList'", async () => {
        const response = await request(app).get('/userList');
        expect(response.statusCode).toBe(200);
    })

    test("testing the response from the GET method for '/userList'", async () => {
        const response = await request(app).get('/userList');
        expect(response.body).toEqual(JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8')))
    })

    test("testing the statusCode for existing data in GET method for '/userList/101'", async () => {
        const response = await request(app).get('/userList/101');
        expect(response.statusCode).toBe(200);
    })

    test("testing the RESPONSE for existing data in GET method for '/userList/101'", async () => {
        let expected = { "title": "this is title", "body": "this is body", "userId": 101 };
        const response = await request(app).get('/userList/101');
        expect(response.body).toEqual(expected);
    })

    test('testing the STATUS CODE for PUT method in "/userList/3"', async () => {
        let data = JSON.stringify({
            title: 'Kumar',
            body: 'Mohan',
            userId: 101,
        });
        const response = await request(app).put('/userList/3').type('json').send(data);
        expect(response.statusCode).toEqual(200);
    })

    test('testing the RESPONSE BODY for PUT method in "/userList/3"', async () => {
        let data = JSON.stringify({
            title: 'Raj',
            body: 'Mohan',
            userId: 101,
        });
        const response = await request(app).put('/userList/3').type('json').send(data);
        expect(response.body).toEqual(JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8')));
    })

    test('testing the STATUS CODE for PUT method in "/userList/3" for INVALID USER DETAILS', async () => {
        let data = JSON.stringify({
            title: 'Jungpyo',
            body: 23,
            userId: 3,
        });
        const response = await request(app).put('/userList/100').type('json').send(data);
        expect(response.statusCode).toEqual(403);
    })

    test('testing the RESPONSE BODY for PUT method in "/userList/3" for INVALID USER DETAILS', async () => {
        let data = JSON.stringify({
            title: 'Jungpyo',
            body: 23,
            userId: 3,
        });
        const response = await request(app).put('/userList/100').type('json').send(data);
        expect(response.text).toEqual("Not a Valid UserDetail");
    })

    test('testing the STATUS CODE for DELETE method in /userList/101', async () => {
        const response = await request(app).delete('/userList/101');
        expect(response.statusCode).toBe(200);
        let userList = JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8'));
        userList.push({ "title": "this is title", "body": "this is body", "userId": 101 });
        fileSystem.writeFileSync("./userList.json", JSON.stringify(userList));
    })

    test('testing the RESPONSE BODY for DELETE method in /userList/101', async () => {
        const response = await request(app).delete('/userList/101');
        expect(response.body).toEqual(JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8')))
    })

    test('testing the STATUS CODE for DELETE method in /userList/101 for NON-EXISTING', async () => {
        const response = await request(app).delete('/userList/101');
        expect(response.statusCode).toBe(404);
    })

    test('testing the RESPONSE BODY for DELETE method in /userList/101 for NON-EXISTING', async () => {
        const response = await request(app).delete('/userList/101');
        expect(response.text).toBe("UserId is not existed!!");
    })

    test("testing the STATUS CODE for NON-existing data GET method for '/userList/101'", async () => {
        const response = await request(app).get('/userList/101');
        expect(response.statusCode).toBe(404);
    })

    test("testing the RESPONSE for NON-existing data in GET method for '/userList/6'", async () => {
        const response = await request(app).get('/userList/101');
        expect(response.text).toEqual("UserId is not existed!!");
    })

    test('testing the STATUS CODE for PUT method in "/userList/101"', async () => {
        let data = JSON.stringify({
            title: 'Jungpyo',
            body: 'Mohan',
            userId: 101,
        });
        const response = await request(app).put('/userList/100').type('json').send(data);
        expect(response.statusCode).toEqual(404);
    })

    test('testing the RESPONSE BODY for PUT method in "/userList/101"', async () => {
        let data = JSON.stringify({
            title: 'Jungpyo',
            body: 'Mohan',
            userId: 101,
        });
        const response = await request(app).put('/userList/100').type('json').send(data);
        expect(response.text).toEqual("UserId is not existed!!");
    })
}
)