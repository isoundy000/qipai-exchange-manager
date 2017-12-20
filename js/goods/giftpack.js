requestOnePage(pageIndex, 8);
function requestOnePage(index, size) {
    var params = {
        "apiName": "GiftPack_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        //console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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


                var imgBox = appendTdAndData(tr, "");
                var img = document.createElement("img");
                img.setAttribute("src", json.data[i].coverImgUrl);


                img.style.width = "50px"
                img.style.height = "50px"

                imgBox.appendChild(img);


                appendTdAndData(tr, json.data[i].name);
                appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));
                appendTdAndData(tr, json.data[i].price);

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
                    // console.log(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '部门权限设置'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $("#modal-detail")
                    });

                    showDetail();
                }
                edit.onclick = function () {
                    //alert(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '部门编辑'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $("#modal-update")
                    });

                    showDetailBeforeUpdate();
                }
                del.onclick = function () {
                    //alert(this.getAttribute("data-opeate"));
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


document.getElementById("modal-del-ok").onclick = function () {


    var params = {
        "apiName": "GiftPack_Delete_Api",
        "giftPackId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        //console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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

document.getElementById("add-giftPack").onclick = function () {
    layer.open({
        type: 1
        , area: ['800px', '600px']
        , title: '添加礼包'
        , shade: 0.6
        , maxmin: false
        , anim: 1
        , content: $("#modal-add")
    });

    showGoodSelectListForAdd();

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

                pictures[0] = json.data.url;


                feedback("add-upload-button", "上传成功");


            }

        }
    }


};

var addSelect0 = document.getElementById("add-select0");
var addSelect1 = document.getElementById("add-select1");
var addSelect2 = document.getElementById("add-select2");
var addSelect3 = document.getElementById("add-select3");
var addSelect4 = document.getElementById("add-select4");
var addSelect5 = document.getElementById("add-select5");

function showGoodSelectListForAdd() {
    var params = {
        "apiName": "Goods_QueryList_Api"
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        //console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                addSelect0.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                addSelect1.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                addSelect2.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                addSelect3.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                addSelect4.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                addSelect5.appendChild(option);


                for (var i in json.data) {

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    addSelect0.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    addSelect1.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    addSelect2.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    addSelect3.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    addSelect4.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    addSelect5.appendChild(option);
                }


            }

        }
    }
}

