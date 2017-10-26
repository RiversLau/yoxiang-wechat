<%@ page isELIgnored="false" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="../common/page_header.jsp"/>
    <title>注册</title>
    <link href="/resources/common/css/a_red.css" rel="stylesheet"/>
    <link href="/resources/common/css/dropzone.css" rel="stylesheet"/>
    <link href="/resources/users/register.css" rel="stylesheet"/>
    <style>
        .demo_label {
            margin: 0 0 0 0;
            display: inline-block;
            font-size: 17px;
        }

        .demo_radio {
            display: none
        }

        .demo_radioInput {
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 100%;
            display: inline-block;
            height: 16px;
            margin-right: 10px;
            margin-top: -1px;
            vertical-align: middle;
            width: 16px;
            line-height: 1
        }

        .demo_radio:checked + .demo_radioInput:after {
            background-color: #18afae;
            border-radius: 100%;
            content: "";
            display: inline-block;
            height: 12px;
            margin: 2px;
            width: 12px
        }

        .demo_checkbox.demo_radioInput, .demo_radio:checked + .demo_checkbox.demo_radioInput:after {
            border-radius: 0
        }
    </style>
</head>

<body id="zhuce" style="font-size: 15px;">

<div class="all ">

    <div class="dl1mod ">
        <h3 class="dl1mh cf">
            <a class="dl1back"></a>
            <a class="dibti"></a>
            <b class="dl1tit inb" id="titleid">医生、治疗师注册</b>
        </h3>
    </div>

    <ul class="gm2cot1">
        <li class="f3itm1 cf">
            <span class="f3mta1">职业类型</span>
            <p class="gm2ipts1">
                <input id="doctor_type" value="" type="hidden"/>
                <a class="radiosel1 elis" id='doctor' onclick="selectType('doctor')">医生</a>
                <a class="radiosel1 elis" id='therapist' onclick="selectType('therapist')">治疗师/技师</a>
            </p>
        </li>

        <li class="gm2itm1 cf">
            <span class="gm2mta1">真实姓名</span>
            <p class="gm2ipts1">
                <input type="text" class="gm2ipt1 ipt21" id="name" name="name" value="" placeholder="请输入真实姓名"
                       maxlength="22" required/>
            </p>
        </li>

        <li class="f3itm1 cf">
            <span class="f3mta1">性别</span>
            <p class="f3slts1">
                <select class="f3slt1" name="sex" id="sex">
                    <option value="" checked="checked">请选择性别</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                </select>
                <i class="f3icon1"></i>
            </p>
        </li>


        <li class="f3itm1 cf">
            <span class="f3mta1">所在地</span>
            <p class="f3slts1">
                <select class="f3slt1" name="area" id="province" onchange="getCity()">
                    <option value="" checked="checked">请选择所在省</option>
                    <c:forEach items="${areaList}" var="area">
                        <c:if test="${area.level == 1}">
                            <option value="${area.id}">${area.name}</option>
                        </c:if>
                    </c:forEach>
                </select>
                <i class="f3icon1"></i>
            </p>
        </li>

        <li class="f3itm1 cf hide" id="cityid">
            <span class="f3mta1">所在市</span>
            <p class="f3slts1">
                <select class="f3slt1" name="area_son" id="city">
                    <option value="" checked="checked">请选择所在市</option>
                </select>
                <i class="f3icon1"></i>
            </p>
        </li>

        <select id="cityArray" style="display:none">
            <c:forEach items="${areaList}" var="area">
                <c:if test="${area.level eq 2}">
                    <option data-id="${area.id}" parent-id="${area.parentId}">${area.name}</option>
                </c:if>
            </c:forEach>
        </select>

        <li class="gm2itm1 cf">
            <span class="gm2mta1">所在医院</span>
            <p class="gm2ipts1">
                <input type="text" class="gm2ipt1 ipt21" id="hospital" name="hospital" value="" placeholder="请输入所在医院"
                       maxlength="22" required/>
            </p>
        </li>

        <li class="gm2itm1 cf">
            <span class="gm2mta1">所在科室</span>
            <p class="gm2ipts1">
                <input type="text" class="gm2ipt1 ipt21" id="dept" name="dept" value="" placeholder="请输入所在科室"
                       maxlength="22" required/>
            </p>
        </li>

        <li class="f3itm1 cf" id='title1'>
            <span class="f3mta1">职称</span>
            <p class="f3slts1">
                <select class="f3slt1" name="title" id="title11">
                    <option value="" checked="checked">请选择职称</option>
                    <c:forEach items="${doctorTitles}" var="title">
                        <option value="${title.id}">${title.name}</option>
                    </c:forEach>
                </select>
                <i class="f3icon1"></i>
            </p>
        </li>

        <li class="f3itm1 cf" id='title2' style='display:none'>
            <span class="f3mta1">从业资格</span>
            <p class="f3slts1">
                <select class="f3slt1" name="title" id="title12">
                    <option value="" checked="checked">请选择从业资格</option>
                    <c:forEach items="${therapistTitles}" var="title">
                        <option value="${title.id}">${title.name}</option>
                    </c:forEach>
                </select>
                <i class="f3icon1"></i>
            </p>
        </li>
        <li class="f3itm1 cf" id='title3' style='display:none'>
            <span class="f3mta1">制作模具</span>
            <p class="f3slts1">
                <select class="f3slt1" name="make_model" id="make_modelid">
                    <option value="" checked="checked">请选择能否制作模具</option>
                    <option value="CANNOT">否</option>
                    <option value="CAN">是</option>
                </select>
                <i class="f3icon1"></i>
            </p>
        </li>


        <li class="gm2itm1 cf">
            <span class="gm2mta1">手机号码</span>

            <p class="gm2ipts1 ">
                <input type="tel" class="gm2ipt1 ipt21" id="phone" name="phone" value="" placeholder="请输入您的手机号"
                       maxlength="22" required/>
            </p>
        </li>
        <li class="gm2itm1 cf">
            <span class="gm2mta1">验证码</span>
            <b class="gm2yz1" id='sendmsgid'>获取验证码</b>
            <p class="gm2ipts1 gm2ipta1">
                <input type="tel" class="gm2ipt2 ipt21" id="code" name="code" value="" placeholder="请输入验证码"
                       maxlength="22" required/>
            </p>
        </li>

        <li class="gm2itm1 cf">
            <span class="gm2mta1">设置密码</span>
            <b class="gm2yz1 poff" id='showpwdid'>显示密码</b>
            <p class="gm2ipts1 gm2ipta1">
                <input type="password" class="gm2ipt2 ipt21" id="password" name="password" value="" placeholder="请输入密码"
                       maxlength="16" required/>
            </p>
        </li>

    </ul>


    <dl class="h2dl cf" style="border-bottom:0px solid #ccc;margin-top:10px">

	<span class="dz-message needsclick ">
 			<div class="ads-c-12 hui-999 pl-1em pr-1em clearfix">
	                <span class="" id="file_bar"></span>
	                <div class=" file-bar" id="plus">
	                    <div class="add-img-bar">
	                    	<div class="pa translateC">
	                        	<div class="add-img-icon"></div>
	                        </div>
	                    </div>
	                    <form method="post" action="http://up.qiniu.com" enctype="multipart/form-data">
	                        <input type="file" accept="image/*" id="upload_img" class="upload-img" value="">
	                    </form>
	                </div>
	                <div class="base64-img"></div>
	            </div>
	            <div class="h-05em"></div>

    </dl>
    <dl class="h2dl cf">

        <span id='tipsid'>请您上传医师资格证/医师执业证 或者胸牌（需包含姓名医院名称 科室 职称）</span>


    </dl>

    <p class="zx1tjs">
        <a class="zx1tj inb" href="javascript:sumbit_reg()">注册</a>
    </p>

    <p class="h7tip1"><!--<b class="h7icon1 inb1 now"></b> <input class="h7chk1" type="checkbox" checked="checked">-->
        <label class="demo_label"><input class="demo_radio" type="checkbox" checked="checked" name="demo-radio"
                                         id="checkboxid"><span class="demo_radioInput"></span>本人已阅读,知哓并同意遵守<a
                class="h7tk1" href="jpagetk.html">《服务条款》</a></label>

    </p>

    <div class="mask">
        <!-- mask --></div>

    <!-- all --></div>


