
var xmlhttp=new XMLHttpRequest();
xmlhttp.open("POST","http://47.104.17.187:8081/qipai-exchange-manager-api",true);
xmlhttp.setRequestHeader("Content-type","application/json");
var params="apiName=Goods_QueryList_Api&"+
    "pageIndex=0&"+
    "pageSize=10";
xmlhttp.send(params);

xmlhttp.onreadystatechange=function(){
    console.log(xmlhttp.responseText);
};


var per = [
    {id: 001, name: '张珊', job: '学生'},
    {id: 002, name: '李斯', job: '教师'},
    {id: 003, name: '王武', job: '经理'}
];

window.onload = function () {
    var tbody = document.getElementById('tbMain');
    for (var i = 0; i < per.length; i++) {
        var row = document.createElement('tr');
        var idCell = document.createElement('td');
        idCell.innerHTML = per[i].id;
        row.appendChild(idCell)

        tbody.appendChild(row)

    }
}