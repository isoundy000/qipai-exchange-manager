requestOnePage(pageIndex, 8);
function requestOnePage(index, size) {
    var params = {
        "apiName": "Department_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
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


                appendTdAndData(tr, json.data[i].name);
                appendTdAndData(tr, json.data[i].desc);
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
                var show = document.createElement("a");
                var edit = document.createElement("a");
                edit.style.margin = "8px";
                var del = document.createElement("a");

                show.setAttribute("href", "javascript:void(0)");
                edit.setAttribute("href", "javascript:void(0)");
                del.setAttribute("href", "javascript:void(0)");


                show.innerHTML = "设置权限";
                edit.innerHTML = "编辑";
                del.innerHTML = "删除";
                cell.appendChild(show);
                cell.appendChild(edit);
                cell.appendChild(del);

                show.setAttribute("data-opeate", json.data[i].id);
                edit.setAttribute("data-opeate", json.data[i].id);
                del.setAttribute("data-opeate", json.data[i].id);

                show.onclick = function () {
                    // console.log(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '部门权限设置'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $("#modal-permission")
                    });

                    showPermissionBeforeUpdate();
                }
                edit.onclick = function () {
                    //alert(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '部门编辑'
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
        }
    }
}


document.getElementById("modal-del-ok").onclick = function () {


    var params = {
        "apiName": "Department_Delete_Api",
        "departmentId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        //console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);

                var dialogDel = document.getElementById("modal-del");
                dialogDel.style.display = "none";
            }


        }
    }
}
document.getElementById("modal-del-cancel").onclick = function () {
    var dialogDel = document.getElementById("modal-del");
    dialogDel.style.display = "none";
}

function showDetailBeforeUpdate() {
    var params = {
        "apiName": "Department_QueryDetail_Api",
        "departmentId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        // console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                document.getElementById("update-name").value = json.data.name;
                document.getElementById("update-desc").value = json.data.desc;
            }


        }
    }
}
document.getElementById("update-save").onclick = function () {
    var params = {
        "apiName": "Department_Update_Api",
        "departmentId": operateId,
        "name": document.getElementById("update-name").value,
        "desc": document.getElementById("update-desc").value
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        // console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            feedback("update-save", "保存成功");


            window.setTimeout(function () {
                // window.location.reload();
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);
            }, 2000);

        }
    };
}

function setEnable(enable) {
    // console.log(enable)
    var params = {
        "apiName": "Department_Update_Api",
        "departmentId": operateId,
        "enable": enable
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                clearTable();
                requestOnePage(pageIndex, 8);
            }

        }
    };
}


document.getElementById("add-department").onclick = function () {
    layer.open({
        type: 1
        , area: ['800px', '600px']
        , title: '添加部门'
        , shade: 0.6
        , maxmin: false
        , anim: 1
        , content: $("#modal-add")
    });

}

document.getElementById("add-save").onclick = function () {
    var params = {
        "apiName": "Department_Add_Api",
        "name": document.getElementById("add-name").value,
        "desc": document.getElementById("add-desc").value
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        // console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            feedback("add-save", "保存成功");


            window.setTimeout(function () {
                // window.location.reload();
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);
            }, 2000);

        }
    };
}

//["orderQuery","orderUpdate","orderDelete",
// "goodsAdd","goodsUpdate","goodsDelete",
// "roomCardAdd","roomCardUpdate","roomCardDelete",
// "withdrawCashAuditAgree","withdrawCashAuditReject",
// "stockQuery","stockUpdate",
// "bannerManage","choiceBannerManage","goodsHotWordsManage","imageTextAdd",
// "departmentMemberQuery","departmentMemberUpdate"]"

var groupOrder = document.getElementById("group-order");
var groupGoods = document.getElementById("group-goods");
var groupRoomCard = document.getElementById("group-roomCard");
var groupFinance = document.getElementById("group-finance");
var groupStock = document.getElementById("group-stock");
var groupOperate = document.getElementById("group-operate");
var groupDepartment = document.getElementById("group-department");

var itemOrderQuery = document.getElementById("item-orderQuery");
var itemOrderUpdate = document.getElementById("item-orderUpdate");
var itemOrderDelete = document.getElementById("item-orderDelete");

