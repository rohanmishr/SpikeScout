var parameters = [];
function addParameter(){
    var param = window.prompt("Parameter name:");
    if (param == null || param == "") {
        alert("Invalid parameter name");
    } else {
        parameters.push(param);
    }
}