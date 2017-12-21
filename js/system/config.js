var vipLevelUpConditionCommonVip = document.getElementById("vipLevelUpConditionCommonVip");
var vipLevelUpConditionGoldVip = document.getElementById("vipLevelUpConditionGoldVip");
var save = document.getElementById("save");

var params = {
    "apiName": "SystemConfig_QueryAll_Api"
};
var xmlhttp = post(params);

xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp.responseText);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var json = JSON.parse(xmlhttp.responseText);

        if (json.code == 0) {
            vipLevelUpConditionCommonVip.value = json.data.vipLevelUpConditionCommonVip;
            vipLevelUpConditionGoldVip.value = json.data.vipLevelUpConditionGoldVip;
        }

    }

}

save.onclick = function () {
    var params = {
        "apiName": "SystemConfig_Update_Api",
        "vipLevelUpConditionCommonVip": vipLevelUpConditionCommonVip.value,
        "vipLevelUpConditionGoldVip": vipLevelUpConditionGoldVip.value
    };
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

            if (json.code == 0) {
                feedback("save", "保存成功");

            }

        }

    }
}