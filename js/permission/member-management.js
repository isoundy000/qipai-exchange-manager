requestOnePage(pageIndex, 8);
function requestOnePage(index, size) {
    var params = {
        "apiName": "DepartmentMember_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
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


            appendTdAndData(tr, json.data[i].name);
            appendTdAndData(tr, json.data[i].departmentName);
            appendTdAndData(tr, json.data[i].loginName);
            appendTdAndData(tr, json.data[i].phone);
            appendTdAndData(tr, json.data[i].emailAddress);
            appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));

            var enableCell = appendTd(tr);
            var switcher = document.createElement("div");
            switcher.className = "switch";
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.id = json.data[i].id;
            switcher.appendChild(checkbox);
            var label = document.createElement("label");
            label.className = "choose-label";
            label.setAttribute("for", json.data[i].id);


            switcher.appendChild(label)
            enableCell.appendChild(switcher);

            checkbox.checked = (json.data[i].enable == 1 ? true : false);

            checkbox.setAttribute("data-opeate", json.data[i].id);

            checkbox.onclick = function () {
                // console.log(this.checked)
                operateId = this.getAttribute("data-opeate");
                if (this.checked) {
                    setEnable(1);
                } else {
                    setEnable(0);
                }
            }


            var cell = appendTd(tr);
            // var show = document.createElement("a");
            var edit = document.createElement("a");
            edit.style.margin = "8px";
            var del = document.createElement("a");

            // show.setAttribute("href", "javascript:void(0)");
            edit.setAttribute("href", "javascript:void(0)");
            del.setAttribute("href", "javascript:void(0)");


            // show.innerHTML = "订单详情";
            edit.innerHTML = "编辑";
            del.innerHTML = "删除";
            // cell.appendChild(show);
            cell.appendChild(edit);
            cell.appendChild(del);

            // show.setAttribute("data-opeate", json.data[i].id);
            edit.setAttribute("data-opeate", json.data[i].id);
            del.setAttribute("data-opeate", json.data[i].id);

            // show.onclick = function () {
            //     // console.log(this.getAttribute("data-opeate"));
            //     operateId = this.getAttribute("data-opeate");
            //     layer.open({
            //         type: 1
            //         , area: ['800px', '600px']
            //         , title: '商品订单详情'
            //         , shade: 0.6
            //         , maxmin: false
            //         , anim: 1
            //         , content: $("#modal-detail")
            //     });
            //
            //     showDetail(JSON.parse(dataDetail)[0]);
            // }
            edit.onclick = function () {
                //alert(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                layer.open({
                    type: 1
                    , area: ['800px', '600px']
                    , title: '成员编辑'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-update")
                });

                showDetailBeforeUpdate();
            }
            del.onclick = function () {
                //alert(this.getAttribute("data-opeate"));
                operateId = this.getAttribute("data-opeate");
                var dialogDel = document.getElementById("modal-del");
                dialogDel.style.display = "block";

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

function setEnable(enable) {
    // console.log(enable)
    var params = {
        "apiName": "DepartmentMember_Update_Api",
        "departmentId": operateId,
        "enable": enable
    };
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        clearTable();
        requestOnePage(pageIndex, 8);
    });
}

document.getElementById("add-member").onclick = function () {
    layer.open({
        type: 1
        , area: ['800px', '600px']
        , title: '添加成员'
        , shade: 0.6
        , maxmin: false
        , anim: 1
        , content: $("#modal-add")
    });

    showDepartmentSelectList("add-department");

}

document.getElementById("add-save").onclick = function () {
    var e = document.getElementById("add-department");

    var params = {
        "apiName": "DepartmentMember_Add_Api",
        "name": document.getElementById("add-name").value,
        "departmentId": e.options[e.selectedIndex].value,
        "phone": document.getElementById("add-phone").value,
        "emailAddress": document.getElementById("add-emailAddress").value,
        "loginName": document.getElementById("add-loginName").value,
        "loginPassword": document.getElementById("add-loginPassword").value
    };
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("add-save", "保存成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);
    });
}


function showDepartmentSelectList(selectId, selectedValue) {
    var params = {
        "apiName": "Department_QueryList_Api"
    }
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        for (var i in json.data) {
            if (json.data[i].enable == 1) {
                var department = document.getElementById(selectId);
                var option = document.createElement("option");
                option.value = json.data[i].id;
                option.innerHTML = json.data[i].name;

                department.appendChild(option)
            }
        }

        if (selectedValue != undefined) {
            document.getElementById(selectId).value = selectedValue;
        }
    });
}

document.getElementById("modal-del-ok").onclick = function () {


    var params = {
        "apiName": "DepartmentMember_Delete_Api",
        "departmentMemberId": operateId
    }
    post(params, function (json) {
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

function showDetailBeforeUpdate() {
    var params = {
        "apiName": "DepartmentMember_QueryDetail_Api",
        "departmentMemberId": operateId
    }
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        document.getElementById("update-name").value = json.data.name;
        document.getElementById("update-phone").value = json.data.phone;
        document.getElementById("update-loginName").value = json.data.loginName;
        document.getElementById("update-emailAddress").value = json.data.emailAddress;
        document.getElementById("update-loginPassword").value = json.data.loginPassword;

        showDepartmentSelectList("update-department", json.data.departmentId);
    });
}

document.getElementById("update-save").onclick = function () {
    var e = document.getElementById("update-department");

    var params = {
        "apiName": "DepartmentMember_Update_Api",
        "departmentMemberId": operateId,
        "name": document.getElementById("update-name").value,
        "departmentId": e.options[e.selectedIndex].value,
        "phone": document.getElementById("update-phone").value,
        "emailAddress": document.getElementById("update-emailAddress").value,
        "loginName": document.getElementById("update-loginName").value,
        "loginPassword": document.getElementById("update-loginPassword").value
    };
    post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("update-save", "保存成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);
        }, 2000);
    });
}