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
            //console.log(xmlhttp.responseText);
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
                        , area: ['800px', '600px']
                        , title: '编辑房卡'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $("#modal-update")
                    });

                    showDetailBeforeUpdate();
                }
                del.onclick = function () {
                    operateId = this.getAttribute("data-opeate");
                    var dialogDel = document.getElementById("modal-del");
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


document.getElementById("add-room-card").onclick = function () {
    layer.open({
        type: 1
        , area: ['800px', '600px']
        , title: '房卡添加'
        , shade: 0.6
        , maxmin: false
        , anim: 1
        , content: $(".modal-add")
    });
}

addUploadFunctionToImg("add-img");

var pictures = [];

document.getElementById("add-upload-button").onclick = function () {
    var file1 = document.getElementById("add-img-file").files[0];
    var formData = new FormData();
    formData.append("file1", file1);

    var xmlhttp = upload(formData);


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);

            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                uploaded = 1;
                for (var i = 0; i < json.data.length; i++) {
                    // console.log(json.data[0].url);
                    pictures[i] = json.data[i].url;
                    // console.log("fsfs"+pictures.toString())
                    //alert(pictures[0])
                }

                feedback("add-upload-button","上传成功");


            }

        }
    }


};
document.getElementById("add").onclick = function () {
    var name1 = document.getElementById("add-name");
    var price = document.getElementById("add-price");
    var goldCoin = document.getElementById("add-gold-coin");


    var params = {
        "apiName": "RoomCard_Add_Api",
        "name": name1.value,
        "price": Number(price.value),
        "goldCoin": Number(goldCoin.value),
        "coverImgUrl": pictures[0]
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            var span = document.createElement("span");
            span.innerHTML = "添加成功";
            after(span, document.getElementById("add"));



            window.setTimeout(function () {
                span.style.display = "none";
                window.location.reload();
            }, 1000);

        }
    };
}


document.getElementById("modal-del-ok").onclick = function () {


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

                var dialogDel = document.getElementById("modal-del");
                dialogDel.style.display = "none";
            }


        }
    }
}
document.getElementById("modal-del-cancel").onclick = function () {
    var dialogDel = document.getElementById("modal-del");
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

// document.getElementById("update").onclick = function () {
//     var params = {
//         "apiName": "RoomCard_Update_Api",
//         "roomCardId": operateId,
//         "name": name1.value,
//         "price": Number(price.value),
//         "goldCoin": Number(goldCoin.value)
//     }
//     var xmlhttp = post(params);
//
//     xmlhttp.onreadystatechange = function () {
//         console.log(xmlhttp.responseText);
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             console.log(xmlhttp.responseText);
//             var json = JSON.parse(xmlhttp.responseText);
//
//             if (json.code == 0) {
//
//                 layer.closeAll();
//                 clearTable();
//                 requestOnePage(pageIndex, 8);
//
//             }
//
//
//         }
//     }
// }
