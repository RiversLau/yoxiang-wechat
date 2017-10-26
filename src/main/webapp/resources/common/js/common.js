$(document).ready(function(){
	//绑定fastClick
	if(window.bindFastClick==false){
	}else{
	typeof FastClick !="undefined" && FastClick.attach(document.body);
	}
});

//TODO add for android browser
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            //移动终端浏览器版本信息 
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !u.match(/AppleWebKit.*Mobile.*/) || !u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function Browser_IsAndroid() {
    //如果是iphone，ipad
    if (browser.versions.android) {
        return true;
    } else {
        return false;
    }
}

function Browser_IsIos() {
    //如果是iphone，ipad
    if (browser.versions.ios) {
        return true;
    } else {
        return false;
    }
}


//工具集合
var cntool = {
	jschars:['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
	generateMixed:function(n) {
	    var res = "";
	    for(var i = 0; i < n ; i ++) {
	        var id = Math.ceil(Math.random()*61);
	        res += this.jschars[id];
	    }
	    return res;
	},
		
	open_param:function(url, param){
		if(typeof param != 'undefined'){
			for(var p in param) {
				if(url.indexOf("?")== -1) {
					url = url + "?" + p + "=" +param[p];
				} else {
					url = url + "&" + p + "=" +param[p];
				}
			}
		}
		cntool.open(url);
	},
  /**  
    * 公共打开url方法,所有链接通过这里打开,以便以后拓展app
    * @param url:打开的链接  
    * @param callback:打开链接之前执行的方法
    * @param title:打开新标签的标题,app用  
    * @param islogin:是否需要登录权限,app用
    */
	open:function(url,islogin){
		//typeof callback == "funciton" && callback();
		if(islogin==true){
			cnBindCtr.isNeedLogin(url);
		}else{
			window.location.href = url;
		}
	},
	openSub:function(url){
		this.open(url);
		//this.open(cntool.getWebPath()+"/subscribe/check?check_url="+url);
	},
	//获取网站项目目录路径
	getWebPath:function(){
		//return "http://"+location.host+"/workroom"
		return _SERVER_NAME;
	},
	//获取资源路径
	getResPath:function(){
		return _RESOURCES_PATH;
	},
	//通过url或者localstorage获取参数
	getParam:function(name){
		return cntool.getUrlParam(name)||cntool.getCookie(name);
	},
	//获取url静态参数
	getUrlParam:function(name){  
		//构造一个含有目标参数的正则表达式对象  
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
		//匹配目标参数  
		var r = window.location.search.substr(1).match(reg);  
		//返回参数值  
		if (r!=null) return unescape(r[2]);  
		return null;  
	},
	/**
     * 获取字符串长度
     * <summary>获得字符串实际长度，中文2，英文1</summary>
     * <param name="str">要获得长度的字符串</param>
     */
    getStrLength: function (str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    },
    /**
     * js截取字符串，中英文都能用
     * @param str：需要截取的字符串
     * @param len: 需要截取的长度
     */
    cutstr: function (str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    },
	/**
	 * 显示默认图片
	 * @param 0:logo,1:头像,2:医院,3:文章,4:圈子,5:二维码;
	 */
	default_img:function(type){ 
		var img=event.srcElement;
		switch(type){
			case 0:
				img.src= cntool.getResPath()+"/common/images/d_logo.png";
				break;
			case 1:
				img.src= cntool.getResPath()+"/common/images/d_head.png";
				break;
			case 2:
				img.src= cntool.getResPath()+"/common/images/d_hospital_icon.png";
				break;
			case 3:
				img.src= cntool.getResPath()+"/common/images/d_article_icon.png";
				break;
			case 4:
				img.src= cntool.getResPath()+"/common/images/d_circle_icon.png";
			case 5:
				img.src= cntool.getResPath()+"/common/images/d_qr_code.jpg";
			default:
				break;
		}
		img.onerror=null; //控制不要一直跳动 
	},
	/**  
     * 返回默认图片替换,以便以后拓展
     * @param param:暂时没有值,以便以后拓展  
     */
	noImg:function(type){
		return cntool.getWebPath() + 'common/images/no_img.png';
	},
	zipImg:function(width,height){
		var width = parseInt(width),height = parseInt(height);
		return "?imageView2/1/w/"+width+"/h/"+height;
		
	},
	goPage : function(hide,show){
		$('#'+hide).hide();
		$('#'+show).show();
	},
	/*设置数据为空*/
	setNullData : function(dom,text,nofixed){
		var text = text||"没有更多数据";
		var html = '<div class="no-data-wrap "><div class="list-no-data-icon bg-cover"></div><p>'+text+'</p></div>';
			//html = '<div class="fixed-no-data-wrap translateY">'+html+"</div>"
		
		$(dom).html(html);
	},
	//显示等待loading
	showLoad:function(text,imgsrc){
		if(typeof text != "undefined"){
		var text = "<p class='laodtext'>"+text+"</p>";
		}else{
		var text = "";	
		}
		var img = "skin/load_logo.gif";
		if(imgsrc){
		img = imgsrc;	
		}
		cntool.showLayer("<div align='center'><div class='load_logo'></div>"+text+"</div>",null,null,null,false);
	},
	//显示等待loading,带文本
	showLoadText:function(text){
		var t = text||"正在加载.."
		this.showLoad(t,cntool.getResPath()+"/resources/common/images/load_logo.png");
	},
	hideLoad:function(){
		this.hideLayer();
	},
	//弹出提示
	tips:function(txt,ClickCallback){
		if(typeof ClickCallback=="function"){
			return cntool.showLayer('<div class="prompt">'+txt+'</div>',0,1,null,true,ClickCallback);
		}else{
			return cntool.showLayer('<div class="prompt">'+txt+'</div>',0,1);
		}
	},
	//带确认键提示
	ctips:function(txt,btnText,ClickCallback){
		var btnText = btnText||"确定";
		if(typeof ClickCallback=="function"){
			return cntool.showLayer('<div class="cprompt"><div class="cprompt-con">'+txt+'</div><a href="javascript:" id="cprompt-btn">'+btnText+'</a></div>',0,1,function(){ 
			$("#cprompt-btn").off("click").on("click",function(){
			cntool.hideLayer();
			typeof ClickCallback == "function" && ClickCallback();
		})
		},false,ClickCallback);
		}else{
			return cntool.showLayer('<div class="cprompt"><div class="cprompt-con">'+txt+'</div><a href="javascript:" id="cprompt-btn">'+btnText+'</a></div>',0,1,function(){
			$("#cprompt-btn").off("click").on("click",function(){
				cntool.hideLayer();
				typeof ClickCallback == "function" && ClickCallback();
			});
			},false);
		}
		
	},
	//弹出确认
	confirm:function(showtxt,cancelCallback,btnCallback,btnText,headText,showButton){
		
		var headText = headText || "";
		var btnText = btnText || "确定";
		var tempHTML = '<div class="confirm_bar clearfix">'+
				'<div class="confirm_head">'+headText+'</div>'+
				'<div class="confirm_text">'+showtxt+'</div>'
				if(showButton){
					tempHTML+='<div class="clearfix" id="confirm_btn">'+
					'<div class="confirm_btn_bar confirm_left_btn" id="cancel">取消</div>'+
					'<div class="confirm_btn_bar confirm_right_btn" id="layerbtnOk">'+btnText+'</div>'+
					'</div>';
				}
			tempHTML+='</div>';
		
		cntool.showLayer(tempHTML,0,1,function(){
				$("#cancel").one("click",function(){
					cntool.hideLayer();
					typeof cancelCallback == "function" && cancelCallback();
				});
				$("#layerbtnOk").one("click",function(){
					cntool.hideLayer();
					typeof btnCallback == "function" && btnCallback();
				})
			},false);
	},
	
	//历史记录返回封装,处理历史记录为空的情况
	goBack:function(){
		var e = cntool.getEvent();
		if(history.length<2){
			if(e.target.getAttribute("data-parent")){
				location.href = cntool.getWebPath()+e.target.getAttribute("data-parent");		
			}else{
				//location.href = cntool.getWebPath()+"/user/index";
				WeixinJSBridge.call('closeWindow');
			}
		}else{
			history.go(-1);	
		}
	},
	getEvent:function(){
		 if(document.all)  return window.event;    
        func=cntool.getEvent.caller;        
        while(func!=null){  
            var arg0=func.arguments[0]; 
            if(arg0) 
            { 
              if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
              {  
              return arg0; 
              } 
            } 
            func=func.caller; 
        } 
        return null; 
	},
	showLayerCallback:[],
	showLayer:function(html,isDom,isShowBg,callback,isClickBgHide,clickBgHideCallback){
		var self = this;
		var bgClass = "fixedlayer-hasbg";
		var isClickBgHide = isClickBgHide==undefined?true:isClickBgHide;
		if(self.fixedLay){
			self.fixedLay.off("webkitAnimationEnd");
		}
		
		if(!$("#fixedlayer")[0]){
			$("body").append("<div class='fixedlayerbg' id='fixedlayerbg'></div><div class='fixedlayer' id='fixedlayer'><div class='fixedlayer-content' id='fixedlayer-content'></div></div>");
		}
		if(!this.fixedContent){
			this.fixedLay = $("#fixedlayer");
			this.fixedLayBg = $("#fixedlayerbg");
			this.fixedContent = $("#fixedlayer-content");
		}
		if(isDom){
			var html = $(html).html();
		}
		if(this.LayerTime){
			clearTimeout(this.LayerTime);
		}
		if(isShowBg){
			this.fixedLayBg.addClass(bgClass);
		}else{
			this.fixedLayBg.removeClass(bgClass);
		}
		this.fixedContent.html(html).on("click",function(){
			return false;	
		});
		typeof callback == "function" && callback();
		this.fixedLay.show().removeClass("zoomOut animated").addClass("zoomIn animated");
		this.fixedLayBg.show().removeClass("fadeOut animated").addClass("fadeIn animated");
		this.showLayerFlag = true;
		if(isClickBgHide){
			this.fixedLay.one("click",function(){
				cntool.hideLayer(clickBgHideCallback);
			});
		}
		this.showLayerStatus = true;
	},
	hideLayer:function(callback){
		try{
		var self = this;
		this.fixedLay.addClass("zoomOut animated");
		this.fixedLayBg.addClass("fadeOut animated");
		self.fixedLay.one("webkitAnimationEnd",function(){
			/*
			self.showLayerCallback = self.showLayerCallback.splice(1,self.showLayerCallback.length-1);
			*/
			self.fixedLay.hide();
			self.fixedLayBg.hide();
			if($("#fixedlayer-content").hasClass('no-middle')){
				$("#fixedlayer-content").removeClass('no-middle');
			}
			typeof callback == 'function' && callback();
			/*
			if(self.showLayerCallback.length>0){
				self.showLayerCallback[0].flag = true;
				self.showLayerCallback[0].fnc();
			}*/
		});
		}catch(e){
			
		}
		
		this.showLayerStatus = false;
	},
	/*弹出选择图层 start*/
	footSelect:{
		isInit:false,
		init:function(){
			var temp = "<div class='foot_select hide' id='foot_select'>"+
						"<div class='foot_select_bg' id='foot_select_bg'></div>"+
						"<div class='foot_select_content' id='foot_select_content'>"+
						"<div class='foot_select_list' id='foot_select_list'></div>"+
						"<div class='foot_select_button clearfix' id='foot_select_button'>"+
						"<a href='javascript:'>取消</a><a href='javascript:'>确定</a></div></div></div>";
			$("body").append(temp);
			this.foot_select = $("#foot_select");
			this.foot_select_bg = $("#foot_select_bg");
			this.foot_select_content = $("#foot_select_content");
			this.foot_select_list = $("#foot_select_list");
			this.foot_select_button = $("#foot_select_button");
			this.isInit = true;
		},
		show:function(options,showText,buttonText,showCallback,okbtnCallback){
			if(!this.isInit) {
				this.init();
			}
			if(options.type == "top"){
				//this.animateClassIn = "slideOutDown";
				//this.animateClassOut = "slideInUp";
				this.animateClassIn = "slideInUp";
				this.animateClassOut = "slideOutDown";
				this.foot_select_bg.css({"top":"3em"})
				this.foot_select_content.css({"top":"3em","bottom":"auto","padding":0});
			}else{
				this.animateClassIn = "slideInUp";
				this.animateClassOut = "slideOutDown";
				this.foot_select_bg.css({"top":0+"px"})
				this.foot_select_content.attr("style"," ");
				this.foot_select_list.attr("style"," ");
			}
			this.showText = null;
			this.parentWrap = null;
			if($(showText).size()){
				var showText =  $(showText);
				this.showText = showText;
				this.parentWrap = showText.parent();
				showText.css("display","block");
			}
			if(buttonText == null){
				this.foot_select_button.html(buttonText);
				this.foot_select_bg.on("click",function(){
					cntool.footSelect.hide();
				});
			}else{
				//按钮绑定
				this.foot_select_button.find("a").eq(0).on("click",function(){
						cntool.footSelect.hide();
				});
				this.foot_select_button.find("a").eq(1).on("click",function(){
					if(typeof okbtnCallback == "function"){
						okbtnCallback();
					}
					cntool.footSelect.hide();
				});
			}
			this.foot_select_list.wrapInner(showText);
			this.foot_select.css("display","block");
			this.foot_select_bg.removeClass("fadeOut").addClass("fadeIn animated");
			this.foot_select_content.removeClass(this.animateClassOut).addClass(this.animateClassIn+" animated");
			typeof showCallback == "function" && showCallback();
		},
		hide:function(){
			var self = this;
			this.foot_select_content.removeClass(this.animateClassIn).addClass(this.animateClassOut+" animated");
			this.foot_select_bg.removeClass("fadeIn").addClass("fadeOut animated");
			this.foot_select_bg.one("webkitAnimationEnd",function(){
				self.foot_select.hide();
				if(self.showText){
					self.parentWrap.append(self.showText);
				}else{
					self.foot_select_list.empty();
				}
			});
		}
	},
	/*弹出选择图层 end*/
	/*设置存储*/
	setCookie:function(key,value){
		window.localStorage.setItem(key,value)
	},
	getCookie:function(key){
		return window.localStorage.getItem(key)||null;
	},
	removeCookie:function(key){
		window.localStorage.removeItem(key);
	},
	/*设置SessionStorage*/
	setSession:function(key,value){
		window.sessionStorage.setItem(key,value)
	},
	getSession:function(key){
		return window.sessionStorage.getItem(key)||null;
	},
	removeSession:function(key){
		window.sessionStorage.removeItem(key);
	},
	formatDate:function(now,splite,time)   {
			  var now = new   Date(now);    
              var   year=now.getFullYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate();     
              var   hour=now.getHours();     
              var   minute=now.getMinutes();     
              var   second=now.getSeconds();  
			  var sp = "-";
			  var temp = "";
			  if(splite!=null&&splite!=undefined){
			  	sp = splite;
			  }
			  
			  if(month<10){
				month = "0"+month;  
			  }
			  
			  if(date<10){
				  
				 date= "0" +date;
			  }
			  if(hour<10){
				hour = "0"+hour;  
			  }
			  
			  if(minute<10){
				minute = "0"+minute;  
				}
			  if(second<10){
				second = "0"+second;  
			  }
			  
			  
			  temp  = year+sp+month+sp+date;
			 if(time){
				return temp +"   "+hour+":"+minute+":"+second;  
				}else{
				return temp;		
			}
    },
	getTime:function(type) {
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
    },
    changeTime:function(nowTime){
    	var changeTime = nowTime.replace(/-/g,"/");
    	
    	var timestamp = Date.parse(new Date());
    	var now_timestamp = timestamp / 1000;
    		
    	var timestamp2 = Date.parse(new Date(changeTime));
    	var pass_timestamp = timestamp2 / 1000;
    	
    	var time = now_timestamp - pass_timestamp;
    	
    	if(time < 60 && time > 0){
    		return '刚刚';
		}else if(time < 3600 && time >= 60){
    		return parseInt(time / 60) + '分钟前';
		}else if(time >= 3600 && time < 3600 * 24){
			return parseInt(time / 3600) + '小时前';
    	}else if(time >= 3600 * 24 && 3600 * 24 * 30){
    		return parseInt(time / 3600 / 24) + "天前";
    	}else if(time >= 3600 * 24 * 30 && time < 3600 * 24 * 30 * 12){
    		return parseInt(time / 3600 / 24 / 30) + "个月前";
    	}else if(time >= 3600 * 24 * 30 * 12){
    		return parseInt(time / 3600 / 24 / 30 /12) +"年前";
    	}else{
    		return '刚刚';
    	}
    },
    /**
     * 替换聊天页面时间
     * @param nowTime
     * @returns {String}
     */
    changeTime2:function(time){
    	var time = time.replace(/-/g,"/");
    	
    	var nowTime = new Date();
    	var nowYear = nowTime.getFullYear();
        var nowMonth = nowTime.getMonth() + 1;
        var nowDate = nowTime.getDate();
    	var nowHours = nowTime.getHours();
    	var nowMinutes = nowTime.getMinutes();
    	var nowSeconds = nowTime.getSeconds();
    	var nowMilliseconds = nowTime.getMilliseconds();
    	
    	if (nowMonth < 10) {
    		nowMonth = '0' + nowMonth;
        }
    	if (nowDate < 10) {
    		nowDate = '0' + nowDate;
        }
    	if (nowHours < 10) {
    		nowHours = '0' + nowHours;
        }
    	if (nowMinutes < 10) {
    		nowMinutes = '0' + nowMinutes;
        }
    	if (nowSeconds < 10) {
    		nowSeconds = '0' + nowSeconds;
        }
    	
    	var passTime = new Date(time);
    	var passYear = passTime.getFullYear();
        var passMonth = passTime.getMonth() + 1;
        var passDate = passTime.getDate();
    	var passHours = passTime.getHours();
    	var passMinutes = passTime.getMinutes();
    	var passSeconds = passTime.getSeconds();
    	var passMilliseconds = passTime.getMilliseconds();
    	
    	if (passMonth < 10) {
    		passMonth = '0' + passMonth;
        }
    	if (passDate < 10) {
    		passDate = '0' + passDate;
        }
    	if (passHours < 10) {
    		passHours = '0' + passHours;
        }
    	if (passMinutes < 10) {
    		passMinutes = '0' + passMinutes;
        }
    	if (passSeconds < 10) {
    		passSeconds = '0' + passSeconds;
        }
    	
    	var today = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');   
    	var week = today[passTime.getDay()];
    	
    	var yesterday = parseInt(nowYear+nowMonth+nowDate) - parseInt(passYear+passMonth+passDate);	//过去的日子
    	
    	if(yesterday == 0){
			return passHours+':'+passMinutes;
    	}else if(yesterday == 1){
    		return '昨天'+passHours+':'+passMinutes;
    	}else if(yesterday > 1 && yesterday < nowTime.getDay()){
    		return week+passHours+':'+passMinutes;
    	}else{
    		return passYear.toString() + '年' + passMonth.toString() + '月' + passDate.toString() + '日 ' + passHours.toString() + ':' + passMinutes.toString();
    	}
    },
	base64Encode:function(str) {
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
    },
   ajax:function(opt){
	    var defaultOpt = {
		   dataType:"json",
		   async:true,
		   type:"post",
		   saveCache:false, //是否启用storage缓存
		   timeout:10000,
		   error: function(XMLHttpRequest, textStatus, errorThrown) {
	        	if(textStatus == 'timeout') {
	        		cntool.tips('请求超时,请检查网络是否畅通');
	        		return false;
	        	} else if(textStatus == 'error'){
	        		//cntool.tips('请求发生错误');
					cntool.tips('请求超时,请检查网络是否畅通');
	        		return false;
	        	} else if(textStatus == 'notmodified'){
	        		cntool.tips('重复请求');
	        		return false;
	        	} else {
	        		cntool.tips('数据解析异常，请刷新重试');
	        		return false;
	        	}
		   }
	    };
		var opts = $.extend(defaultOpt,opt);
		$.ajax(opts);
   },
   
   transLoaderWrap:function(){
	 var temp = '<div class="loader-inner line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
	 $(".loader-wrap").append(temp);   
   },
   tmplAjaxOptIndex:0,
   tmplAjaxOptData:[],
   tmplAjax:function(opt,templateId,DOMContentId,EvCallback){
	   var self = this;
	   this.tmplAjaxOptData[this.tmplAjaxOptIndex]= opt;
	   var index = this.tmplAjaxOptIndex;
	   var sendOpt =  $.extend({},opt);
	   var listName = opt.listName;
	  
	   sendOpt.success = function(data){
		   var tempData = data[listName]||self.tmplAjaxOptData[index].success(data);
		   if(tempData!=undefined){
			    //插入类型
			   var insertType =  self.tmplAjaxOptData[index].insertType;
			   if(insertType=="html"){
		  	    $(DOMContentId).html($(templateId).tmpl(tempData));
			   }else{
				  $(DOMContentId).append($(templateId).tmpl(tempData));  
			  }
		   }
		   typeof EvCallback == "function" && EvCallback();
		   //释放内存
		   cntool.tmplAjaxOptData[index] = null;
	   }
	   
	    //如果启用了缓存
	   if(opt.saveCache == true){
	      sendOpt.beforeSend = function(a,b){
				new CNSSC().getData(b,index);
				return false;
		  }
	   }
	   self.ajax(sendOpt);
	   this.tmplAjaxOptIndex++;
   },
   /*iscroll下拉刷新封装*/
   
   iscroll:function(opt){
	 //防止重复绑定，只能存在一个iscroll实例，
	 if(this.isBindScroll) return;
	  var dopt = {
		 	upCallback:null,//上拉成功回调
			downCallback:null, //下拉成功回调
			top:"3em",//拖动区域顶部
			bottom:"0em",//拖动区域底部
			wrap:".main"//包裹容器，默认main
		 }
	  var opt = $.extend(dopt,opt);
	  var wrap = $(opt.wrap);
	  
	  var upflag = false;
	  var downflag = false;
	  if(wrap.size()==0){
		 console.log("容器不存在");
		 return;  
	   }
	 
	 var temp = '<div id="wrapper" style="top:'+opt.top+'; bottom:'+opt.bottom+'"><div id="scroller"><div id="scroller-content"></div></div>';
	  $("body").append(temp); 
	  
	  var scroller = $("#scroller");
	  var scrollContent = $("#scroller-content");
	 var downObj = '<div id="scroller-pullDown" style="display:block"><span id="down-icon" class="icon-double-angle-up pull-down-icon"></span><span id="pullDown-msg" class="pull-down-msg">下拉刷新</span></div>';  
	 var upObj = '<div id="scroller-pullUp"> <span id="up-icon" class="icon-double-angle-up pull-up-icon"></span> <span id="pullUp-msg" class="pull-up-msg">加载更多</span> </div>';
	   scrollContent.wrapInner(wrap);
	   if(opt.downCallback!=null){
		   scroller.prepend(downObj);
		   downflag = true;
		}
		if(opt.upCallback!=null){
		  scrollContent.append(upObj);
		   upflag = true;
		}
		
	var cnScroll,
        upIcon = $("#up-icon"),
		downIcon = $("#down-icon"),
		upMsg = $("#pullUp-msg"),
		downMsg = $("#pullDown-msg"),
        flashflag = true,
        clickFlag = cntool.Browser.isAndroid() ? true : false;
    this.cnScroll = cnScroll = new IScroll('#wrapper', {
        probeType: 3,
        mouseWheel: true,
        click: clickFlag
    });
	this.isBindScroll = true;
    cnScroll.on("scroll", function() {
        var y = this.y,
            maxY = this.maxScrollY - y,
            upHasClass = upIcon.hasClass("reverse_icon");
        if (y >= 40) {
			if(downflag){
				downMsg.html("释放刷新");
				downIcon.addClass("reverse_icon");
				return "";
			}
        } else if (y < 40 && y > 0) {
			if(downflag){
				downMsg.html("下拉刷新");
				downIcon.removeClass("reverse_icon");
				return "";
			}
        }
        if (maxY >= 40) {
			if(upflag){
            upMsg.html("释放加载");
            !upHasClass && upIcon.addClass("reverse_icon");
            return "";
			}
        } else if (maxY < 40 && maxY >= 0) {
			if(upflag){
				upMsg.html("加载更多");
				upHasClass && upIcon.removeClass("reverse_icon");
				return "";
			}
        }
    });
    cnScroll.on("slideDown", function() {
        //当下拉，使得边界超出时，如果手指从屏幕移开，则会触发该事件
        if (this.y > 40) {
			if(downflag){
            typeof opt.downCallback =="function" && opt.downCallback();
			}
        }
    });
    cnScroll.on("slideUp", function() {
        if (this.maxScrollY - this.y > 40) {
			if(upflag){
				typeof opt.upCallback =="function" && opt.upCallback();
				upIcon.removeClass("reverse_icon")
			}
        }
    });
   },
   replaceHtmlTag:function(str){
     return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
   },
   //检测是否手机号码
   checkPhone : function (val) {
        var pattern =  /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        if (pattern.test(val)) {
            return true;
        } else {
            return false;
        }
	},
	//获取7牛token
	qiniuGetToken : function(callback){
		var self = this;
		 $.ajax({
			 url: cntool.getWebPath() + "/common/qiniu_token",
			 type: "post",
			 data: "",//cntool.auth.getLoginMsg(),
			 dataType: "json",
			 success: function(data) {
				 if (data.statusCode != '200') {
					 return false;
				 } else {
                    //self.getToKen();
					 typeof callback == "function" && callback(data);
				 }
			 },
			 complete: function() {
				
			 }
		 });
	},
	showShare:function(shareImg){
		var shareImg = shareImg||'<div class="share-tips" onclick="cntool.hideLayer()"></div>';
		this.showLayer(shareImg,0,1,function(){
			$("#fixedlayer-content").addClass("no-middle")	
		},true);
	},
	creatScript:function(scriptUrl){
		var oHead = document.getElementsByTagName('HEAD').item(0); 
		var oScript= document.createElement("script"); 
		oScript.type = "text/javascript"; 
		oScript.src=scriptUrl; 
		oHead.appendChild(oScript); 
	},
	GetRandomNum:function(Min,Max){   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	},
	Browser:{
		browser :{
			versions: function() {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				return {
					//移动终端浏览器版本信息 
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !u.match(/AppleWebKit.*Mobile.*/) || !u.match(/AppleWebKit/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		},
		isAndroid:function(){
			return cntool.Browser.browser.versions.android;
		},
		isIos:function(){
			 return cntool.Browser.browser.versions.ios;
		}
    },
	//百度地图获取地理位置信息
	getPositionSuccess:function(position,sucCallback,failCallback){
			var lat = position.x;
			var lng = position.y;
			var akKey = "ZapeX7mhxdHvd3t3g480lGVq";
			$.ajax({
				url: 'http://api.map.baidu.com/geocoder/v2/?ak='+akKey+'&callback=renderReverse&output=json&pois=1',
				async:true,
				type: 'GET',
				dataType: 'jsonp',
				jsonp: 'callback',
				data: {'location':lat+','+lng},
				error:function(){
		           typeof failCallback == "function" && failCallback();
		        },
				success:function(data){
					typeof sucCallback == "function" && sucCallback(data);
				}
			});
	},
	//判断字符串是否全中文
	isChn:function(str)
	{
		var reg=/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
		if(!reg.test(str)){
		return false;
		}else{
		return true;
		}
	}
};

//公共接口封装
var cnAjax = {
	
	//获取验证码
	getCode:function(ajaxdata,callback,failCallback){
		cntool.ajax({
			url:cntool.getWebPath()+"/user/get_code.json",
			data:ajaxdata,
			success:function(data){
				if(data.statusCode!="200"){
					cntool.tips(data.msg);	
					typeof failCallback == "function" && failCallback(data);
					return;
				}
				typeof callback == "function" && callback(data);
			},
			complete:function(){
				
			}
		});
	},
	
	//账户绑定手机获取验证码
	getBindCode:function(ajaxdata,callback,failCallback){
		cntool.ajax({
			url:cntool.getWebPath()+"/user/get_code.json",
			data:ajaxdata,
			success:function(data){
				if(data.statusCode!="200"){
					cntool.tips(data.msg);	
					typeof failCallback == "function" && failCallback(data);
					return;
				}
				typeof callback == "function" && callback(data);
			},
			complete:function(){
				
			}
		});
	},
	
		//ajax列表控件
		LIST:{
			option:{},
			offset : 0, //当前页数
			noData : false,//没有数据标识
			isLoading:false,//请求中标记
			data:{},//请求数据
			init:function(options){
				var self = this;
				var opt = {
						ListFieldName:"list",//列表字段
						page_size:10,//一页多少条
						url:"",//请求地址
						data:{},//请求数据
						showLoading:true,//是否显示loadding
						type:"post",
						noDataCallback:null,//没有数据回调
						successCallback:null,//成功翻页回调
						lastDataCallback:null,//最后一页回调
						compeleteDataCallback:null//回调成功执行
				}
			  $.extend(self.option,opt,options);
			  self.data = self.option.data;
			  self.getList();
			  self.BindScrollGetDate();
			},
			//请求
			getList : function(){
				var self = this;
				var isSuccess = true;
				//没有数据
				if(this.noData==true){
					return;	
				}
				//防止重复加载
				if(this.isLoading==true){
					return;	
				}
				if(self.option.showLoading){
					cntool.showLoad();	
				}
				this.isLoading = true;
				var ajaxData = this.data;
				ajaxData.offset = self.offset;
				ajaxData.page_size = self.option.page_size;
				cntool.ajax({
				url:self.option.url,
				data:ajaxData,
				type:self.option.type,
				success:function(data){
					
					if(typeof data[self.option.ListFieldName] == "undefined"){
						cntool.tips("获取信息出错");
						isSuccess = false;
						return;	
					}
					
					//cntool.hideLoad();
					
					var list = data[self.option.ListFieldName];
					
					
					
					if(list.length==0&&self.offset==0){
						self.noData = true;
						typeof self.option.noDataCallback == "function" && self.option.noDataCallback();
						return;
					}
					//返回数据不足一页，则没有数据
					if(list.length<self.option.page_size){
						self.noData = true;
						typeof self.option.lastDataCallback == "function" && self.option.lastDataCallback();
					}
					typeof self.option.successCallback == "function" && self.option.successCallback(data)
					//翻页自增
					console.log(self.offset+"__"+self.option.page_size)
					self.offset = self.offset+self.option.page_size;
				},
				complete:function(){
					self.isLoading = false;	
					if(isSuccess&&self.option.showLoading){
						cntool.hideLoad();	
					}
				}});
			},
			//绑定滚动翻页
			BindScrollGetDate:function (getDataEvent) {
				var self = this;
				$(document).scroll(function () {
					var document_height = $(document).height();
					var scroll_height = parseInt($(document).scrollTop() + 10) + parseInt($(window).height());
					if (document_height <= scroll_height) {
						self.getList();
					}
				});
         }
		}

	
}


var cnBindCtr = {
	isInit:false,
	successCallBack:null,//绑定成功回调
	historyAddFlag:false,//历史纪录添加
	isSuccess:null,
	//验证是否需要登录
	isNeedLogin:function(callback){
		var self =  this;
		if(self.isNeedLoginFlag == true){
			return;	
		}
		self.isNeedLoginFlag = true;
		
		cntool.ajax({
			url:cntool.getWebPath()+"/user/is_regist.json",
			data:{},
			success:function(data){
				//如果需要绑定手机
				if(data.statusCode=="02"){
					self.show(callback);
				}else{
					typeof callback == "function" ? callback():cntool.open(callback);
				}
			},
			complete:function(){
				self.isNeedLoginFlag = false;
			},
			error:function(){
				cntool.tips("操作异常，请重试");		
			}
		})
	},
	init:function(){
		this.write();
		this.bindEvent();
		this.isInit = true;
		
		
	},
	write:function(){
		var temp = '<div id="bind-phone-div" >'
					+'<div class="bind-phone-div bg-white" style="padding-top:0">'
				
					+'<header class="head pr"><div class="h-left pa"></div><div class="page-title text-center black-3b"><p class="f16">绑定手机</p> </div> <div class="h-right pa"><a href="javascript:" class="icon-back2 bg-cover-after" id="win-btn-close"></a></div> </header>'
					+'<div class="table line-items">'
					+'<div class="table-cell pl-1em pt-1em pb-1em"><nobr>手机号<span class="w-1em dblock"></span></nobr></div>'
					+'<div class="table-cell ads-c-12 text-right"><input type="number" value="" maxlength="11" placeholder="请输入手机号" class="style-input" id="win_phone"></div>'
					+'</div>'
					+'<div class="table line-items" style="margin-bottom:-1px">'
					+'<div class="table-cell pl-1em pt-1em pb-1em"><nobr>验证码<span class="w-1em dblock"></span></nobr></div>'
					+'<div class="table-cell ads-c-12 text-right"><input type="number" value="" maxlength="6" placeholder="输入验证码" class="style-input" id="win_key"></div>'
					+'<div class="table-cell "><nobr><a href="javascript:" class="get-code orange fem-08" id="win_get-code">获取验证码</a></nobr></div>'
					+'</div>'
					+'<div class="pd-1em">'
					+'<a href="javascript:void(0);" class="btn" id="win_save-btn">确定</a>'
					+'</div>'
					+'</div>'
					+'</div>'
					+'<div class="bind-phone-div-bg" id="bind-phone-div-bg"></div>';
					
		$("body").append(temp);
		
	},
	show:function(callback){
		//如果已经初始化
		if(!this.isInit){
			this.init();
		}
		this.successCallBack = callback;
		$("#bind-phone-div,#bind-phone-div-bg").show(0);
		cntool.setSession("openBindPhone","true")
		//history.pushState({page:document.title}, document.title, location.href+"#asd");
		
	},
	hide:function(){
		$("#bind-phone-div,#bind-phone-div-bg").hide(0);
	},
	//绑定事件
	bindEvent:function(){
		var self = this;
		$("#win_phone").on("keypress keyup keydown",function(){
			this.value=this.value.replace(/\D/g,'').substr(0,11);	
		})
		
		$("#win_key").on("keypress keyup keydown",function(){
			this.value=this.value.replace(/\D/g,'').substr(0,6);	
		})
		
		$("#win_get-code").click(function(){
			if(self.codeWating==true){
				return;	
			}
			self.getCode();
		});
		
		$("#win_save-btn").click(function(){
			self.submit();
		});
		$("#win-btn-close").click(function(){
			self.hide();
			//history.go(-1);
		})
	},
	//等待验证码
	waitCode:function(dom,time){
		var self = this;
		dom.html(time+"s后重新获取");
		if(time>0){
			setTimeout(function(){
				self.waitCode(dom,time-1);
			},1000)
		}else{
			self.codeWating = false;
			dom.html("重新获取");
		}
	},
	//获取验证码
	getCode : function(){
		var self = this;
		if(!this.checkPhone()){
			return false;
		}
		self.codeWating = true;
		cntool.showLoad();
		var ajaxdata = {
			phone:$("#win_phone").val(),
			type:"BIND"
		}
		cnAjax.getBindCode(ajaxdata,function(data){
				cntool.tips("验证码已发送");
				setTimeout(function(){
					cntool.hideLayer();
				},1000)
				self.waitCode($(".get-code"),120);
		},function(data){
				self.codeWating = false;	
		})
	},
	//提交表单
	submit : function(){
		var self = this;
		if(!self.checkFrom()) return;
		if(self.submitFlag==true){
			return;	
		}
		self.submitFlag = true;
		cntool.showLoad();
		cntool.ajax({
			url:cntool.getWebPath()+"/user/regist",
			type:"post",
			data:{
				phone:$("#win_phone").val(),
				code_input:$("#win_key").val(),
				},
			success:function(data){
				if(data.statusCode == "200"){
					self.hide();
					self.isSuccess = true;
					typeof self.successCallBack == "function" ? self.successCallBack():cntool.open(self.successCallBack);
					/*
					cntool.ctips("您好，手机号绑定成功!","确定",function(){
						self.successCallBack
					});*/
					
				}else{
					cntool.tips(data.msg);
					self.isSuccess = false;
				}
			},
			complete:function(){
				self.submitFlag = false;
			}
		});
	},
	//检测手机号码
	checkPhone : function(){
		var self = this;
		if(!cntool.checkPhone($.trim($("#win_phone").val()))){
			cntool.tips("请输入正确的手机号码");
			return false;	
		}
		return true;
	},
	//检测表单
	checkFrom : function(){
		var self = this;
		if(!self.checkPhone()){
			return false;
		}
		if($.trim($("#win_key").val())==""){
			cntool.tips("请填写验证码");
			return false;
		}
		return true;
	}
}