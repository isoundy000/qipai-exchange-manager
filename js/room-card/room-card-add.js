var name1 = document.getElementById("name");
var price = document.getElementById("price");
var goldCoin = document.getElementById("goldCoin");
var add = document.getElementById("add");




add.onclick=function () {

    var params = {
        "apiName": "RoomCard_Add_Api",
        "name": name1.value,
        "price": Number(price.value),
        "goldCoin": Number(goldCoin.value)
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);


            var addFeedback = document.getElementById("add-feedback");
            addFeedback.style.display = "block";
            addFeedback.innerHTML = "添加成功";


            window.setTimeout(function () {
                addFeedback.style.display = "none";
                window.location.reload();
            }, 1000);

        }
    };
}