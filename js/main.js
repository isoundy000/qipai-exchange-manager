var title = document.getElementById("title");

var navMainItems = document.getElementById("nav-main-menu").getElementsByTagName("li");

var subItemSelected = -1;

for (var i = 0; i < navMainItems.length; i++) {
    navMainItems[i].onclick = function () {
        for (var i = 0; i < navMainItems.length; i++) {
            navMainItems[i].style.backgroundColor = getCssValue("--main-nav-bg-color");
            navMainItems[i].getElementsByTagName("img")[0].setAttribute("src", "../img/triangle-right-black.png")
        }
        this.style.backgroundColor = getCssValue("--main-nav-click-bg-color");
        this.getElementsByTagName("img")[0].setAttribute("src", "../img/triangle-bottom-black.png")

        showNavSubMenu(this.getAttribute("data-index"));

    }
    navMainItems[i].onmouseover = function () {
        if (this.style.backgroundColor !== hexToRGB(getCssValue("--main-nav-click-bg-color"))) {
            this.style.backgroundColor = getCssValue("--main-nav-hover-bg-color")
        }
    }
    navMainItems[i].onmouseout = function () {
        if (this.style.backgroundColor !== hexToRGB(getCssValue("--main-nav-click-bg-color"))) {
            this.style.backgroundColor = getCssValue("--main-nav-bg-color");
        }
    }
}

function showNavSubMenu(index) {

    switch (index) {
        case "0":
            //window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Order();
            showNavSubMenu4Order();
            break;
        case "1":
            // window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4RoomCard();
            showNavSubMenu4RoomCard();
            break;
        case "2":
            // window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Goods();
            showNavSubMenu4Goods();
            break;
        case "3":
            // window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Stock();
            showNavSubMenu4Stock();
            break;
        case "4":
            // window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Operate();
            showNavSubMenu4Operate();
            break;
        case "5":
            // window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Finance();
            showNavSubMenu4Finance();
            break;
        case "6":
            // window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4UserManagement();
            showNavSubMenu4UserManagement();
            break;
        case "7":
            // window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4PermissionsManagement();
            showNavSubMenu4PermissionsManagement();
            break;
    }

}


// nav-sub


var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");

var selectedItem = "-1";

for (var i = 0; i < navSubItems.length; i++) {
    navSubItems[i].onclick = function () {
        for (var i = 0; i < navSubItems.length; i++) {
            navSubItems[i].style.backgroundColor = getCssValue("--sub-nav-bg-color");
        }
        this.style.backgroundColor = getCssValue("--sub-nav-click-bg-color");


        var attribute = this.getAttribute("data-url");
        var titleText = this.getAttribute("data-title");
        selectedItem = this.getAttribute("data-selected");
        // console.log(window.location);
        // console.log(attribute);
        //showNavSubMenu(this.getAttribute("data-index"));
        var biIframe = document.getElementById("bi-iframe");
        biIframe.setAttribute("src", attribute);
        //parent.window.test1();
        title.innerHTML = titleText;


    }
    navSubItems[i].onmouseover = function () {
        if (this.style.backgroundColor !== hexToRGB(getCssValue("--sub-nav-click-bg-color"))) {
            this.style.backgroundColor = getCssValue("--sub-nav-hover-bg-color");
        }
    }
    navSubItems[i].onmouseout = function () {
        if (this.style.backgroundColor !== hexToRGB(getCssValue("--sub-nav-click-bg-color"))) {
            this.style.backgroundColor = getCssValue("--sub-nav-bg-color");
        }

    }
}

