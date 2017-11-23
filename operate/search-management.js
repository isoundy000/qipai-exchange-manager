var hotWords = document.getElementById("hot-words");
var save = document.getElementById("save");


var params = {
    "apiName": "Goods_QueryAllHotWords_Api"
};
var xmlhttp = post(params);

xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var json = JSON.parse(xmlhttp.responseText);

        if (json.code==0){
            var str=json.data[0];

            for (var i=1;i<json.data.length;i++){
                str=str+";"+json.data[i];
            }

            hotWords.value=str;
        }


    }
};

save.onclick=function () {
    var str=hotWords.value.toString().split(";");


    var params = {
        "apiName": "Goods_UpdateAllHotWords_Api",
        "hotWords":str
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code==0){
                var addFeedback = document.getElementById("add-feedback");
                addFeedback.style.display = "block";
                addFeedback.innerHTML = "添加成功";


                window.setTimeout(function () {
                    addFeedback.style.display = "none";
                    window.location.reload();
                }, 1000);
            }


        }
    };
}