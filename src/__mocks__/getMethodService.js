
function getMethodService(request, response) {
    if (request.params.id != undefined)
        getSpecificUserDetails(request, response);
    else
        getAllUserDetails(response);
}

function getSpecificUserDetails(request, response) {
    response.status(200).send("Striking the Get Service for Specific UserDetails")
}

function getAllUserDetails(response) {
    response.status(200).send("Striking the Get Service for UserDetailList")
}

module.exports = { getMethodService, getSpecificUserDetails, getAllUserDetails }