function showNavSubMenu4Order() {
    //商品订单列表
    //商品订单详情
    //房卡订单列表
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "00") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "商品订单列表";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "order/goods-order-list.html");
    navSubItems[0].setAttribute("data-selected", "0000");
    navSubItems[0].setAttribute("data-title", title);


    var title = "房卡订单列表";
    navSubItems[1].innerHTML = title;
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "order/room-card-order-list.html");
    navSubItems[1].setAttribute("data-selected", "0001");
    navSubItems[1].setAttribute("data-title", title);
}
function showNavSubMenu4RoomCard() {
    //房卡列表
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "01") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "房卡列表";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "room-card/room-card-list.html");
    navSubItems[0].setAttribute("data-selected", "0100");
    navSubItems[0].setAttribute("data-title", title);

    // var title = "添加房卡";
    // navSubItems[1].innerHTML = title;
    // navSubItems[1].style.display = "block";
    // navSubItems[1].setAttribute("data-url", "room-card/room-card-add.html");
    // navSubItems[1].setAttribute("data-selected", "0101");
    // navSubItems[1].setAttribute("data-title", title);


}
function showNavSubMenu4Goods() {
    //商品列表
    //商品添加
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "02") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "商品列表";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "goods/goods-list.html");
    navSubItems[0].setAttribute("data-selected", "0200");
    navSubItems[0].setAttribute("data-title", title);

    var title = "商品添加";
    navSubItems[1].innerHTML = title;
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "goods/goods-add.html");
    navSubItems[1].setAttribute("data-selected", "0201");
    navSubItems[1].setAttribute("data-title", title);

    var title = "商品类别";
    navSubItems[2].innerHTML = title;
    navSubItems[2].style.display = "block";
    navSubItems[2].setAttribute("data-url", "goods/goods-category.html");
    navSubItems[2].setAttribute("data-selected", "0202");
    navSubItems[2].setAttribute("data-title", title);
}
function showNavSubMenu4Stock() {
    //库存列表
    //新增入库
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "03") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "入库列表";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "stock/stock-in-list.html");
    navSubItems[0].setAttribute("data-selected", "0300");
    navSubItems[0].setAttribute("data-title", title);

    var title = "出库列表";
    navSubItems[1].innerHTML = title;
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "stock/stock-out-list.html");
    navSubItems[1].setAttribute("data-selected", "0301");
    navSubItems[1].setAttribute("data-title", title);

    var title = "新增入库";
    navSubItems[2].innerHTML = title;
    navSubItems[2].style.display = "block";
    navSubItems[2].setAttribute("data-url", "stock/stock-add.html");
    navSubItems[2].setAttribute("data-selected", "0302");
    navSubItems[2].setAttribute("data-title", title);
}
function showNavSubMenu4Operate() {
    //banner管理
    //焦点图管理
    //搜索推荐管理
    //图文列表
    //添加图文
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "04") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "banner管理";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "operate/banner-management.html");
    navSubItems[0].setAttribute("data-selected", "0400");
    navSubItems[0].setAttribute("data-title", title);

    // var title = "焦点图管理";
    // navSubItems[1].innerHTML = title;
    // navSubItems[1].style.display = "block";
    // navSubItems[1].setAttribute("data-url", "operate/focus-photo-management.html");
    // navSubItems[1].setAttribute("data-selected", "0401");
    // navSubItems[1].setAttribute("data-title", title);

    var title = "热点词管理";
    navSubItems[1].innerHTML = title;
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "operate/search-management.html");
    navSubItems[1].setAttribute("data-selected", "0401");
    navSubItems[1].setAttribute("data-title", title);

    var title = "图文列表";
    navSubItems[2].innerHTML = title;
    navSubItems[2].style.display = "block";
    navSubItems[2].setAttribute("data-url", "operate/photo-text-list.html");
    navSubItems[2].setAttribute("data-selected", "0402");
    navSubItems[2].setAttribute("data-title", title);

    var title = "添加图文";
    navSubItems[3].innerHTML = title;
    navSubItems[3].style.display = "block";
    navSubItems[3].setAttribute("data-url", "operate/add-photo-text.html");
    navSubItems[3].setAttribute("data-selected", "0403");
    navSubItems[3].setAttribute("data-title", title);
}
function showNavSubMenu4Finance() {
    //入账列表
    //提现列表
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "05") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "入账列表";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "finance/into-the-account-list.html");
    navSubItems[0].setAttribute("data-selected", "0500");
    navSubItems[0].setAttribute("data-title", title);

    var title = "提现列表";
    navSubItems[1].innerHTML = title;
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "finance/billing-list.html");
    navSubItems[1].setAttribute("data-selected", "0501");
    navSubItems[1].setAttribute("data-title", title);
}
function showNavSubMenu4UserManagement() {
    //用户列表
    //用户详情
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "06") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "用户列表";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "user/user-list.html");
    navSubItems[0].setAttribute("data-selected", "0600");
    navSubItems[0].setAttribute("data-title", title);

    var title = "用户详情";
    navSubItems[1].innerHTML = title;
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "user/user-detail.html");
    navSubItems[1].setAttribute("data-selected", "0601");
    navSubItems[1].setAttribute("data-title", title);
}
function showNavSubMenu4PermissionsManagement() {
    //部门列表
    //成员管理
    //权限设置
    //操作日志
    //数据库管理
    var navSubItems = document.getElementById("nav-sub-menu").getElementsByTagName("li");
    hidenAllNavSubItems(navSubItems);

    if (selectedItem.substr(0, 2) == "07") {
        var i = -1;
        i = selectedItem.substr(2, 2);
        navSubItems[Number(i)].style.backgroundColor = "#E0E5EB";
    }

    var title = "部门列表";
    navSubItems[0].innerHTML = title;
    navSubItems[0].style.display = "block";
    navSubItems[0].setAttribute("data-url", "permission/department-management.html");
    navSubItems[0].setAttribute("data-selected", "0700");
    navSubItems[0].setAttribute("data-title", title);

    var title = "成员管理";
    navSubItems[1].innerHTML = title;
    navSubItems[1].style.display = "block";
    navSubItems[1].setAttribute("data-url", "permission/member-management.html");
    navSubItems[1].setAttribute("data-selected", "0701");
    navSubItems[1].setAttribute("data-title", title);

    var title = "权限设置";
    navSubItems[2].innerHTML = title;
    navSubItems[2].style.display = "block";
    navSubItems[2].setAttribute("data-url", "permission/permission-settings.html");
    navSubItems[2].setAttribute("data-selected", "0702");
    navSubItems[2].setAttribute("data-title", title);

    var title = "操作日志";
    navSubItems[3].innerHTML = title;
    navSubItems[3].style.display = "block";
    navSubItems[3].setAttribute("data-url", "permission/operate-log.html");
    navSubItems[3].setAttribute("data-selected", "0703");
    navSubItems[3].setAttribute("data-title", title);

    var title = "数据库管理";
    navSubItems[4].innerHTML = title;
    navSubItems[4].style.display = "block";
    navSubItems[4].setAttribute("data-url", "permission/db-management.html");
    navSubItems[4].setAttribute("data-selected", "0704");
    navSubItems[4].setAttribute("data-title", title);
}

function hidenAllNavSubItems(navSubItems) {
    for (var i = 0; i < navSubItems.length; i++) {
        navSubItems[i].style.display = "none";

        navSubItems[i].style.backgroundColor = "#ffffff";
    }
}

//默认
document.getElementById("nav-main-item4").click();
document.getElementById("nav-sub-item0").click();


var toHide = document.getElementById("to-hide-main-nav");
var toShow = document.getElementById("to-show-main-nav");

toHide.onclick = function () {
    this.style.display = "none";
    toShow.style.display = "inline";

    document.getElementById("nav-main").style.display = "none";


};
toShow.onclick = function () {
    this.style.display = "none";
    toHide.style.display = "inline";

    document.getElementById("nav-main").style.display = "block";

};

