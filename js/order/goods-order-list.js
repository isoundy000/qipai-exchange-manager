var searchKeyword;
var searchTransportReceiver;
var searchBeginTimestamp;
var searchEndTimestamp;
var searchStatus;


function getParamsForSearch() {
    searchKeyword = document.getElementById("searchKeyword").value;
    searchTransportReceiver = document.getElementById("searchTransportReceiver").value;
    searchBeginTimestamp = new Date(document.getElementById("searchBeginTimestamp").value).getTime();
    searchEndTimestamp = new Date(document.getElementById("searchEndTimestamp").value).getTime();
    searchStatus = document.getElementById("searchStatus").value;
}

document.getElementById("search").onclick = function () {
    clearTable();
    requestOnePage(pageIndex, 8);
};

var table = document.getElementById("table");

requestOnePage(pageIndex, 8);
function requestOnePage(index, size) {
    var params = {
        "apiName": "GoodsOrder_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }


    getParamsForSearch();

    params["searchKeyword"] = searchKeyword;
    params["searchTransportReceiver"] = searchTransportReceiver;
    if (!isNaN(searchBeginTimestamp)) {
        params["searchBeginTimestamp"] = searchBeginTimestamp;
    }
    if (!isNaN(searchEndTimestamp)) {
        params["searchEndTimestamp"] = searchEndTimestamp;
    }
    params["searchStatus"] = searchStatus;


    post(params, function (json) {
        console.log(JSON.stringify(json));
        // console.log(json);
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


            // var imgBox = appendTdAndData(tr, "");
            // var img = document.createElement("img");
            //
            // console.log(json.data[i].pictures);
            // if (json.data[i].pictures.length > 0) {
            //     img.setAttribute("src", JSON.parse(json.data[i].pictures));
            // }
            //
            //
            // img.style.width = "50px"
            // img.style.height = "50px"
            //
            // imgBox.appendChild(img);

            var dataDetail = JSON.parse(json.data[i].goodsOrder_detail);

            appendTdAndData(tr, json.data[i].id);
            appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));
            // appendTdAndData(tr, json.data[i].userId);
            appendTdAndData(tr, json.data[i].vvUserId);
            appendTdAndData(tr, json.data[i].transportPhone);


            if (dataDetail[0].goodsName.length > 5) {
                appendTdAndData(tr, dataDetail[0].goodsName.substr(0, 5) + "...");
            } else {
                appendTdAndData(tr, dataDetail[0].goodsName);
            }

            appendTdAndData(tr, json.data[i].goodsOrder_goodsQuantity);
            appendTdAndData(tr, json.data[i].goodsOrder_orderAmount);
            appendTdAndData(tr, getEnumValueByKey(OrderStatus, json.data[i].status));


            var cell = appendTd(tr);
            var show = document.createElement("a");
            var edit = document.createElement("a");
            edit.style.margin = "8px";
            var del = document.createElement("a");

            show.setAttribute("href", "javascript:void(0)");
            edit.setAttribute("href", "javascript:void(0)");
            del.setAttribute("href", "javascript:void(0)");


            show.innerHTML = "订单详情";
            edit.innerHTML = "更新物流";
            del.innerHTML = "删除";
            cell.appendChild(show);

            if (json.data[i].transportIsDelivered==0){
                cell.appendChild(edit);
            }

            // cell.appendChild(del);

            show.setAttribute("data-opeate", json.data[i].id);
            edit.setAttribute("data-opeate", json.data[i].id);
            del.setAttribute("data-opeate", json.data[i].id);

            show.onclick = function () {
                // console.log(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '商品订单详情'
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
            }
            // del.onclick = function () {
            //     //alert(this.getAttribute("data-opeate"));
            //     operateId = this.getAttribute("data-opeate");
            //     var dialogDel = document.getElementById("dialog-del");
            //     dialogDel.style.display = "block";
            //
            // }

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


function showDetail() {
    // document.getElementById("detail-dtCreate").value = new Date(dataDetail.dtCreate).Format("yyyy-MM-dd hh:mm:ss");
    // document.getElementById("detail-orderId").value = dataDetail.orderId;
    // document.getElementById("detail-goodsName").value = dataDetail.goodsName;
    // document.getElementById("detail-img").src = dataDetail.goodsPicture;
    // document.getElementById("detail-goodsId").value = dataDetail.goodsId;
    // document.getElementById("detail-quantity").value = dataDetail.quantity;
    // document.getElementById("detail-price").value = dataDetail.price;
    // document.getElementById("detail-totalPrice").value = dataDetail.totalPrice;
    // document.getElementById("detail-remainingStock").value = dataDetail.remainingStock;
    // document.getElementById("detail-validStock").value = dataDetail.validStock;


    var params = {
        "apiName": "MixOrder_QueryDetail_Api",
        "mixOrderId": operateId
    }

    post(params, function (json) {
        console.log(JSON.stringify(json));
        // console.log(json);

        var data = json.data;
        var transportReceiver = json.data.transportReceiver;
        var transportPhone = json.data.transportPhone;
        var transportAddr = json.data.transportAddr;
        var transportCompany = json.data.transportCompany;
        var transportNumber = json.data.transportNumber;

        document.getElementById("detail-transportReceiver").value = (transportReceiver == undefined ? "" : transportReceiver);
        document.getElementById("detail-transportPhone").value = (transportPhone == undefined ? "" : transportPhone);
        document.getElementById("detail-transportAddr").value = (transportAddr == undefined ? "" : transportAddr);
        document.getElementById("detail-transportCompany").value = (transportCompany == undefined ? "" : transportCompany);
        document.getElementById("detail-transportNumber").value = (transportNumber == undefined ? "" : transportNumber);


        var data = JSON.parse(json.data.goodsOrder_detail);
        var detailBox = document.getElementById("modal-detail");
        for (var i = 0; i < data.length; i++) {
            var j = Number(i) + 1;

            var line = document.createElement("div");
            line.className = "line";
            var label = document.createElement("span");
            label.innerHTML = "商品项 " + j;
            label.style.fontSize = "20px"
            line.appendChild(label);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line upload-line";
            var label = document.createElement("span");
            label.innerHTML = "商品图片";
            var img = document.createElement("img");
            img.src = data[i].goodsPicture;
            line.appendChild(label);
            line.appendChild(img);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line";
            var label = document.createElement("span");
            label.innerHTML = "商品ID";
            var input = document.createElement("input");
            input.value = data[i].goodsId;
            line.appendChild(label);
            line.appendChild(input);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line";
            var label = document.createElement("span");
            label.innerHTML = "商品标题";
            var input = document.createElement("input");
            input.value = data[i].goodsName;
            line.appendChild(label);
            line.appendChild(input);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line";
            var label = document.createElement("span");
            label.innerHTML = "商品单价(元)";
            var input = document.createElement("input");
            input.value = data[i].price;
            line.appendChild(label);
            line.appendChild(input);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line";
            var label = document.createElement("span");
            label.innerHTML = "商品数量";
            var input = document.createElement("input");
            input.value = data[i].quantity;
            line.appendChild(label);
            line.appendChild(input);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line";
            var label = document.createElement("span");
            label.innerHTML = "商品小记(元)";
            var input = document.createElement("input");
            input.value = data[i].totalPrice;
            line.appendChild(label);
            line.appendChild(input);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line";
            var label = document.createElement("span");
            label.innerHTML = "剩余库存";
            var input = document.createElement("input");
            input.value = data[i].remainingStock;
            line.appendChild(label);
            line.appendChild(input);
            detailBox.appendChild(line);

            var line = document.createElement("div");
            line.className = "line";
            detailBox.appendChild(line);

        }
    });
}


function showDetailBeforeUpdate() {
    // var params = {
    //     "apiName": "MixOrder_QueryDetail_Api",
    //     "mixOrderId": operateId
    // }
    //
    // post(params, function (json) {
    //     console.log(JSON.stringify(json));
    //     // console.log(json);
    //
    //     var data = json.data;
    //     var transportCompany = json.data.transportCompany;
    //     var transportNumber = json.data.transportNumber;
    //     var status = json.data.status;
    //
    //     document.getElementById("update-transportCompany").value = (transportCompany == undefined ? "" : transportCompany);
    //     document.getElementById("update-transportNumber").value = (transportNumber == undefined ? "" : transportNumber);
    //     var updateSave = document.getElementById("update-save");
    //
    //
    //
    //
    //
    // });

}


document.getElementById("update-save").onclick=function () {
    var params = {
        "apiName": "MixOrder_UpdateTransportStatus_Api",
        "mixOrderId": operateId,
        "transportCompany": document.getElementById("update-transportCompany").value,
        "transportNumber": document.getElementById("update-transportNumber").value,
    }

    post(params, function (json) {
        console.log(JSON.stringify(json));
        // console.log(json);

        feedback("update-save", "物流添加成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);




    });

}