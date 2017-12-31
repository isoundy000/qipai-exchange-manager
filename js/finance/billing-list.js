var searchUserId;

function getParamsForSearch() {
    searchUserId = document.getElementById("searchUserId").value;
}

document.getElementById("search").onclick = function () {
    clearTable();
    requestOnePage(pageIndex, 8);
};

requestOnePage(pageIndex, 8);

function requestOnePage(index, size) {
    var params = {
        "apiName": "WithdrawCash_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    };

    getParamsForSearch();

    params["searchUserId"] = searchUserId;

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
            // var data =
            //     {
            //         "userId": "asd",
            //         "amount": "asd",
            //         "dtCreate": 1513955422000,
            //         "dtAudit": "asd",
            //         "auditorId": "asd",
            //         "auditorName": "asd",
            //         "status": "asd",
            //         "rejectReason": "asd",
            //         "dtLastModify": "asd"
            //     }
            // ;


            appendTdAndData(tr, data.id);
            appendTdAndData(tr, data.realname);
            appendTdAndData(tr, data.bankCardNumber);
            // appendTdAndData(tr, data.userId);
            appendTdAndData(tr, data.vvUserId);
            appendTdAndData(tr, (Number(data.amount)/100).toFixed(2));
            appendTdAndData(tr, new Date(data.dtCreate).Format("yyyy-MM-dd hh:mm:ss"));


            // appendTdAndData(tr, data.status);
            appendTdAndData(tr, getEnumValueByKey(ApplyStatus, json.data[i].status))

            var cell = appendTd(tr);
            var show = document.createElement("a");


            show.setAttribute("href", "javascript:void(0)");


            if (json.data[i].status == 0) {
                show.innerHTML = "审核";
            } else {
                show.innerHTML = "";
            }


            cell.appendChild(show);

            show.setAttribute("data-opeate", json.data[i].id);

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
                    , content: $("#modal-apply")
                });

            }


            if (data.dtAudit != undefined) {
                appendTdAndData(tr, new Date(data.dtAudit).Format("yyyy-MM-dd hh:mm:ss"));
            } else {
                appendTdAndData(tr, "");
            }

            // if (data.auditorId != undefined) {
            //     appendTdAndData(tr, data.auditorId);
            // } else {
            //     appendTdAndData(tr, "");
            // }

            if (data.auditorName != undefined) {
                appendTdAndData(tr, data.auditorName);
            } else {
                appendTdAndData(tr, "");
            }

            // if (data.dtLastModify != undefined) {
            //     appendTdAndData(tr, new Date(data.dtLastModify).Format("yyyy-MM-dd hh:mm:ss"));
            // } else {
            //     appendTdAndData(tr, "");
            // }

            if (data.rejectReason != undefined) {
                appendTdAndData(tr, data.rejectReason);
            } else {
                appendTdAndData(tr, "");
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

var applyReasonBox = document.getElementById("apply-reason-box");
var applySelect = document.getElementById("apply-select")
var applyReason = document.getElementById("apply-reason")
applySelect.onchange = function () {
    if (this.value == 2) {
        applyReasonBox.style.display = "flex";
    } else {
        applyReasonBox.style.display = "none";
    }
};

document.getElementById("apply-save").onclick = function () {
    var params;

    if (applySelect.value == 1) {
        var params = {
            "apiName": "WithdrawCash_Agree_Api",
            "withdrawCashId": operateId
        };
    }

    if (applySelect.value == 2) {
        var params = {
            "apiName": "WithdrawCash_Reject_Api",
            "withdrawCashId": operateId,
            "rejectReason": applyReason.value,
        };
    }

    if (applySelect.value == 0) {
        return;
    }


    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))

    });

}