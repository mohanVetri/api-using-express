const { app, server } = require('../UserDetailsAPI')
const request = require('supertest');
const { test, expect } = require('@jest/globals');
jest.mock("../getMethodService")
jest.mock('../postMethodService')
jest.mock('../PutMethodService')
jest.mock('../DeleteMethodService')

describe("test suite for api", () => {

    afterAll(async () => {
        await server.close();
    })
    test('testing the STATUS CODE getMethod for"/userList"', async () => {
        const response = await request(app).get('/userList');
        expect(response.statusCode).toBe(200);
    })

    test('testing the RESPONSE getMethod for"/userList"', async () => {
        const response = await request(app).get('/userList');
        expect(response.text).toBe("Striking the Get Service for UserDetailList");
    })

    test('testing the STATUS CODE getMethod for specific User', async () => {
        const response = await request(app).get('/userList/2');
        expect(response.statusCode).toBe(200);
    })

    test('testing the RESPONSE getMethod for specific User', async () => {
        const response = await request(app).get('/userList/2');
        expect(response.text).toBe("Striking the Get Service for Specific UserDetails");
    })

    test("testing the STATUS CODE of post method", async () => {
        data = {
            title: "this is title",
            body: "this is body",
            userId: 2
        }
        const response = await request(app).post('/').send(data);
        expect(response.statusCode).toBe(201);
    })

    test("testing the RESPONSE of post method", async () => {
        data = {
            title: "this is title",
            body: "this is body",
            userId: 2
        }
        const response = await request(app).post('/').send(data);
        expect(response.text).toBe("Striking the post Service");
    })

    test("testing the STATUS CODE of put method", async () => {
        data = {
            title: "this is head",
            body: "this is body",
            userId: 2
        }
        const response = await request(app).put('/userList/2').send(data);
        expect(response.statusCode).toBe(200);
    })

    test("testing the RESPONSE of put method", async () => {
        data = {
            title: "this is head",
            body: "this is body",
            userId: 2
        }
        const response = await request(app).put('/userList/2').send(data);
        expect(response.text).toBe("Striking the put Service");
    })

    test('testing the STATUS CODE of Delete method', async () => {
        const response = await request(app).delete('/userList/2').send(data);
        expect(response.statusCode).toBe(200);

    })

    test('testing the RESPONSE of Delete method', async () => {
        const response = await request(app).delete('/userList/2').send(data);
        expect(response.text).toBe("Striking the delete Service");

    })
})