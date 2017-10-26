(function($){
function cnUploadPic(opt) {
    var option = {
        file: "#upload_img",
        maxSize: 10, //单位M
        jcrop: false,
        jcropWrap: "#preview_img",
        changeCallback: null,
        jcropCallBack: null
    };
    this.option = $.extend(option, opt);
    this.init();
}

cnUploadPic.prototype.init = function() {

    if (this.option.jcrop) {
        this.jcropWrap = $(this.option.jcropWrap);
    }
	this.obj_file = $(this.option.file);
    this.bind();
};
cnUploadPic.prototype.tips = function(txt) {
    return cntool.tips(txt);
}
cnUploadPic.prototype.check = function(val){
	return true;
}
cnUploadPic.prototype.bind = function() {
    var self = this;
    this.img_src = null;
    this.upload_file_data = null;
    //监控上传图片是否有改变
    $(document).on('change', self.option.file, function() {
        //var img_src = null;
		var objInput =  $(this).find("input").length>0?$(this).find("input"):$(this);
        var val = objInput.val();
        var upload_img = objInput[0].files[0];
		self.obj_file = objInput;
		self.upload_file_data = upload_img;
        
		if(!self.check(val)){
			return false;	
		}
		
        if (window.createObjectURL != undefined) {
            self.img_src = window.createObjectURL(upload_img);
        } else if (window.URL != undefined) {
            self.img_src = window.URL.createObjectURL(upload_img);
        } else if (window.webkitURL != undefined) {
            self.img_src = window.webkitURL.createObjectURL(upload_img);
        }

        
		
		//改变input回调参数
		var CallbackParam = {
			eventObj:$(this),
			inputObj:objInput,
			imgSrc:self.img_src,
			inputFile:upload_img
		}

        typeof self.option.changeCallback == "function" && self.option.changeCallback(val,CallbackParam);
		
		if(self.option.jcrop){
			self.bindJcrop();
		}
		if(val!=''){
			self.obj_file.val('');
		}
    });
}
cnUploadPic.prototype.bindJcrop = function() {
	
    var self = this;

    if (typeof $.fn.Jcrop == "undefined") {
        return
    };

    var img_src = this.img_src;
    var upload_img = this.upload_file_data;
	var zoom_width = 1;

    self.jcropWrap.empty().show(0);
    self.jcropWrap.append(
        '<img src="" id="cropbox">' +
        '<img src="" id="img_size" style="width:auto; height:auto; visibility:visible">' +
        '<input type="hidden" id="x" name="x" />' +
        '<input type="hidden" id="y" name="y" />' +
        '<input type="hidden" id="w" name="w" />' +
        '<input type="hidden" id="h" name="h" />'
    );
	
	//获取图片裁剪的尺寸
	function updateCoords(c){
		$('#x').val(Math.floor(c.x *zoom_width));
		$('#y').val(Math.floor(c.y *zoom_width));
		$('#w').val(Math.floor(c.w *zoom_width));
		$('#h').val(Math.floor(c.h *zoom_width));
	};
    $('#cropbox').attr('src', img_src);
    $('.jcrop-holder img').attr('src', img_src);
    $('#cropbox').css({
        'width': '100%'
    });
    var img_size = document.getElementById('img_size');
    var reader = new FileReader();
    reader.readAsDataURL(upload_img);
    reader.onload = function(e) {
        img_size.src = this.result;
        var imageObj = new Image();
        imageObj.src = this.result;

        imageObj.onload = function() {
            var img_width = img_size.width;
            var img_height = img_size.height;
			
            var win_width = $(window).width();
			
			var zoom_img_width = $('#cropbox').width()
			
			if(img_size.width<zoom_img_width){
				zoom_width = img_size.width/zoom_img_width;	
			}
            
			window.img_old_width = img_width+win_width;


            $('#x').val(0);
            $('#y').val(0);
            $('#w').val(img_width);
            $('#h').val(img_height);

            $('#cropbox').Jcrop({
                    aspectRatio: 1,
                    onSelect: updateCoords
                },
                function() {
                    this.setSelect([20, 20, 100, 100]);
                }
            );
        };
    };
	typeof self.option.jcropCallBack == "function" && self.option.jcropCallBack(self.upload_file_data);
}
window.cnUploadPic = cnUploadPic;
})(jQuery);
