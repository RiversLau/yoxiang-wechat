var host = getIfc_url();
var serverApi = 'doctor/apply/register';
window.onload = function () {
    /* function GetRequest() {
     var url = location.search; //获取url中"?"符后的字串
     var theRequest = new Object();
     var strs;
     if (url.indexOf("?") != -1) {
     var str = url.substr(1);
     strs = str.split("&");
     for (var i = 0; i < strs.length; i++) {
     theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
     }
     }
     return theRequest;
     }

     var Request = GetRequest();
     var code;
     code = Request['code'];
     if (!code) {
     var href = window.location.href;
     var whref = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbc411fd7375ad99a&redirect_uri=' + encodeURIComponent(href) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
     window.location.href = whref;
     } else {
     $.ajax({
     type: "post",
     url: j0host + "doctor/login",
     dataType:"json",
     contentType:"application/json",
     data:JSON.stringify({"code":code}),
     error: function(res) {
     console.log(">>>>Error" + res);
     },
     success: function(res) {
     console.log(">>>>Success" + res.toString())
     }
     })
     }
     */
    console.log(getCookie('openid'));
    $('#openid').val(getCookie('openid'));
    getArea();
    getdoctor_therapist('doctor');

    //upload.key.value=base64Encode(getTime());
}
function upload() {

    //$("#upload").dropzone({ url: "file/post" });
}

