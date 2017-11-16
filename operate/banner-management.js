/**
 * Created by besthyhy on 17-11-16.
 */
document.getElementById("save").onclick=function () {
    console.log(document.getElementById("position1").value)
    var banners=[];
    banners[0]=document.getElementById("position1").value;
    banners[1]=document.getElementById("position2").value;
    banners[2]=document.getElementById("position3").value;
    // banners[3]=document.getElementById("position4").value;
    // banners[4]=document.getElementById("position5").value;


    var params = {
        "apiName": "Banner_UpdateAll_Api",
        "banners":banners
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json=JSON.parse(xmlhttp.responseText);


            if (json.code==0){


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
        var json=JSON.parse(xmlhttp.responseText);


        if (json.code==0){
            for(var i=0;i<json.data.length;i++){

                document.getElementById("position1").value=json.data[0].url;
                document.getElementById("position2").value=json.data[1].url;
                document.getElementById("position3").value=json.data[2].url;
                document.getElementById("position4").value=json.data[3].url;
                document.getElementById("position5").value=json.data[4].url;
            }

        }




    }
};