var itemGoodsAdd = document.getElementById("item-goodsAdd");
var itemGoodsUpdate = document.getElementById("item-goodsUpdate");
var itemGoodsDelete = document.getElementById("item-goodsDelete");

var itemRoomCardAdd = document.getElementById("item-roomCardAdd");
var itemRoomCardUpdate = document.getElementById("item-roomCardUpdate");
var itemRoomCardDelete = document.getElementById("item-roomCardDelete");

var itemWithdrawCashAuditAgree = document.getElementById("item-withdrawCashAuditAgree");
var itemWithdrawCashAuditReject = document.getElementById("item-withdrawCashAuditReject");

var itemStockQuery = document.getElementById("item-stockQuery");
var itemStockUpdate = document.getElementById("item-stockUpdate");

var itemBannerManage = document.getElementById("item-bannerManage");
var itemChoiceBannerManage = document.getElementById("item-choiceBannerManage");
var itemGoodsHotWordsManage = document.getElementById("item-goodsHotWordsManage");
var itemImageTextAdd = document.getElementById("item-imageTextAdd");

var itemDepartmentMemberQuery = document.getElementById("item-departmentMemberQuery");
var itemDepartmentMemberUpdate = document.getElementById("item-departmentMemberUpdate");

function showPermissionBeforeUpdate() {
    groupOrder.checked = false;
    groupGoods.checked = false;
    groupRoomCard.checked = false;
    groupFinance.checked = false;
    groupStock.checked = false;
    groupOperate.checked = false;
    groupDepartment.checked = false;


    var params = {
        "apiName": "Department_QueryDetail_Api",
        "departmentId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                var permissions = JSON.parse(json.data.permissions);

                itemOrderQuery.checked = (permissions[0] == "orderQuery" ? true : false);
                itemOrderUpdate.checked = (permissions[1] == "orderUpdate" ? true : false);
                itemOrderDelete.checked = (permissions[2] == "orderDelete" ? true : false);

                itemGoodsAdd.checked = (permissions[3] == "goodsAdd" ? true : false);
                itemGoodsUpdate.checked = (permissions[4] == "goodsUpdate" ? true : false);
                itemGoodsDelete.checked = (permissions[5] == "goodsDelete" ? true : false);

                itemRoomCardAdd.checked = (permissions[6] == "roomCardAdd" ? true : false);
                itemRoomCardUpdate.checked = (permissions[7] == "roomCardUpdate" ? true : false);
                itemRoomCardDelete.checked = (permissions[8] == "roomCardDelete" ? true : false);

                itemWithdrawCashAuditAgree.checked = (permissions[9] == "withdrawCashAuditAgree" ? true : false);
                itemWithdrawCashAuditReject.checked = (permissions[10] == "withdrawCashAuditReject" ? true : false);

                itemStockQuery.checked = (permissions[11] == "stockQuery" ? true : false);
                itemStockUpdate.checked = (permissions[12] == "stockUpdate" ? true : false);

                itemBannerManage.checked = (permissions[13] == "bannerManage" ? true : false);
                itemChoiceBannerManage.checked = (permissions[14] == "choiceBannerManage" ? true : false);
                itemGoodsHotWordsManage.checked = (permissions[15] == "goodsHotWordsManage" ? true : false);
                itemImageTextAdd.checked = (permissions[16] == "imageTextAdd" ? true : false);

                itemDepartmentMemberQuery.checked = (permissions[17] == "departmentMemberQuery" ? true : false);
                itemDepartmentMemberUpdate.checked = (permissions[18] == "departmentMemberUpdate" ? true : false);


            }


        }
    }
}

