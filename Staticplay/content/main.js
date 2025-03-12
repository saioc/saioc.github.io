/**
 * Front js file, handles most of the js functionality.
 *
 * @package sisc
 * @since sisc 1.0
 */
 
jQuery(document).ready(function($){
    
    'use strict';

    var last_scroll = 0;
    var scrollObj;
   
    // Initialized main.
    function init(){

        $(window).on('resize', resizeHandler);        
        $(window).on('scroll',function(){

            var scroll = $(window).scrollTop();
            if(Math.abs(scroll - last_scroll) > $(window).height() * 0.1){
                last_scroll = scroll;
                revealStuff();   
            }
            showReviews();
        });
       

        FWDUVPUtils.checkIfHasTransofrms();
        if(page == "main"){
            setupVideoPlayer();
        }else if(page == "demo-single"){
            setupVideoPlayerDemo();
        }
        hideOrShowScondaryMenu();
        revealStuff();
        resizeHandler();
        setTimeout(resizeHandler, 100);
    }

    function resizeHandler(){
        hideOrShowScondaryMenu();
        resizeFi();
        resizeAPi();
        resizeFeaturesImg();
    }

    // Reveal stuff.
    function revealStuff(){

        if(isVisible($('.ft'), -100)){
           $('.ft').addClass('reveal');
        }

        if(isVisible($('.main-info'), -100)){
           $('.main-info').addClass('reveal');
        }

        if(isVisible($('.ft2 .col:first-child'))){
            var dl = 0;
            $('.ft2 .col:first-child').addClass('reveal');
            $('.ft2 .col.fwd-hide').each(function(index, element){
                setTimeout(function(){
                    $(element).addClass('reveal');
                }, dl);
                dl += 70;
             });
        }

        if(isVisible($('.expand-more'), -100)){
           $('.expand-more').addClass('reveal');
        }

        if(isVisible($('.familly'), -100)){
           $('.familly').addClass('reveal');
        }

        $('.main-ft .ft-col.fwd-hide').each(function(index, element){
            if(isVisible($(this), -100)){
                $(this).addClass('reveal');
            }
        });

        if(isVisible($('.quality .col1'), -100)){
           $('.quality .col1').addClass('reveal');
        }

        if(isVisible($('.quality .col2'), -100)){
           $('.quality .col2').addClass('reveal');
        }

        if(isVisible($('.m-ft .title'), -100)){
           $('.m-ft .title').addClass('reveal');
        }

        if(isVisible($('.m-main-holder'), -150)){
           $('.m-main-holder').addClass('reveal');
        }

        if(isVisible($('.footer-main'), -100)){
           $('.footer-main').addClass('reveal');
        }

        if(isVisible($('.ready'), -100)){
           $('.ready').addClass('reveal');
        }       

        if(isVisible($('.api'), -100)){
           $('.api').addClass('reveal');
        }  

        if(isVisible($('.lightbox-a-holder'), -100)){
           $('.lightbox-a-holder').addClass('reveal');
        } 

        if(isVisible($('.vast'), -100)){
           $('.vast').addClass('reveal');
        } 
    }

    function isVisible(element, offset){
       
        if(element.hasClass('reveal') || !element.length){
           return;
        }
        
        if(!offset){
            offset = 0;
        }  

        var scroll_pos = $(window).scrollTop();
        var window_height = $(window).height();
        var el_top = $(element).offset().top;
        var el_height = $(element).height();
        var el_bottom = el_top + el_height;
        var result = ((el_top - offset < scroll_pos + window_height));
        return result;
    }

    // Reviews;
    var prevRevId;
    var revCls = false;
    var allowToShwReview = false;
    var rev_to;
    var rev_running = false;

    if(page == "demos"){
        allowToShwReview = true;
    }

    var rev_ar = [{'author':'ecoverdesign', 'text':'Excellent Video Player and far superior to similar players. Beside of this it comes with great customer support. Highly recommended!'},
                  {'author':'CleanSlateDigital', 'text':'Great player. Have used it for years and unlike SO MANY plugins, the developer is always fast to respond and help. Highly recommend...'},
                  {'author':'nikolin_sigal', 'text':'Customer support is fantastic, I managed to manage a plugin issue problem and it only took 24 hours.The best plugin for video in wordpress...'},
                  {'author':'chilango74', 'text':'Very good plugin supporting a lot of features including URL encryption. Excellent support is also worth mentioning.'},
                  {'author':'vaudu07', 'text':'I have to say that this plugin is really amazing but Tibi´s support is even better. Tibi is always trying to give you the best solution in his hands...'},
                  {'author':'Videoblam', 'text':'Excellent Video Player and far superior to similar players. Beside of this it comes with great customer support. Highly recommended!'},
                  {'author':'mabrown0126', 'text':'Wish 6 stars was an option... I purchased this product 4 months ago and the author (Tibi) has been absolutely fantastic with his customer support...'},
                  {'author':'ecoverdesign', 'text':'Elegant, seamless plugin with a lot of customizations available. I needed a responsive video player that would host local video, and also pause when....'},
                  {'author':'wollesen1', 'text':'I was looking for a very specific look for the video player and I was able to customize it to exactly what I wanted for my website.'}];

    setRev();
    function setRev(){
        var tt = rev_ar.length -1;
        var id = Math.round(Math.random() * tt);
        if( prevRevId == id){
            setRev();
            return;
        }
        prevRevId = id;
       
        $('.reviews .author').html(rev_ar[id]['author']);
        $('.reviews .text').html(rev_ar[id]['text']);
        $('.reviews .left img').removeClass('rev-animation');
        setTimeout(function(){
            $('.reviews .left img').addClass('rev-animation');
        }, 50);
    }

    function showReviews(){
       
        if(revCls || !allowToShwReview){
            return;
        } 

        var scroll_pos = $(window).scrollTop();

        if(page == "main"){
            
            var window_height = $(window).height();
            var el_top = $('#myDiv').offset().top;
            var el_height = $('#myDiv').height();
            var rev_height =  $('.reviews').height();
            var el_bottom = el_top + el_height;
            var finalBtm = scroll_pos - el_bottom;

            if(Math.abs(finalBtm) < (window_height - rev_height - 80) || finalBtm >= 0){
                $('.reviews').addClass('review-reveal');
                switchReviews();
            }else{
                $('.reviews').removeClass('review-reveal');
                revHover();
            }    
        }else if(page == "demos"){
            if(scroll_pos > 200){
                switchReviews();
                $('.reviews').addClass('review-reveal');
            }
        }
    }

    $('.reviews .close').on('click', function(e){
        revCls = true;
        $('.reviews').removeClass('review-reveal');
        $('.reviews').off('mouseleave', switchReviews);
        revHover();
    });

    $('.reviews').on('mouseenter', revHover);
    $('.reviews').on('mouseleave', switchReviews);

    function switchReviews(){
        if(rev_running){
            return;
        }
        clearInterval(rev_to);
        rev_running = true;
        rev_to = setInterval(setRev, 5000);
    }

    function revHover(){
        if(!rev_running){
            return;
        }
        rev_running = false;
        clearInterval(rev_to);
    }

    function resizeFeaturesImg(){
        if(!$('#img_1').length) return;
        var sw = $(window).outerWidth();

        if(sw <= 1015){
            
            var dW = 958;
            var dH = 545;
            var scale = $('#img_1').width() / dW;
            var h = Math.round(dH * scale);
            $('.main-ft .image').each(function(indx, el){
                $(el).height(h)
            });
        }else{
             $('.main-ft .image').each(function(indx, el){
               
                $(el).height(324)
            });
        }
    }

    // Animate clicks.
    $('#features_menu').on('click', function(e){
        scrollToFeatures();
    });

    function scrollToFeatures(){
        var startY =  $('.main-ft').offset().top;
        var pos = startY - 80;
       
        scrollObj = {scrollPos:$(window).scrollTop()}
        
        $(scrollObj).animate({ // call animate on the object
            scrollPos: pos
        }, {
            duration: 800,
            easing: 'easeInOutExpo',
            step: function(now) { // called for each animation step (now refers to the value changed)
                window.scrollTo(0,now);
            }
        });
    }

    window.scrollTop =  function(){
        var startY =  0;
        var pos = startY;
       
        scrollObj = {scrollPos:$(window).scrollTop()}
        
        $(scrollObj).animate({ // call animate on the object
            scrollPos: pos
        }, {
            duration: 800,
            easing: 'easeInOutExpo',
            step: function(now) { // called for each animation step (now refers to the value changed)
                window.scrollTo(0,now);
            }
        });
    }

   
    // Menu.
    $('.sub-menu').on('mouseover', function(){
        $(this).prt().addClass('active');
    });

    $('.sub-menu').on('mouseleave', function(){
        $(this).prt().removeClass('active');
    });
    
   
    $('.menu').addClass('reveal');

    var vMenuShowed = false;
    $('.vertical-menu-toggle').on('click', function(){
        if(!vMenuShowed){
            vMenuShowed = true;
            $('.vertical-menu-toggle').addClass('vertical-menu--showed');
            $('.secondary-navigation').addClass('secondary-menu-show');
            $(window).on('click', closeSecondaryMenu);
        }else{
            vMenuShowed = false;
            $('.vertical-menu-toggle').removeClass('vertical-menu--showed');
            $('.secondary-navigation').removeClass('secondary-menu-show');
        }
    });

    function closeSecondaryMenu(e){
        var vmc = FWDUVPUtils.getViewportMouseCoordinates(e);    
        if(!FWDUVPUtils.hitTest($('.vertical-menu-toggle')[0], vmc.screenX, vmc.screenY)
          && !FWDUVPUtils.hitTest($('.vertical-menu-toggle')[0], vmc.screenX, vmc.screenY)){
            vMenuShowed = false;
            $('.vertical-menu-toggle').removeClass('vertical-menu--showed');
            $('.secondary-navigation').removeClass('secondary-menu-show');
        }
    }

    function hideOrShowScondaryMenu(){
        var sW = $(window).width();
        
        if(sW <= 700){
            $('.vertical-menu-toggle').addClass('vertical-menu-show');
            $('.primary-navigation').addClass('primary-menu-hide');
            $('.secondary-navigation').addClass('activate-secondary-menu');
            
        }else{
            $('.vertical-menu-toggle').removeClass('vertical-menu-show');
            $('.vertical-menu-toggle').removeClass('vertical-menu--showed');
            $('.primary-navigation').removeClass('primary-menu-hide');
            $('.secondary-navigation').removeClass('activate-secondary-menu');
            $('.secondary-navigation').removeClass('secondary-menu-show');
            vMenuShowed = false;
        }
    }

    //Try
    $('.try').addClass('reveal');
    $('.improve').addClass('reveal');

 
    // Theme and colors switcher.
    var whiteC = ['#888888', '#E78E09', '#E70909', '#a20025', '#008a00', '#6a00ff', '#0099ff', '#DF1375', '#825a2c'];
    var darkC = ['#666666', '#E78E09', '#E70909',  '#dbc300', '#48DF13', '#13DFD3', '#0099ff', '#DF1375', '#996E6E'];
    var darkL = ['Grey', 'Orange', 'Red', 'Yellow', 'Green', 'Blue', 'Neon Blue', 'Pink','Brown'];
    var whiteL = ['Grey', 'Orange', 'Red', 'Dark Brown', 'Green', 'Blue', 'Neon Blue', 'Pink','Brown'];
    window['isWhite'] = false;
    var isDark = true;
    var colorId = 0;
    var style_to;
    var nBC;
    var sBC;
    var clr;
    
    resetColors();
    addColorsEvents();
    enableDisableColors();
    checkThemeState();

    
    function checkThemeState(){
        if(isDark){
            $('.dark').addClass('tc-disabled');
            $('.white').removeClass('tc-disabled');
            $('link[href="css/white.css"]').remove();
        }else{
            $('.dark').removeClass('tc-disabled');
            $('.white').addClass('tc-disabled');
            $('<link rel="stylesheet" href="css/white.css" type="text/css"/>').insertAfter('#main_css');
        }
    }

    function setDState(){
        colorId = 0;
        checkThemeState();
        resetColors();
        updateColors();
        enableDisableColors();
        updateSkin();
    }

    function getColorAr(){
         var s;
         if(isDark){
            s = darkC
         }else{
            s = whiteC;
         }
         return s;
    }

    function resetColors(){
        var s = getColorAr();
        $('.colors .color').each(function(i, el){
            var c = s[i];
            $(el).css({'background':c});
            $(el).find('.outline').css({'border-color':c});
            if(isDark){
                $(el).find('.tp').html(darkL[i]);
            }else{
                $(el).find('.tp').html(whiteL[i]);
            }
         });
    }

    function addColorsEvents(){
        $('.colors .color').each(function(index, element){
            $(element).attr('id', 'c_' + index);
            $(element).on('mouseover', function(e){
               var el = $(element).find('.tp');
               el.css({'display':'block'});
               FWDAnimation.to(el[0], .8, {css:{opacity:1}, ease: Expo.easeOut});
            });

            $(element).on('mouseout', function(e){
                var el = $(element).find('.tp');
                FWDAnimation.killTweensOf(el[0]);
                el.css({'display':'none', 'opacity':0});
            });

            $(element).on('click', function(e){
                colorId = parseInt($(this).attr("id").match(/c_[0-9]+/)[0].slice(2));
                enableDisableColors();
                updateColors();
            });
        });

        $('.dark, .white').on('mouseover', function(e){
            var el = $(this).find('.tp');
            el.css({'display':'block'});
            FWDAnimation.to(el[0], .8, {css:{opacity:1}, ease: Expo.easeOut});
        });

        $('.dark, .white').on('mouseout', function(e){
            var el = $(this).find('.tp');
            FWDAnimation.killTweensOf(el[0]);
            el.css({'display':'none', 'opacity':0});
        });

        $('.dark, .white').on('click', function(e){
            if($(this).attr('class').indexOf('dark') != -1 && !isDark){
                isDark = true;
                window['isWhite'] = false;
                setDState();
            }else if($(this).attr('class').indexOf('white') != -1 && isDark){
                isDark = false;
                window['isWhite'] = true;
                setDState();
            }
        });
    }

    function enableDisableColors(){
         $('.colors .color').each(function(index, element){
            if(colorId == index){
                $(element).addClass('showed');
            }else{
                $(element).removeClass('showed');
            }
        });
    }

    function updateColors(){
        var s = getColorAr();
        var c_s = "#FFFFFF";
        if(!isDark){
            c_s = "#000000";
        }
        var c_n = s[colorId];
       
        updateHEXColors(c_n, c_s);
        updateCSSColors(c_n);
    };

    function updateCSSColors(color){
        if(!$('#hex_css').length){
            $("head").append('<style id="hex_css" type="text/css"></style>');
        }
        
        color = nBC;
        var anntBkColor = nBC;
        var anntTextClr = '#FFFFFF';

        if(color == '#666666'){
            anntBkColor = 'rgba(0,0,0,.8)';
            color = '#FFFFFF';
        }else if(color == '#888888'){
            anntBkColor = 'rgba(0,0,0,.8)';
            color = '#000000';
        }

        var new_stylesheet = $("head #hex_css");
        var css = '';

        if(isDark){
            css += '.fwduvp-ytb-title{'
            css += 'color: #FFFFFF !important;';
            css += '}';
        }

        css += '.fwduvp-playlist-thumbnail-dark-text.active .fwduvp-thumbnail-title,';
        css +=  '.fwduvp-playlist-thumbnail-dark-text.active .fwduvp-ytb-title,';
        css += '.fwduvp-categories-thumbnail-header,';
        css += '.fwduvp-categories-dark-text.active .fwduvp-title,';
        css += '.fwduvp-categories-white-text.active .fwduvp-title,';
        css += '.fwdChangeColor{color:' + color + ' !important;}';
        css += '.fwduvp-annotation-play-norma, .fwduvp-annotation-link-normal{';
        css += 'color:' + anntTextClr + ';}';
        css += '.fwduvp-annotation-play-selected, .fwduvp-annotation-link-normal{background-color:' + anntBkColor + '}';
     
        new_stylesheet.html(css);
       
        $('#temp_css').remove();
        $("head").append('<style id="temp_css" type="text/css"></style>');
        var temp_stylesheet = $("head #temp_css");
        temp_stylesheet.html('.fwduvp-playlist-thumbnail-dark-text.active .fwduvp-ytb-title, .fwduvp-ytb-title,.fwduvp-thumbnail-title, .fwduvp-thumbnail-title{transition:none !important;}');

        clearTimeout(style_to);
        style_to = setTimeout(function(){
            $('#temp_css').remove();;
        }, 100);
    }

    function updateHEXColors(nnBC, ssBC){
        if(!window['player1'] || !player1.isAPIReady_bl) return;
        nBC = nnBC;
        sBC = ssBC;


        // A to b.
        var newCenterImage = FWDUVPUtils.changeCanvasHEXColor(player1.controller_do.atb.mainScrubberMiddleImage, player1.controller_do.atb.mainSCrubberMiddleCanvas, nBC, true);
        player1.controller_do.atb.mainScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";

        // Update controller.
        player1.controller_do.updateHEXColors(nBC, sBC);
        FWDUVPUtils.changeCanvasHEXColor(player1.controller_do.mainScrubberDragLeft_img, player1.controller_do.mainScrubberDragLeft_canvas, nBC);
        try{
            FWDUVPUtils.changeCanvasHEXColor(player1.controller_do.volumeScrubberDragBottom_img, player1.controller_do.volumeScrubberDragBottom_canvas, nBC);
        }catch(e){}
        
        if(!player1.isAdd_bl){
            var newCenterImage = FWDUVPUtils.changeCanvasHEXColor(player1.controller_do.mainScrubberMiddleImage, player1.controller_do.mainSCrubberMiddleCanvas, nBC, true);
            player1.controller_do.mainScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
        }

        try{
            if(player1.controller_do.volumeScrubberDragMiddle_do) player1.controller_do.volumeScrubberDragMiddle_do.getStyle().background = "url('" + player1.controller_do.volumeScrubberDragImage_img.src + "') repeat-y";
            var newVolumeCenterImage = FWDUVPUtils.changeCanvasHEXColor(player1.controller_do.middleImage, player1.controller_do.volumeScrubberDragMiddle_canvas.canvas, nBC, true);
            player1.controller_do.volumeScrubberDragMiddle_do.getStyle().background = "url('" + newVolumeCenterImage.src + "') repeat-y";
        }catch(e){}
        
        player1.controller_do.playPauseButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.rewindButton_do) player1.controller_do.rewindButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.subtitleButton_do) player1.controller_do.subtitleButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.playbackRateButton_do) player1.controller_do.playbackRateButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.volBtn) player1.controller_do.volBtn.updateHEXColors(nBC, sBC);
        if(player1.controller_do.playlistButton_do) player1.controller_do.playlistButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.downloadButton_do) player1.controller_do.downloadButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.infoButton_do) player1.controller_do.infoButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.categoriesButton_do) player1.controller_do.categoriesButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.ytbQualityButton_do) player1.controller_do.ytbQualityButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.shareButton_do) player1.controller_do.shareButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.embedButton_do) player1.controller_do.embedButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.fullScreenButton_do) player1.controller_do.fullScreenButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.atButton_do) player1.controller_do.atButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.atbButton_do) player1.controller_do.atbButton_do.updateHEXColors(nBC, sBC);
        player1.categories_do.clsBtn.updateHEXColors(nBC, nBC);
        player1.categories_do.nextButton_do.updateHEXColors(nBC, nBC);
        player1.categories_do.prevButton_do.updateHEXColors(nBC, nBC);
        
        clr = nBC;
        if(isDark && nBC == "#666666"){
            clr = "#888888";
        }
        if(player1.controller_do.time_do) player1.controller_do.time_do.getStyle().color = clr;
        
        if(player1.controller_do.ytbButtons_ar){
            var qltBtnHd;
            var arrw;
            var hd;
            var pointr;
            var sClr = nBC;

            if(isDark){
                arrw = 'content/hex_dark/youtube-quality-arrow.png';
                hd = 'content/hex_dark/hd.png';
                pointr = 'content/hex_dark/youtube-quality-pointer.png';
                if(nBC == '#666666'){
                    sClr = '#FFFFFF';
                }
            }else{
                arrw = 'content/hex_white/youtube-quality-arrow.png';
                hd = 'content/hex_white/hd.png';
                pointr = 'content/hex_white/youtube-quality-pointer.png';
                if(nBC == '#888888'){
                    sClr = '#000000';
                }
            }
            player1.controller_do.ytbQualityArrow_do.screen.src = arrw;
            player1.controller_do.pointer_do.screen.src = pointr;

            for(var i=0; i<player1.controller_do.ttYtbBtns; i++){
                var btn = player1.controller_do.ytbButtons_ar[i];
                if(isDark){
                    btn.nBC = btn.nBC = '#888888';
                    btn.sBC = btn.sBC = sClr;
                }else{
                    btn.nBC = btn.nBC = '#999999';
                    btn.sBC = btn.sBC = sClr;
                }

                if(btn.hd_do){
                    btn.hd_do.screen.src = hd;
                }
                
                if(btn.isSelected_bl){
                    btn.setSelectedState();
                }else{
                    btn.setNormalState();
                }
                
            }
        }

        if(player1.controller_do.playbackRateButtons_ar){
            player1.controller_do.playbackRateQualityArrow_do.screen.src = arrw;
            player1.controller_do.playbackRatesPonter_do.screen.src = pointr;

            for(var i=0; i<player1.controller_do.playbackRateButtons_ar.length; i++){
               var btn = player1.controller_do.playbackRateButtons_ar[i];
               
               if(isDark){
                    btn.nBC = btn.nBC = '#888888';
                    btn.sBC = btn.sBC = sClr;
                }else{
                    btn.nBC = btn.nBC = '#999999';
                    btn.sBC = btn.sBC = sClr;
                }

                if(btn.isSelected_bl){
                    btn.setSelectedState();
                }else{
                    btn.setNormalState();
                }
            }
        }
        
        if(player1.controller_do.subtitleButtons_ar){
            player1.controller_do.subtitleQualityArrow_do.screen.src = arrw;
            player1.controller_do.subtitlesPonter_do.screen.src = pointr;

            for(var i=0; i<player1.controller_do.totalSubttleButtons; i++){
                var btn = player1.controller_do.subtitleButtons_ar[i];
                if(btn){
                   if(isDark){
                        btn.nBC = btn.nBC = '#888888';
                        btn.sBC = btn.sBC = sClr;
                    }else{
                        btn.nBC = btn.nBC = '#999999';
                        btn.sBC = btn.sBC = sClr;
                    }

                    if(btn.isSelected_bl){
                        btn.setSelectedState();
                    }else{
                        btn.setNormalState();
                    }
                }
            }
        }

        if(player1.controller_do.ATBButtonsHolder_do){
            player1.controller_do.ABTQualityArrow_do.screen.src = arrw;
            player1.controller_do.ATBPonter_do.screen.src = pointr;

            for(var i=0; i<player1.controller_do.totalATBButtons; i++){
                var btn = player1.controller_do.ATBButtons_ar[i];
                if(btn){
                   if(isDark){
                        btn.nBC = btn.nBC = '#888888';
                        btn.sBC = btn.sBC = sClr;
                    }else{
                        btn.nBC = btn.nBC = '#999999';
                        btn.sBC = btn.sBC = sClr;
                    }

                    if(btn.isSelected_bl){
                        btn.setSelectedState();
                    }else{
                        btn.setNormalState();
                    }
                }
            }
        }
      
        if(player1.lrgPlayBtn) player1.lrgPlayBtn.updateHEXColors(nBC, nBC);
     
        // Update playlist.
        if(player1.playlist_do.mainScrubberDragTop_canvas){
            FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.scrDragTop_img, player1.playlist_do.mainScrubberDragTop_canvas, nBC);
            
            var middleImage_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.middleImage, player1.playlist_do.scrubberDragMiddle_canvas.canvas, nBC, true);
            player1.playlist_do.scrHandlerMiddle_do.getStyle().background = "url('" + middleImage_img.src + "') repeat-y";
            
            var bottomImage_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.bottomImage, player1.playlist_do.scrubberDragBottom_canvas.canvas, nBC, true);
            player1.playlist_do.scrHandlerBottom_do.getStyle().background = "url('" + bottomImage_img.src + "') repeat-y";
        }   
 
        if(player1.playlist_do.nextButton_do) player1.playlist_do.nextButton_do.updateHEXColors(nBC, sBC);
        if(player1.playlist_do.prevButton_do) player1.playlist_do.prevButton_do.updateHEXColors(nBC, sBC);
        if(player1.playlist_do.loopButton_do) player1.playlist_do.loopButton_do.updateHEXColors(nBC, sBC);
        if(player1.playlist_do.shuffleButton_do) player1.playlist_do.shuffleButton_do.updateHEXColors(nBC, sBC);
        if(player1.playlist_do.input_do) player1.playlist_do.input_do.getStyle().color = '#999999';
        if(player1.playlist_do.playlistName_do) player1.playlist_do.playlistName_do.getStyle().color = player1.playlist_do.nBC;

        // Popup ads buttons.
        if(player1.popupAds_do){
            player1.popupAds_do.nBC = nBC;
            player1.popupAds_do.sBC = sBC;

            if(player1.popupAds_do.popupAdsButtons_ar){
                for(var i=0; i<player1.popupAds_do.popupAdsButtons_ar.length; i++){
                    player1.popupAds_do.popupAdsButtons_ar[i].clsBtn.updateHEXColors(nBC, sBC);   
                }
            }
        }
                 
        // Update audio spectrum.
        if(player1.audioScreen_do) player1.audioScreen_do.updateLinesColor(nBC);
        
        // Update annotations.
        if(player1.annotations_do) player1.annotations_do.updateHEXColors(nBC, sBC);

        // Update combobox.
        for(var i=0; i<player1.playlist_do.comboBox_do.ttBtns; i++){
            var btn = player1.playlist_do.comboBox_do.buttons_ar[i];
            if(isDark){
                btn.bkNClr = "#1b1b1b";
                btn.bkSClr = nBC;
                btn.txtNClr = '#FFFFFF';
                btn.txtSClr = '#FFFFFF';
                
                if(nBC == '#666666'){
                    btn.txtSClr = '#000000';
                    btn.bkSClr = '#FFFFFF';
                }
            }else{
                btn.bkNClr = "#FFFFFF";
                btn.bkSClr = nBC;
                btn.txtNClr = '#000000';
                btn.txtSClr = '#FFFFFF';
               if(nBC == '#888888'){
                    btn.txtSClr = '#FFFFFF';
                    btn.bkSClr = '#000000';
                }
            }

            if(player1.playlist_do.comboBox_do.curId == i){
                btn.setSelectedState();
            }else{
                btn.setNormalState();
            }
        }
        
        if(player1.playlist_do.comboBox_do.scrubberDragMiddle_canvas){
            var middleImage_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.middleImage, player1.playlist_do.comboBox_do.scrubberDragMiddle_canvas.canvas, nBC, true);
            player1.playlist_do.comboBox_do.scrHandlerMiddle_do.getStyle().background = "url('" + middleImage_img.src + "') repeat-y";
            
            var bottomImage_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.bottomImage, player1.playlist_do.comboBox_do.scrubberDragBottom_canvas.canvas, nBC, true);
            player1.playlist_do.comboBox_do.scrHandlerBottom_do.getStyle().background = "url('" + bottomImage_img.src + "') repeat-y";
        }
      
        // Update skip button.
        player1.adsSkip_do.timeColor_str = nBC;
        player1.adsSkip_do.textNormalColor_str = nBC;
        player1.adsSkip_do.textSelectedColor_str = sBC;
        if(isDark){
            player1.adsSkip_do.borderNColor_str = '#666666';
            player1.adsSkip_do.borderSColor_str = '#FFFFFF';
        }else{
            player1.adsSkip_do.borderNColor_str = '#888888';
            player1.adsSkip_do.borderSColor_str = '#000000';
        }
        player1.adsSkip_do.border_do.getStyle().borderColor = player1.adsSkip_do.borderNColor_str;
        FWDUVPUtils.changeCanvasHEXColor(player1.adsSkip_do.icon_img, player1.adsSkip_do.icon_do_canvas, nBC);
        FWDUVPUtils.changeCanvasHEXColor(player1.adsSkip_do.iconS_img, player1.adsSkip_do.iconS_do_canvas, sBC);
        player1.adsSkip_do.text_do.getStyle().color = nBC;
        player1.adsStart_do.text_do.getStyle().color = nBC;
     
        // Update youtube playlist.
        player1._d.setYoutubePlaylistHEXColor(nBC);  

        // Update share window.        
        player1._d.nBC = nBC;
        player1._d.sNC = sBC;
        
        // Share window.
        if(player1.shareWindow_do.clsBtn){
            player1.shareWindow_do.clsBtn.updateHEXColors(nBC, nBC);
        }
       
        if(player1.shareWindow_do.facebookButton_do){
            player1.shareWindow_do.facebookButton_do.updateHEXColors(nBC, sBC);
            player1.shareWindow_do.twitterButton_do.updateHEXColors(nBC, sBC);
            player1.shareWindow_do.likedinButton_do.updateHEXColors(nBC, sBC);
            player1.shareWindow_do.bufferButton_do.updateHEXColors(nBC, sBC);
            player1.shareWindow_do.diggButton_do.updateHEXColors(nBC, sBC);
            player1.shareWindow_do.redditButton_do.updateHEXColors(nBC, sBC);
            player1.shareWindow_do.thumbrlButton_do.updateHEXColors(nBC, sBC);
        }

        // Embed window.
        if(player1.embedWindow_do.clsBtn){
            player1.embedWindow_do.clsBtn.updateHEXColors(nBC, nBC);
            player1.embedWindow_do.copyLinkBtn.updateHEXColors(nBC, nBC);
            player1.embedWindow_do.copyEmbedBtn.updateHEXColors(nBC, nBC);
            player1.embedWindow_do.sndBtn.updateHEXColors(nBC, nBC);
        }        

        // Embed window.
        if(player1.embedWindow_do.copyEmbedButton_do){
            player1.embedWindow_do.copyEmbedButton_do.updateHEXColors(nBC, sBC);
            player1.embedWindow_do.copyLinkButton_do.updateHEXColors(nBC, sBC);
            player1.embedWindow_do.sndBtn.updateHEXColors(nBC, sBC);
            player1.embedWindow_do.clsBtn.updateHEXColors(nBC, sBC);     
        }

        // Info window.
        if(player1.infoWindow_do.clsBtn){
            player1.infoWindow_do.clsBtn.updateHEXColors(sBC, nBC);
        }

        // Password window.
        if(player1.passWindow_do.clsBtn){
            player1.passWindow_do.clsBtn.updateHEXColors(sBC, nBC);
            player1.passWindow_do.passBtn.updateHEXColors(nBC, nBC);

             player1.lg_do.clsBtn.updateHEXColors(sBC, nBC);
        }

        // Pop window.
        player1.popw_do.clsBtn.updateHEXColors(nBC, nBC);
    };

    function updateSkin(){
        if(!window['player1'] || !player1.isAPIReady_bl) return;

        var ctrlBk;
        var ctrlVolLine;
        var ctrlScrubMid;
        var ctrlScrubLeft;
        var ctrlScrubRight;
        var ctrlLine;
        var volScrubMid;
        var volScrubTop;
        var volScrubBottom;
        var prg;
        var adLines;
        var qltIcon;
        var qltBtnsBk;
        var volBk;
        var skipBk;
        var largePl;
        var ppBtn;
        var shareWBk;
        var shareClsBtn;
        var txtMainHldBk;
        var txtMainHldBorder;
        var copyLinkBtn;
        var sndBtn;
        var anntBtn;
        var plNClr = '#FFFFFF';
        var plSClr = '#EEEEEE';
        var plDClr = '#EEEEEE';
        var plSrch;
        var plScrTrackMidl;
        var plScrTrackTop;
        var plScrTrackBtm;
        var plScrBkPos;
        var embdTxtClr;
        var passBtn;
        var pop;
        var txtClr;
        var txtClrInv;
        var catsClsBk;
        var catsNextBk;
        var catsPrevBk;

        if(isDark){

            ctrlBk = 'content/hex_dark/controller-background.png';
            ctrlScrubMid = 'content/hex_dark/scrubber-middle-background.png';
            ctrlScrubLeft = 'content/hex_dark/scrubber-left-background.png';
            ctrlScrubRight = 'content/hex_dark/scrubber-right-background.png';
            prg = 'content/hex_dark/progress-middle.png';
            adLines = 'content/hex_dark/ad-line.png';
            ctrlLine = 'content/hex_dark/scrubber-line.png';
            ctrlVolLine = 'content/hex_dark/volume-scrubber-line.png';
            qltIcon = 'content/hex_dark/youtube-quality-hd.png';  
            qltBtnsBk = 'content/hex_dark/controller-background.png'; 
            volScrubMid = 'content/hex_dark/volume-scrubber-middle-background.png';
            volScrubTop = 'content/hex_dark/volume-scrubber-top-background.png';
            volScrubBottom = 'content/hex_dark/volume-scrubber-bottom-background.png';
            skipBk = 'content/hex_dark/ads-background.png';
            largePl = 'content/hex_dark/large-play.png';
            ppBtn = 'content/hex_dark/close-button-normal.png';
            shareWBk = 'content/hex_dark/embed-window-background.png';
            shareClsBtn = 'content/hex_dark/embed-close-button.png';
            txtMainHldBk = 'content/hex_dark/embed-window-background.png';
            txtMainHldBorder = "#333333";
            copyLinkBtn = 'content/hex_dark/embed-copy-button.png';
            sndBtn = 'content/hex_dark/send-button.png';
            anntBtn = 'content/hex_dark/annotation-close-button-normal.png';
            plNClr = '#1b1b1b';
            plSClr = '#313131';
            plDClr = '#272727';
            plSrch = 'content/hex_dark/input-arrow.png';
            plScrTrackMidl = 'content/hex_dark/playlist-scrollbar-background-middle.png';
            plScrTrackTop = 'content/hex_dark/playlist-scrollbar-background-top.png';
            plScrTrackBtm = 'content/hex_dark/playlist-scrollbar-background-bottom.png';
            plScrBkPos = '0px';
            embdTxtClr = '#1a1a1a';
            passBtn = 'content/hex_dark/pass-button.png';
            pop = 'content/hex_dark/popw-close-button.png';
            txtClr = '#FFFFFF';
            txtClrInv = '#000000';
            catsClsBk = 'content/hex_dark/categories-close-button.png';
            catsNextBk = 'content/hex_dark/categories-next-button.png';
            catsPrevBk = 'content/hex_dark/categories-prev-button.png';

        }else{
            ctrlBk = 'content/hex_white/controller-background.png';
            ctrlScrubMid = 'content/hex_white/scrubber-middle-background.png';
            ctrlScrubLeft = 'content/hex_white/scrubber-left-background.png';
            ctrlScrubRight = 'content/hex_white/scrubber-right-background.png';
            prg = 'content/hex_white/progress-middle.png';
            adLines = 'content/hex_white/ad-line.png';
            ctrlLine = 'content/hex_white/scrubber-line.png';
            ctrlVolLine = 'content/hex_white/volume-scrubber-line.png';
            qltIcon = 'content/hex_white/youtube-quality-hd.png';
            qltBtnsBk = 'content/hex_white/controller-background.png';
            volScrubMid = 'content/hex_white/volume-scrubber-middle-background.png';
            volScrubTop = 'content/hex_white/volume-scrubber-top-background.png';
            volScrubBottom = 'content/hex_white/volume-scrubber-bottom-background.png';
            skipBk = 'content/hex_white/ads-background.png';
            largePl = 'content/hex_white/large-play.png';
            ppBtn = 'content/hex_white/close-button-normal.png';
            shareWBk = 'content/hex_white/embed-window-background.png';
            shareClsBtn = 'content/hex_white/embed-close-button.png';
            txtMainHldBk = 'content/hex_white/embed-window-background.png';
            txtMainHldBorder = "#cdcdcd";
            copyLinkBtn = 'content/hex_white/embed-copy-button.png';
            sndBtn = 'content/hex_white/send-button.png';
            anntBtn = 'content/hex_white/annotation-close-button-normal.png';
            plSrch = 'content/hex_white/input-arrow.png';
            plScrTrackMidl = 'content/hex_white/playlist-scrollbar-background-middle.png';
            plScrTrackTop = 'content/hex_white/playlist-scrollbar-background-top.png';
            plScrTrackBtm = 'content/hex_white/playlist-scrollbar-background-bottom.png';
            plScrBkPos = '-3px';
            embdTxtClr = '#444444';
            passBtn = 'content/hex_white/pass-button.png';
            pop = 'content/hex_white/popw-close-button.png';
            txtClr = '#000000';
            txtClrInv = '#FFFFFF';
            catsClsBk = 'content/hex_white/categories-close-button.png';
            catsNextBk = 'content/hex_white/categories-next-button.png';
            catsPrevBk = 'content/hex_white/categories-prev-button.png';
        
        }

      
        // Categories.
        player1.categories_do.clsBtn.n_do.screen.src = catsClsBk;
        player1.categories_do.nextButton_do.n_do.screen.src = catsNextBk;
        player1.categories_do.prevButton_do.n_do.screen.src = catsPrevBk;

        // A to b.
        player1.controller_do.atb.mainHld.getStyle().background = "url('" + ctrlBk +  "')";
         if(player1.isMbl){
            player1.controller_do.atb.mainScrubberBkMiddle_do.getStyle().background = "url('" + ctrlScrubMid + "') repeat-x";
        }else{
            player1.controller_do.atb.mainScrubberBkMiddle_do.screen.src = ctrlScrubMid;
        }
        player1.controller_do.atb.mainScrubberBkLeft_do.screen.src = ctrlScrubLeft;
        player1.controller_do.atb.mainScrubberBkRight_do.screen.src = ctrlScrubRight;

        player1.controller_do.atb.timeTextColorSelected = txtClr;
        FWDAnimation.killTweensOf(player1.controller_do.atb.left_do.screen);
        player1.controller_do.atb.left_do.bkColorN = txtClr;
        
        player1.controller_do.atb.left_do.colorN = txtClrInv;
        player1.controller_do.atb.left_do.colorS = txtClr;
        player1.controller_do.atb.left_do.getStyle().background = txtClr;
        player1.controller_do.atb.left_do.getStyle().color = txtClrInv;

        FWDAnimation.killTweensOf(player1.controller_do.atb.right_do.screen);
        player1.controller_do.atb.right_do.bkColorN = txtClr;
        player1.controller_do.atb.right_do.colorN = txtClrInv;
        player1.controller_do.atb.right_do.colorS = txtClr;
        player1.controller_do.atb.right_do.getStyle().background = txtClr;
        player1.controller_do.atb.right_do.getStyle().color = txtClrInv;
        
        if(isWhite){
            txtClrInv = "#DDDDDD";
        }
        
        player1.controller_do.atb.left_do.bkColorS = txtClrInv;
        player1.controller_do.atb.right_do.bkColorS = txtClrInv;

        // Large play.
        player1.lrgPlayBtn.n_do.screen.src = largePl;

        // Combobox.
        if(player1.playlist_do.comboBox_do.scrTrackTop_do){
            player1.playlist_do.comboBox_do.scrTrackTop_do.screen.src =  plScrTrackTop;
            player1.playlist_do.comboBox_do.scrTrackBottom_do.screen.src =  plScrTrackBtm;
            player1.playlist_do.comboBox_do.scrTrackMiddle_do.getStyle().background = "url('" + plScrTrackMidl +  "')";
            player1.playlist_do.comboBox_do.scrTrackMiddle_do.getStyle().backgroundPositionX = plScrBkPos;
        }

        var cmbBkNClr;
        var cmbBkSClr;
        var cmbTxtNClr;
        var cmbTxtSClr;
        if(isDark){
            cmbBkNClr = '#FFFFFF';
            cmbBkSClr = '#000000';
            cmbTxtNClr = '#FFFFFF';
            cmbTxtSClr = '#000000';
        }else{
            cmbBkNClr = '#000000';
            cmbBkSClr = '#FFFFFF';
            cmbTxtNClr = '#000000';
            cmbTxtSClr = '#FFFFFF';
        }

        FWDAnimation.killTweensOf(player1.playlist_do.comboBox_do.selector_do.bk_sdo.screen);
        FWDAnimation.killTweensOf(player1.playlist_do.comboBox_do.selector_do.text_sdo.screen);
        player1.playlist_do.comboBox_do.selector_do.bkNColor = cmbBkNClr;
        player1.playlist_do.comboBox_do.selector_do.bkSColor = cmbBkSClr;
        player1.playlist_do.comboBox_do.selector_do.tNColor = cmbTxtNClr;
        player1.playlist_do.comboBox_do.selector_do.tSColor = cmbTxtSClr;
        player1.playlist_do.comboBox_do.selector_do.bk_sdo.getStyle().backgroundColor = cmbBkNClr;
        player1.playlist_do.comboBox_do.selector_do.text_sdo.getStyle().color = cmbTxtNClr;
        player1.playlist_do.comboBox_do.dummyBk_do.getStyle().background = 'url(' + ctrlBk + ')';

        if( player1.playlist_do.comboBox_do.scrubberLines_s_canvas){
            var scrubbelinesSImage_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.scrHandlerLinesS_img, player1.playlist_do.comboBox_do.scrubberLines_s_canvas.canvas, sBC, true);
            player1.playlist_do.comboBox_do.scrHandlerLinesS_do.getStyle().background = "url('" + scrubbelinesSImage_img.src + "') repeat-x";

            FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.scrDragTop_img, player1.playlist_do.comboBox_do.mainScrubberDragTop_canvas, nBC);

            FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.scrLinesN_img, player1.playlist_do.comboBox_do.mainhandlerN_canvas, sBC);
            var scrubbelinesSImage_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.scrHandlerLinesS_img, player1.playlist_do.comboBox_do.scrubberLines_s_canvas.canvas, sBC, true);
            player1.playlist_do.comboBox_do.scrHandlerLinesS_do.getStyle().background = "url('" + scrubbelinesSImage_img.src + "') repeat-x";
        }

        var arr_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.selector_do.arrowN_img, player1.playlist_do.comboBox_do.selector_do.scrubberLines_n_canvas.canvas, nBC, true);
        player1.playlist_do.comboBox_do.selector_do.arrowN_sdo.getStyle().background = "url('" + arr_img.src + "')";

         var arrS_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.selector_do.arrowS_img, player1.playlist_do.comboBox_do.selector_do.scrubberLines_s_canvas.canvas, cmbTxtSClr, true);
        player1.playlist_do.comboBox_do.selector_do.arrowS_sdo.getStyle().background = "url('" + arrS_img.src + "')";


        // Controller.
        player1.controller_do.bk_do.getStyle().background = "url('" + ctrlBk +  "')";
        //if(player1.isMbl){
            player1.controller_do.mainScrubberBkMiddle_do.getStyle().background = "url('" + ctrlScrubMid + "') repeat-x";
            player1.controller_do.volumeScrubberBkMiddle_do.getStyle().background = "url('" + volScrubMid + "') repeat-x";
        /*}else{
            player1.controller_do.mainScrubberBkMiddle_do.screen.src = ctrlScrubMid;
            player1.controller_do.volumeScrubberBkMiddle_do.screen.src = volScrubMid;
        }*/
        player1.controller_do.mainScrubberBkLeft_do.screen.src = ctrlScrubLeft;
        player1.controller_do.mainScrubberBkRight_do.screen.src = ctrlScrubRight;
        player1.controller_do.progressMiddle_do.getStyle().background = "url('" + prg + "') repeat-x";
        player1.controller_do.mainScrubberBarLine_do.screen.src = ctrlLine;
        player1.controller_do.ytbQualityButton_do.d_sdo.screen.src = qltIcon;

        player1.controller_do.volumeScrubberBarLine_do.screen.src = ctrlVolLine;
        player1.controller_do.volumeBk_do.getStyle().background = "url('" + ctrlBk + "')";
        player1.controller_do.volumeScrubberBkTop_do.screen.src = volScrubTop;
        player1.controller_do.volumeScrubberBkBottom_do.screen.src = volScrubBottom;
        
        if(player1.controller_do.line_ar){
            for(var i=0; i<player1.controller_do.line_ar.length; i++){
                var line = player1.controller_do.line_ar[i];
                line.getStyle().background = "url('" + adLines + "') repeat-x";
            }
        }

        // Playlist.
        if(player1.playlist_do.mainhandlerN_canvas){
        FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.scrLinesN_img, player1.playlist_do.mainhandlerN_canvas, sBC);
            var scrubbelinesSImage_img = FWDUVPUtils.changeCanvasHEXColor(player1.playlist_do.scrHandlerLinesS_img, player1.playlist_do.scrubberLines_s_canvas.canvas, sBC, true);
            player1.playlist_do.scrHandlerLinesS_do.getStyle().background = "url('" + scrubbelinesSImage_img.src + "') repeat-x";

            player1.playlist_do.scrTrackMiddle_do.getStyle().background = "url('" + plScrTrackMidl +  "')";
            player1.playlist_do.scrTrackMiddle_do.getStyle().backgroundPositionX = plScrBkPos;
            player1.playlist_do.scrTrackTop_do.screen.src =  plScrTrackTop;
            player1.playlist_do.scrTrackBottom_do.screen.src =  plScrTrackBtm;
        }

        player1.playlist_do.inputArrow_do.screen.src = plSrch;
        player1.playlist_do.controllerBk_do.getStyle().background = "url('" + ctrlBk +  "')";
        


        if(player1.playlist_do.thumbs_ar){
            for(var i=0; i<player1.playlist_do.thumbs_ar.length; i++){
                var thmb = player1.playlist_do.thumbs_ar[i];
                
                thmb.thumbnailNormalBackgroundColor_str = plNClr;
                thmb.thumbnailHoverBackgroundColor_str = plSClr;
                thmb.thumbnailDisabledBackgroundColor_str = plDClr;

                FWDAnimation.killTweensOf(thmb.screen);
                if(thmb.curStt == 'disabled'){
                    thmb.getStyle().backgroundColor = plDClr;
                }else{
                    thmb.getStyle().backgroundColor = plNClr;
                }
            }
        }

        // Popup ads buttons.
        if(player1.popupAds_do){
            if(player1.popupAds_do.popupAdsButtons_ar){
                for(var i=0; i<player1.popupAds_do.popupAdsButtons_ar.length; i++){
                   player1.popupAds_do.popupAdsButtons_ar[i].clsBtn.n_do.screen.src = ppBtn;  
                }
            }
        }

        // Annotations.
        if(player1.annotations_do){
             if(player1.annotations_do){
                for(var i=0; i<player1.annotations_do.ann_ar.length; i++){
                    try{
                        player1.annotations_do.ann_ar[i].clsBtn.n_do.screen.src = anntBtn;  
                    }catch(e){}
                }
             }
        }
       
        // Skip button.
        player1.adsSkip_do.bk_do.getStyle().background = "url('" + skipBk + "')";
        player1.adsStart_do.bk_do.getStyle().background = "url('" + skipBk + "')"; 
        if(isDark){
            player1.adsStart_do.border_do.borderNColor_str = '#666666';
            player1.adsStart_do.border_do.getStyle().borderColor = '#666666';
        }else{
            player1.adsStart_do.border_do.borderNColor_str = '#888888';
            player1.adsStart_do.border_do.getStyle().borderColor = '#888888';
        }
        
        // Quality buttons.
        if(player1.controller_do.repeatBackground_bl){
            player1.controller_do.ytbButtonsHolder_do.getStyle().background = "url('" + qltBtnsBk +  "')";
            player1.controller_do.playbackRatesButtonsHolder_do.getStyle().background = "url('" + qltBtnsBk +  "')";
            player1.controller_do.subtitlesButtonsHolder_do.getStyle().background = "url('" + qltBtnsBk +  "')";
            player1.controller_do.ATBButtonsHolder_do.getStyle().background = "url('" + qltBtnsBk +  "')";
        }else{
            self.ytbButtonBackground_do.screen.src = qltBtnsBk;
            self.playbackRatesButtonsHolder_do.screen.src = qltBtnsBk;
            self.subtitlesButtonsHolder_do.screen.src = qltBtnsBk;
            self.ATBButtonsHolder_do.screen.src = qltBtnsBk;
        }

        // Share window.
        if(player1.shareWindow_do.clsBtn){
            player1.shareWindow_do.bk_do.getStyle().background = "url('" + shareWBk + "')";
            player1.shareWindow_do.clsBtn.n_do.screen.src = shareClsBtn;
        }

        // Embed window.
        if(player1.embedWindow_do.clsBtn){
            player1.embedWindow_do.bk_do.getStyle().background = "url('" + shareWBk + "')";
            player1.embedWindow_do.clsBtn.n_do.screen.src = shareClsBtn;
        }

        if(player1.embedWindow_do.lnkAndEbdHldBk){
            player1.embedWindow_do.lnkAndEbdHldBk.getStyle().background = "url('" + txtMainHldBk + "')"; 
            player1.embedWindow_do.lnkAndEbdHldBk.getStyle().borderColor = txtMainHldBorder; 
            player1.embedWindow_do.sendMainHldBk.getStyle().background = "url('" + txtMainHldBk + "')"; 
            player1.embedWindow_do.sendMainHldBk.getStyle().borderColor = txtMainHldBorder; 
            player1.embedWindow_do.copyLinkBtn.n_do.screen.src = copyLinkBtn; 
            player1.embedWindow_do.copyEmbedBtn.n_do.screen.src = copyLinkBtn; 
            player1.embedWindow_do.sndBtn.n_do.screen.src = sndBtn; 
        }

        // Info window.
        if(player1.infoWindow_do.clsBtn){
            player1.infoWindow_do.mainBk_do.getStyle().background = "url('" + txtMainHldBk + "')"; 
            player1.infoWindow_do.bk_do.getStyle().background = "url('" + shareWBk + "')";
            player1.infoWindow_do.bk_do.getStyle().borderColor = txtMainHldBorder; 
            player1.infoWindow_do.clsBtn.n_do.screen.src = shareClsBtn;
        }

        // Password window.
        if(player1.passWindow_do.clsBtn){
            player1.passWindow_do.bk_do.getStyle().background = "url('" + txtMainHldBk + "')"; 
            player1.passWindow_do.passMainHldBk.getStyle().background = "url('" + shareWBk + "')";
            player1.passWindow_do.passMainHldBk.getStyle().borderColor = txtMainHldBorder; 
            player1.passWindow_do.clsBtn.n_do.screen.src = shareClsBtn;
            player1.passWindow_do.passBtn.n_do.screen.src = passBtn;

            player1.lg_do.bk_do.getStyle().background = "url('" + txtMainHldBk + "')"; 
            player1.lg_do.clsBtn.n_do.screen.src = shareClsBtn;
        }

       // Pop window.
       player1.popw_do.bar_do.getStyle().background = "url('" + ctrlBk + "')";
       player1.popw_do.adBk_do.getStyle().background = "url('" + ctrlBk + "')";
       player1.popw_do.clsBtn.n_do.screen.src = pop;
       player1.popw_do.title_do.getStyle().color = txtClr;
    
    }

    // Setup video player.
    if($('#myDivHolder').hasClass('fwd-hide-top')){
        $('#myDivHolder').addClass('reveal-top');
    }else{
        $('#myDivHolder').addClass('reveal');
    }
    setTimeout(function(){
        $('#myDivHolder').css({'transform':'none'});
    }, 800);
    
    function setupVideoPlayer(){

        new FWDUVPlayer({       
            //main settings
            useYoutube:"yes",
            useVimeo:"yes",
            instanceName:"player1",
            parentId:"myDiv",
            playlistsId:"playlists",
            mainFolderPath:"content",
            skinPath:"hex_dark",
            displayType:"responsive",
            playsinline:"yes",
            fillEntireVideoScreen:"no",
            fillEntireposterScreen:"yes",
            privateVideoPassword:"428c841430ea18a70f7b06525d4b748a",
            youtubeAPIKey:'AIzaSyCGBNj8zTFSq8JPWH2dkFPQ5WD5VBJbXAs',
            useHEXColorsForSkin:"yes",
            normalHEXButtonsColor:"#666666",
            useDeepLinking:"yes",
            addKeyboardSupport:"yes",
            showPreloader:"yes",
            preloaderBackgroundColor:"#000000",
            preloaderFillColor:"#FFFFFF",
            autoScale:"yes",
            showButtonsToolTip:"yes", 
            stopVideoWhenPlayComplete:"no",
            autoPlay:"no",
            autoPlayText:"Click To Unmute",
            loop:"no",
            shuffle:"no",
            maxWidth:980,
            maxHeight:552,
            buttonsToolTipHideDelay:1.5,
            volume:.8,
            rewindTime:10,
            backgroundColor:"#000000",
            videoBackgroundColor:"#000000",
            posterBackgroundColor:"#000",
            buttonsToolTipFontColor:"#5a5a5a",
            //logo settings
            showLogo:"yes",
            hideLogoWithController:"yes",
            logoPosition:"topRight",
            logoLink:"http://www.webdesign-flash.ro/",
            logoMargins:10,
            //playlists/categories settings
            showPlaylistsSearchInput:"yes",
            showPlaylistsButtonAndPlaylists:"yes",
            usePlaylistsSelectBox:"yes",
            showPlaylistsByDefault:"no",
            thumbnailSelectedType:"opacity",
            startAtPlaylist:0,
            buttonsMargins:15,
            thumbnailMaxWidth:350, 
            thumbnailMaxHeight:350,
            horizontalSpaceBetweenThumbnails:40,
            verticalSpaceBetweenThumbnails:40,
            //playlist settings
            showPlaylistButtonAndPlaylist:"yes",
            playlistPosition:"right",
            showPlaylistByDefault:"yes",
            showPlaylistName:"yes",
            showSearchInput:"yes",
            showLoopButton:"yes",
            showShuffleButton:"yes",
            showNextAndPrevButtons:"yes",
            forceDisableDownloadButtonForFolder:"yes",
            showPlaylistOnFullScreen:"no",
            addMouseWheelSupport:"yes",
            startAtRandomVideo:"no",
            folderVideoLabel:"VIDEO ",
            playlistRightWidth:312,
            playlistBottomHeight:380,
            startAtVideo:0,
            maxPlaylistItems:50,
            thumbnailWidth:71,
            thumbnailHeight:71,
            spaceBetweenControllerAndPlaylist:1,
            spaceBetweenThumbnails:1,
            scrollbarOffestWidth:8,
            scollbarSpeedSensitivity:.5,
            mainSelectorBackgroundSelectedColor:"#FFFFFF",
            mainSelectorTextNormalColor:"#FFFFFF",
            mainSelectorTextSelectedColor:"#000000",
            mainButtonBackgroundNormalColor:"#212021",
            mainButtonBackgroundSelectedColor:"#FFFFFF",
            mainButtonTextNormalColor:"#FFFFFF",
            mainButtonTextSelectedColor:"#000000",
            playlistBackgroundColor:"#000000",
            playlistNameColor:"#FFFFFF",
            thumbnailNormalBackgroundColor:"#1b1b1b",
            thumbnailHoverBackgroundColor:"#313131",
            thumbnailDisabledBackgroundColor:"#313131",
            searchInputBackgroundColor:"#000000",
            searchInputColor:"#999999",
            showYoutubeRelAndInfo: "no",
            youtubeAndFolderVideoTitleColor:"#FFFFFF",
            youtubeOwnerColor:"#888888",
            youtubeDescriptionColor:"#888888",
            //controller settings
            showController:"yes",
            showControllerWhenVideoIsStopped:"yes",
            showNextAndPrevButtonsInController:"no",
            showPlaybackRateButton:"yes",
            showVolumeButton:"yes",
            showTime:"yes",
            showQualityButton:"yes",
            showInfoButton:"yes",
            showDownloadButton:"yes",
            showFacebookButton:"yes",
            showEmbedButton:"yes",
            showFullScreenButton:"yes",
            disableVideoScrubber:"no",
            showMainScrubberToolTipLabel:"yes",
            showDefaultControllerForVimeo:"yes",
            repeatBackground:"yes",
            controllerHeight:42,
            controllerHideDelay:3,
            startSpaceBetweenButtons:7,
            spaceBetweenButtons:8,
            scrubbersOffsetWidth:2,
            mainScrubberOffestTop:14,
            timeOffsetLeftWidth:5,
            timeOffsetRightWidth:3,
            timeOffsetTop:0,
            volumeScrubberHeight:80,
            volumeScrubberOfsetHeight:12,
            timeColor:"#888888",
            youtubeQualityButtonNormalColor:"#888888",
            youtubeQualityButtonSelectedColor:"#FFFFFF",
            scrubbersToolTipLabelBackgroundColor:"#FFFFFF",
            scrubbersToolTipLabelFontColor:"#5a5a5a",
            //advertisement on pause window
            aopwTitle:"Advertisement",
            aopwWidth:400,
            aopwHeight:240,
            aopwBorderSize:6,
            aopwTitleColor:"#FFFFFF",
            //subtitle
            subtitlesOffLabel:"Subtitle off",
            //popup add windows
            showPopupAdsCloseButton:"yes",
            //embed window and info window
            embedAndInfoWindowCloseButtonMargins:15,
            borderColor:"#333333",
            mainLabelsColor:"#FFFFFF",
            secondaryLabelsColor:"#a1a1a1",
            shareAndEmbedTextColor:"#5a5a5a",
            inputBackgroundColor:"#000000",
            inputColor:"#FFFFFF",
            //audio visualizer
            audioVisualizerLinesColor:"#FFFFFF",
            audioVisualizerCircleColor:"#666666",
            //ads
            openNewPageAtTheEndOfTheAds:"no",
            playAdsOnlyOnce:"no",
            adsButtonsPosition:"left",
            skipToVideoText:"You can skip to video in: ",
            skipToVideoButtonText:"Skip Ad",
            adsTextNormalColor:"#888888",
            adsTextSelectedColor:"#FFFFFF",
            adsBorderNormalColor:"#666666",
            adsBorderSelectedColor:"#FFFFFF",
            //login
            playIfLoggedIn:"no",
            playIfLoggedInMessage:"Please <a href='https://google.com' target='_blank'>login</a> to play this video.",
            //a to b loop
            useAToB:"yes",
            atbTimeBackgroundColor:"transparent",
            atbTimeTextColorNormal:"#888888",
            atbTimeTextColorSelected:"#FFFFFF",
            atbButtonTextNormalColor:"#888888",
            atbButtonTextSelectedColor:"#FFFFFF",
            atbButtonBackgroundNormalColor:"#FFFFFF",
            atbButtonBackgroundSelectedColor:"#000000",
            //thumbnails preview
            thumbnailsPreviewWidth:196,
            thumbnailsPreviewHeight:110,
            thumbnailsPreviewBackgroundColor:"#000000",
            thumbnailsPreviewBorderColor:"#666",
            thumbnailsPreviewLabelBackgroundColor:"#666",
            thumbnailsPreviewLabelFontColor:"#FFF",
            // context menu
            showContextmenu:'yes',
            showScriptDeveloper:"no",
            contextMenuBackgroundColor:"#1f1f1f",
            contextMenuBorderColor:"#1f1f1f",
            contextMenuSpacerColor:"#333",
            contextMenuItemNormalColor:"#888888",
            contextMenuItemSelectedColor:"#FFFFFF",
            contextMenuItemDisabledColor:"#444"
        });

        var registerAPIInterval;
        registerAPI();
        function registerAPI(){
            clearInterval(registerAPIInterval);
            if(window['player1']){
                window['player1'].addListener(FWDUVPlayer.GO_FULLSCREEN, function(){
                    $('.menu, .reviews').css({'display':'none'});
                });
                 window['player1'].addListener(FWDUVPlayer.GO_NORMALSCREEN, function(){
                    $('.menu').css({'display':'block'});
                    $('.reviews').css({'display':'flex'});
                });
                window['player1'].addListener(FWDUVPlayer.LOAD_PLAYLIST_COMPLETE, function(){
                    setTimeout(function(){
                        $('#theme').removeClass('theme-disabled');
                        $('#theme').removeClass('theme-disabled2');
                        allowToShwReview = true;
                        showReviews();

                        setTimeout(function(){
                            $('#theme').css({'transition':'none'});
                        }, 800);
                    }, 50);
                });
            }else{
                registerAPIInterval = setInterval(registerAPI, 100);
            }
        };

    }

    // Features icons.
    var isFiSowed = false;
    $('.more').on('click', function(){
        if(isFiSowed){
            isFiSowed = false;
            $('.more p').html('Expand more features<span><svg class="svg1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0V16M16 8L0 8" stroke="#07C7C7"/></svg><svg class="svg2" width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L0 1" stroke="#07C7C7"/></svg></span>');
            $('.more .svg1').css({'display':'inline'});
            $('.more .svg2').css({'display':'none'});
        }else{
            isFiSowed = true;
            $('.more p').html('Shorten more features<span><svg class="svg1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0V16M16 8L0 8" stroke="#07C7C7"/></svg><svg class="svg2" width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L0 1" stroke="#07C7C7"/></svg></span>');
            $('.more .svg1').css({'display':'none'});
            $('.more .svg2').css({'display':'inline'});
        }

        resizeFi(true);
    })

    function resizeFi(anim){
        var h;
        var gradOp;
        if(isFiSowed){
            h = $('.ft2 .flex').height() + $('.more').height() + 80;
            gradOp = 0;
        }else{
            if($(window).width() <= 600){
                h = 550;
            }else{
                h = 700;
            }
            
            gradOp = 1;
        }

        if(anim){
            FWDAnimation.to($('.ft2')[0], .8, {css:{height:h + 'px'}, ease: Expo.easeInOut});
            FWDAnimation.to($('.grad')[0], .8, {css:{opacity:gradOp}, ease: Expo.easeInOut});
        }else{
            $('.ft2').css({'height':h + 'px'});
            $('.grad').css({'opacity':gradOp});
        }
    }

    if(page == 'main'){

        // Familly.
        new FWDSI({ 
            //main settings
            instanceName:"fm-1",
            displayType:"afterparent",
            parentId:"familly_img",
            limitId:"test",
            imageSource:"assets/familly.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:1920,
            maxHeight:516,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

    }
 
    // Quality.
    new FWDSI({ 
        //main settings
        instanceName:"q-1",
        displayType:"afterparent",
        parentId:"quality_col_1",
        limitId:"test",
        imageSource:"assets/quality-1.jpg",
        initializeOnlyWhenVisible:"yes",
        slideshowPreloaderPosition:'center',
        slideshowRadius:10,
        maxWidth:960,
        maxHeight:696,
        slideshowBackgroundColor:"#FFFFFF",
        slideshowFillColor:"#000000",
        slideshowStrokeSize:3,
        backgroundColor:"#transparent"
    });

    new FWDSI({ 
        //main settings
        instanceName:"q-2",
        displayType:"afterparent",
        parentId:"quality_col_2",
        limitId:"test",
        imageSource:"assets/quality-2.jpg",
        initializeOnlyWhenVisible:"yes",
        slideshowPreloaderPosition:'center',
        slideshowRadius:10,
        maxWidth:960,
        maxHeight:696,
        slideshowBackgroundColor:"#FFFFFF",
        slideshowFillColor:"#000000",
        slideshowStrokeSize:3,
        backgroundColor:"#transparent"
    });

    if($('#img_1').length){
        new FWDSI({ 
            //main settings
            instanceName:"img_i_1",
            displayType:"afterparent",
            parentId:"img_1",
            limitId:"test",
            imageSource:"assets/ft/1.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_2",
            displayType:"afterparent",
            parentId:"img_2",
            limitId:"test",
            imageSource:"assets/ft/2.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_3",
            displayType:"afterparent",
            parentId:"img_3",
            limitId:"test",
            imageSource:"assets/ft/3.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_4",
            displayType:"afterparent",
            parentId:"img_4",
            limitId:"test",
            imageSource:"assets/ft/4.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_5",
            displayType:"afterparent",
            parentId:"img_5",
            limitId:"test",
            imageSource:"assets/ft/5.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

         new FWDSI({ 
            //main settings
            instanceName:"img_i_6",
            displayType:"afterparent",
            parentId:"img_6",
            limitId:"test",
            imageSource:"assets/ft/6.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_7",
            displayType:"afterparent",
            parentId:"img_7",
            limitId:"test",
            imageSource:"assets/ft/7.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_8",
            displayType:"afterparent",
            parentId:"img_8",
            limitId:"test",
            imageSource:"assets/ft/8.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_9",
            displayType:"afterparent",
            parentId:"img_9",
            limitId:"test",
            imageSource:"assets/ft/9.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });

        new FWDSI({ 
            //main settings
            instanceName:"img_i_10",
            displayType:"afterparent",
            parentId:"img_10",
            limitId:"test",
            imageSource:"assets/ft/10.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:958,
            maxHeight:545,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });
    }

    /* #################################################
     * Demos.
     * #################################################
     */
    if($('.bnr').length){
        $('.bnr .main-holder').addClass('reveal');

        var img1 = $('.bnr .left')[0];
        img1.src = 'assets/ipad.png';
        img1.onload = function(){
            setTimeout(function(){
                 $('.bnr .left').addClass('reveal');
            }, 400)
        }

        var img2 = $('.bnr .right')[0];
        img2.src = 'assets/banner.png';
        img2.onload = function(){
            setTimeout(function(){
                 $('.bnr .right').addClass('reveal');
            },200)
        }
        setupGrid();
    }


    function setupGrid(){
        FWDVSUtils.checkIfHasTransofrms();
        new FWDVS({
            //main settings 
            gridType:"classic",
            rightClickContextMenu:"default",
            instanceName:"myUGP",
            parentId:"myGDiv",
            mainFolderPath:"content",
            gridSkinPath:"grid_skin_classic",
            playlistId:"myPlaylist",
            allCategoriesLabel:"All",
            notFoundLabel:"Nothing found",
            showAllCategories:"yes",
            randomizeCategories:"no",
            animateParent:"yes",
            initializeOnlyWhenVisible:"no",
            prelaoderAllScreen:"no",
            searchLabel:"Search",
            startAtCategory:0,
            slideshowRadius:10,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            // menu settings
            showMenu:"yes",
            showMenuButtonsSpacers:"no",
            comboboxSelectorLabel:"Select categories",
            menuButtonSpacerHeight:20,
            //thumbnail settings
            useThumbnailSlideshow:"yes",
            hideAndShowTransitionType:"scale",
            thumbanilBoxShadow:"none",
            disableThumbnails:"no",
            thumbnailBorderNormalColor:"",
            thumbnailBorderSelectedColor:"",
            thumbnailsHorizontalOffset:0,
            thumbnailsVerticalOffset:0,
            thumbnailMaxWidth:400,
            thumbnailMaxHeight:260,
            horizontalSpaceBetweenThumbnails:30,
            verticalSpaceBetweenThumbnails:40,
            thumbnailBorderSize:0,
            thumbnailBorderRadius:0,
            //preset settings
            preset:"team",
            previewText:"Read more",
            thumbnailOverlayOpacity:.5
        });

        myUGP.addListener(FWDVS.READY, createLeftGridMenu);
    }

    function createLeftGridMenu(){
        var cats = myUGP.data.cats;

        $('.demos .left').removeClass('load');
        $('.demos .right').removeClass('load');
        $('#myGDiv').removeClass('grid-load');


        for(var i=0; i<cats.length; i++){
           $('.left .dumy').append('<p class="item fwd-hide-left" id="item_' + i + '"">' + cats[i]['label'] + '<span>' + cats[i]['tt']  + '</span></p>');
        }

        // Reveal.
        setTimeout(function(){
            $('.choose').addClass('reveal');
            $('.search-holder').addClass('reveal-left');
            var dl = 200;
            $('.dumy .item').each(function(index, element){
                setTimeout(function(){
                    $(element).addClass('reveal-left');
                }, dl);  
                dl += 100;
            })
        }, 200);

        // Click events.
        $('.dumy .item').each(function(index, element){
            $(this).on('click', function(e){
                var id = parseInt(/[0-9]/.exec($(this).attr('id')));
                checkGridMenu(id);
                myUGP.updateCategory([id]);

            });
        });

        checkGridMenu(0);
        setupGridSearch();
    }

    function checkGridMenu(id){
        $('.dumy .item').each(function(index, element){
            var fid = parseInt(/[0-9]/.exec($(this).attr('id')));
            if(fid == id){
                $(this).addClass('grid-menu-active');
            }else{
                 $(this).removeClass('grid-menu-active');
            }
        });
    }

    var updateSearch_to;
    var isSearchShowed;
    var searchVal;
    var prevInptVal;
    var srcText = 'Search';

    function setupGridSearch(){
        var inpt = $('.search-holder input')[0];
        inpt.addEventListener("focus", inputFocusIn);
        inpt.addEventListener("blur", inputFocusOut);
        inpt.addEventListener("keyup", keyUpHandler);

        function inputFocusIn(){
            if(isSearchShowed) return;
            isSearchShowed = true;
            if(inpt.value == srcText){
                inpt.value = "";
            }
        }

         function inputFocusOut(e){
            if(!isSearchShowed) return;
            var vc = FWDVSUtils.getViewportMouseCoordinates(e); 
            if(!FWDVSUtils.hitTest(inpt, vc.screenX, vc.screenY)){
                isSearchShowed = false;
                if(inpt.value == ""){
                    inpt.value = srcText;
                }
                return;
            }
         }

         function keyUpHandler(e){
            if(e.stopPropagation) e.stopPropagation();
            var inptValue;
            
            if (prevInptVal != inpt.value){
                inptValue = inpt.value.toLowerCase();
                if (inptValue != srcText){
                    searchVal = inptValue;
                    clearTimeout(updateSearch_to);
                    self.updateSearch_to = setTimeout(function(){
                        myUGP.thumbnailManager_do.search(searchVal.toLowerCase());
                    }, 100);
                }
            }
            
            prevInptVal = inpt.value;
         }
    }

    // Ready.
    if($('#ready_img').length){
        new FWDSI({ 
            //main settings
            instanceName:"ready_img_",
            displayType:"afterparent",
            parentId:"ready_img",
            limitId:"test",
            imageSource:"assets/ready.jpg",
            initializeOnlyWhenVisible:"yes",
            slideshowPreloaderPosition:'center',
            slideshowRadius:10,
            maxWidth:1920,
            maxHeight:470,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:3,
            backgroundColor:"#transparent"
        });
    }

    /*
     * ###################### Demo single ####################
     */

    if($('.d-s-title').length){
        if(isVisible($('.d-s-title'), -100)){
           $('.d-s-title').addClass('reveal');
        }

        if(isVisible($('.d-s-text'), -100)){
           $('.d-s-text').addClass('reveal');
        }

        if($('.console').length){
            regesterApi();
        }
    }

    function resizeAPi(){
        if(!$('.console').length) return;
        var rH = $('.buttons div').height() - 55;
        $('.console').height(rH + 'px');
    }

    var apiCheckerInterval;
    var pId = 0;
    var prevApiStr = '';

    function regesterApi(){
        clearInterval(apiCheckerInterval);
        if(!window.player1){
            apiCheckerInterval = setInterval(regesterApi, 100);
        }else{
            window.player1.addListener(FWDUVPlayer.READY, apiReadyHandler);
            window.player1.addListener(FWDUVPlayer.PLAY, apiPlayHandler);
            window.player1.addListener(FWDUVPlayer.PAUSE, apiPauseHandler);
            window.player1.addListener(FWDUVPlayer.STOP, apiStopHandler);
            window.player1.addListener(FWDUVPlayer.ERROR, apiErrorHandler);
            window.player1.addListener(FWDUVPlayer.UPDATE_VIDEO_SOURCE, apiUpdateVideoSource);
            window.player1.addListener(FWDUVPlayer.GO_FULLSCREEN, apiGoFullScreenHandler);
            window.player1.addListener(FWDUVPlayer.GO_NORMALSCREEN, apiGoNormalScreenHandler);
            window.player1.addListener(FWDUVPlayer.PLAY_COMPLETE, apiPlayCompleteHandler);
            window.player1.addListener(FWDUVPlayer.START_TO_LOAD_PLAYLIST, apiStartToLoadPlaylistHandler);
            window.player1.addListener(FWDUVPlayer.LOAD_PLAYLIST_COMPLETE, apiLoadPlaylistCompleteHandler);
        }
    }

    function addMessage(str){
        if(str == prevApiStr) return;
        var id = 'p_' + pId;
        $('.console .holder').append('<p id="' + id + '">' + str + '</p>');
        $('#' + id).addClass('api-animation');
       
        pId += 1;
        $('.console .holder').scrollTop($('.console .holder')[0].scrollHeight);
        prevApiStr = str;
    }

    function apiStartToLoadPlaylistHandler(e){
        addMessage("start to load playlist - id: " + "<font color='#07C7C7'>" + player1.getPlaylistId() + "</font>");
    };

    function apiLoadPlaylistCompleteHandler(e){
        addMessage("playlist load complete - id: " + "<font color='#07C7C7'>" + player1.getPlaylistId() + "</font>");
    };

    function apiReadyHandler(){
        addMessage("API ready!");
    };

    function apiPlayHandler(){
        addMessage("play");
    };

    function apiPauseHandler(){
        addMessage("pause");
    };

    function apiStopHandler(){
        addMessage("stop");
    };

    function apiErrorHandler(e){
        addMessage(e.error);
    };

    function apiUpdateVideoSource(){
        addMessage("video source updated to " + "<font color='#07C7C7'>" + player1.getVideoSource() + "</font>");
    }

    function apiGoFullScreenHandler(){
        addMessage("go fullscreen");
    }

    function apiGoNormalScreenHandler(){
        addMessage("go normal screen");
    }

    function apiPlayCompleteHandler(){
        addMessage("play complete");
    };

    $('.buttons span').on('click',function(e){
        if($(e.target).attr('id') == 'play'){
            player1.play();
        }else if($(e.target).attr('id') == 'prev'){
            player1.playPrev();
        }else if($(e.target).attr('id') == 'next'){
            player1.playNext();
        }else if($(e.target).attr('id') == 'prev_shuffle'){
            player1.playShuffle();
        }else if($(e.target).attr('id') == 'pause'){
            player1.pause();
        }else if($(e.target).attr('id') == 'stop'){
            player1.stop();
        }else if($(e.target).attr('id') == 'play_vid'){
            player1.playVideo(1);
        }else if($(e.target).attr('id') == 'scrub'){
            player1.scrub(.5);
        }else if($(e.target).attr('id') == 'show_playlist'){
            player1.showCategories();
        }else if($(e.target).attr('id') == 'show_share'){
            player1.share();
        }else if($(e.target).attr('id') == 'download'){
            player1.downloadVideo();
        }else if($(e.target).attr('id') == 'go_fulscreen'){
            player1.goFullScreen();
        }else if($(e.target).attr('id') == 'get_playlist_id'){
            addMessage("playlist id: <font color='#07C7C7'>" + player1.getPlaylistId() + "</font>");
        }else if($(e.target).attr('id') == 'get_video_id'){
            addMessage("video id: <font color='#07C7C7'>" + player1.getVideoId() + "</font>");
        }else if($(e.target).attr('id') == 'get_time'){
            addMessage("total time: <font color='#07C7C7'>" + player1.getCurrentTime() + "</font>");
        }else if($(e.target).attr('id') == 'get_duration'){
            addMessage("total time: <font color='#07C7C7'>" + player1.getTotalTime() + "</font>");
        }else if($(e.target).attr('id') == 'load_html'){
            player1.loadPlaylist(0);
        }else if($(e.target).attr('id') == 'load_youtube'){
            player1.loadPlaylist(1);
        }else if($(e.target).attr('id') == 'load_mixed'){
            player1.loadPlaylist(2);
        }else if($(e.target).attr('id') == 'load_xml'){
            player1.loadPlaylist(3);
        }else if($(e.target).attr('id') == 'load_vimeo'){
            player1.loadPlaylist(4);
        }else if($(e.target).attr('id') == 'load_mp4'){
            player1.loadPlaylist(5);
        }else if($(e.target).attr('id') == 'load_mp3'){
            player1.loadPlaylist(6);
        }

    });

    init();

});

// Open poupup page and center.
function openPopup(page, width, height){
    var left = parseInt((screen.width - width)/2);
    var top =  parseInt((screen.height - height)/2);
    
    if(FWDUVPUtils.isMobile){
        self.popupWindow = window.open(page);
    }else{
        self.popupWindow = window.open(page,"",'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
    }
};