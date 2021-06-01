function putService(request, response) {
    response.status(200).send("Striking the put Service");
}

module.exports = { putService }