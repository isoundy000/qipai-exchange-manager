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
        "pageIndex": index,
        "pageSize": size
    }


    getParamsForSearch();

    params["searchUserId"] = searchUserId;

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


            var imgBox = appendTdAndData(tr, "");
            var img = document.createElement("img");
            img.setAttribute("src", json.data[i].wxAvatarImgUrl);
            img.style.width = "50px"
            img.style.height = "50px"

            imgBox.appendChild(img);

            appendTdAndData(tr, json.data[i].wxNickname);
            // appendTdAndData(tr, json.data[i].id);
            appendTdAndData(tr, json.data[i].vvUserId);


            if(json.data[i].myLeaderVvUserId==undefined){
                appendTdAndData(tr, "");
            }else {
                appendTdAndData(tr, json.data[i].myLeaderVvUserId);
            }


            switch (json.data[i].level){
                case 0:
                    appendTdAndData(tr, "游客");
                    break;
                case 1:
                    appendTdAndData(tr, "会员");
                    break;
                case 2:
                    appendTdAndData(tr, "钻石会员");
                    break;
            }

            appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));
            appendTdAndData(tr, (json.data[i].enable == "1" ? "正常" : "已经删除"));
            var cell = appendTd(tr);
            var show = document.createElement("a");
            var edit = document.createElement("a");
            edit.style.margin = "8px";
            var del = document.createElement("a");
            // var prefer = document.createElement("a");
            // prefer.style.margin = "8px";
            // var stock = document.createElement("a");
            // stock.style.margin = "8px";

            show.setAttribute("href", "javascript:void(0)");
            edit.setAttribute("href", "javascript:void(0)");
            del.setAttribute("href", "javascript:void(0)");
            // prefer.setAttribute("href", "javascript:void(0)");
            // stock.setAttribute("href", "javascript:void(0)");


            show.innerHTML = "一级邀请用户";
            edit.innerHTML = "二级邀请用户";
            del.innerHTML = "三级邀请用户";
            // prefer.innerHTML = "优选";
            // stock.innerHTML = "新增库存";
            cell.appendChild(show);
            cell.appendChild(edit);
            cell.appendChild(del);
            // cell.appendChild(prefer);
            // cell.appendChild(stock);

            show.setAttribute("data-opeate", json.data[i].id);
            edit.setAttribute("data-opeate", json.data[i].id);
            del.setAttribute("data-opeate", json.data[i].id);
            // prefer.setAttribute("data-opeate", json.data[i].id);
            // stock.setAttribute("data-opeate", json.data[i].id);

            show.onclick = function () {
                console.log(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '一级邀请用户'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-level1")
                });

                showDetailLevel1();
            }
            edit.onclick = function () {
                //alert(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '二级邀请用户'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-level2")
                });

                showDetailLevel2();
            }
            del.onclick = function () {
                //alert(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                // var dialogDel = document.getElementById("modal-del");
                // dialogDel.style.display = "block";
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '三级邀请用户'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-level3")
                });
                showDetailLevel3();

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


function showDetailLevel1() {
    var tbody = document.getElementById("level1-tbody");
    tbody.innerHTML = "";

    var params = {
        "apiName": "User_QueryFollowerList_Api",
        "userId": operateId,
        "level": 1,
        "pageIndex": 0,
        "pageSize": 99999

    }

    post(params, function (json) {
        // console.log(JSON.stringify(json))
        var data = json.data;


        for (var i = 0; i < data.length;) {
            // console.log(i)
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var td1 = document.createElement("td");
            tr.appendChild(td1);
            td1.innerHTML = data[i].vvUserId;

            if (i + 1 < data.length) {
                var td2 = document.createElement("td");
                tr.appendChild(td2);
                td2.innerHTML = data[i + 1].vvUserId;
            }

            if (i + 2 < data.length) {
                var td3 = document.createElement("td");
                tr.appendChild(td3);
                td3.innerHTML = data[i + 2].vvUserId;
            }

            i = i + 3;
        }
    });
}

function showDetailLevel2() {
    var tbody = document.getElementById("level2-tbody");
    tbody.innerHTML = "";

    var params = {
        "apiName": "User_QueryFollowerList_Api",
        "userId": operateId,
        "level": 2,
        "pageIndex": 0,
        "pageSize": 99999

    }

    post(params, function (json) {
        // console.log(JSON.stringify(json))
        var data = json.data;


        for (var i = 0; i < data.length;) {
            // console.log(i)
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var td1 = document.createElement("td");
            tr.appendChild(td1);
            td1.innerHTML = data[i].vvUserId;

            if (i + 1 < data.length) {
                var td2 = document.createElement("td");
                tr.appendChild(td2);
                td2.innerHTML = data[i + 1].vvUserId;
            }

            if (i + 2 < data.length) {
                var td3 = document.createElement("td");
                tr.appendChild(td3);
                td3.innerHTML = data[i + 2].vvUserId;
            }

            i = i + 3;
        }
    });
}

function showDetailLevel3() {
    var tbody = document.getElementById("level3-tbody");
    tbody.innerHTML = "";

    var params = {
        "apiName": "User_QueryFollowerList_Api",
        "userId": operateId,
        "level": 3,
        "pageIndex": 0,
        "pageSize": 99999

    }

    post(params, function (json) {
        // console.log(JSON.stringify(json))
        var data = json.data;


        for (var i = 0; i < data.length;) {
            // console.log(i)
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var td1 = document.createElement("td");
            tr.appendChild(td1);
            td1.innerHTML = data[i].vvUserId;

            if (i + 1 < data.length) {
                var td2 = document.createElement("td");
                tr.appendChild(td2);
                td2.innerHTML = data[i + 1].vvUserId;
            }

            if (i + 2 < data.length) {
                var td3 = document.createElement("td");
                tr.appendChild(td3);
                td3.innerHTML = data[i + 2].vvUserId;
            }

            i = i + 3;
        }
    });

}