<div class="ermod h7covs" id='code' style="top:50%">
    <img id='Previewid' src=""/>
    <!-- ermod --></div>


<!--js放在后面-->
<input type="hidden" value='uploadPreview' id='curpic'/>
<input type="hidden" value='' id='picKey'/>
<input type="hidden" value='' id='openid'/>

<script src="/resources/common/js/jquery-1.11.0.min.js"></script>

<script src="/resources/common/js/public.js"></script>
<script src="/resources/users/user_info.js"></script>
<script>
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数
    var codeflag = true;
    $('#sendmsgid').click(function () {
        var phone = $('#phone').val();
        if (phone == '') {
            successPage('请输入手机号');
            return;
        }
        if (!checkMobile(phone)) {
            successPage("不是合法的手机号");
            return;
        }
        if (codeflag) {

            getMsg(phone);
            codeflag = false
            sendMessage();

        }


    })

    $('#showpwdid').click(function () {
        if ($(this).hasClass('poff')) {
            $('#password')[0].type = 'text';
            $(this).removeClass("poff");
            $(this).addClass("pon");
            $(this).html("隐藏密码");
        } else {
            $('#password')[0].type = 'password';
            $(this).addClass("poff")
            $(this).removeClass("pon");
            $(this).addClass("poff");
            $(this).html("显示密码");
        }


    })
    function sendMessage() {
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
    $('.h7icon1').click(function () {

        $(this).toggleClass('now');

    })


    $('.mask').click(function () {

        $('.mask').removeClass('now');

        $('.h7covs').removeClass('now');
        $('.all').removeClass('scr');
        $('.delete').removeClass('hide');
        $('.add-img-icon').removeClass('hide');
    })
</script>

<script src="/resources/common/js/common.js"></script>
<script src="/resources/common/js/uploadpic.js"></script>
<script src="/resources/common/js/lrz.bundle.js"></script>
<script src="/resources/common/js/1.chunk.js"></script>
<script src="/resources/common/js/2.chunk.js"></script>
<script type="text/javascript">


    var pageTool = {
        "token": getUptoken(),
        "space": "images",
        "spaceHost": "http://ot8f23529.bkt.clouddn.com/"
    }

    !function () {
        function pageScript() {
            var self = this;

            //初始化
            this.init = function () {

                self.bindPicUp();
                self.bindEvent();
                return self;
            }

            //绑定事件
            this.bindEvent = function () {

                $("#save-btn").click(function () {
                    self.submitForm();
                });
            }


            this.checkFrom = function () {
                if ($("#upload_img").size() > 0 && self.imgs == null) {
                    cntool.tips("请上传图片");
                    return false;
                }
                return true;
            }


            this.bindPicUp = function () {
                //图片上传
                new cnUploadPic({
                    file: "#plus",
                    maxSize: 10, //单位M
                    jcrop: false,
                    changeCallback: function (val, param) {
                        var file_bar_id = param.eventObj.prev().attr("id");
                        var upload_img = param.inputFile;
                        var that = param.eventObj;
                        var img_src = param.imgSrc;
                        var reader = new FileReader();
                        reader.readAsDataURL(upload_img);
                        cntool.showLoad();
                        reader.onload = function (e) {
                            var img_base64 = this.result;
                            var imageObj = new Image();
                            imageObj.src = this.result;

                            lrz(upload_img, {
                                quality: 0.5
                            }).then(function (rst) {
                                //cntool.hideLoad();
                                var base64_img = rst.base64;
                                var base64_len = rst.base64Len;
                                if (base64_len > 0) {
                                    var preview_img_len = $('#' + file_bar_id + ' .preview-img-list').length;
                                    if (preview_img_len > 0) {
                                        for (var k = 0; k < preview_img_len; k++) {
                                            var img_val = $('#' + file_bar_id).parent().find('.base64-img input:eq(' + k + ')').val();
                                            if (img_val == base64_img) {
                                                $('.upload-img', this).val('');
                                                cntool.tips('您已上传过同一张图片，请勿重复上传');
                                                return false;
                                            }
                                        }
                                        self.uploadphoto(base64_img, that, img_src, val, file_bar_id);
                                    } else {
                                        self.uploadphoto(base64_img, that, img_src, val, file_bar_id);
                                    }
                                } else {
                                    cntool.tips('获取图片失败，请稍后再试');
                                    return false;
                                }
                                return false;
                            }).catch_err(function (err) {
                                cntool.tips('上传图片失败，请稍后再试');
                                return false;
                            }).always(function () {
                                // 不管是成功失败，都会执行
                            });
                        }
                        return false;
                    }
                });
            }

            //图片上传
            this.uploadphoto = function (base64_img, that, img_src, val, file_bar_id) {

                console.log("base64:" + base64_img);
                console.log("that:" + that);
                console.log("img_src:" + img_src);
                console.log("val:" + val);
                console.log("file_bar_id:" + file_bar_id);

                var s_b = base64_img.split(',');
                var pic = s_b[1];
                var key = cntool.base64Encode(cntool.getTime());	//base64加密key
                var upload_url = "http://up-z2.qiniu.com/putb64/-1/key/" + key;
                var token = pageTool.token;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {
                        var obj = eval('(' + xhr.responseText + ')');
                        if (obj.error) {
                            cntool.tips('上传图片失败，请稍后再试');
                            return false;
                        } else if (obj.key != null) {
                            var tid = "baguette_" + new Date().getTime();
                            that.prev('#' + file_bar_id).append(
                                '<div class="preview-img-list" id="' + tid + '">' +
                                '<div class="small-preview">' +
                                '<a class="s1lnk" href="' + base64_img + '">' +
                                '<img class="s1cov" onclick="preview($(this))" src="' + base64_img + '" dsrc="' + pageTool.spaceHost + obj.key + '" class="img" onload=" cntool.hideLoad();" >' +
                                '</a>' +
                                '</div>' +
                                '<i class="delete" id=' + obj.key + ' onclick="pageScript.del($(this));"></i>' +
                                '<input type="hidden" class="upload-img" value="' + val + '">' +
                                '<input type="hidden" class="key" value="' + pageTool.spaceHost + obj.key + '">' +
                                '</div>'
                            );
                            $('#picKey').val(obj.key + "," + $('#picKey').val());
                            if ($('#' + file_bar_id + ' .preview-img-list').length >= 6) {
                                that.hide();
                            }
                            setTimeout(function () {
                                // self.resetbaguetteBox("#" + file_bar_id);
                            }, 100);

                            that.parent().find('.base64-img').append('<input type="hidden" value="' + base64_img + '">');
                        }
                    }
                }
                xhr.open("POST", upload_url, true);
                xhr.setRequestHeader("Content-Type", "application/octet-stream");
                xhr.setRequestHeader("Authorization", "UpToken" + " " + token);
                xhr.send(pic);
            }

            //删除上传图片
            this.del = function (that) {
                var index = that.parent().index();
                console.log('del id==' + that.attr('id'))
                var file_bar_id = that.parent().parent().attr('id');
                var plus_id = that.parent().parent().next().attr('id');

                that.next('.upload-img').val('');

                that.parent().parent().parent().find('.base64-img input:eq(' + index + ')').remove();
                that.parent().remove();

                if ($('#' + file_bar_id + '.preview-img-list').length < 10) {
                    $('#' + plus_id).show();
                }

                if ($("#file_bar").find("img").size() <= 0) {
                    self.imgs = null;
                }

                //  self.resetbaguetteBox("#" + file_bar_id);

                $('#picKey').val($('#picKey').val().replace(that.attr('id') + ';', ''));
            }

            //预览图片
            /*this.resetbaguetteBox = function (baguetteId) {
             var tempHTML = $(baguetteId).html();
             console.log('预览图片=='+tempHTML)
             $(baguetteId).html("");
             $(baguetteId).html(tempHTML);
             baguetteBox.run(baguetteId);
             }*/

        }

        window.pageScript = new pageScript().init();
    }();
