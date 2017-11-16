document.getElementById("upload-img1").onclick = function () {
    document.getElementById("upload1").click();

};

document.getElementById("upload-img2").onclick = function () {
    document.getElementById("upload2").click();

};
document.getElementById("upload-img3").onclick = function () {
    document.getElementById("upload3").click();

};
document.getElementById("upload-img4").onclick = function () {
    document.getElementById("upload4").click();

};
document.getElementById("upload-img5").onclick = function () {
    document.getElementById("upload5").click();

};

document.getElementById("upload1").onchange = function () {
    var file = document.getElementById("upload1").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("upload-img1").setAttribute("src", e.target.result);
        document.getElementById("upload-img1").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload1").onchange = function () {
    var file = document.getElementById("upload1").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("upload-img1").setAttribute("src", e.target.result);
        document.getElementById("upload-img1").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload2").onchange = function () {
    var file = document.getElementById("upload2").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("upload-img2").setAttribute("src", e.target.result);
        document.getElementById("upload-img2").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload3").onchange = function () {
    var file = document.getElementById("upload3").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("upload-img3").setAttribute("src", e.target.result);
        document.getElementById("upload-img3").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload4").onchange = function () {
    var file = document.getElementById("upload4").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("upload-img4").setAttribute("src", e.target.result);
        document.getElementById("upload-img4").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload5").onchange = function () {
    var file = document.getElementById("upload5").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("upload-img5").setAttribute("src", e.target.result);
        document.getElementById("upload-img5").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};

var uploaded = -1;
var pictures=[];

document.getElementById("upload-button").onclick = function () {
    // document.getElementById("myform").submit();
    var file1 = document.getElementById("upload1").files[0];
    var file2 = document.getElementById("upload2").files[0];
    var file3 = document.getElementById("upload3").files[0];
    var file4 = document.getElementById("upload4").files[0];
    var file5 = document.getElementById("upload5").files[0];


    var formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("file4", file4);
    formData.append("file5", file5);
    var xmlhttp = upload(formData);


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);

            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                uploaded = 1;
                for (var i=0;i<json.data.length;i++){
                    // console.log(json.data[0].url);
                    pictures[i]=json.data[i].url;
                    // console.log("fsfs"+pictures.toString())
                }

            }

        }
    }


};

var params = {
    "apiName": "GoodsCategory_QueryAll_Api"
};
var xmlhttp = post(params);

xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var json=JSON.parse(xmlhttp.responseText);

        var select = document.getElementById("select");
        if (json.code==0){
            for(var i=0;i<json.data.length;i++){
                var option = document.createElement("option");
                option.value=json.data[i].id;
                option.innerText=json.data[i].name;
                select.appendChild(option)
            }

        }




    }
};

document.getElementById("save").onclick=function () {
    var select = document.getElementById("select");
    var name = document.getElementById("add-name");
    var price = document.getElementById("add-price");
    var vipPrice = document.getElementById("add-vip-price");
    var goldVipPrice = document.getElementById("add-gold-vip-price");
    var reorder = document.getElementById("add-reorder");
    var detail = document.getElementById("add-detail");

    if (name.value==""){
        console.log("yes");


        return;

    }

    console.log("name:"+name.value);
    console.log(detail.value);
    console.log(pictures);

    var params = {
        "apiName": "Goods_Add_Api",
        "categoryId": select.options[select.selectedIndex].value,
        "name": name.value,
        "price": price.value,
        "vipPrice": vipPrice.value,
        "goldVipPrice": goldVipPrice.value,
        "reorder": reorder.value,
        "stock": 0,
        "pictures": pictures,
        "detail": detail.value
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json=JSON.parse(xmlhttp.responseText);

            // var select = document.getElementById("select");
            // if (json.code==0){
            //     for(var i=0;i<json.data.length;i++){
            //         var option = document.createElement("option");
            //         option.value=json.data[i].id;
            //         option.innerText=json.data[i].name;
            //         select.appendChild(option)
            //     }
            //
            // }




        }
    };
};
