const { isValidDetail } = require('../ValidatingUserDetails');
const { test, expect } = require('@jest/globals');

describe("test Suite for the ValidatingUserDetails", () => {

    test("testing the isValidDetail for valid details", () => {
        let data = {
            body: "hello",
            title: "hello",
            userId: 23
        }
        expect(isValidDetail(data)).toBeTruthy();
    })

    test("testing the isValidDetail for InValid PropertyName for body", () => {
        let data = {
            head: "hello",
            title: "hello",
            userId: 23
        }
        expect(isValidDetail(data)).toBeFalsy();
    })

    test("testing the isValidDetail for InValid PropertyName for title", () => {
        let data = {
            body: "hello",
            head: "hello",
            userId: 23
        }
        expect(isValidDetail(data)).toBeFalsy();
    })

    test("testing the isValidDetail for InValid PropertyName for userId", () => {
        let data = {
            body: "hello",
            title: "hello",
            head: 23
        }
        expect(isValidDetail(data)).toBeFalsy();
    })

    test("testing the isValidDetail for InValid PropertyType for userId", () => {
        let data = {
            body: "hello",
            title: "hello",
            userId: "23"
        }
        expect(isValidDetail(data)).toBeFalsy();
    })

    test("testing the isValidDetail for InValid PropertyType for body", () => {
        let data = {
            body: 23,
            title: "hello",
            userId: 23
        }
        expect(isValidDetail(data)).toBeFalsy();
    })

    test("testing the isValidDetail for InValid PropertyType for title", () => {
        let data = {
            body: "hello",
            title: 32,
            userId: 23
        }
        expect(isValidDetail(data)).toBeFalsy();
    })

    test("testing the isValidDetail for More than 3 properties", () => {
        let data = {
            body: "hello",
            title: "hello",
            userId: 23,
            head: "hello"
        }
        expect(isValidDetail(data)).toBeFalsy();
    })


})


