var table = document.getElementById("table");
console.log(window.getComputedStyle(table, null).width);
var theadCells = document.getElementById("thead-tr").getElementsByTagName("th");


var isFirstPage = -1;
var isLastPage = -1;
var pageIndex = 0;
var pageSize = -1;
var totalPages = -1;
var totalRecords = -1;
var operateId = "";

requestOnePage(pageIndex, 8);


function requestOnePage(index, size) {
    var params = {
        "apiName": "Goods_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);
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


                var imgBox = appendTdAndData(tr, "");
                var img = document.createElement("img");

                console.log(json.data[i].pictures);
                if (json.data[i].pictures.length > 0) {
                    img.setAttribute("src", JSON.parse(json.data[i].pictures));
                }


                img.style.width = "50px"
                img.style.height = "50px"

                imgBox.appendChild(img);

                appendTdAndData(tr, json.data[i].name);
                appendTdAndData(tr, json.data[i].price);
                appendTdAndData(tr, json.data[i].vipPrice);
                appendTdAndData(tr, json.data[i].goldVipPrice);
                appendTdAndData(tr, "-");
                appendTdAndData(tr, json.data[i].stock);
                appendTdAndData(tr, "-");
                appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd"));
                var cell = appendTd(tr);
                var show = document.createElement("a");
                var edit = document.createElement("a");
                edit.style.margin = "8px";
                var del = document.createElement("a");

                show.setAttribute("href", "javascript:void(0)");
                edit.setAttribute("href", "javascript:void(0)");
                del.setAttribute("href", "javascript:void(0)");


                show.innerHTML = "查看";
                edit.innerHTML = "编辑";
                del.innerHTML = "删除";
                cell.appendChild(show);
                cell.appendChild(edit);
                cell.appendChild(del);

                show.setAttribute("data-opeate", json.data[i].id);
                edit.setAttribute("data-opeate", json.data[i].id);
                del.setAttribute("data-opeate", json.data[i].id);

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
                        , content: $(".modal-detail")
                    });

                    showDetail();
                }
                edit.onclick = function () {
                    //alert(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '商品编辑'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $(".modal-detail")
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


document.getElementById("dialog-del-ok").onclick = function () {


    var params = {
        "apiName": "Goods_Delete_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        //console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);

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

function showDetail() {
    var params = {
        "apiName": "Goods_QueryDetail_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                document.getElementById("add-name").value = json.data.name;
                document.getElementById("add-category-id").value = json.data.categoryName;
                document.getElementById("add-price").value = json.data.price;
                document.getElementById("add-vip-price").value = json.data.vipPrice;
                document.getElementById("add-gold-vip-price").value = json.data.goldVipPrice;
                document.getElementById("add-stock").value = json.data.stock;
                document.getElementById("add-create-time").value = new Date(json.data.dtCreate).Format("yyyy-MM-dd hh:mm:ss");
                document.getElementById("add-is-delete").value = (json.data.isDelete) == 0 ? "正常" : "已删除";
                document.getElementById("add-detail").value = json.data.detail;

                var images = JSON.parse(json.data.pictures);
                if (images.length >= 1) {
                    document.getElementById("upload-img1").setAttribute("src", images[0]);
                }
                if (images.length >= 2) {
                    document.getElementById("upload-img2").setAttribute("src", images[1]);
                }
                if (images.length >= 3) {
                    document.getElementById("upload-img3").setAttribute("src", images[2]);
                }
                if (images.length >= 4) {
                    document.getElementById("upload-img4").setAttribute("src", images[3]);
                }
                if (images.length >= 5) {
                    document.getElementById("upload-img5").setAttribute("src", images[4]);
                }


            }


        }
    }
}

function showDetailBeforeUpdate() {
    var params = {
        "apiName": "Goods_QueryDetail_Api",
        "goodsId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                document.getElementById("update-name").value = json.data.name;

                document.getElementById("add-category-id")
                var params1 = {
                    "apiName": "GoodsCategory_QueryAll_Api"
                };
                var xmlhttp1 = post(params1);

                xmlhttp1.onreadystatechange = function () {
                    console.log(xmlhttp1.responseText);
                    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                        var json1 = JSON.parse(xmlhttp1.responseText);

                        var select1 = document.getElementById("select");
                        if (json1.code == 0) {
                            for (var i = 0; i < json1.data.length; i++) {
                                var option1 = document.createElement("option");
                                option1.value = json1.data[i].id;
                                option1.innerText = json1.data[i].name;
                                select1.appendChild(option1);

                                if ((json1.data[i].id) == json.data.categoryId) {
                                    select1.selectedIndex = i;
                                }
                            }
                        }
                    }
                };


                document.getElementById("update-price").value = json.data.price;
                document.getElementById("update-vip-price").value = json.data.vipPrice;
                document.getElementById("update-gold-vip-price").value = json.data.goldVipPrice;
                document.getElementById("update-detail").value = json.data.detail;

                var images = JSON.parse(json.data.pictures);
                if (images.length >= 1) {
                    document.getElementById("update-upload-img1").setAttribute("src", images[0]);
                }
                if (images.length >= 2) {
                    document.getElementById("update-upload-img2").setAttribute("src", images[1]);
                }
                if (images.length >= 3) {
                    document.getElementById("update-upload-img3").setAttribute("src", images[2]);
                }
                if (images.length >= 4) {
                    document.getElementById("update-upload-img4").setAttribute("src", images[3]);
                }
                if (images.length >= 5) {
                    document.getElementById("update-upload-img5").setAttribute("src", images[4]);
                }


            }


        }
    }
}

