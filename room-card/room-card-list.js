var isFirstPage = -1;
var isLastPage = -1;
var pageIndex = 0;
var pageSize = -1;
var totalPages = -1;
var totalRecords = -1;
var operateId = "";

requestOnePage(pageIndex, 8);

function requestOnePage(index, size) {
    var params = {
        "apiName": "RoomCard_QueryList_Api",
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


                if ((i % 2) != 0) {
                    tr.style.backgroundColor = "#f4f4f4";
                    tr.setAttribute("data-even-marker", "0");
                } else {
                    tr.setAttribute("data-even-marker", "1");
                }

                tr.onmouseover = function () {
                    this.style.backgroundColor = "#4FC3F7";
                };
                tr.onmouseout = function () {
                    if (this.getAttribute("data-even-marker") == "0") {
                        this.style.backgroundColor = "#f4f4f4";
                    }
                    if (this.getAttribute("data-even-marker") == "1") {
                        this.style.backgroundColor = "#ffffff";
                    }

                };


                appendTdAndData(tr, i);
                appendTdAndData(tr, json.data[i].name);
                appendTdAndData(tr, json.data[i].price);
                appendTdAndData(tr, json.data[i].goldCoin);
                appendTdAndData(tr, json.data[i].salesVolume);
                appendTdAndData(tr, json.data[i].enable);
                var cell = appendTd(tr);
                //var show = document.createElement("a");
                var edit = document.createElement("a");
                edit.style.margin = "8px";
                var del = document.createElement("a");

                //show.setAttribute("href", "javascript:void(0)");
                edit.setAttribute("href", "javascript:void(0)");
                del.setAttribute("href", "javascript:void(0)");


                //show.innerHTML = "查看";
                edit.innerHTML = "编辑";
                del.innerHTML = "删除";
                //cell.appendChild(show);
                cell.appendChild(edit);
                cell.appendChild(del);

                //show.setAttribute("data-opeate",json.data[i].id);
                edit.setAttribute("data-opeate", json.data[i].id);
                del.setAttribute("data-opeate", json.data[i].id);

                // show.onclick=function () {
                //     alert(this.getAttribute("data-opeate"));
                // }
                edit.onclick = function () {
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['600px', '300px']
                        , title: '房卡编辑'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $(".update")
                    });

                    showDetailBeforeUpdate();
                }
                del.onclick = function () {
                    operateId = this.getAttribute("data-opeate");
                    var dialogDel = document.getElementById("dialog-del");
                    dialogDel.style.display = "block";
                }

            }

            isFirstPage = json.pager.isFirstPage;
            isLastPage = json.pager.isLastPage;
            pageIndex = json.pager.pageIndex;
            pageSize = json.pager.pageSize;
            totalPages = json.pager.totalPages;
            totalRecords = json.pager.totalRecords;

            updatePageMarkers();
        }
    }
}

