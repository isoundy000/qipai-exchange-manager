/**
 * Created by besthyhy on 17-12-1.
 */

function addUploadFunctionToImg(imgId) {
    document.getElementById(imgId).onclick = function () {
        document.getElementById(imgId + "-file").click();

    };
    document.getElementById(imgId + "-file").onchange = function () {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(imgId).setAttribute("src", e.target.result);
            document.getElementById(imgId).setAttribute("title", file.name);
        };

        reader.readAsDataURL(file);
    };
}


function feedback(elementId, msg) {
    var span = document.createElement("span");
    span.innerHTML = msg;
    after(span, document.getElementById(elementId));
    setTimeout(function () {
        span.style.display = "none";
    }, 1000);

}