document.getElementById("add-save").onclick = function () {
    var content = [];
    if (addSelect0.selectedIndex != 0) {
        content[0] = {
            "goodsId": addSelect0.value,
            "goodsPrice": addSelect0.options[addSelect0.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": addSelect0.options[addSelect0.selectedIndex].getAttribute("data-goodsName")
        }
    }

    if (addSelect1.selectedIndex != 0) {
        content[1] = {
            "goodsId": addSelect1.value,
            "goodsPrice": addSelect1.options[addSelect1.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": addSelect1.options[addSelect1.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (addSelect2.selectedIndex != 0) {
        content[2] = {
            "goodsId": addSelect2.value,
            "goodsPrice": addSelect2.options[addSelect2.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": addSelect2.options[addSelect2.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (addSelect3.selectedIndex != 0) {
        content[3] = {
            "goodsId": addSelect3.value,
            "goodsPrice": addSelect3.options[addSelect3.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": addSelect3.options[addSelect3.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (addSelect4.selectedIndex != 0) {
        content[4] = {
            "goodsId": addSelect4.value,
            "goodsPrice": addSelect4.options[addSelect4.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": addSelect4.options[addSelect4.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (addSelect5.selectedIndex != 0) {
        content[5] = {
            "goodsId": addSelect5.value,
            "goodsPrice": addSelect5.options[addSelect5.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": addSelect5.options[addSelect5.selectedIndex].getAttribute("data-goodsName")
        }
    }

    var params = {
        "apiName": "ImageText_Add_Api",
        "name": document.getElementById("add-name").value,
        "price": document.getElementById("add-price").value,
        "coverImgUrl": pictures[0],
        "content": JSON.stringify(content)
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            feedback("add-save", "保存成功");


            window.setTimeout(function () {
                // window.location.reload();
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);
            }, 2000);

        }
    };
}


function showDetail() {
    var params = {
        "apiName": "GiftPack_QueryDetail_Api",
        "giftPackId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                document.getElementById("detail-name").value = json.data.name;
                document.getElementById("detail-price").value = json.data.price;

                var content = JSON.parse(json.data.content);

                if (content.length > 0) {
                    document.getElementById("detail-good1").value = content[0].goodsName;
                }

                if (content.length > 1) {
                    document.getElementById("detail-good2").value = content[1].goodsName;
                }

                if (content.length > 2) {
                    document.getElementById("detail-good3").value = content[2].goodsName;
                }

                if (content.length > 3) {
                    document.getElementById("detail-good4").value = content[3].goodsName;
                }

                if (content.length > 4) {
                    document.getElementById("detail-good5").value = content[4].goodsName;
                }

                if (content.length > 5) {
                    document.getElementById("detail-good6").value = content[5].goodsName;
                }


            }
        }
    }
}

function showDetailBeforeUpdate() {
    var params = {
        "apiName": "GiftPack_QueryDetail_Api",
        "giftPackId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                document.getElementById("update-name").value = json.data.name;
                document.getElementById("update-price").value = json.data.price;
                document.getElementById("update-img").src = json.data.coverImgUrl;

                var content = JSON.parse(json.data.content);

                showGoodSelectListForUpdate(content);
            }
        }
    }
}

var updateSelect0 = document.getElementById("update-select0");
var updateSelect1 = document.getElementById("update-select1");
var updateSelect2 = document.getElementById("update-select2");
var updateSelect3 = document.getElementById("update-select3");
var updateSelect4 = document.getElementById("update-select4");
var updateSelect5 = document.getElementById("update-select5");

function showGoodSelectListForUpdate(content) {
    var params = {
        "apiName": "Goods_QueryList_Api"
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        //console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                updateSelect0.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                updateSelect1.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                updateSelect2.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                updateSelect3.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                updateSelect4.appendChild(option);

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "请选择商品";
                updateSelect5.appendChild(option);


                for (var i in json.data) {

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    updateSelect0.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    updateSelect1.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    updateSelect2.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    updateSelect3.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    updateSelect4.appendChild(option);

                    var option = document.createElement("option");
                    option.value = json.data[i].id;
                    option.setAttribute("data-goodsName", json.data[i].name);
                    option.setAttribute("data-goodsPrice", json.data[i].price);
                    option.innerHTML = json.data[i].name;
                    updateSelect5.appendChild(option);
                }


                if (content.length > 0) {
                    document.getElementById("update-select0").value = content[0].goodsId;
                }

                if (content.length > 1) {
                    document.getElementById("update-select1").value = content[1].goodsId;
                }

                if (content.length > 2) {
                    document.getElementById("update-select2").value = content[2].goodsId;
                }

                if (content.length > 3) {
                    document.getElementById("update-select3").value = content[3].goodsId;
                }

                if (content.length > 4) {
                    document.getElementById("update-select4").value = content[4].goodsId;
                }

                if (content.length > 5) {
                    document.getElementById("update-select5").value = content[5].goodsId;
                }

            }

        }
    }
}

addUploadFunctionToImg("update-img");

document.getElementById("update-upload-button").onclick = function () {
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

                pictures[0] = json.data.url;


                feedback("update-upload-button", "上传成功");


            }

        }
    }


};

document.getElementById("update-save").onclick = function () {
    var content = [];
    if (updateSelect0.selectedIndex != 0) {
        content[0] = {
            "goodsId": updateSelect0.value,
            "goodsPrice": updateSelect0.options[updateSelect0.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": updateSelect0.options[updateSelect0.selectedIndex].getAttribute("data-goodsName")
        }
    }

    if (updateSelect1.selectedIndex != 0) {
        content[1] = {
            "goodsId": updateSelect1.value,
            "goodsPrice": updateSelect1.options[updateSelect1.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": updateSelect1.options[updateSelect1.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (updateSelect2.selectedIndex != 0) {
        content[2] = {
            "goodsId": updateSelect2.value,
            "goodsPrice": updateSelect2.options[updateSelect2.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": updateSelect2.options[updateSelect2.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (updateSelect3.selectedIndex != 0) {
        content[3] = {
            "goodsId":updateSelect3.value,
            "goodsPrice": updateSelect3.options[updateSelect3.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": updateSelect3.options[updateSelect3.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (updateSelect4.selectedIndex != 0) {
        content[4] = {
            "goodsId": updateSelect4.value,
            "goodsPrice": updateSelect4.options[updateSelect4.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": updateSelect4.options[updateSelect4.selectedIndex].getAttribute("data-goodsName")
        }
    }
    if (updateSelect5.selectedIndex != 0) {
        content[5] = {
            "goodsId": updateSelect5.value,
            "goodsPrice": updateSelect5.options[updateSelect5.selectedIndex].getAttribute("data-goodsPrice"),
            "goodsName": updateSelect5.options[updateSelect5.selectedIndex].getAttribute("data-goodsName")
        }
    }

    var params = {
        "apiName": "GiftPack_Update_Api",
        "giftPackId": operateId,
        "name": document.getElementById("add-name").value,
        "price": Number(document.getElementById("add-price").value),
        "coverImgUrl": pictures[0],
        "content": JSON.stringify(content)
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            feedback("update-save", "保存成功");


            window.setTimeout(function () {
                // window.location.reload();
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);
            }, 2000);

        }
    };
}