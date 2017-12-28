
requestOnePage(pageIndex, 8);

function requestOnePage(index, size) {
    var params = {
        "apiName": "RoomCard_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
    post(params, function (json) {
        // console.log(JSON.stringify(json))
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


            // appendTdAndData(tr, i+1);


            var imgBox = appendTdAndData(tr, "");
            var img = document.createElement("img");
            img.setAttribute("src", json.data[i].coverImgUrl);
            img.style.width = "50px"
            img.style.height = "50px"
            imgBox.appendChild(img);

            appendTdAndData(tr, json.data[i].name);
            appendTdAndData(tr, json.data[i].price);
            appendTdAndData(tr, json.data[i].goldCoin);
            // appendTdAndData(tr, json.data[i].salesVolume);
            // appendTdAndData(tr, (json.data[i].enable) == 1 ? "启用" : "禁用");
            var cell = appendTd(tr);
            var show = document.createElement("a");
            var edit = document.createElement("a");
            edit.style.margin = "8px";
            var del = document.createElement("a");

            show.setAttribute("href", "javascript:void(0)");
            edit.setAttribute("href", "javascript:void(0)");
            del.setAttribute("href", "javascript:void(0)");


            show.innerHTML = "查看";
            edit.innerHTML = "编辑";
            del.innerHTML = "删除";
            cell.appendChild(show);
            cell.appendChild(edit);
            cell.appendChild(del);

            show.setAttribute("data-opeate", json.data[i].id);
            edit.setAttribute("data-opeate", json.data[i].id);
            del.setAttribute("data-opeate", json.data[i].id);

            show.onclick = function () {
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '房卡详情'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-detail")
                });

                showDetail();
            }
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
    });
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
        , content: $("#modal-add")
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

                pictures[0] = json.data[0].url;


                feedback("add-upload-button", "上传成功");


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
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("add", "添加成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);
    });
}


document.getElementById("modal-del-ok").onclick = function () {


    var params = {
        "apiName": "RoomCard_Delete_Api",
        "roomCardId": operateId
    }
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        layer.closeAll();
        clearTable();
        requestOnePage(pageIndex, 8);

        var dialogDel = document.getElementById("modal-del");
        dialogDel.style.display = "none";
    });
}
document.getElementById("modal-del-cancel").onclick = function () {
    var dialogDel = document.getElementById("modal-del");
    dialogDel.style.display = "none";
}


function showDetail() {
    var params = {
        "apiName": "RoomCard_QueryDetail_Api",
        "roomCardId": operateId
    }
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        document.getElementById("detail-name").value = json.data.name;
        document.getElementById("detail-price").value = json.data.price;
        document.getElementById("detail-gold-coin").value = json.data.goldCoin;
        document.getElementById("detail-sales-volume").value = json.data.salesVolume;
        document.getElementById("detail-state").value = (json.data.enable) == 1 ? "启用" : "禁用";
        document.getElementById("detail-img").src = json.data.coverImgUrl;
    });

}


function showDetailBeforeUpdate() {
    var params = {
        "apiName": "RoomCard_QueryDetail_Api",
        "roomCardId": operateId
    }
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        pictures[0] = json.data.coverImgUrl;


        document.getElementById("update-name").value = json.data.name;
        document.getElementById("update-price").value = json.data.price;
        document.getElementById("update-gold-coin").value = json.data.goldCoin;
        // document.getElementById("detail-sales-volume").value=json.data.salesVolume;
        // document.getElementById("detail-state").value=(json.data.enable)==1?"启用":"禁用";
        document.getElementById("update-img").src = json.data.coverImgUrl;
    });
}

addUploadFunctionToImg("update-img");

document.getElementById("update-upload-button").onclick = function () {
    var file1 = document.getElementById("update-img-file").files[0];
    var formData = new FormData();
    formData.append("file1", file1);

    var xmlhttp = upload(formData);


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);

            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                uploaded = 1;
                pictures[0] = json.data[0].url;

                feedback("update-upload-button", "上传成功");


            }

        }
    }


};

document.getElementById("update").onclick = function () {
    var name1 = document.getElementById("update-name");
    var price = document.getElementById("update-price");
    var goldCoin = document.getElementById("update-gold-coin");


    var params = {
        "apiName": "RoomCard_Update_Api",
        "roomCardId": operateId,
        "name": name1.value,
        "price": Number(price.value),
        "goldCoin": Number(goldCoin.value),
        "coverImgUrl": pictures[0]
    };
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("update", "保存成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);
    });
}
