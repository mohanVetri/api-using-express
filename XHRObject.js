const XMLHttpRequest = require('xmlHttprequest').XMLHttpRequest;
let data = JSON.stringify({
    title: 'Raj',
    body: 'Kumar',
    userId: 46,
});

let httpMethod = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE"
}

let baseUrl = "http://127.0.0.1:8081";
let addUrl = baseUrl + "/";
let userDetailsListUrl = baseUrl + "/userList";
let specificUserUrl = userDetailsListUrl + "/";

function requestToServer(myResolve, myReject, method, url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myResolve(this.responseText);
        }
        else if (this.readyState == 4 && this.status != 200) {
            myReject("response: "+this.responseText+" status: "+this.statusText);
        }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(method == "POST" || method == "PUT" ? data : "");
}

function myResolve(data) {
    console.log(data);
}

function myReject(data) {
    console.log(data);
}

// requestToServer(myResolve, myReject, httpMethod.get, specificUserUrl + "46"); //getRequest for retrive a specific data
// requestToServer(myResolve, myReject, httpMethod.get, userDetailsListUrl); //getRequest for listing all userDetails
// requestToServer(myResolve, myReject, httpMethod.post, addUrl); //post Request for creating
// requestToServer(myResolve, myReject, httpMethod.put, specificUserUrl + "46"); //put request for updating the details
requestToServer(myResolve, myReject, httpMethod.delete, specificUserUrl + "46"); //delete Request for deleting the details

module.exports={requestToServer}