var searchKeyword;

function getParamsForSearch() {
    searchKeyword = document.getElementById("searchKeyword").value;
}

document.getElementById("search").onclick = function () {
    clearTable();
    requestOnePage(pageIndex, 8);
};

requestOnePage(pageIndex, 8);

function requestOnePage(index, size) {
    var params = {
        "apiName": "Finance_QueryInBillList_Api",
        "pageIndex": index,
        "pageSize": size
    };

    getParamsForSearch();

    params["searchKeyword"] = searchKeyword;

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


            var data = json.data[i];


            appendTdAndData(tr, data.id);
            // appendTdAndData(tr, data.userId);
            appendTdAndData(tr, data.vvUserId);
            appendTdAndData(tr, data.roomCardOrder_roomCardName);
            appendTdAndData(tr, data.roomCardOrder_buyQuantity);
            appendTdAndData(tr, data.roomCardOrder_orderAmount);
            appendTdAndData(tr, new Date(data.dtCreate).Format("yyyy-MM-dd hh:mm:ss"));
            // appendTdAndData(tr, new Date(data.dtAudit).Format("yyyy-MM-dd hh:mm:ss"));
            // appendTdAndData(tr, data.auditorId);
            // appendTdAndData(tr, data.auditorName);
            // appendTdAndData(tr, new Date(data.dtLastModify).Format("yyyy-MM-dd hh:mm:ss"));
            // appendTdAndData(tr, data.status);
            // appendTdAndData(tr, data.rejectReason);

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

