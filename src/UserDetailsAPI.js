var express = require('express');
var app = express();
const { postService } = require('./postMethodService');
const { getMethodService } = require('./getMethodService');
const { deleteService } = require('./DeleteMethodService');
const { putService } = require('./PutMethodService');

var server = app.listen(8081, "localhost", function () {
    var host = server.address().address
    var port = server.address().port
    console.log(`http://${host}:${port}`)
})

app.use(express.json());

app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

app.post("/", postService);

app.get("/userList", getMethodService);

app.get("/userList/:id", getMethodService);

app.put("/userList/:id", putService);

app.delete("/userList/:id", deleteService);

module.exports = { app, server };