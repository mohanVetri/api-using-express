const fileSystem = require('fs');
const { getResponse } = require('./GetResponse')

function deleteSpecificDetails(request, response, userList) {
    let newUserList = userList.filter(userDetails => {
        return userDetails.userId != request.params.id
    });
    fileSystem.writeFileSync("./userList.json", JSON.stringify(newUserList));
    response.status(200).send(newUserList);
}

function deleteService(request, response) {
    try {
        getResponse(request, response, deleteSpecificDetails)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteService, getResponse, deleteSpecificDetails }