function getdoctor_therapist(v) {
    var type = v;
    if (type == 'doctor') {
        $("#title11").empty();
        $("#title11").append("<option value=''>" + "请选择职称" + "</option>");
    } else {
        $("#title12").empty();
        $("#title12").append("<option value=''>" + "请选择从业资格" + "</option>");
    }

    $.ajax({
        type: "get", url: host + 'title/list?type=' + type,
        async: true,
        error: function (json) {
            console.log('error=json=', json.responseText);
            return;
        },
        success: function (json) {
            var json = eval('(' + json + ')');
            var titleList = json.titleList;
            console.log('titleList=', titleList);
            for (var i = 0; i < titleList.length; i++) {
                console.log('titleList[x].name', titleList[i].titleName);
                if (type == 'doctor') {
                    $("#title11").append("<option value='" + titleList[i].titleName + "'>" + titleList[i].titleName + "</option>");
                } else {
                    $("#title12").append("<option value='" + titleList[i].titleName + "'>" + titleList[i].titleName + "</option>");
                }


            }

        }
    });
}
function getArea() {
    $("#area").empty();
    $.ajax({
        type: "get", url: host + 'area/list?parentId=',
        async: true,
        error: function (json) {
            console.log('error=json=', json.responseText);
            return;
        },
        success: function (json) {
            var json = eval('(' + json + ')');
            var areaList = json.areaList;
            console.log('areaList=', areaList);
            $("#area").append("<option value=''>" + "请选择省" + "</option>");
            for (var i = 0; i < areaList.length; i++) {
                console.log('areaList[x].name', areaList[i].name);
                $("#area").append("<option value='" + areaList[i].id + "'>" + areaList[i].name + "</option>");

            }
            console.log('html=', $("#area").html());
        }
    });


}
function getArea_Son() {
    $("#area_son").empty();
    var v = $("#area").find("option:selected").val();
    $.ajax({
        type: "get", url: host + 'area/list?parentId=' + v,
        async: true,
        error: function (json) {
            console.log('error=json=', json.responseText);
            return;
        },
        success: function (json) {
            var json = eval('(' + json + ')');
            var areaList = json.areaList;
            console.log('areaList=', areaList);
            $("#area_son").append("<option value=''>" + "请选择所在市" + "</option>");
            for (var i = 0; i < areaList.length; i++) {
                console.log('areaList[x].name', areaList[i].name);
                $("#area_son").append("<option value='" + areaList[i].id + "'>" + areaList[i].name + "</option>");

            }
            console.log('html=', $("#area").html());
            $("#cityid").removeClass("hide");
        }
    });


}
// 注册提交
function sumbit_reg() {

    if (!$('#checkboxid').attr('checked')) {
        successPage('请同意服务条款');
        return;
    }
    var type = $("#type").val();
    if (type == '') {
        successPage('请输入职业类型');
        return;
    }
    var name = $('#name').val();
    if (name == '') {
        successPage('请输入名字');
        return;
    }
    var phone = $('#phone').val();
    var code = $('#code').val();

    var hospital = $('#hospital').val();
    /* if(hospital==''){
     successPage('请输入医院');
     return;
     }*/
    var dept = $('#dept').val();
    var sex = $("#sex").find("option:selected").val();
    if (sex == '') {
        successPage('请输入性别');
        return;
    }
    var area1 = $('#area').val();
    if (area1 == '') {
        successPage('请输入地区');
        return;
    }
    var area_son = $('#area_son').val();
    if (area_son == '') {
        successPage('请输入地区');
        return;
    }
    var imgkey = $('#picKey').val();
    //successPage(imgkey)
    var openid = $('#openid').val();
    var title = '';
    var make_model = '';
    if (type == 'doctor') {
        title = $("#title11").find("option:selected").val();
    } else {
        title = $("#title12").find("option:selected").val();
        make_model = $("#make_modelid").find("option:selected").val();
        if (make_model == '') {
            successPage('请选择能否制作模具');
            return;
        }
    }
    var password0 = $('#password').val();

    if (password0 == '') {
        successPage('请输入密码');
        return;
    }

    if (password0.length < 6) {
        successPage('密码长度不少于6位');
        return;
    }

    if (code == '') {
        successPage('请输入验证码');
        return;
    }
    var sentData = "";
    sentData += "{";
    sentData += "'name':'" + name;
    sentData += "','phone':'" + phone;
    sentData += "','code':'" + code;
    sentData += "','type':'" + type;
    sentData += "','hospital':'" + hospital;
    sentData += "','dept':'" + dept;
    sentData += "','title':'" + title;
    sentData += "','certimg':'" + imgkey;
    sentData += "','sex':'" + sex;
    sentData += "','openid':'" + openid;
    sentData += "','remark':'";
    sentData += "','makeModel':'" + make_model;
    sentData += "','password':'" + password0;
    sentData += "','area':{'id':" + area_son + "}";
    sentData += "}";
    console.log('sentData=', sentData);
    $.ajax({
        type: "POST", url: host + serverApi,
        dataType: 'json',
        contentType: "application/json",
        data: sentData,
        async: false,
        error: function (json) {
            console.log('error=json=', json.responseText);
            var msg = eval('(' + json.responseText + ')');
            var msg = ' 错误信息：' + msg.message + ' 参考代码：' + msg.returnCode;
            errorPage(msg);
            return;
        },
        success: function (json) {
            console.log('json=', json.returnCode);
            if (json.returnCode == 0) {
                //successPage('您的注册申请已经提交，请耐心等待审批！');
                window.location.href = 'pending_approval.html';
            } else {
                errorPage('您的注册申请失败，请重新提交！');
            }


        }
    });

}
function selected() {
    var type = $("#type").val();
    if (type == 'doctor') {
        $("#title1").css("display", "");
        $("#title2").css("display", "none");
        $("#title3").css("display", "none");
        $("#tipsid").html("请您上传医师资格证/医师执业证 或者胸牌（需包含姓名医院名称 科室 职称）");
    } else {
        $("#title1").css("display", "none");
        $("#title2").css("display", "");
        $("#title3").css("display", "");
        $("#tipsid").html("请您上传证书、资格证、胸牌或工作证");

    }
    getdoctor_therapist(type)

}
function getMsg(phone) {
    var sentData = "{'phone':'" + phone + "','type':'doctor_register'}";
    console.log('sentData=', sentData);
    $.ajax({
        type: "POST", url: host + 'vcode/push',
        dataType: 'json',
        contentType: "application/json",
        data: sentData,
        async: true,
        error: function (json) {
            console.log('error=json=', json.responseText);
            var msg = eval('(' + json.responseText + ')');

            errorPage(msg.message);
            if (msg.returnCode == 300002) {
                window.location.href = 'authorization.html';

            }
            return;
        },
        success: function (json) {

            var returnCode = json.returnCode;
            if (returnCode == 0) {
                console.log('json=', json.verifyCode);
                successPage('信息已发送，请注意查收');
            }


        }
    });
}


function selectType(id) {
    if (id == 'doc') {
        $("#doc").addClass('radioselnow');
        $("#tech").removeClass('radioselnow');
        $("#type").val('doctor');
        $("#titleid").html('医生注册');
        selected();
    } else {
        $("#tech").addClass('radioselnow');
        $("#doc").removeClass('radioselnow');
        $("#type").val('therapist');
        $("#titleid").html('治疗师注册');
        selected();
    }
}

