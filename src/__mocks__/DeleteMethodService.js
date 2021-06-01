function deleteService(request, response) {
    response.status(200).send("Striking the delete Service")
}

module.exports = { deleteService }