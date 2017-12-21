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
                // console.log(json.data);

                // {
                //     "apiName":"System_Login_Api",
                //     "code":0,
                //     "data":{
                //     "departmentId":"14df884a-a5dc-4a45-9165-71a1c36f7c74",
                //         "dtCreate":1513768334771,
                //         "emailAddress":"test@test.com",
                //         "enable":1,
                //         "id":"7923e258-be92-4a6a-9b32-d78c6fd793a7",
                //         "loginName":"test",
                //         "loginPassword":"pass",
                //         "name":"测试",
                //         "phone":"13426290529",
                //         "token":"69a57720-4be4-4b15-b828-2df60a345040"
                // },
                //     "message":"成功",
                //     "overByEngineTimestamp":1513783389842,
                //     "requestUuid":"1c6a1b4d-83ba-4655-9ad8-3eda29bacaca"
                // }



                localStorage.setItem("login-data",JSON.stringify(json.data));

                location.href="main.html"
            }
            if (json.code==3){
                feedback2("login", "账号、密码不匹配或缺少必填项",3000);

            }


        }

    }



};

// test
// pass
//scp -r /home/besthyhy/temp/vv-vip-center-manager/ root@47.104.78.152:/usr/share/nginx/html
//ssh root@47.104.78.152
//2R1Qlian
//http://47.104.78.152/vv-vip-center-manager/html/login.html