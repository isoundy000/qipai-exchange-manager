var bdata = [];
var vdata = [];

addUploadFunctionToImgOnList("bimg1");
addUploadFunctionToImgOnList("bimg2");
addUploadFunctionToImgOnList("bimg3");
addUploadFunctionToImgOnList("bimg4");
addUploadFunctionToImgOnList("bimg5");

addUploadFunctionToImgOnList("vimg1");
addUploadFunctionToImgOnList("vimg2");
addUploadFunctionToImgOnList("vimg3");
addUploadFunctionToImgOnList("vimg4");
addUploadFunctionToImgOnList("vimg5");

function addUploadFunctionToImgOnList(imgId) {
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


        var formData = new FormData();
        formData.append("file1", file);

        var xmlhttp = upload(formData);


        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 console.log(xmlhttp.responseText);

                var json = JSON.parse(xmlhttp.responseText);
                if (json.code == 0) {

                    var url = json.data[0].url;
                    // alert(url)

                    switch (imgId) {
                        case "bimg1":
                            if (bdata[0] == undefined) {
                                bdata[0] = {
                                    "reorder": 1,
                                    "type": 1,
                                    "url": url
                                }
                            }else {
                                bdata[0].url=url;
                            }
                            break;
                        case "bimg2":
                            if (bdata[1] == undefined) {
                                bdata[1] = {
                                    "reorder": 2,
                                    "type": 1,
                                    "url": url
                                }
                            }else {
                                bdata[1].url=url;
                            }
                            break;
                        case "bimg3":
                            if (bdata[2] == undefined) {
                                bdata[2] = {
                                    "reorder": 3,
                                    "type": 1,
                                    "url": url
                                }
                            }else {
                                bdata[2].url=url;
                            }
                            break;
                        case "bimg4":
                            if (bdata[3] == undefined) {
                                bdata[3] = {
                                    "reorder": 4,
                                    "type": 1,
                                    "url": url
                                }
                            }else {
                                bdata[3].url=url;
                            }
                            break;
                        case "bimg5":
                            if (bdata[4] == undefined) {
                                bdata[4] = {
                                    "reorder": 5,
                                    "type": 1,
                                    "url": url
                                }
                            }else {
                                bdata[4].url=url;
                            }
                            break;

                        case "vimg1":
                            if (vdata[0] == undefined) {
                                vdata[0] = {
                                    "reorder": 1,
                                    "type": 2,
                                    "url": url
                                }
                            }else {
                                vdata[0].url=url;
                            }
                            break;
                        case "vimg2":
                            if (vdata[1] == undefined) {
                                vdata[1] = {
                                    "reorder": 2,
                                    "type": 2,
                                    "url": url
                                }
                            }else {
                                vdata[1].url=url;
                            }
                            break;
                        case "vimg3":
                            if (vdata[2] == undefined) {
                                vdata[2] = {
                                    "reorder": 3,
                                    "type": 2,
                                    "url": url
                                }
                            }else {
                                vdata[2].url=url;
                            }
                            break;
                        case "vimg4":
                            if (vdata[3] == undefined) {
                                vdata[3] = {
                                    "reorder": 4,
                                    "type": 2,
                                    "url": url
                                }
                            }else {
                                vdata[3].url=url;
                            }
                            break;
                        case "vimg5":
                            if (vdata[4] == undefined) {
                                vdata[4] = {
                                    "reorder": 5,
                                    "type": 2,
                                    "url": url
                                }
                            }else {
                                vdata[4].url=url;
                            }
                            break;

                    }


                }

            }
        }
    };
}

var params = {
    "apiName": "Banner_QueryAll_Api"
};
var xmlhttp = post(params);

xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var json = JSON.parse(xmlhttp.responseText);


        if (json.code == 0) {

            bdata = json.data;

            for (var i = 0; i < json.data.length; i++) {

                var reorder = json.data[i].reorder;


                if (reorder == 1) {
                    document.getElementById("bimg1").src = json.data[i].url;
                    data = json.data[0];
                }

                if (reorder == 2) {
                    document.getElementById("bimg2").src = json.data[i].url;
                    data = json.data[1];
                }

                if (reorder == 3) {
                    document.getElementById("bimg3").src = json.data[i].url;
                    data = json.data[2];
                }

                if (reorder == 4) {
                    document.getElementById("bimg4").src = json.data[i].url;
                    data = json.data[3];
                }

                if (reorder == 5) {
                    document.getElementById("bimg5").src = json.data[i].url;
                    data = json.data[4];
                }

            }

        }


    }
};
var vparams = {
    "apiName": "ChoiceBanner_QueryAll_Api"
};
var vxmlhttp = post(vparams);

vxmlhttp.onreadystatechange = function () {
    console.log(vxmlhttp.responseText);
    if (vxmlhttp.readyState == 4 && vxmlhttp.status == 200) {
        var json = JSON.parse(vxmlhttp.responseText);


        if (json.code == 0) {

            vdata = json.data;

            for (var i = 0; i < json.data.length; i++) {

                var reorder = json.data[i].reorder;


                if (reorder == 1) {
                    document.getElementById("vimg1").src = json.data[i].url;
                    data = json.data[0];
                }

                if (reorder == 2) {
                    document.getElementById("vimg2").src = json.data[i].url;
                    data = json.data[1];
                }

                if (reorder == 3) {
                    document.getElementById("vimg3").src = json.data[i].url;
                    data = json.data[2];
                }

                if (reorder == 4) {
                    document.getElementById("vimg4").src = json.data[i].url;
                    data = json.data[3];
                }

                if (reorder == 5) {
                    document.getElementById("vimg5").src = json.data[i].url;
                    data = json.data[4];
                }

            }

        }


    }
};

document.getElementById("save").onclick = function () {
alert(bdata[3].url)
    var params = {
        "apiName": "Banner_UpdateAll_Api",
        "banners": bdata
    };
    var xmlhttp = post(params);


    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);


            if (json.code == 0) {


            }


        }
    };


    var vparams = {
        "apiName": "ChoiceBanner_UpdateAll_Api",
        "banners": vdata
    };
    var vxmlhttp = post(vparams);


    vxmlhttp.onreadystatechange = function () {
        console.log(vxmlhttp.responseText);
        if (vxmlhttp.readyState == 4 && vxmlhttp.status == 200) {
            var json = JSON.parse(vxmlhttp.responseText);


            if (json.code == 0) {

                feedback("save", "上传成功");
            }


        }
    };
}