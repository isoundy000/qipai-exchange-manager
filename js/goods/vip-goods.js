var searchKeyword;
var searchBeginTimestamp;
var searchEndTimestamp;
var searchMinStock;
var searchMaxStock;


function getParamsForSearch() {
    searchKeyword = document.getElementById("searchKeyword").value;
    searchBeginTimestamp = new Date(document.getElementById("searchBeginTimestamp").value).getTime();
    searchEndTimestamp = new Date(document.getElementById("searchEndTimestamp").value).getTime();
    searchMinStock = document.getElementById("searchMinStock").value;
    searchMaxStock = document.getElementById("searchMaxStock").value;
}

document.getElementById("search").onclick = function () {
    clearTable();
    requestOnePage(pageIndex, 8);
};


var table = document.getElementById("table");
console.log(window.getComputedStyle(table, null).width);
var theadCells = document.getElementById("thead-tr").getElementsByTagName("th");


requestOnePage(pageIndex, 8);


function requestOnePage(index, size) {
    var params = {
        "apiName": "Goods_QueryList_Api",
        "type": 2,
        "pageIndex": index,
        "pageSize": size
    }


    getParamsForSearch();

    params["searchKeyword"] = searchKeyword;
    if (!isNaN(searchBeginTimestamp)) {
        params["searchBeginTimestamp"] = searchBeginTimestamp;
    }
    if (!isNaN(searchEndTimestamp)) {
        params["searchEndTimestamp"] = searchEndTimestamp;
    }
    params["searchMinStock"] = searchMinStock;
    params["searchMaxStock"] = searchMaxStock;


    var xmlhttp = post(params, function (json) {
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


            var imgBox = appendTdAndData(tr, "");
            var img = document.createElement("img");

            // console.log(json.data[i].pictures);
            if (json.data[i].pictures.length > 0) {
                img.src = JSON.parse(json.data[i].pictures)[0];
            }


            img.style.width = "50px"
            img.style.height = "50px"

            imgBox.appendChild(img);

            appendTdAndData(tr, json.data[i].name);
            appendTdAndData(tr, json.data[i].price);
            appendTdAndData(tr, json.data[i].reorder);
            appendTdAndData(tr, json.data[i].stock);
            appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd"));
            var cell = appendTd(tr);
            var show = document.createElement("a");
            var edit = document.createElement("a");
            edit.style.margin = "8px";
            var del = document.createElement("a");
            // var prefer = document.createElement("a");
            // prefer.style.margin = "8px";
            var stock = document.createElement("a");
            stock.style.margin = "8px";
            var richText = document.createElement("a");

            show.setAttribute("href", "javascript:void(0)");
            edit.setAttribute("href", "javascript:void(0)");
            del.setAttribute("href", "javascript:void(0)");
            // prefer.setAttribute("href", "javascript:void(0)");
            stock.setAttribute("href", "javascript:void(0)");
            richText.setAttribute("href", "javascript:void(0)");


            show.innerHTML = "查看";
            edit.innerHTML = "编辑";
            del.innerHTML = "删除";
            // prefer.innerHTML = "优选";
            stock.innerHTML = "新增库存";
            richText.innerHTML = "富文本设置";
            cell.appendChild(show);
            cell.appendChild(edit);
            cell.appendChild(del);
            // cell.appendChild(prefer);
            cell.appendChild(stock);
            cell.appendChild(richText);

            show.setAttribute("data-opeate", json.data[i].id);
            edit.setAttribute("data-opeate", json.data[i].id);
            del.setAttribute("data-opeate", json.data[i].id);
            // prefer.setAttribute("data-opeate", json.data[i].id);
            stock.setAttribute("data-opeate", json.data[i].id);
            richText.setAttribute("data-opeate", json.data[i].id);

            show.onclick = function () {
                console.log(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '商品详情'
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
                    , title: '商品编辑'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-update")
                });

                showDetailBeforeUpdate();
                // showGoodSelectList("update-select");
            }
            del.onclick = function () {
                //alert(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                var dialogDel = document.getElementById("modal-del");
                dialogDel.style.display = "block";

            }

            // prefer.onclick = function () {
            //     operateId = this.getAttribute("data-opeate");
            //     layer.open({
            //         type: 1
            //         , area: ['800px', '600px']
            //         , title: '商品优选'
            //         , shade: 0.6
            //         , maxmin: false
            //         , anim: 1
            //         , content: $("#modal-prefer")
            //     });
            //
            //     showDetailBeforePrefer();
            // }

            stock.onclick = function () {
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '新增库存'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-stock")
                });

                showDetailBeforeStock();
            }
            richText.onclick = function () {
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '富文本设置'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-richText")
                });

                showRichText();
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

