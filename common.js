
function post(jsonObj) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://47.104.17.187:8081/qipai-exchange-manager-api");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(jsonObj));

    return xmlhttp;



}