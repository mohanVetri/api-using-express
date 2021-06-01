function isValidDetail(data) {
    if (Object.keys(data).length == 3 && typeof data.title == "string"
        && typeof data.userId == "number" && typeof data.body == "string")
        return true;
    return false;
}
module.exports = { isValidDetail }