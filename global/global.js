/**
 * Created by besthyhy on 17-12-1.
 */

function addUploadFunctionToImg(imgId) {
    document.getElementById(imgId).onclick = function () {
        document.getElementById(imgId + "-file").click();

    };
    document.getElementById(imgId + "-file").onchange = function () {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(imgId).setAttribute("src", e.target.result);
            document.getElementById(imgId).setAttribute("title", file.name);
        };

        reader.readAsDataURL(file);
    };
}


function feedback(elementId, msg) {
    var span = document.createElement("span");
    span.innerHTML = msg;
    after(span, document.getElementById(elementId));
    setTimeout(function () {
        span.style.display = "none";
    }, 1000);

}

function feedback2(elementId, msg,time) {
    var span = document.createElement("span");
    span.innerHTML = msg;
    after(span, document.getElementById(elementId));
    setTimeout(function () {
        span.style.display = "none";
    }, time);

}

var OrderStatus = {
    "a1": "待付款",
    "a2": "待发货",
    "a3": "待收货",
    "a4": "已完成",
    "a5": "已关闭"
};

