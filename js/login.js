var username = document.getElementById("username");
var password = document.getElementById("password");
var login = document.getElementById("login");

login.onclick=function () {
    var params = {
        "apiName": "System_Login_Api",
        "loginName": username.value,
        "loginPassword": password.value
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code==0){
                localStorage.setItem("login-data",JSON.stringify(json.data));

                location.href="main.html"
            }


        }

    }



};


