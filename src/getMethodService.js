const { isExist } = require('./Existence');
const fileSystem = require('fs');
const { getResponse } = require('./GetResponse');

function getMethodService(request, response) {
    try {
        if (request.params.id != undefined)
            getResponse(request, response, getSpecificUserDetails);
        else
            getAllUserDetails(response);
    } catch (error) {
        console.log(error);
    }
}

function getSpecificUserDetails(request, response, userList) {
    for (const userDetails of userList) {
        if (userDetails.userId == request.params.id) {
            response.status(200).send(userDetails);
            break;
        }
    }
}

function getAllUserDetails(response) {
    let userList = JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8'));
    response.status(200).send(userList);
}

module.exports = { getMethodService }