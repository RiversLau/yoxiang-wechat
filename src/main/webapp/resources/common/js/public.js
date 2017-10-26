function getIfc_url() {
	var ifc_url='http://docserver.rrdkf.com/';
	//var ifc_url='http://docserveruat.rrdkf.com/';
	//ifc_url='http://192.168.2.8:8080/doctor/';
	//ifc_url='http://192.168.2.109:8080/';
	//ifc_url='http://riverslau.natapp1.cc/';
	//ifc_url='http://riverslau.natapp1.cc/';
	return  ifc_url;
}
function setToken(token) {
	setCookie("rrdToken",token);
	console.log('getCookie setToken='+getCookie("rrdToken"));
}
function getToken() {
	 console.log('getToken='+getCookie("rrdToken"));
	return  getCookie("rrdToken");
}
function getQiniu_uploadUrl() {
	var ifc_url='http://up-z2.qiniu.com/putb64/-1/key/';
	return  ifc_url;
}
function getParameter(param)
{
    var query = decodeURI(window.location.search);//获取URL地址中？后的所有字符
    
    var iLen = param.length;//获取你的参数名称长度  
    var iStart = query.indexOf(param);//获取你该参数名称的其实索引  
    if (iStart == -1)//-1为没有该参数  
        return "";  
    iStart += iLen + 1;  
    var iEnd = query.indexOf("&", iStart);//获取第二个参数的其实索引  
    if (iEnd == -1)//只有一个参数  
        return query.substring(iStart);//获取单个参数的参数值  
    return query.substring(iStart, iEnd);//获取第二个参数的值  
}
 function GetRequest() {
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
function back(){
	history.go(-1);
}
function putb64(base64,UpToken,action,keyid){
	var s_b = base64.split(',');
    var pic = s_b[1];
    var key = base64Encode(getTime());	//base64加密key
    var upload_url = action;
    var token = UpToken;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
    	console.log('base64='+base64);
    	console.log('s_b='+base64);
    	console.log('pic='+pic);
        console.log('xhr.readyState='+xhr.readyState);
        if (xhr.readyState == 4) {
            var obj = eval('(' + xhr.responseText + ')');
           
            if (obj.error) {
                console.log('上传图片失败，请稍后再试');
                return false;
            } else if (obj.key != null) {
            	 console.log('上传成功');
            	 successPage('上传成功');
            	 $('#'+keyid).val(obj.key+";"+$('#picKey').val());
            	return true;
            }
        }else{
        	   console.log('上传图片验证成功');
               return false;
        }
    }
    xhr.open("POST", upload_url, false);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken" + " " + token);
    xhr.send(pic);
}

function getTime(type) {
    var d = new Date();
    var y = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var m_s = d.getMilliseconds();
    if (month < 10) {
        month = '0' + month;
    }  if (date < 10) {
        date = '0' + date;
    }  if (h < 10) {
        h = '0' + h;
    }  if (m < 10) {
        m = '0' + m;
    }  if (s < 10) {
        s = '0' + s;
    }
    if (type == 1) {
        var now_time = y.toString() + month.toString() + date.toString();
    } else if (type == 2) {
        var now_time = y.toString() + '-' + month.toString() + '-' + date.toString() + ' ' + h.toString() + ':' + m.toString() + ':' + s.toString();
    } else {
        var now_time = y.toString() + month.toString() + date.toString() + h.toString() + m.toString() + s.toString() + m_s.toString();
    }
    return now_time;
}

function base64Encode(str) {
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0,
        len = str.length,
        string = '';
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt((c1 & 0x3) << 4);
            string += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt((c2 & 0xF) << 2);
            string += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
}



