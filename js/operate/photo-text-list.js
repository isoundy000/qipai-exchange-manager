requestOnePage(pageIndex, 8);
function requestOnePage(index, size) {
    var params = {
        "apiName": "ImageText_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
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


                appendTdAndData(tr, json.data[i].title);
                appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd hh:mm:ss"));

                var cell = appendTd(tr);
                var show = document.createElement("a");
                var edit = document.createElement("a");
                edit.style.margin = "8px";
                var del = document.createElement("a");

                show.setAttribute("href", "javascript:void(0)");
                edit.setAttribute("href", "javascript:void(0)");
                del.setAttribute("href", "javascript:void(0)");


                show.innerHTML = "编辑标题";
                edit.innerHTML = "编辑富文本";
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
                        , title: '图文标题编辑'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $("#modal-editTitle")
                    });

                    showTitleBeforeUpdate();
                }
                edit.onclick = function () {
                    //alert(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '图文富文本编辑'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $("#modal-richText")
                    });

                    showRichText();
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
        "apiName": "ImageText_Delete_Api",
        "imageTextId": operateId
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

document.getElementById("add-imageText").onclick = function () {
    layer.open({
        type: 1
        , area: ['800px', '600px']
        , title: '添加图文'
        , shade: 0.6
        , maxmin: false
        , anim: 1
        , content: $("#modal-add")
    });

}

document.getElementById("add-save").onclick = function () {
    var params = {
        "apiName": "ImageText_Add_Api",
        "title": document.getElementById("add-title").value
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

function showTitleBeforeUpdate() {
    var params = {
        "apiName": "ImageText_QueryDetail_Api",
        "imageTextId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        // console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                document.getElementById("editTitle-title").value = json.data.title;
            }


        }
    }
}


document.getElementById("editTitle-save").onclick = function () {
    var params = {
        "apiName": "ImageText_Update_Api",
        "imageTextId": operateId,
        "title": document.getElementById("editTitle-title").value
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        // console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            feedback("editTitle-save", "保存成功");


            window.setTimeout(function () {
                // window.location.reload();
                layer.closeAll();
                clearTable();
                requestOnePage(pageIndex, 8);
            }, 2000);

        }
    };
}


function showRichText() {
    var params = {
        "apiName": "ImageText_QueryDetail_Api",
        "imageTextId": operateId
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        // console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                var editor = window.frames["richText-box"].contentWindow.document.getElementById("editor");
                editor.innerHTML = json.data.content;
            }


        }
    }

}


document.getElementById("richText-save").onclick = function () {

    var editor = window.frames["richText-box"].contentWindow.document.getElementById("editor");

    var params = {
        "apiName": "ImageText_Update_Api",
        "imageTextId": operateId,
        "content": editor.innerHTML
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            feedback("richText-save", "保存成功");


            // window.setTimeout(function () {
            //     // window.location.reload();
            //     layer.closeAll();
            //     clearTable();
            //     requestOnePage(pageIndex, 8);
            // }, 2000);


        }
    };

};