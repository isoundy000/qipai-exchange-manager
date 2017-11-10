






var navMainItems = document.getElementById("nav-main-menu").getElementsByTagName("li");

var subItemSelected=-1;

for(var i=0;i<navMainItems.length;i++){
    navMainItems[i].onclick=function () {
        for(var i=0;i<navMainItems.length;i++){
            navMainItems[i].style.backgroundColor="#2B7AD3";
        }
        this.style.backgroundColor="#ffffff";

        showNavSubMenu(this.getAttribute("data-index"));

    }
    navMainItems[i].onmouseover=function () {
        if (window.getComputedStyle(this ,null).getPropertyValue('background-color')!=="rgb(255, 255, 255)") {
            this.style.backgroundColor = "#8CD7DC";
        }
    }
    navMainItems[i].onmouseout=function () {
        if (window.getComputedStyle(this ,null).getPropertyValue('background-color')!=="rgb(255, 255, 255)") {
            this.style.backgroundColor="#2B7AD3";
        }

    }
}

function showNavSubMenu(index) {
    switch (index){
        case "0":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Order();
            break;
        case "1":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4RoomCard();
            break;
        case "2":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Goods();
            break;
        case "3":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Stock();
            break;
        case "4":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Operate();
            break;
        case "5":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4Finance();
            break;
        case "6":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4UserManagement();
            break;
        case "7":
            window.frames["nav-sub-iframe"].contentWindow.showNavSubMenu4PermissionsManagement();
            break;
    }

}