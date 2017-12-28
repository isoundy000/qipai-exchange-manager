var hotWords = document.getElementById("hot-words");
var save = document.getElementById("save");


var params = {
    "apiName": "Goods_QueryAllHotWords_Api"
};
post(params, function (json) {
    // console.log(JSON.stringify(json))
    var str = json.data[0];

    for (var i = 1; i < json.data.length; i++) {
        str = str + ";" + json.data[i];
    }

    hotWords.value = str;
});


save.onclick = function () {
    var str = hotWords.value.toString().split(";");


    var params = {
        "apiName": "Goods_UpdateAllHotWords_Api",
        "hotWords": str
    };
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        // var addFeedback = document.getElementById("add-feedback");
        // addFeedback.style.display = "block";
        // addFeedback.innerHTML = "添加成功";
        //
        //
        // window.setTimeout(function () {
        //     addFeedback.style.display = "none";
        //     window.location.reload();
        // }, 1000);
        feedback("save", "保存成功");
    });

}