</script>
<script>

    function selectType(type) {
        if (type == 'doctor') {
            $("#doctor").addClass('radioselnow');
            $("#therapist").removeClass('radioselnow');
            $("#doctor_type").val('doctor');
            $("#titleid").html('医生注册');
        } else {
            $("#therapist").addClass('radioselnow');
            $("#doctor").removeClass('radioselnow');
            $("#doctor_type").val('therapist');
            $("#titleid").html('治疗师注册');
        }
        changeDoctorType(type);
    }

    function changeDoctorType(type) {
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
    }

    function getCity() {
        var parentId = $("#province").find("option:selected").val();
        var cloneObj = $("#cityArray").find("option[parent-id='" + parentId + "']");

        var ctiyObj = $("#city");
        ctiyObj.html("");
        ctiyObj.html(cloneObj.clone());

        $("#cityid").removeClass("hide");
    }


    function preview(obj) {
        console.log(obj.attr('src'));
        $('#Previewid').attr('src', obj.attr('src'));
        $('.all').addClass('scr');
        $('.delete').addClass('hide');
        $('.add-img-icon').addClass('hide');

        $('.all').addClass('scr');
        $('.mask').addClass('now');
        $('.h7covs').addClass('now');

        var phonetype = window.navigator.userAgent;
        if ((phonetype.indexOf('iPhone') > -1) && (phonetype.indexOf('8_') > -1)) {
            $("#code").css({
                position: "absolute",
                left: ($(window).width() - $("#code").outerWidth()) / 2,
                top: ($(window).height() - $("#code").outerHeight()) / 2
            });
        } else {
            $("#code").css({
                position: "absolute",
                left: '53%',
                top: '50%'
            });
        }
    }

</script>
</body>
</html>
