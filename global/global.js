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

function feedback2(elementId, msg, time) {
    var span = document.createElement("span");
    span.innerHTML = msg;
    after(span, document.getElementById(elementId));
    setTimeout(function () {
        span.style.display = "none";
    }, time);

}

var OrderStatus = {
    "a1": "待付款",
    "a2": "待收货",
    "a3": "已完成",
    "a4": "已取消"
};

var ApplyStatus = {
    "a0": "未审核",
    "a1": "已同意",
    "a2": "已拒绝"
};

function globalHandleResponse(json) {
    if (json.code == 1015) {
        window.parent.location.href = "../../index.html";
        return;
    }

    if (json.code == 1017) {
        toast(json.message,true);
        return;
    }

    if (json.code == 1019) {
        toast(json.message,true);
        return;
    }
}