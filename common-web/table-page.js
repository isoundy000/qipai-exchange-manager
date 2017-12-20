/**
 * Created by besthyhy on 17-12-3.
 */
//表格操作函数
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

// function clearTable() {
// }
// function requestOnePage() {
// }


//分页变量
var isFirstPage = -1;
var isLastPage = -1;
var pageIndex = 0;
var pageSize = -1;
var totalPages = -1;
var totalRecords = -1;
var operateId = "";


//分页
function updatePageMarkers() {
    document.getElementById("total").innerText = "总共" + totalPages + "页";

    var page0 = document.getElementById("page0");
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");
    var page4 = document.getElementById("page4");
    var page5 = document.getElementById("page5");
    var page6 = document.getElementById("page6");
    var pageDot1 = document.getElementById("page-dot1");
    var pageDot2 = document.getElementById("page-dot2");


    page1.style.display = "none";
    page2.style.display = "none";
    page3.style.display = "none";
    page4.style.display = "none";
    page5.style.display = "none";

    page1.style.backgroundColor = "#ffffff";
    page2.style.backgroundColor = "#ffffff";
    page3.style.backgroundColor = "#ffffff";
    page4.style.backgroundColor = "#ffffff";
    page5.style.backgroundColor = "#ffffff";


    if (totalPages <= 5) {
        switch (totalPages) {
            case 1:
                page1.style.display = "flex";
                page1.innerText = 1;
                break;
            case 2:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                break;
            case 3:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                page3.style.display = "flex";
                page3.innerText = 3;
                break;
            case 4:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                page3.style.display = "flex";
                page3.innerText = 3;
                page4.style.display = "flex";
                page4.innerText = 4;

                break;
            case 5:
                page1.style.display = "flex";
                page1.innerText = 1;
                page2.style.display = "flex";
                page2.innerText = 2;
                page3.style.display = "flex";
                page3.innerText = 3;
                page4.style.display = "flex";
                page4.innerText = 4;
                page5.style.display = "flex";
                page5.innerText = 5;
                break;

        }


        switch (pageIndex) {
            case 0:
                page1.style.backgroundColor = "#8CD7DC";
                break
            case 1:
                page2.style.backgroundColor = "#8CD7DC";
                break
            case 2:
                page3.style.backgroundColor = "#8CD7DC";
                break
            case 3:
                page4.style.backgroundColor = "#8CD7DC";
                break
            case 4:
                page5.style.backgroundColor = "#8CD7DC";
                break
            case 5:

                break
        }
    }

    if (totalPages > 5) {

        page1.style.display = "flex";
        page2.style.display = "flex";
        page3.style.display = "flex";
        page4.style.display = "flex";
        page5.style.display = "flex";

        var currentPage = pageIndex;

        if (pageIndex <= 2) {
            page1.innerText = 1;
            page2.innerText = 2;
            page3.innerText = 3;
            page4.innerText = 4;
            page5.innerText = 5;

            switch (pageIndex) {
                case 0:
                    page1.style.backgroundColor = "#8CD7DC";
                    break;
                case 1:
                    page2.style.backgroundColor = "#8CD7DC";
                    break;
                case 2:
                    page3.style.backgroundColor = "#8CD7DC";
                    break
            }
        }
        if (pageIndex >= totalPages - 3) {
            page1.innerText = totalPages - 4;
            page2.innerText = totalPages - 3;
            page3.innerText = totalPages - 2;
            page4.innerText = totalPages - 1;
            page5.innerText = totalPages;

            switch (pageIndex) {
                case totalPages - 1:
                    page5.style.backgroundColor = "#8CD7DC";
                    break;
                case totalPages - 2:
                    page4.style.backgroundColor = "#8CD7DC";
                    break;
                case totalPages - 3:
                    page3.style.backgroundColor = "#8CD7DC";
                    break
            }


        }

        if (pageIndex > 2 && pageIndex < totalPages - 3) {

            page1.innerText = pageIndex - 1;
            page2.innerText = pageIndex;
            page3.innerText = pageIndex + 1;
            page4.innerText = pageIndex + 2;
            page5.innerText = pageIndex + 3;

            page3.style.backgroundColor = "#8CD7DC";

        }
    }


}

document.getElementById("previous").onclick = function () {

    if (isFirstPage != 1) {
        clearTable();
        requestOnePage(pageIndex - 1, pageSize);
    }

};

document.getElementById("next").onclick = function () {

    if (isLastPage != 1) {
        clearTable();
        requestOnePage(pageIndex + 1, pageSize);
    }

};
document.getElementById("first").onclick = function () {

    clearTable();
    requestOnePage(0, pageSize);


};
document.getElementById("end").onclick = function () {
    clearTable();
    requestOnePage(totalPages - 1, pageSize);


};

document.getElementById("goto-page").onkeydown = function (e) {
    if (e.which == 13) {
        console.log(this.value);
        console.log(Number(this.value));
        if (this.value >= 1 && this.value <= totalPages) {
            clearTable();
            requestOnePage(this.value - 1, pageSize);
        } else {
            alert("请输入有效的页码");
        }

    }


};
//分页12345点击
document.getElementById("page1").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page2").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page3").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page4").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}
document.getElementById("page5").onclick = function () {
    clearTable();
    requestOnePage(Number(this.innerText) - 1, pageSize);
}




/*
 <tbody>
 <tr>
 <td colspan="11">
 <div class="page">
 <div style="margin-right: 20px">页</div>
 <input id="goto-page" class="page-input" type="number" style="width: 40px" value="1">
 <div style="margin-left: 10px;margin-right: 10px">跳至</div>
 <div id="total" style="margin-left: 10px;margin-right: 10px"></div>
 <div id="end" class="page-marker" style="width: 34px;cursor: pointer">尾页</div>
 <img id="next" class="page-button" src="../../img/page-right.svg" style="cursor: pointer">
 <div id="page5" class="page-marker" style="cursor: pointer"></div>
 <div id="page4" class="page-marker" style="cursor: pointer"></div>
 <div id="page3" class="page-marker" style="cursor: pointer"></div>
 <div id="page2" class="page-marker" style="cursor: pointer"></div>
 <div id="page1" class="page-marker" style="cursor: pointer"></div>
 <img id="previous" class="page-button" src="../../img/page-left.svg" style="cursor: pointer">
 <div id="first" class="page-marker" style="width: 34px;cursor: pointer">首页</div>
 </div>
 </td>
 </tr>
 </tbody>
 */