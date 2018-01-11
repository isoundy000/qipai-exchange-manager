var operateId;

function setOperateId(id) {
    operateId = id;
}


function requestOnePage(index, size) {
    var params = {
        "apiName": "User_QueryWalletBillList_Api",
        "pageIndex": index,
        "pageSize": size,
        "userId": operateId
    }


    // console.log(params)
    // console.log(JSON.stringify(params))


    post(params, function (json) {
        // console.log(json)
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


            appendTdAndData(tr, (Number(json.data[i].amount) / 100).toFixed(2));
            appendTdAndData(tr, (Number(json.data[i].oldWalletAmount) / 100).toFixed(2));
            appendTdAndData(tr, (Number(json.data[i].newWalletAmount) / 100).toFixed(2));
            appendTdAndData(tr, json.data[i].inContributorVvUserId);
            appendTdAndData(tr, json.data[i].inContributorUserLevel);
            appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));


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