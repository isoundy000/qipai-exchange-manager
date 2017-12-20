var title = document.getElementById("title");
var content = document.getElementById("content");
var save = document.getElementById("save");


save.onclick = function () {

    var params = {
        "apiName": "ImageText_Add_Api",
        "title": title.value,
        "content": content.value

    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                var feedback = document.createElement("div");
                feedback.innerHTML = "保存成功";
                after(feedback, save);

                setTimeout(function () {
                    feedback.style.display="none";
                },1000);
                // feedback("save","保存成功");
            }


        }
    };
}