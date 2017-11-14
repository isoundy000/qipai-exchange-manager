var addGood = document.getElementById("add-good");
addGood.onclick = function () {
    window.parent.window.document.getElementById("nav-main-item2").click();
    window.parent.window.document.getElementById("nav-sub-item1").click();
};


var table = document.getElementById("table");
console.log(window.getComputedStyle(table, null).width);
var theadCells = document.getElementById("thead-tr").getElementsByTagName("th");
// var tbodyCells = document.getElementById("tbody-tr").getElementsByTagName("td");

var width = extractPxValueNumber(window.getComputedStyle(table, null).width);
for (var i = 0; i < theadCells.length; i++) {


    console.log(width);
    theadCells[i].style.width = width / 11 + "px";
    //tbodyCells[i].style.width = width / 9 + "px";
    //theadCells[i].style.width="160px";
}


window.onresize = function () {
    var table = document.getElementById("table");
    console.log(window.getComputedStyle(table, null).width);
}

var isFirstPage = 1;
var isLastPage = 0;
var pageIndex = 0;
var pageSize = 2;
var totalPages = -1;
var totalRecords = -1;

requestOnePage(pageIndex, 2);

// tbody.removeChild();
// requestOnePage(0,2);
// requestOnePage(1,2);
// requestOnePage(2,2);


function requestOnePage(index, size) {
    var params = {
        "apiName": "Goods_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
            console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            var tbody = document.getElementById("tbody");
            for (var i = 0; i < json.data.length; i++) {

                var tr = appendTr(tbody);
                appendTdAndData(tr, json.data[i].id);
                appendTdAndData(tr, "-- --");
                appendTdAndData(tr, json.data[i].name);
                appendTdAndData(tr, json.data[i].price);
                appendTdAndData(tr, json.data[i].vipPrice);
                appendTdAndData(tr, json.data[i].goldVipPrice);
                appendTdAndData(tr, "-- --");
                appendTdAndData(tr, json.data[i].stock);
                appendTdAndData(tr, "-- --");
                appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd"));
                var cell = appendTd(tr);
                var show = document.createElement("span");
                var edit = document.createElement("span");
                var del = document.createElement("span");

                show.innerHTML = "查看";
                edit.innerHTML = "编辑";
                del.innerHTML = "删除";
                cell.appendChild(show);
                cell.appendChild(edit);
                cell.appendChild(del);


            }

            isFirstPage = json.pager.isFirstPage;
            isLastPage = json.pager.isLastPage;
            pageIndex = json.pager.pageIndex;
            pageSize = json.pager.pageSize;
            totalPages = json.pager.totalPages;
            totalRecords = json.pager.totalRecords;


        }
    }
}

function clearTable() {
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
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
function appendTdAndData(tr, data) {
    var td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = data;
    return td;
}

document.getElementById("previous").onkeydown = function () {

    if (isFirstPage != 1) {
        clearTable();
        requestOnePage(pageIndex-1,pageSize);
    }

};

document.getElementById("next").onclick = function () {

    if (isLastPage != 1) {
        clearTable();
        requestOnePage(pageIndex+1,pageSize);
    }

};

document.getElementById("goto-page").onkeydown = function (e) {
    if (e.which == 13) {
        alert(this.value);
    }
    // if (this.text != 1) {
    //     clearTable();
    //     requestOnePage(pageIndex+1,pageSize);
    // }

};