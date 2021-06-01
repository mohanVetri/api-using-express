const { isExist } = require('../Existence')
const fileSystem = require('fs');


describe("test Suite for Existence.js", () => {
    test("testing the isExist for existing Value", () => {
        let userList = JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8'));
        userList.push({ title: "this is title", body: "this is body", userId: 100 });
        fileSystem.writeFileSync("./userList.json", JSON.stringify(userList));
        expect(isExist(100)).toBeTruthy();
    })

    test("testing the isExist for existing Value", () => {
        let userList = JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8'));
        let filteredList = userList.filter(userDetail => {
            return userDetail.userId != 100
        })
        fileSystem.writeFileSync("./userList.json", JSON.stringify(filteredList));
        expect(isExist(100)).toBeFalsy();
    })

})