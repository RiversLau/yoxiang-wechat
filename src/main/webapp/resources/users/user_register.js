/**
 * RiversLau
 * 2017-10-25 10:00
 */
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var codeflag = true;

var DOCTOR_TYPE = 'doctor';
var THERAPIST_TYPE = 'therapist';

function selectType(type) {
    if (type == DOCTOR_TYPE) {
        $("#doctor").addClass('radioselnow');
        $("#therapist").removeClass('radioselnow');
        $("#doctor_type").val(DOCTOR_TYPE);
        $("#titleid").html('医生注册');
    } else {
        $("#therapist").addClass('radioselnow');
        $("#doctor").removeClass('radioselnow');
        $("#doctor_type").val(THERAPIST_TYPE);
        $("#titleid").html('治疗师注册');
    }
    changeDoctorType(type);
}

function changeDoctorType(type) {
    if (type == DOCTOR_TYPE) {
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
}

function getCity() {
    var parentId = $("#province").find("option:selected").val();
    var cloneObj = $("#cityArray").find("option[parent-id='" + parentId + "']");

    var ctiyObj = $("#city");
    ctiyObj.html("");
    ctiyObj.html(cloneObj.clone());

    $("#cityid").removeClass("hide");
}

$('#sendmsgid').click(function () {
    var phone = $('#phone').val();
    if (phone == '') {
        showErrorModal('请输入手机号');
        return;
    }
    if (!checkMobile(phone)) {
        showErrorModal("不是合法的手机号");
        return;
    }
    if (codeflag) {
        pushVerifyCode(phone);
    }
});

function pushVerifyCode(phone) {
    $.ajax({
        type: "post",
        url: getIfc_url() + 'vcode/push',
        dataType: 'json',
        data: {
            phone: phone,
            type: 'doctor_register'
        },
        async: true,
        success: function (response) {
            if (response.returnCode == 0) {
                codeflag = false;
                startStepCount();
                showSuccessModal('验证码已发送');
            } else {
                showErrorModal(response.errMsg);
            }
        }
    });
}

function startStepCount() {
    curCount = count;
    //设置button效果，开始计时
    $("#sendmsgid").html("" + curCount + "秒");
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
}

//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $("#sendmsgid").html("发送验证码");
        codeflag = true;
    }
    else {
        curCount--;
        $("#sendmsgid").html("" + curCount + "秒");
        codeflag = false;
    }
}

$("#submit_btn").click(function () {

    // 验证医师类型
    var type = $("#doctor_type").val();
    if (type != DOCTOR_TYPE && type != THERAPIST_TYPE) {
        showErrorModal('请选择职业类型');
        return;
    }

    // 验证姓名
    var name = $('#name').val();
    if (name == '') {
        showErrorModal('请输入您的姓名');
        return;
    }

    // 验证性别
    var sex = $("#sex").find("option:selected").val();
    if (sex != "MALE" && sex != "FEMALE") {
        showErrorModal('请选择性别');
        return;
    }

    // 验证省份与城市
    var province = $('#province').find("option:selected").val();
    if (province == '') {
        showErrorModal('请选择省份');
        return;
    }
    var city = $('#city').find("option:selected").val();
    if (city == '') {
        showErrorModal('请选择城市');
        return;
    }

    // 验证职称与能否制作器具
    var title = '';
    var make_model = '';
    var titleErrMsg = '请选择职称或从业资格';
    if (DOCTOR_TYPE == type) {
        title = $("#title11").find("option:selected").val();
        titleErrMsg = "请选择职称";
    } else if (THERAPIST_TYPE == type) {
        title = $("#title12").find("option:selected").val();
        titleErrMsg = "请选择从业资格";
        make_model = $("#make_modelid").find("option:selected").val();
    }
    if (title == '') {
        showErrorModal(titleErrMsg);
        return;
    }
    if (THERAPIST_TYPE == type && (make_model != "CAN" && make_model != "CANNOT")) {
        showErrorModal('请选择能否制作模具');
        return;
    }

    // 验证手机号与手机验证码
    var phone = $('#phone').val();
    if (!isMatchPhoneFormat(phone)) {
        showErrorModal("请输入正确的手机号码");
        return;
    }
    var code = $('#phone_code').val();
    if (isEmpty(code)) {
        showErrorModal("请输入手机验证码");
        return;
    }

    // 验证密码
    var password = $('#password').val();
    if (!isMatchPasswordFormat(password)) {
        showErrorModal("密码为6-16位有效字符")
        return;
    }

    // 验证服务条款
    if (!$('#checkboxid').attr('checked')) {
        showErrorModal('请同意服务条款');
        return;
    }

    var hospital = $('#hospital').val();
    var dept = $('#dept').val();

    var imgkey = $('#picKey').val();
    if (imgkey == '') {
        showErrorModal('请上传您的资质证书或证件');
        return;
    }

    $.ajax({
        type: "post",
        url: getIfc_url() + "user/register",
        dataType: 'json',
        data: {
            type : type.toUpperCase(),
            name : name,
            phone : phone,
            code : code,
            areaId : city,
            sex : sex.toUpperCase(),
            certimg : imgkey,
            makeModel : make_model,
            password : password,
            hospital : hospital,
            dept : dept,
            title : title
        },
        async: false,
        error: function () {
            showErrorModal("系统异常");
            return;
        },
        success: function (json) {
            var returnCode = json.returnCode;
            if (returnCode == 0) {
                showSuccessModal("注册成功");
                window.location.href = 'user/register/info';
            } else {
                errorPage('您的注册申请失败，请重新提交！');
            }
        }
    });
});