document.getElementById("modal-del-ok").onclick = function () {


    var params = {
        "apiName": "Goods_Delete_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params, function (json) {
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


document.getElementById("add-good").onclick = function () {
    layer.open({
        type: 1
        , area: ['800px', '600px']
        , title: '添加优选商品'
        , shade: 0.6
        , maxmin: false
        , anim: 1
        , content: $("#modal-add")
    });

    document.getElementById("add-img1").src = "../../img/upload-default.png";
    document.getElementById("add-img2").src = "../../img/upload-default.png";
    document.getElementById("add-img3").src = "../../img/upload-default.png";
    document.getElementById("add-img4").src = "../../img/upload-default.png";
    document.getElementById("add-img5").src = "../../img/upload-default.png";

    document.getElementById("add-img1-file").files[0] = undefined;
    document.getElementById("add-img2-file").files[0] = undefined;
    document.getElementById("add-img3-file").files[0] = undefined;
    document.getElementById("add-img4-file").files[0] = undefined;
    document.getElementById("add-img5-file").files[0] = undefined;

    // showGoodSelectList("add-select");
}

addUploadFunctionToImg("add-img1");
addUploadFunctionToImg("add-img2");
addUploadFunctionToImg("add-img3");
addUploadFunctionToImg("add-img4");
addUploadFunctionToImg("add-img5");

var pictures = [];

document.getElementById("add-upload-button").onclick = function () {
    var file1 = document.getElementById("add-img1-file").files[0];
    var file2 = document.getElementById("add-img2-file").files[0];
    var file3 = document.getElementById("add-img3-file").files[0];
    var file4 = document.getElementById("add-img4-file").files[0];
    var file5 = document.getElementById("add-img5-file").files[0];
    var formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("file4", file4);
    formData.append("file5", file5);

    var xmlhttp = upload(formData);


    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                uploaded = 1;

                pictures = [];
                for (var i in json.data) {
                    pictures[i] = json.data[i].url;
                }


                feedback("add-upload-button", "上传成功");


            }

        }
    }


};


function showGoodSelectList(selectId) {
    var params = {
        "apiName": "GoodsCategory_QueryAll_Api"
    }
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        var select = document.getElementById(selectId);
        for (var i in json.data) {
            var option = document.createElement("option");
            option.value = json.data[i].id;
            option.innerHTML = json.data[i].name;
            select.appendChild(option);
        }
    });

}


document.getElementById("add-save").onclick = function () {
    var select = document.getElementById("add-select");
    var name = document.getElementById("add-name");
    // var price = document.getElementById("add-price");
    var vipPrice = document.getElementById("add-vip-price");
    // var goldVipPrice = document.getElementById("add-gold-vip-price");
    var reorder = document.getElementById("add-reorder");

    // if (name.value == "") {
    //     console.log("yes");
    //
    //
    //     return;
    //
    // }


    var params = {
        "apiName": "Goods_Add_Api",
        "type": 2,
        "name": name.value,
        "price": vipPrice.value,
        "reorder": reorder.value,
        "stock": 0,
        "pictures": pictures
    };
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("add-save", "添加成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);
    });
};


function showDetail() {
    var params = {
        "apiName": "Goods_QueryDetail_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        document.getElementById("detail-id").value = json.data.id;
        document.getElementById("detail-name").value = json.data.name;
        // document.getElementById("detail-good-category").value = json.data.categoryName;
        // document.getElementById("detail-price").value = json.data.price;
        document.getElementById("detail-vip-price").value = json.data.price;
        document.getElementById("detail-stock").value = json.data.stock;
        document.getElementById("detail-create-time").value = new Date(json.data.dtCreate).Format("yyyy-MM-dd hh:mm:ss");
        document.getElementById("detail-is-delete").value = (json.data.isDelete == 0 ? "正常" : "已删除");

        var images = JSON.parse(json.data.pictures);
        if (images.length >= 1) {
            document.getElementById("detail-img1").setAttribute("src", images[0]);
        }
        if (images.length >= 2) {
            document.getElementById("detail-img2").setAttribute("src", images[1]);
        }
        if (images.length >= 3) {
            document.getElementById("detail-img3").setAttribute("src", images[2]);
        }
        if (images.length >= 4) {
            document.getElementById("detail-img4").setAttribute("src", images[3]);
        }
        if (images.length >= 5) {
            document.getElementById("detail-img5").setAttribute("src", images[4]);
        }

    });
}

