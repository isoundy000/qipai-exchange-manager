var searchUserId;

function getParamsForSearch() {
    searchUserId = document.getElementById("searchUserId").value;
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
        "apiName": "User_QueryList_Api",
        "type": 2,
        "pageIndex": index,
        "pageSize": size
    }


    getParamsForSearch();

    params["searchUserId"] = searchUserId;

    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        // console.log(xmlhttp.responseText);
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
                    img.setAttribute("src", json.data[i].wxAvatarImgUrl);
                img.style.width = "50px"
                img.style.height = "50px"

                imgBox.appendChild(img);

                appendTdAndData(tr, json.data[i].wxNickname);
                appendTdAndData(tr, json.data[i].id);
                appendTdAndData(tr, json.data[i].vvUserId);
                appendTdAndData(tr, json.data[i].myLeaderId);
                appendTdAndData(tr, json.data[i].level);
                appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd"));
                appendTdAndData(tr, (json.data[i].enable=="1"?"正常":"已经删除"));
                var cell = appendTd(tr);
                var show = document.createElement("a");
                // var edit = document.createElement("a");
                // edit.style.margin = "8px";
                // var del = document.createElement("a");
                // var prefer = document.createElement("a");
                // prefer.style.margin = "8px";
                // var stock = document.createElement("a");
                // stock.style.margin = "8px";

                show.setAttribute("href", "javascript:void(0)");
                // edit.setAttribute("href", "javascript:void(0)");
                // del.setAttribute("href", "javascript:void(0)");
                // prefer.setAttribute("href", "javascript:void(0)");
                // stock.setAttribute("href", "javascript:void(0)");


                show.innerHTML = "查看";
                // edit.innerHTML = "编辑";
                // del.innerHTML = "删除";
                // prefer.innerHTML = "优选";
                // stock.innerHTML = "新增库存";
                cell.appendChild(show);
                // cell.appendChild(edit);
                // cell.appendChild(del);
                // cell.appendChild(prefer);
                // cell.appendChild(stock);

                show.setAttribute("data-opeate", json.data[i].id);
                // edit.setAttribute("data-opeate", json.data[i].id);
                // del.setAttribute("data-opeate", json.data[i].id);
                // prefer.setAttribute("data-opeate", json.data[i].id);
                // stock.setAttribute("data-opeate", json.data[i].id);

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
                    showFollowerList1();
                    showFollowerList2();
                    showFollowerList3();
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
                //         , content: $("#modal-update")
                //     });
                //
                //     showDetailBeforeUpdate();
                //     // showGoodSelectList("update-select");
                // }
                // del.onclick = function () {
                //     //alert(this.getAttribute("data-opeate"));
                //     operateId = this.getAttribute("data-opeate");
                //     var dialogDel = document.getElementById("modal-del");
                //     dialogDel.style.display = "block";
                //
                // }

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

                // stock.onclick = function () {
                //     operateId = this.getAttribute("data-opeate");
                //     layer.open({
                //         type: 1
                //         , area: ['800px', '600px']
                //         , title: '新增库存'
                //         , shade: 0.6
                //         , maxmin: false
                //         , anim: 1
                //         , content: $("#modal-stock")
                //     });
                //
                //     showDetailBeforeStock();
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
    // var params = {
    //     "apiName": "User_QueryDetail_Api",
    //     "userId": operateId
    // }
    // var xmlhttp = post(params);
    //
    // xmlhttp.onreadystatechange = function () {
    //     console.log(xmlhttp.responseText);
    //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //         var json = JSON.parse(xmlhttp.responseText);
    //
    //         if (json.code == 0) {
    //
    //
    //
    //         }
    //
    //
    //     }
    // }
}

function showFollowerList1() {
    var params = {
        "apiName": "User_QueryFollowerList_Api",
        "userId": operateId,
        "level": 1
    }

    console.log(params)
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {



            }


        }
    }
}
function showFollowerList2() {

}
function showFollowerList3() {

}

