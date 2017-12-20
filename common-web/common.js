var baseUrl = "";
function post(jsonObj) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://47.104.17.187:8081/qipai-exchange-manager-api");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(jsonObj));
    var stringify = JSON.stringify(jsonObj);

    return xmlhttp;


}

function upload(formData) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://47.104.17.187:8082/micro-file-server");
    // xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // xmlhttp.setRequestHeader("Content-type","multipart/form-data");
    xmlhttp.send(formData);


    return xmlhttp;


}


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function extractPxValueNumber(width) {
    return width.substr(0, width.length - 2);
}


function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ",location=no,toolbar=no");

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}


function getCssValue(key) {
    return getComputedStyle(document.body).getPropertyValue(key);

}



function hexToRGB(hex, alpha) {
    hex = hex.trim();
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}



function before(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}
function after(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

HTMLElement.prototype.load=function (url) {
    var container=this;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Content-type', 'text/html');
    xmlhttp.send();

    xmlhttp.onreadystatechange = function (e) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            container.innerHTML = xmlhttp.responseText;
        }
    }
};

function getEnumValueByKey(e, key) {
    var virtualKey = "a" + key;
    for (i in e) {
        if (i == virtualKey) {
            return e[i];
        }

    }
}

function getLoginData(){
    return JSON.parse(localStorage.getItem("login-data"));
}