document.getElementById("permission-save").onclick = function () {
    var permissions = [];
    permissions[0] = (itemOrderQuery.checked == true ? "orderQuery" : "")
    permissions[1] = (itemOrderUpdate.checked == true ? "orderUpdate" : "")
    permissions[2] = (itemOrderDelete.checked == true ? "orderDelete" : "")

    permissions[3] = (itemGoodsAdd.checked == true ? "goodsAdd" : "")
    permissions[4] = (itemGoodsUpdate.checked == true ? "goodsUpdate" : "")
    permissions[5] = (itemGoodsDelete.checked == true ? "goodsDelete" : "")

    permissions[6] = (itemRoomCardAdd.checked == true ? "roomCardAdd" : "")
    permissions[7] = (itemRoomCardUpdate.checked == true ? "roomCardUpdate" : "")
    permissions[8] = (itemRoomCardDelete.checked == true ? "roomCardDelete" : "")

    permissions[9] = (itemWithdrawCashAuditAgree.checked == true ? "withdrawCashAuditAgree" : "")
    permissions[10] = (itemWithdrawCashAuditReject.checked == true ? "withdrawCashAuditReject" : "")

    permissions[11] = (itemStockQuery.checked == true ? "stockQuery" : "")
    permissions[12] = (itemStockUpdate.checked == true ? "stockUpdate" : "")

    permissions[13] = (itemBannerManage.checked == true ? "bannerManage" : "")
    permissions[14] = (itemChoiceBannerManage.checked == true ? "choiceBannerManage" : "")
    permissions[15] = (itemGoodsHotWordsManage.checked == true ? "goodsHotWordsManage" : "")
    permissions[16] = (itemImageTextAdd.checked == true ? "imageTextAdd" : "")

    permissions[17] = (itemDepartmentMemberQuery.checked == true ? "departmentMemberQuery" : "")
    permissions[18] = (itemDepartmentMemberUpdate.checked == true ? "departmentMemberUpdate" : "")


    var params = {
        "apiName": "Department_Update_Api",
        "departmentId": operateId,
        "permissions": JSON.stringify(permissions)
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                feedback("permission-save", "保存成功");


                window.setTimeout(function () {
                    // window.location.reload();
                    layer.closeAll();
                    clearTable();
                    requestOnePage(pageIndex, 8);
                }, 2000);
            }

        }
    };
}


groupOrder.onclick = function () {
    if (this.checked) {
        itemOrderQuery.checked = true;
        itemOrderUpdate.checked = true;
        itemOrderDelete.checked = true;
    } else {
        itemOrderQuery.checked = false;
        itemOrderUpdate.checked = false;
        itemOrderDelete.checked = false;
    }
}
groupGoods.onclick = function () {
    if (this.checked) {
        itemGoodsAdd.checked = true;
        itemGoodsUpdate.checked = true;
        itemGoodsDelete.checked = true;
    } else {
        itemGoodsAdd.checked = false;
        itemGoodsUpdate.checked = false;
        itemGoodsDelete.checked = false;
    }
}
groupRoomCard.onclick = function () {
    if (this.checked) {
        itemRoomCardAdd.checked = true;
        itemRoomCardUpdate.checked = true;
        itemRoomCardDelete.checked = true;
    } else {
        itemRoomCardAdd.checked = false;
        itemRoomCardUpdate.checked = false;
        itemRoomCardDelete.checked = false;
    }
}
groupFinance.onclick = function () {
    if (this.checked) {
        itemWithdrawCashAuditAgree.checked = true;
        itemWithdrawCashAuditReject.checked = true;
    } else {
        itemWithdrawCashAuditAgree.checked = false;
        itemWithdrawCashAuditReject.checked = false;
    }
}
groupStock.onclick = function () {
    if (this.checked) {
        itemStockQuery.checked = true;
        itemStockUpdate.checked = true;
    } else {
        itemStockQuery.checked = false;
        itemStockUpdate.checked = false;
    }
}
groupOperate.onclick = function () {
    if (this.checked) {
        itemBannerManage.checked = true;
        itemChoiceBannerManage.checked = true;
        itemGoodsHotWordsManage.checked = true;
        itemImageTextAdd.checked = true;
    } else {
        itemBannerManage.checked = false;
        itemChoiceBannerManage.checked = false;
        itemGoodsHotWordsManage.checked = false;
        itemImageTextAdd.checked = false;
    }
}
groupDepartment.onclick = function () {
    if (this.checked) {
        itemDepartmentMemberQuery.checked = true;
        itemDepartmentMemberUpdate.checked = true;
    } else {
        itemDepartmentMemberQuery.checked = false;
        itemDepartmentMemberUpdate.checked = false;
    }
}