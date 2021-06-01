const { getResponse } = require("./GetResponse")
const { isValidDetail } = require('./ValidatingUserDetails')
const fileSystem = require('fs');

function putService(request, response) {
    try {
        if (isValidDetail(request.body))
            getResponse(request, response, updateSpecificDetails);
        else
            response.status(403).send("Not a Valid UserDetail").end();
    } catch (error) {
        console.log(error);
    }
}

function updateSpecificDetails(request, response, userList) {
    for (const userDetails of userList) {
        if (userDetails.userId == request.params.id) {
            userDetails.body = request.body.body;
            userDetails.title = request.body.title;
        }
    }
    fileSystem.writeFileSync("./userList.json", JSON.stringify(userList));
    response.status(200).send(userList).end();
}

module.exports = { putService, updateSpecificDetails }