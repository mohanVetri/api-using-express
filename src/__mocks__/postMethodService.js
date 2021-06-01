function postService(request, response) {
    response.status(201).send("Striking the post Service");
}

module.exports = { postService }