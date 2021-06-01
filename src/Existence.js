const fileSystem = require("fs");

function isExist(id) {
    let userList = JSON.parse(fileSystem.readFileSync('./userList.json', 'utf8'));
    for (userDetail of userList) {
        if (userDetail.userId == id) {
            return true;
        }
    }
    return false;
}
module.exports = { isExist }