function showDetailBeforeUpdate() {
    var params = {
        "apiName": "Goods_QueryDetail_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        document.getElementById("update-name").value = json.data.name;
        document.getElementById("update-vip-price").value = json.data.price;

        document.getElementById("update-img1").src = "../../img/upload-default.png";
        document.getElementById("update-img2").src = "../../img/upload-default.png";
        document.getElementById("update-img3").src = "../../img/upload-default.png";
        document.getElementById("update-img4").src = "../../img/upload-default.png";
        document.getElementById("update-img5").src = "../../img/upload-default.png";
        document.getElementById("update-img1-file").files[0] = undefined;
        document.getElementById("update-img2-file").files[0] = undefined;
        document.getElementById("update-img3-file").files[0] = undefined;
        document.getElementById("update-img4-file").files[0] = undefined;
        document.getElementById("update-img5-file").files[0] = undefined;
        var images = JSON.parse(json.data.pictures);

        if (images.length >= 1) {
            document.getElementById("update-img1").src = images[0];
        }
        if (images.length >= 2) {
            document.getElementById("update-img2").src = images[1];
        }
        if (images.length >= 3) {
            document.getElementById("update-img3").src = images[2];
        }
        if (images.length >= 4) {
            document.getElementById("update-img4").src = images[3];
        }
        if (images.length >= 5) {
            document.getElementById("update-img5").src = images[4];
        }

    });
}


addUploadFunctionToImg("update-img1");
addUploadFunctionToImg("update-img2");
addUploadFunctionToImg("update-img3");
addUploadFunctionToImg("update-img4");
addUploadFunctionToImg("update-img5");

document.getElementById("update-upload-button").onclick = function () {
    var file1 = document.getElementById("update-img1-file").files[0];
    var file2 = document.getElementById("update-img2-file").files[0];
    var file3 = document.getElementById("update-img3-file").files[0];
    var file4 = document.getElementById("update-img4-file").files[0];
    var file5 = document.getElementById("update-img5-file").files[0];
    var formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("file4", file4);
    formData.append("file5", file5);

    var xmlhttp = upload(formData);


    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                uploaded = 1;

                pictures = [];
                for (var i in json.data) {
                    pictures[i] = json.data[i].url;
                }


                feedback("update-upload-button", "上传成功");


            }

        }
    }


};


document.getElementById("update-save").onclick = function () {
    var select = document.getElementById("update-select");
    var name = document.getElementById("update-name");
    var vipPrice = document.getElementById("update-vip-price");
    var reorder = document.getElementById("update-reorder");

    // if (name.value == "") {
    //     console.log("yes");
    //
    //
    //     return;
    //
    // }


    var params = {
        "apiName": "Goods_Update_Api",
        "goodsId": operateId,
        "name": name.value,
        "price": vipPrice.value,
        "reorder": reorder.value,
        "stock": 0,
        "pictures": pictures
    };
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("update-save", "添加成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);
    });

};

function showDetailBeforePrefer() {
    var params = {
        "apiName": "Goods_QueryDetail_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        document.getElementById("prefer-name").value = json.data.name;
        document.getElementById("prefer-order").value = json.data.reorder;
    });
}

document.getElementById("prefer-save").onclick = function () {
    var order = document.getElementById("perfer-select");

    if (document.getElementById("prefer-switch").checked) {


        var params = {
            "apiName": "Goods_SetAsChoice_Api",
            "goodsId": operateId,
            "choice_reorder": order.value
        };
        var xmlhttp = post(params, function (json) {
            // console.log(JSON.stringify(json))
            feedback("update-save", "设置优选成功");


            window.setTimeout(function () {
                // window.location.reload();
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);
            }, 2000);
        });

    } else {
        var params = {
            "apiName": "Goods_CancelChoice_Api",
            "goodsId": operateId
        };
        var xmlhttp = post(params, function (json) {
            // console.log(JSON.stringify(json))
            feedback("update-save", "取消优选成功");


            window.setTimeout(function () {
                // window.location.reload();
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);
            }, 2000);
        });
    }


};

function showDetailBeforeStock() {
    var params = {
        "apiName": "Goods_QueryDetail_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        document.getElementById("stock-name").value = json.data.name;
        document.getElementById("stock-stock").value = json.data.stock;
    });
}


document.getElementById("stock-save").onclick = function () {
    var stock = document.getElementById("stock-amount");


    var params = {
        "apiName": "Stock_Add_Api",
        "goodsId": operateId,
        "amount": stock.value
    };
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("update-save", "新增库存成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);
    });
};


function showRichText() {


    var params = {
        "apiName": "Goods_QueryDetail_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        var editor = window.frames["richText-box"].contentWindow.document.getElementById("editor");
        editor.innerHTML = json.data.detail;
    });
}


document.getElementById("richText-save").onclick = function () {
    var editor = window.frames["richText-box"].contentWindow.document.getElementById("editor");

    var params = {
        "apiName": "Goods_Update_Api",
        "goodsId": operateId,
        "detail": editor.innerHTML
    };
    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("richText-save", "保存成功");


        // window.setTimeout(function () {
        //     // window.location.reload();
        //     layer.closeAll();
        //     clearTable();
        //     requestOnePage(pageIndex, 8);
        // }, 2000);
    });


};