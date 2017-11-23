var categoryName = document.getElementById("category-name");
var categoryReorder = document.getElementById("category-reorder");

var add = document.getElementById("add");
add.onclick = function () {
    var params = {
        "apiName": "GoodsCategory_Add_Api",
        "name": categoryName.value,
        "reorder": Number(categoryReorder.innerHTML)
    };
    var xmlhttp = post(params);
    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);


        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                var addFeedback = document.getElementById("add-feedback");
                addFeedback.style.display = "block";
                addFeedback.innerHTML = "添加成功";


                window.setTimeout(function () {
                    addFeedback.style.display = "none";
                    window.location.reload();
                }, 1000);

            }
        }

    }
};
requestOnePage();

function requestOnePage() {
    var params = {
        "apiName": "GoodsCategory_QueryAll_Api"
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                var tbody = document.getElementById("tbody");

                for (var i = 0; i < json.data.length; i++) {
                    var tr = appendTr(tbody);
                    appendTdAndData(tr, json.data[i].id);
                    appendTdAndData(tr, json.data[i].name);
                    // appendTdAndData(tr,json.data[i].reorder);
                    appendTdAndData(tr, "-");
                    appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));
                    //appendTdAndData(tr,(json.data[i].reorder)==undefined?"":(json.data[i].reorder));

                    var cell = appendTd(tr);
                    //var show = document.createElement("a");
                    var edit = document.createElement("a");
                    edit.style.margin = "8px";
                    var del = document.createElement("a");

                    //show.setAttribute("href", "javascript:void(0)");
                    edit.setAttribute("href", "javascript:void(0)");
                    del.setAttribute("href", "javascript:void(0)");


                    //show.innerHTML = "查看";
                    edit.innerHTML = "编辑";
                    del.innerHTML = "删除";
                    //cell.appendChild(show);
                    cell.appendChild(edit);
                    cell.appendChild(del);

                    //show.setAttribute("data-opeate", json.data[i].id);
                    edit.setAttribute("data-opeate", json.data[i].id);
                    del.setAttribute("data-opeate", json.data[i].id);

                    // show.onclick = function () {
                    //     console.log(this.getAttribute("data-opeate"));
                    //     operateId = this.getAttribute("data-opeate");
                    //     layer.open({
                    //         type: 1
                    //         , area: ['800px', '600px']
                    //         , title: '商品详情'
                    //         , shade: 0.6
                    //         , maxmin: false
                    //         , anim: 1
                    //         , content: $(".detail")
                    //     });
                    //
                    //     showDetail();
                    // }
                    edit.onclick = function () {
                        //alert(this.getAttribute("data-opeate"));
                        operateId = this.getAttribute("data-opeate");
                        layer.open({
                            type: 1
                            , area: ['600px', '300px']
                            , title: '商品类别编辑'
                            , shade: 0.6
                            , maxmin: false
                            , anim: 1
                            , content: $(".update")
                        });

                        showDetailBeforeUpdate();
                    }
                    del.onclick = function () {
                        //alert(this.getAttribute("data-opeate"));
                        operateId = this.getAttribute("data-opeate");
                        var dialogDel = document.getElementById("dialog-del");
                        dialogDel.style.display = "block";

                    }

                }
            }


        }
    }
}


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

document.getElementById("dialog-del-ok").onclick = function () {

    var params = {
        "apiName": "GoodsCategory_Delete_Api",
        "categoryId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                layer.closeAll();
                clearTable();
                requestOnePage();

                var dialogDel = document.getElementById("dialog-del");
                dialogDel.style.display = "none";
            }


        }
    }
}
document.getElementById("dialog-del-cancel").onclick = function () {
    var dialogDel = document.getElementById("dialog-del");
    dialogDel.style.display = "none";
}


function showDetailBeforeUpdate() {
    var params = {
        "apiName": "GoodsCategory_QueryDetail_Api",
        "categoryId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                document.getElementById("update-name").value = json.data.name;
                // document.getElementById("update-reorder")


            }


        }
    }


}

document.getElementById("save").onclick = function () {
    var params = {
        "apiName": "GoodsCategory_Update_Api",
        "categoryId": operateId,
        "name": document.getElementById("update-name").value,
        "reorder": Number(document.getElementById("update-reorder").value)
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                layer.closeAll();
                clearTable();
                requestOnePage();
            }


        }
    }
}
