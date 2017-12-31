var categoryName = document.getElementById("category-name");
var categoryReorder = document.getElementById("category-reorder");

// var add = document.getElementById("add");
// add.onclick = function () {
//     var params = {
//         "apiName": "GoodsCategory_Add_Api",
//         "name": categoryName.value,
//         "reorder": Number(categoryReorder.innerHTML)
//     };
//     var xmlhttp = post(params);
//     xmlhttp.onreadystatechange = function () {
//         console.log(xmlhttp.responseText);
//
//
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             var json = JSON.parse(xmlhttp.responseText);
//             if (json.code == 0) {
//                 var addFeedback = document.getElementById("add-feedback");
//                 addFeedback.style.display = "block";
//                 addFeedback.innerHTML = "添加成功";
//
//
//                 window.setTimeout(function () {
//                     addFeedback.style.display = "none";
//                     window.location.reload();
//                 }, 1000);
//
//             }
//         }
//
//     }
// };
requestOnePage();

function requestOnePage() {
    var params = {
        "apiName": "GoodsCategory_QueryAll_Api"
    }
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


            var imgBox = appendTdAndData(tr, "");
            var img = document.createElement("img");

            // console.log(json.data[i].picture)
            img.setAttribute("src", json.data[i].picture);


            img.style.width = "50px"
            img.style.height = "50px"

            imgBox.appendChild(img);

            appendTdAndData(tr, json.data[i].name);
            // appendTdAndData(tr,json.data[i].reorder);


            var cell = appendTd(tr);
            //var show = document.createElement("a");
            var edit = document.createElement("a");
            edit.style.margin = "8px";
            // var del = document.createElement("a");

            //show.setAttribute("href", "javascript:void(0)");
            edit.setAttribute("href", "javascript:void(0)");
            // del.setAttribute("href", "javascript:void(0)");


            //show.innerHTML = "查看";
            edit.innerHTML = "编辑";
            // del.innerHTML = "删除";
            //cell.appendChild(show);
            cell.appendChild(edit);
            // cell.appendChild(del);

            //show.setAttribute("data-opeate", json.data[i].id);
            edit.setAttribute("data-opeate", json.data[i].id);
            // del.setAttribute("data-opeate", json.data[i].id);

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
                    , area: ['800px', '600px']
                    , title: '商品类别编辑'
                    , shade: 0.6
                    , maxmin: false
                    , anim: 1
                    , content: $("#modal-update")
                });

                showDetailBeforeUpdate();
            }
            // del.onclick = function () {
            //     //alert(this.getAttribute("data-opeate"));
            //     operateId = this.getAttribute("data-opeate");
            //     var dialogDel = document.getElementById("modal-del");
            //     dialogDel.style.display = "block";
            //
            // }

        }
    });

}


// document.getElementById("modal-del-ok").onclick = function () {
//
//     var params = {
//         "apiName": "GoodsCategory_Delete_Api",
//         "categoryId": operateId
//     }
//     var xmlhttp = post(params);
//
//     xmlhttp.onreadystatechange = function () {
//         console.log(xmlhttp.responseText);
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             console.log(xmlhttp.responseText);
//             var json = JSON.parse(xmlhttp.responseText);
//
//             if (json.code == 0) {
//                 clearTable();
//                 requestOnePage();
//
//                 var dialogDel = document.getElementById("modal-del");
//                 dialogDel.style.display = "none";
//             }
//
//
//         }
//     }
// }
// document.getElementById("modal-del-cancel").onclick = function () {
//     var dialogDel = document.getElementById("modal-del");
//     dialogDel.style.display = "none";
// }

var pictures = [];

function showDetailBeforeUpdate() {
    var params = {
        "apiName": "GoodsCategory_QueryDetail_Api",
        "categoryId": operateId
    }
    var xmlhttp = post(params, function (json) {
        // console.log(json)

        pictures[0] = json.data.picture;

        document.getElementById("update-name").value = json.data.name;
        // document.getElementById("update-order").value=json.data.reorder;
        document.getElementById("update-img").src = json.data.picture;
    });


}

addUploadFunctionToImg("update-img");

document.getElementById("update-upload-button").onclick = function () {
    var file1 = document.getElementById("update-img-file").files[0];
    var formData = new FormData();
    formData.append("file1", file1);

    var xmlhttp = upload(formData);


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);

            var json = JSON.parse(xmlhttp.responseText);
            if (json.code == 0) {
                uploaded = 1;

                pictures[0] = json.data[0].url;

                feedback("update-upload-button", "上传成功");


            }

        }
    }


};

document.getElementById("update").onclick = function () {
    var name1 = document.getElementById("update-name");
    var order = document.getElementById("update-order");


    var params = {
        "apiName": "GoodsCategory_Update_Api",
        "categoryId": operateId,
        "name": name1.value
    };

    if (pictures.length>0){
        params["pictures"]=pictures[0]
    }

    console.log(params)

    var xmlhttp = post(params, function (json) {
        // console.log(JSON.stringify(json))
        feedback("update", "保存成功");


        window.setTimeout(function () {
            // window.location.reload();
            layer.closeAll();
            clearTable();
            requestOnePage();
        }, 2000);
    });

}

