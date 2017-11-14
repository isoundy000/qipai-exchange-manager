var categoryName = document.getElementById("category-name");
var categoryReorder = document.getElementById("category-reorder");

var add = document.getElementById("add");
add.onclick = function () {
    var params = {
        "apiName": "GoodsCategory_Add_Api",
        "name": categoryName.innerHTML,
        "reorder": Number(categoryReorder.innerHTML)
    };
    var xmlhttp = post(params);
    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);


        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json=JSON.parse(xmlhttp.responseText);
            if (json.code==0){
                var addFeedback = document.getElementById("add-feedback");
                addFeedback.style.display="block";
                addFeedback.innerHTML="添加成功";


                window.setTimeout(function () {
                    addFeedback.style.display="none";
                    window.location.reload();
                },1000);

            }
        }

    }
};


var params = {
    "apiName": "GoodsCategory_QueryAll_Api"
}
var xmlhttp = post(params);

xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var json=JSON.parse(xmlhttp.responseText);

        if (json.code==0){
            var tbody = document.getElementById("tbody");

            for(var i=0;i<json.data.length;i++){
                var tr=appendTr(tbody);
                appendTdAndData(tr,json.data[i].id);
                appendTdAndData(tr,json.data[i].name);
                appendTdAndData(tr,new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));
                appendTdAndData(tr,(json.data[i].reorder)==undefined?"":(json.data[i].reorder));



            }
        }




    }
}




function appendTr(tbody) {
    var tr = document.createElement("tr");
    tbody.appendChild(tr);
    return tr;
}
function appendTd(tr) {
    var td = document.createElement("td");
    tr.appendChild(td);
    return td;
}
function appendTdAndData(tr,data) {
    var td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML=data;
    return td;
}