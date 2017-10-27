/**
 * RiversLau
 * 2017-10-25 10:00
 */
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var codeflag = true;

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
        type:"post",
        url: getIfc_url() + 'vcode/push',
        dataType: 'json',
        data:{
            phone:phone,
            type:'doctor_register'
        },
        async:true,
        success: function(response){
            if(response.returnCode == 0){
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

$("#submit_btn").click(function() {

});