/* 设置cookie函数 */
function setCookie(key,value) {
   //$.cookie(key, value, {expires: 1, path:'/'});
   var Days = 1;
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}
/* 获取cookie函数 */
function getCookie(key) {
    var coo=unescape(document.cookie);//解码
    var arr1=coo.split('; ');//第一次分解后是数组
    for (var i=0;i<arr1.length;i++){//第二次循环拆分数组
        var arr2=arr1[i].split('=');
        if(arr2[0]==key){
            return arr2[1];
        }
    }
}
/* 删除cookie */
function removeCookie(key) {
    setCookie(key,'',-1);
}
//屏蔽iphone的alert带url
window.alert = function(name){
 var iframe = document.createElement("IFRAME");
iframe.style.display="none";
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(name);
iframe.parentNode.removeChild(iframe);
}
function successPage(msg){
	
alert(msg);

}
function errorPage(msg){
alert(msg);
}
function errorPagejson(msg){
var result = eval('(' + msg + ')'); 
alert(result.message);
}
//浏览器存储
function StorageLocal(key,value){
	sessionStorage.setItem(key,value);
	
}
function getStorageLocal(key){
	return sessionStorage.getItem(key);
}

function checkMobile(sMobile){
 if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){ 
 
  return false; 
 }
  return true; 
}
function fmoney(s, n)   
{   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
} 