var uploaded = -1;
var pictures = [];


document.getElementById("update-upload-img1").onclick = function () {
    document.getElementById("upload1").click();

};

document.getElementById("update-upload-img2").onclick = function () {
    document.getElementById("upload2").click();

};
document.getElementById("update-upload-img3").onclick = function () {
    document.getElementById("upload3").click();

};
document.getElementById("update-upload-img4").onclick = function () {
    document.getElementById("upload4").click();

};
document.getElementById("update-upload-img5").onclick = function () {
    document.getElementById("upload5").click();

};

document.getElementById("upload1").onchange = function () {
    var file = document.getElementById("upload1").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("update-upload-img1").setAttribute("src", e.target.result);
        document.getElementById("update-upload-img1").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload1").onchange = function () {
    var file = document.getElementById("upload1").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("update-upload-img1").setAttribute("src", e.target.result);
        document.getElementById("update-upload-img1").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload2").onchange = function () {
    var file = document.getElementById("upload2").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("update-upload-img2").setAttribute("src", e.target.result);
        document.getElementById("update-upload-img2").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload3").onchange = function () {
    var file = document.getElementById("upload3").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("update-upload-img3").setAttribute("src", e.target.result);
        document.getElementById("update-upload-img3").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload4").onchange = function () {
    var file = document.getElementById("upload4").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("update-upload-img4").setAttribute("src", e.target.result);
        document.getElementById("update-upload-img4").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};
document.getElementById("upload5").onchange = function () {
    var file = document.getElementById("upload5").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("update-upload-img5").setAttribute("src", e.target.result);
        document.getElementById("update-upload-img5").setAttribute("title", file.name);
    };

    reader.readAsDataURL(file);
};

document.getElementById("upload-button").onclick = function () {
    // document.getElementById("myform").submit();
    var file1 = document.getElementById("upload1").files[0];
    var file2 = document.getElementById("upload2").files[0];
    var file3 = document.getElementById("upload3").files[0];
    var file4 = document.getElementById("upload4").files[0];
    var file5 = document.getElementById("upload5").files[0];


    var formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("file4", file4);
    formData.append("file5", file5);
    var xmlhttp = upload(formData);


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);

            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                uploaded = 1;
                for (var i = 0; i < json.data.length; i++) {
                    // console.log(json.data[0].url);
                    pictures[i] = json.data[i].url;
                    // console.log("fsfs"+pictures.toString())
                }

            }

        }
    }


};
document.getElementById("save").onclick = function () {
    var select = document.getElementById("select");
    var name = document.getElementById("update-name");
    var price = document.getElementById("update-price");
    var vipPrice = document.getElementById("update-vip-price");
    var goldVipPrice = document.getElementById("update-gold-vip-price");
    var reorder = document.getElementById("update-reorder");
    var detail = document.getElementById("update-detail");

    if (name.value == "") {
        console.log("yes");


        return;

    }

    console.log("name:" + name.value);
    console.log(detail.value);
    console.log(pictures);

    var params = {
        "apiName": "Goods_Add_Api",
        "categoryId": select.options[select.selectedIndex].value,
        "name": name.value,
        "price": price.value,
        "vipPrice": vipPrice.value,
        "goldVipPrice": goldVipPrice.value,
        "reorder": reorder.value,
        "stock": 0,
        "pictures": pictures,
        "detail": detail.value
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        //console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            layer.closeAll();
            clearTable();
            requestOnePage(pageIndex, 8);


        }
    };
};
