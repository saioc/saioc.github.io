/* 
 * @authors miued ()
 * @date    2015-10-16 20:34:58
 * @version 1.24
 */

jQuery(document).ready(function($) {
         img_height();
	$(window).resize(function(){
	  hdp_hei();
            // weintopleft();
             img_height();
	});
jQuery("img.lazy").lazyload();

// var myLazyLoad =new LazyLoad({
//         elements_selector:'.lazy',
//         threshold : 200,
//         effect : "fadeIn"
       
//     });

function getImgHeight(element){
    jQuery('img.thumb').each(function (i){
       var hei = jQuery(this).height()-28+'px';
       jQuery(this).parents('li').find('.jidi').css({
            top:hei
         });
    });
}


//首页幻灯片高度计算
hdp_hei();
function hdp_hei(){
	isImgLoad(function(){
    // 加载完成
	    // var hei=$('#hdphome .slides li img').height();
        var hei=$('.swiper-slide .coveimg').height();
        //console.log(hei);
		//$('.swiper-container').css('height','auto');
	});
}

var t_img; // 定时器
var isLoad = true; // 控制变量
// 判断图片加载状况，加载完成后回调
isImgLoad(function(){
    // 加载完成
    var hei=$('.swiper-slide .coveimg').height();
	//	alert(hei);
});

// 判断图片加载的函数
function isImgLoad(callback){
    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
    // 查找所有封面图，迭代处理
    $('.coveimg').each(function(){
        // 找到为0就将isLoad设为false，并退出each
        if(this.height === 0){
            isLoad = false;
            return false;
        }else if(this.height < 200){
        	isLoad = false;
            return false;
        };
    });
    // 为true，没有发现为0的。加载完毕
    if(isLoad){
        clearTimeout(t_img); // 清除定时器
        // 回调函数
        callback();
    // 为false，因为找到了没有加载完成的图，将调用定时器递归
    }else{
        isLoad = true;
        t_img = setTimeout(function(){
            isImgLoad(callback); // 递归扫描
        },200); // 我这里设置的是500毫秒就扫描一次，可以自己调整
    }
}

$(".dwonBT").click(function(event) {
	//var top=$('#dwonBT').offset();
		event.preventDefault();
	$('html,body').animate({scrollTop:$('#dwonBT').offset().top-100},600);
});
$(".zaixianbf").click(function(event) {
    //var top=$('#dwonBT').offset();
        event.preventDefault();
    $('html,body').animate({scrollTop:$('.mi_paly_box').offset().top-50},600);
});


  
  //缩图比例，针对外链接图
function img_height(){
   $bi=270/380;
   $li=jQuery('.thumb').parent('a').parent('li').width();
   $imh=$li / $bi;
    jQuery('.thumb').parent('a').height($imh);
}




$('.weixingz').on('click',function(){
    if(jQuery('.weixinimg_bg').is(":hidden")){
        jQuery('.weixinimg_bg').fadeIn('200');
        jQuery('.weixinimg').fadeIn('200');
        weintopleft(jQuery('.weixinimg'));
    }
});
$('.weixinimg_bg').on('click',function(){
        jQuery('.weixinimg_bg').fadeOut('200');
        jQuery('.weixinimg').fadeOut('200');
         jQuery('.zshangimg').fadeOut('200');
        jQuery('.zshangimg .wx').hide();
         jQuery('.zshangimg .zfb').hide();
});
function weintopleft(el){
    var left=($(window).width()-el.width())/2;
    el.css({
        left:left
    });
}


$('.zshang .wx').on('click',function(){
    if(jQuery('.weixinimg_bg').is(":hidden")){
        jQuery('.weixinimg_bg').fadeIn('200');
        jQuery('.zshangimg').fadeIn('200');
        jQuery('.zshangimg .wx').show();
        weintopleft(jQuery('.zshangimg'));
    }
});
$('.zshang .zfb').on('click',function(){
    if(jQuery('.weixinimg_bg').is(":hidden")){
        jQuery('.weixinimg_bg').fadeIn('200');
        jQuery('.zshangimg').fadeIn('200');
        jQuery('.zshangimg .zfb').show();
        weintopleft(jQuery('.zshangimg'));
    }
});



////////////////////////////////textarea框字数-1///////////////////////////////////
    function exeTextKeyUp(t) {
        var max = parseInt(t.attr('maxlength'));
        if (t.length > 0) {
            if (t.val().length > max) {
                t.val(t.val().substr(0, t.attr('maxlength')));
            }
            if (t.parent().find(".cf30.abc").length > 0) {
                t.parent().find(".cf30.abc").html(max - t.val().length);
            } else if (t.parent().parent().find(".cf30.abc").length > 0) {
                t.parent().parent().find(".cf30.abc").html(max - t.val().length);
            }
        } else {

        }
    }
$('textarea[maxlength]').on('keyup', function() {
        exeTextKeyUp($(this));
    });
    $('textarea[maxlength]').on('blur', function() {
        exeTextKeyUp($(this));
    });

    $('input[maxlength]').on('keyup', function() {
        exeTextKeyUp($(this));
    });
    $('input[maxlength]').on('blur', function() {
        exeTextKeyUp($(this));
    });

    $.each($('textarea[maxlength]'), function(i, n) {
        exeTextKeyUp($(this));
    });
    $.each($('input[maxlength]'), function(i, n) {
        exeTextKeyUp($(this));
    });

$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $(document).on('click', '#commentnavi a', function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            beforeSend: function() {
                // 请将下方的“#comments_content”改为你的评论区块顶部任意ID/CLASS！
                $body.animate({
                    scrollTop: $('#qbpltxt').offset().top - 65
                }, 1500);

                $('#loading-comments').slideDown();
                // 请将下方的“.navigation”改为你的导航栏ID/CLASS！
                $('#commentnavi').remove();
                // 请将下方的“.commentlist”改为你的整体评论内容之ID/CLASS！
                $('.commentlist').fadeOut(800);

            },
            dataType: "html",
            success: function(out) {
                // 请将下方的“.commentlist”改为你的整体评论内容之ID/CLASS！
                result = $(out).find('.commentlist');
                // 请将下方的“.navigation”改为你的导航栏ID/CLASS！
                belownav = $(out).find('#commentnavi');
                $('#loading-comments').slideUp(550);
                //console.log(result);
                $('#loading-comments').after(result.fadeIn(800));
                result.after(belownav);
            }


        });

    });


//返回顶部
$(window).scroll(function() {
		if ($(this).scrollTop() >= 30) {
			if (!$(".to-top").hasClass("topbtnfadein"))
				$(".to-top").removeClass("topbtnfadeout topbtnhide").addClass("topbtnfadein topbtnshow").removeClass("topbtnfadein");
			//$(".to-top").stop().animate({bottom: 30, opacity: 100});
		} else {
			if (!$(".to-top").hasClass("topbtnfadeout"))
				$(".to-top").removeClass("topbtnfadein topbtnshow").addClass("topbtnfadeout topbtnhide").removeClass("topbtnfadeout");
		}
	})
$(".to-top").click(function() {
		$("body, html").stop().animate({
			scrollTop: 0
		});
	});


});//主结束

