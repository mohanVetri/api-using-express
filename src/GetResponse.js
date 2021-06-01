const fileSystem = require('fs');
const { isExist } = require('./Existence');

function getResponse(request, response, method) {
    let userList = JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8'));
    if (request.method == "POST" ? !isExist(request.body.userId) : isExist(request.params.id)) {
        method(request, response, userList);
    }
    else
        response.status(request.method == "POST" ? 403 : 404).send(request.method == "POST" ? "UserId is already existed!!" : "UserId is not existed!!");
}

module.exports = { getResponse }