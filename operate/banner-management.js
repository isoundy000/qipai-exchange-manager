var data = [];


document.getElementById("save").onclick = function () {
    console.log(document.getElementById("position1").value)
    var banners = [];

    if (data.length >= 1) {
        var position1 = document.getElementById("position1");
        var banner1 = {
            "id": data[0].id,
            "reorder": data[0].reorder,
            "url": position1.value

        };
        banners[0] = banner1;
    }


    if (data.length >= 2) {
        var position2 = document.getElementById("position2");
        var banner2 = {
            "id": data[1].id,
            "reorder": data[1].reorder,
            "url": position2.value

        };
        banners[1] = banner2;
    }


    if (data.length >= 3) {
        var position3 = document.getElementById("position3");
        var banner3 = {
            "id": data[2].id,
            "reorder": data[2].reorder,
            "url": position3.value

        };
        banners[2] = banner3;
    }


    if (data.length >= 4) {
        var position4 = document.getElementById("position4");
        var banner4 = {
            "id": data[3].id,
            "reorder": data[3].reorder,
            "url": position4.value

        };
        banners[3] = banner4;
    }


    if (data.length >= 5) {
        var position5 = document.getElementById("position5");
        var banner5 = {
            "id": data[4].id,
            "reorder": data[4].reorder,
            "url": position5.value

        };
        banners[4] = banner5;
    }

    // console.log(banners);

    var params = {
        "apiName": "Banner_UpdateAll_Api",
        "banners": banners
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
}

//

var params = {
    "apiName": "Banner_QueryAll_Api"
};
var xmlhttp = post(params);

xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var json = JSON.parse(xmlhttp.responseText);


        if (json.code == 0) {

            // data = json.data;

            for (var i = 0; i < json.data.length; i++) {

                var reorder = json.data[i].reorder;


                if (reorder == 1) {
                    document.getElementById("position1").value = json.data[i].url;
                    data=json.data[0];
                }

                if (reorder == 2) {
                    document.getElementById("position2").value = json.data[i].url;
                    data=json.data[1];
                }

                if (reorder == 3) {
                    document.getElementById("position3").value = json.data[i].url;
                    data=json.data[2];
                }

                if (reorder == 4) {
                    document.getElementById("position4").value = json.data[i].url;
                    data=json.data[3];
                }

                if (reorder == 5) {
                    document.getElementById("position5").value = json.data[i].url;
                    data=json.data[4];
                }

            }

        }


    }
};