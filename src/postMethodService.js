const fileSystem = require('fs');
const { isValidDetail } = require('./ValidatingUserDetails')
const { getResponse } = require("./GetResponse");

function postService(request, response) {
    try {
        if (isValidDetail(request.body))
            getResponse(request, response, postSpecificDetails);
        else
            response.status(403).send("Not a Valid UserDetail").end();
    } catch (error) {
        console.log(error);
    }
}

function postSpecificDetails(request, response, userList) {
    userList.push(request.body);
    fileSystem.writeFileSync("./userList.json", JSON.stringify(userList));
    response.status(201).send("Successfully Created!!").end();
}

module.exports = { postService }