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


    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
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


                if (dataDetail[0].goodsName.length>5){
                    appendTdAndData(tr, dataDetail[0].goodsName.substr(0,5)+"...");
                }else {
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
                edit.innerHTML = "编辑";
                del.innerHTML = "删除";
                cell.appendChild(show);
                // cell.appendChild(edit);
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
                // edit.onclick = function () {
                //     //alert(this.getAttribute("data-opeate"));
                //     operateId = this.getAttribute("data-opeate");
                //     layer.open({
                //         type: 1
                //         , area: ['800px', '600px']
                //         , title: '商品编辑'
                //         , shade: 0.6
                //         , maxmin: false
                //         , anim: 1
                //         , content: $(".modal-detail")
                //     });
                //
                //     showDetailBeforeUpdate();
                // }
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
        }
    }
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
        "apiName": "GoodsOrderItem_QueryAll_Api",
        "goodsOrderId": operateId
    }

    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            var data=json.data;
            var detailBox = document.getElementById("modal-detail");
            for (var i = 0; i < json.data.length; i++) {
                var j=Number(i)+1;

                var line = document.createElement("div");
                line.className="line";
                var label=document.createElement("span");
                label.innerHTML="商品项 "+j;
                label.style.fontSize="20px"
                line.appendChild(label);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line upload-line";
                var label=document.createElement("span");
                label.innerHTML="商品图片";
                var img=document.createElement("img");
                img.src=data[i].goodsPicture;
                line.appendChild(label);
                line.appendChild(img);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line";
                var label=document.createElement("span");
                label.innerHTML="商品ID";
                var input=document.createElement("input");
                input.value=data[i].goodsId;
                line.appendChild(label);
                line.appendChild(input);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line";
                var label=document.createElement("span");
                label.innerHTML="商品标题";
                var input=document.createElement("input");
                input.value=data[i].goodsName;
                line.appendChild(label);
                line.appendChild(input);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line";
                var label=document.createElement("span");
                label.innerHTML="商品单价(元)";
                var input=document.createElement("input");
                input.value=data[i].price;
                line.appendChild(label);
                line.appendChild(input);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line";
                var label=document.createElement("span");
                label.innerHTML="商品数量";
                var input=document.createElement("input");
                input.value=data[i].quantity;
                line.appendChild(label);
                line.appendChild(input);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line";
                var label=document.createElement("span");
                label.innerHTML="商品小记(元)";
                var input=document.createElement("input");
                input.value=data[i].totalPrice;
                line.appendChild(label);
                line.appendChild(input);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line";
                var label=document.createElement("span");
                label.innerHTML="剩余库存";
                var input=document.createElement("input");
                input.value=data[i].remainingStock;
                line.appendChild(label);
                line.appendChild(input);
                detailBox.appendChild(line);

                var line = document.createElement("div");
                line.className="line";
                detailBox.appendChild(line);

            }
        }
    }


    // var data = [
    //     {
    //         "dtCreate": 1513758999670,
    //         "goodsId": "146316ec-f890-4104-a47e-20f2def452bd",
    //         "goodsName": "煎蛋模【款式随机】",
    //         "goodsPicture": "https://img11.360buyimg.com/n1/jfs/t2287/359/1993093377/43724/119b5817/56e917c4N0f2d73b8.jpg",
    //         "id": "880d8160-7174-4ba3-a95d-02cbd4124d39",
    //         "orderId": "23567739-4581-4099-844e-fe7108b0d160",
    //         "price": 9,
    //         "quantity": 1,
    //         "remainingStock": 0,
    //         "totalPrice": 9,
    //         "validStock": 999
    //     },
    //     {
    //         "dtCreate": 1513758999670,
    //         "goodsId": "146316ec-f890-4104-a47e-20f2def452bd",
    //         "goodsName": "煎蛋模【款式随机】",
    //         "goodsPicture": "https://img11.360buyimg.com/n1/jfs/t2287/359/1993093377/43724/119b5817/56e917c4N0f2d73b8.jpg",
    //         "id": "880d8160-7174-4ba3-a95d-02cbd4124d39",
    //         "orderId": "23567739-4581-4099-844e-fe7108b0d160",
    //         "price": 9,
    //         "quantity": 1,
    //         "remainingStock": 0,
    //         "totalPrice": 9,
    //         "validStock": 999
    //     },
    //     {
    //         "dtCreate": 1513758999670,
    //         "goodsId": "146316ec-f890-4104-a47e-20f2def452bd",
    //         "goodsName": "煎蛋模【款式随机】",
    //         "goodsPicture": "https://img11.360buyimg.com/n1/jfs/t2287/359/1993093377/43724/119b5817/56e917c4N0f2d73b8.jpg",
    //         "id": "880d8160-7174-4ba3-a95d-02cbd4124d39",
    //         "orderId": "23567739-4581-4099-844e-fe7108b0d160",
    //         "price": 9,
    //         "quantity": 1,
    //         "remainingStock": 0,
    //         "totalPrice": 9,
    //         "validStock": 999
    //     }
    // ];

    // var detailBox = document.getElementById("modal-detail");
    // for (var i in data) {
    //     var j=Number(i)+1;
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     var label=document.createElement("span");
    //     label.innerHTML="商品项 "+j;
    //     label.style.fontSize="20px"
    //     line.appendChild(label);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line upload-line";
    //     var label=document.createElement("span");
    //     label.innerHTML="商品图片";
    //     var img=document.createElement("img");
    //     img.src=data[i].goodsPicture;
    //     line.appendChild(label);
    //     line.appendChild(img);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     var label=document.createElement("span");
    //     label.innerHTML="商品ID";
    //     var input=document.createElement("input");
    //     input.value=data[i].goodsId;
    //     line.appendChild(label);
    //     line.appendChild(input);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     var label=document.createElement("span");
    //     label.innerHTML="商品标题";
    //     var input=document.createElement("input");
    //     input.value=data[i].goodsName;
    //     line.appendChild(label);
    //     line.appendChild(input);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     var label=document.createElement("span");
    //     label.innerHTML="商品单价(元)";
    //     var input=document.createElement("input");
    //     input.value=data[i].price;
    //     line.appendChild(label);
    //     line.appendChild(input);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     var label=document.createElement("span");
    //     label.innerHTML="商品数量";
    //     var input=document.createElement("input");
    //     input.value=data[i].quantity;
    //     line.appendChild(label);
    //     line.appendChild(input);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     var label=document.createElement("span");
    //     label.innerHTML="商品小记(元)";
    //     var input=document.createElement("input");
    //     input.value=data[i].totalPrice;
    //     line.appendChild(label);
    //     line.appendChild(input);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     var label=document.createElement("span");
    //     label.innerHTML="剩余库存";
    //     var input=document.createElement("input");
    //     input.value=data[i].remainingStock;
    //     line.appendChild(label);
    //     line.appendChild(input);
    //     detailBox.appendChild(line);
    //
    //     var line = document.createElement("div");
    //     line.className="line";
    //     detailBox.appendChild(line);
    // }

}