// 表格分页<
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
function updatePageMarkers() {
    document.getElementById("total").innerText = "总共" + totalPages + "页";

    var page0 = document.getElementById("page0");
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");
    var page4 = document.getElementById("page4");
    var page5 = document.getElementById("page5");
    var page6 = document.getElementById("page6");
    var pageDot1 = document.getElementById("page-dot1");
    var pageDot2 = document.getElementById("page-dot2");


    page1.style.display = "none";
    page2.style.display = "none";
    page3.style.display = "none";
    page4.style.display = "none";
    page5.style.display = "none";

    page1.style.backgroundColor = "#ffffff";
    page2.style.backgroundColor = "#ffffff";
    page3.style.backgroundColor = "#ffffff";
    page4.style.backgroundColor = "#ffffff";
    page5.style.backgroundColor = "#ffffff";


    if (totalPages <= 5) {
        switch (totalPages) {
            case 1:
                page1.style.display = "flex";
                page1.innerText = 1;
                break;
            case 2:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                break;
            case 3:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                page3.style.display = "flex";
                page3.innerText = 3;
                break;
            case 4:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                page3.style.display = "flex";
                page3.innerText = 3;
                page4.style.display = "flex";
                page4.innerText = 4;

                break;
            case 5:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                page3.style.display = "flex";
                page3.innerText = 3;
                page4.style.display = "flex";
                page4.innerText = 4;
                page5.style.display = "flex";
                page5.innerText = 5;
                break;

        }


        switch (pageIndex) {
            case 0:
                page1.style.backgroundColor = "#8CD7DC";
                break
            case 1:
                page2.style.backgroundColor = "#8CD7DC";
                break
            case 2:
                page3.style.backgroundColor = "#8CD7DC";
                break
            case 3:
                page4.style.backgroundColor = "#8CD7DC";
                break
            case 4:
                page5.style.backgroundColor = "#8CD7DC";
                break
            case 5:

                break
        }
    }

    if (totalPages > 5) {

        page1.style.display = "flex";
        page2.style.display = "flex";
        page3.style.display = "flex";
        page4.style.display = "flex";
        page5.style.display = "flex";

        var currentPage = pageIndex;

        if (pageIndex <= 2) {
            page1.innerText = 1;
            page2.innerText = 2;
            page3.innerText = 3;
            page4.innerText = 4;
            page5.innerText = 5;

            switch (pageIndex) {
                case 0:
                    page1.style.backgroundColor = "#8CD7DC";
                    break;
                case 1:
                    page2.style.backgroundColor = "#8CD7DC";
                    break;
                case 2:
                    page3.style.backgroundColor = "#8CD7DC";
                    break
            }
        }
        if (pageIndex >= totalPages - 3) {
            page1.innerText = totalPages - 4;
            page2.innerText = totalPages - 3;
            page3.innerText = totalPages - 2;
            page4.innerText = totalPages - 1;
            page5.innerText = totalPages;

            switch (pageIndex) {
                case totalPages - 1:
                    page5.style.backgroundColor = "#8CD7DC";
                    break;
                case totalPages - 2:
                    page4.style.backgroundColor = "#8CD7DC";
                    break;
                case totalPages - 3:
                    page3.style.backgroundColor = "#8CD7DC";
                    break
            }


        }

        if (pageIndex > 2 && pageIndex < totalPages - 3) {

            page1.innerText = pageIndex - 1;
            page2.innerText = pageIndex;
            page3.innerText = pageIndex + 1;
            page4.innerText = pageIndex + 2;
            page5.innerText = pageIndex + 3;

            page3.style.backgroundColor = "#8CD7DC";

        }
    }


}

document.getElementById("previous").onclick = function () {

    if (isFirstPage != 1) {
        clearTable();
        requestOnePage(pageIndex - 1, pageSize);
    }

};

document.getElementById("next").onclick = function () {

    if (isLastPage != 1) {
        clearTable();
        requestOnePage(pageIndex + 1, pageSize);
    }

};
document.getElementById("first").onclick = function () {

    clearTable();
    requestOnePage(0, pageSize);


};
document.getElementById("end").onclick = function () {
    clearTable();
    requestOnePage(totalPages - 1, pageSize);


};

document.getElementById("goto-page").onkeydown = function (e) {
    if (e.which == 13) {
        console.log(this.value);
        console.log(Number(this.value));
        if (this.value >= 1 && this.value <= totalPages) {
            clearTable();
            requestOnePage(this.value - 1, pageSize);
        } else {
            alert("请输入有效的页码");
        }

    }


};

document.getElementById("page1").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page2").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page3").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page4").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page5").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
// 表格分页>


document.getElementById("dialog-del-ok").onclick = function () {


    var params = {
        "apiName": "RoomCard_Delete_Api",
        "roomCardId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);

                var dialogDel = document.getElementById("dialog-del");
                dialogDel.style.display = "none";
            }


        }
    }
}
document.getElementById("dialog-del-cancel").onclick = function () {
    var dialogDel = document.getElementById("dialog-del");
    dialogDel.style.display = "none";
}

function showDetailBeforeUpdate() {
    // var params = {
    //     "apiName": "Goods_QueryDetail_Api",
    //     "goodsId": operateId
    // }
    // var xmlhttp = post(params);
    //
    // xmlhttp.onreadystatechange = function () {
    //     console.log(xmlhttp.responseText);
    //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //         console.log(xmlhttp.responseText);
    //         var json = JSON.parse(xmlhttp.responseText);
    //
    //         if (json.code == 0) {
    //
    //         }
    //
    //
    //     }
    // }
}

document.getElementById("save").onclick = function () {
    var params = {
        "apiName": "RoomCard_Update_Api",
        "roomCardId": operateId,
        "name": name1.value,
        "price": Number(price.value),
        "goldCoin": Number(goldCoin.value)
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {

                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);

            }


        }
    }
}