function autoLogin(){
	var token=getCookie('rrdToken');
    var code=getCookie('wxcode');
    if(undefined==code||code==''){
    	window.location.href='authorization1.html';
    	return false;
    }
    console.log(">>>>code" + code);
    console.log(">>>>code" + code+">>>>token" + token);
    var flag=false;
     if(undefined==token||token==''){
        $.ajax({
            type: "post",
            url: getIfc_url() + "doctor/login",
            async:false,
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify({"code":code}),
            error: function(res) {
                console.log(">>>>Error" + res);
                console.log('error=json=',res.responseText);
	    	    flag=false;
            },
            success: function(res) {
                console.log(">>>>Success" + res);
                console.log(">>>>returnCode" + res.returnCode);
                if(res.returnCode==0){
                	var user=res.user;
                	setToken(user.token);//设置全局token
                	setCookie('openid',user.openid);
                	setCookie('userid',user.id);
                	flag=true;
                }
                if(res.returnCode==310002 ){//未注册
                	console.log("res="+res)
                	window.location.href='register.html';
                	setCookie('openid',res.openid);
                	flag=false;
                }
                
                if(res.returnCode==300008 ){//待审批
                	window.location.href='pending_approval.html';	
                	flag=false;
                }
                if(res.returnCode==300010){//申请失败
                	window.location.href='application_failure.html?remark='+res.apply.remark;
                	console.log('openid=300010='+res.openid)
                	setCookie('openid',res.apply.openid);
                	setCookie('remark',res.apply.remark);
                	flag=false;
                }
                if(res.returnCode==40163 ){//待审批
                	//removeCookie('rrdToken');
    	       	 	removeCookie('wxcode');
                	window.location.href='repetition.html';	
                	flag=false;
                }
            }
        });
    	return flag;
    }    
       if(token!=''){
       	return true;
       }
}
function toBind(user){
	var param=getParameter('hrefHtml');
	if(param=='register'){
		param='application_succ';
	}	window.location.href=param+'.html';
		setCookie('openid',user.openid);
		setCookie('userid',user.id);
}
function getLocalTime(nS) {
    return  new Date(parseInt(nS)).Format("yyyy/MM/dd");  //yyyy-MM-dd hh:mm
}
Date.prototype.Format = function (fmt) {//author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
}
function myajax(myurl,sentData){
	var result='';
	sentData=eval('(' + sentData + ')');
	sentData=JSON.stringify(sentData);
	mylog('sentData='+JSON.stringify(sentData));
	$.ajax({
		 type:"POST",
		 url:myurl,
		 beforeSend: function (XMLHttpRequest) {
	                     var token = getToken();
	                     mylog('Authorization'+"  Bearer" + " " + token);
	                     XMLHttpRequest.setRequestHeader("Authorization", "Bearer" + " " + token);
	      },
		  dataType: 'json',
		  contentType: "application/json;charset:utf-8",
		  data:sentData,
		  async:false,
		   error:function(XMLHttpRequest, textStatus, errorThrown){
	    	 // console.log('error=json=',json.responseText);
	    	   console.log('error=status=',XMLHttpRequest.status);
	    	   
	    	 result={'code':'error','status':XMLHttpRequest.status,'message':''};
	      },
		   success: function(json){
		   		json["code"]="000000";
			   mylog('json='+JSON.stringify(json));
			   result=json;
		   }
		});
	return result;
}
function mygetajax(myurl){
	var result='';
	$.ajax({
			type:"get",
			url:myurl,  // 服务端接口
			async:false,
			beforeSend: function (XMLHttpRequest) {
                     var token = getToken();
                     console.log('Authorization'+"  Bearer" + " " + token);
                     XMLHttpRequest.setRequestHeader("Authorization", "Bearer" + " " + token);
             },
			error:function(XMLHttpRequest, textStatus, errorThrown){
	    	 // console.log('error=json=',json.responseText);
	    	   console.log('error=status=',XMLHttpRequest.status);
	    	   
	    	 result={'code':'error','status':XMLHttpRequest.status,'message':''};
	      },
			success:function(respond) {
				result = eval('(' + respond + ')');
				result["code"]="000000";
				console.log(result);
				//console.log('result='+JSON.stringify(result));
			}		 
	        });
	        return result;
}
function mylog(msg){
	console.log(msg);
}
function gettimg(time){
	 var date = new Date();     //结束时间
	 var mun=date.getTime()-time;
	var tm= parseInt(mun/1000/60/60/24);
	console.log('DateDiff='+MillisecondToDate(mun));
	var tm1=mun<=0?'刚刚':MillisecondToDate(mun)+'前';
	tm=mun>86400000?tm+'天前':tm1;
	
	return tm;
}
function MillisecondToDate(msd) {
		var time = parseFloat(msd) /1000;
		if (null!= time &&""!= time) {
			if (time >60&& time <60*60) {
				time = parseInt(time /60.0) +"分钟";//+ parseInt((parseFloat(time /60.0) -parseInt(time /60.0)) *60) +"秒";
			}else if (time >=60*60&& time <60*60*24) {
				time = parseInt(time /3600.0) +"小时"+ parseInt((parseFloat(time /3600.0) -
				parseInt(time /3600.0)) *60) +"分钟";
				/*+
				parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -
				parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";*/
			}else {
				time = parseInt(time) +"秒";
			}
		}else{
			time = "0 时 0 分";
		}
		return time;

}
function DateDiff(sDate1,sDate2){ //sDate1和sDate2是字符串 yyyy-MM-dd格式 
var aDate, oDate1, oDate2, iDays, ihours, iminutes, iseconds;
aDate = sDate1.split("-");
oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);//转换为MM-dd-yyyy格式 
aDate = sDate2.split("-");
oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
var timeSpan = {};
var TotalMilliseconds = Math.abs(oDate1 - oDate2);//相差的毫秒数
timeSpan.Days = parseInt(TotalMilliseconds / 1000 / 60 / 60 /24);
timeSpan.TotalHours = parseInt(TotalMilliseconds / 1000 / 60 / 60);
timeSpan.Hours = timeSpan.TotalHours % 24;
timeSpan.TotalMinutes = parseInt(TotalMilliseconds / 1000 / 60);
timeSpan.Minutes = timeSpan.TotalMinutes % 60;
timeSpan.TotalSeconds = parseInt(TotalMilliseconds / 1000);
timeSpan.Seconds = timeSpan.TotalSeconds % 60;
timeSpan.TotalMilliseconds = TotalMilliseconds;
timeSpan.Milliseconds = TotalMilliseconds % 1000;
return timeSpan;
}