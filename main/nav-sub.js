







var navMainItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");

var selectedItem = "-1";

for (var i = 0; i < navMainItems.length; i++) {
    navMainItems[i].onclick = function () {
        for (var i = 0; i < navMainItems.length; i++) {
            navMainItems[i].style.backgroundColor = "#ffffff";
        }
        this.style.backgroundColor = "#C5C587";


        var attribute = this.getAttribute("data-url");
        selectedItem = this.getAttribute("data-selected");
        console.log(attribute);
        console.log(window.location.href);
        //showNavSubMenu(this.getAttribute("data-index"));
        var biIframe = window.parent.document.getElementById("bi-iframe");
        biIframe.setAttribute("src","../goods/goods-list.html");
        parent.window.test1();

    }
    navMainItems[i].onmouseover = function () {
        if (window.getComputedStyle(this, null).getPropertyValue('background-color') !== "rgb(197, 197, 135)") {
            this.style.backgroundColor = "#94945E";
        }
    }
    navMainItems[i].onmouseout = function () {
        if (window.getComputedStyle(this, null).getPropertyValue('background-color') !== "rgb(197, 197, 135)") {
            this.style.backgroundColor = "#ffffff";
        }

    }
}

function showNavSubMenu4Order() {
    //商品订单列表
    //商品订单详情
    //房卡订单列表
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="00"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "商品订单列表";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "goods-order-list");
    navSubItems[0].setAttribute("data-selected", "0000");

    navSubItems[1].innerHTML = "商品订单详情";
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "goods-order-detail");
    navSubItems[1].setAttribute("data-selected", "0001");

    navSubItems[2].innerHTML = "房卡订单列表";
    navSubItems[2].style.display = "block";
    navSubItems[2].setAttribute("data-url", "room-card-order-list");
    navSubItems[2].setAttribute("data-selected", "0002");
}
function showNavSubMenu4RoomCard() {
    //房卡列表
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="01"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "房卡列表";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "room-card-list");
    navSubItems[0].setAttribute("data-selected", "0100");
}
function showNavSubMenu4Goods() {
    //商品列表
    //商品添加
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="02"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "商品列表";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "goods/goods-list.html");
    navSubItems[0].setAttribute("data-selected", "0200");

    navSubItems[1].innerHTML = "商品添加";
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "goods-add");
    navSubItems[1].setAttribute("data-selected", "0201");
}
function showNavSubMenu4Stock() {
    //库存列表
    //新增入库
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="03"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "库存列表";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "stock-list");
    navSubItems[0].setAttribute("data-selected", "0300");

    navSubItems[1].innerHTML = "新增入库";
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "stock-add");
    navSubItems[1].setAttribute("data-selected", "0301");
}
function showNavSubMenu4Operate() {
    //banner管理
    //焦点图管理
    //搜索推荐管理
    //图文列表
    //添加图文
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="04"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "banner管理";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "banner-management");
    navSubItems[0].setAttribute("data-selected", "0400");

    navSubItems[1].innerHTML = "焦点图管理";
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "focus-photo-management");
    navSubItems[1].setAttribute("data-selected", "0401");

    navSubItems[2].innerHTML = "搜索推荐管理";
    navSubItems[2].style.display = "block";
    navSubItems[2].setAttribute("data-url", "search-management");
    navSubItems[2].setAttribute("data-selected", "0402");

    navSubItems[3].innerHTML = "图文列表";
    navSubItems[3].style.display = "block";
    navSubItems[3].setAttribute("data-url", "photo-text-list");
    navSubItems[3].setAttribute("data-selected", "0403");

    navSubItems[4].innerHTML = "添加图文";
    navSubItems[4].style.display = "block";
    navSubItems[4].setAttribute("data-url", "add-photo-text");
    navSubItems[4].setAttribute("data-selected", "0404");
}
function showNavSubMenu4Finance() {
    //入账列表
    //提现列表
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="05"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "入账列表";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "into-the-account-list");
    navSubItems[0].setAttribute("data-selected", "0500");

    navSubItems[1].innerHTML = "提现列表";
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "billing-list");
    navSubItems[1].setAttribute("data-selected", "0501");
}
function showNavSubMenu4UserManagement() {
    //用户列表
    //用户详情
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="06"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "用户列表";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "user-list");
    navSubItems[0].setAttribute("data-selected", "0600");

    navSubItems[1].innerHTML = "用户详情";
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "user-detail");
    navSubItems[1].setAttribute("data-selected", "0601");
}
function showNavSubMenu4PermissionsManagement() {
    //部门列表
    //成员管理
    //权限设置
    //操作日志
    //数据库管理
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0,2)=="07"){
        var i=-1;
        i=selectedItem.substr(2,2);
        navSubItems[Number(i)].style.backgroundColor = "#C5C587";
    }

    navSubItems[0].innerHTML = "部门列表";
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "department-management");
    navSubItems[0].setAttribute("data-selected", "0700");

    navSubItems[1].innerHTML = "成员管理";
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "user-management");
    navSubItems[1].setAttribute("data-selected", "0701");

    navSubItems[2].innerHTML = "权限设置";
    navSubItems[2].style.display = "block";
    navSubItems[2].setAttribute("data-url", "permission-management");
    navSubItems[2].setAttribute("data-selected", "0702");

    navSubItems[3].innerHTML = "操作日志";
    navSubItems[3].style.display = "block";
    navSubItems[3].setAttribute("data-url", "operate-log");
    navSubItems[3].setAttribute("data-selected", "0703");

    navSubItems[4].innerHTML = "数据库管理";
    navSubItems[4].style.display = "block";
    navSubItems[4].setAttribute("data-url", "db-management");
    navSubItems[4].setAttribute("data-selected", "0704");
}

function hidenAllNavSubItems(navSubItems) {
    for (var i = 0; i < navSubItems.length; i++) {
        navSubItems[i].style.display = "none";

        navSubItems[i].style.backgroundColor = "#ffffff";
    }
}