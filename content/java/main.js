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
       

        FWDEVPUtils.checkIfHasTransofrms();
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
        var vmc = FWDEVPUtils.getViewportMouseCoordinates(e);    
        if(!FWDEVPUtils.hitTest($('.vertical-menu-toggle')[0], vmc.screenX, vmc.screenY)
          && !FWDEVPUtils.hitTest($('.vertical-menu-toggle')[0], vmc.screenX, vmc.screenY)){
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

        // Large play.
        player1.largePlayButton_do.updateHEXColors(nBC, nBC);

        // A to b.
        if(player1.controller_do.atb){
            var newCenterImage = FWDEVPUtils.changeCanvasHEXColor(player1.controller_do.atb.mainScrubberMiddleImage, player1.controller_do.atb.mainSCrubberMiddleCanvas, nBC, true);
            player1.controller_do.atb.mainScrubberDragMiddle_do.style().background = "url('" + newCenterImage.src + "') repeat-x";
        }

        // Update controller.
        player1.controller_do.updateHEXColors(nBC, sBC);
        
        FWDEVPUtils.changeCanvasHEXColor(player1.controller_do.mainScrubberDragLeft_img, player1.controller_do.mainScrubberDragLeft_canvas, nBC);
        try{
            FWDEVPUtils.changeCanvasHEXColor(player1.controller_do.volumeScrubberDragBottom_img, player1.controller_do.volumeScrubberDragBottom_canvas, nBC);
        }catch(e){}
        
        if(!player1.isAdd_bl){
           var newCenterImage = FWDEVPUtils.changeCanvasHEXColor(player1.controller_do.mainScrubberMiddleImage, player1.controller_do.mainSCrubberMiddleCanvas, nBC, true);
           player1.controller_do.mainScrubberDragMiddle_do.style().background = "url('" + newCenterImage.src + "') repeat-x";
        }

        try{
            if(player1.controller_do.volumeScrubberDragMiddle_do) player1.controller_do.volumeScrubberDragMiddle_do.style().background = "url('" + player1.controller_do.mainSCrubberDragMiddleImageBackground.src + "') repeat-x";
            var newCenterImage = FWDEVPUtils.changeCanvasHEXColor(player1.controller_do.mainScrubberMiddleImage, player1.controller_do.mainSCrubberMiddleCanvas, nBC, true);
            player1.controller_do.volumeScrubberDragMiddle_do.style().background = "url('" + newCenterImage.src + "') repeat-x";
        }catch(e){}
        
        player1.controller_do.playPauseButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.rewindButton_do) player1.controller_do.rewindButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.subtitleButton_do) player1.controller_do.subtitleButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.playbackRateButton_do) player1.controller_do.playbackRateButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.volumeButton_do) player1.controller_do.volumeButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.playlistButton_do) player1.controller_do.playlistButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.downloadButton_do) player1.controller_do.downloadButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.infoButton_do) player1.controller_do.infoButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.categoriesButton_do) player1.controller_do.categoriesButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.ytbQualityButton_do) player1.controller_do.ytbQualityButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.shareButton_do) player1.controller_do.shareButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.embedButton_do) player1.controller_do.embedButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.fullScreenButton_do) player1.controller_do.fullScreenButton_do.updateHEXColors(nBC, sBC);
        if(player1.controller_do.atbButton_do) player1.controller_do.atbButton_do.updateHEXColors(nBC, sBC);
        
        clr = nBC;
        if(isDark && nBC == "#666666"){
            clr = "#888888";
        }
        if(player1.controller_do.time_do) player1.controller_do.time_do.style().color = clr;
        
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
            player1.controller_do.qualityArrow_do.screen.src = arrw;
            player1.controller_do.pointer_do.screen.src = pointr;

            for(var i=0; i<player1.controller_do.totalYtbButtons; i++){
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

        /*if(player1.controller_do.playbackRateButtons_ar){
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
        }*/

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
      
        if(player1.lrgPlayBtn) player1.lrgPlayBtn.updateHEXColors(nBC, nBC);

        // Popup ads buttons.
        if(player1.popupAds_do){
            player1.popupAds_do.nBC = nBC;
            player1.popupAds_do.sBC = sBC;

            if(player1.popupAds_do.popupAdsButtons_ar){
                for(var i=0; i<player1.popupAds_do.popupAdsButtons_ar.length; i++){
                    player1.popupAds_do.popupAdsButtons_ar[i].closeButton_do.updateHEXColors(nBC, sBC);   
                }
            }
        }
     
        // Update annotations.
        if(player1.annotations_do) player1.annotations_do.updateHEXColors(nBC, sBC);
      
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
        player1.adsSkip_do.border_do.style().borderColor = player1.adsSkip_do.borderNColor_str;
        FWDEVPUtils.changeCanvasHEXColor(player1.adsSkip_do.icon_img, player1.adsSkip_do.icon_do_canvas, nBC);
        FWDEVPUtils.changeCanvasHEXColor(player1.adsSkip_do.iconS_img, player1.adsSkip_do.iconS_do_canvas, sBC);
        player1.adsSkip_do.text_do.style().color = nBC;
        player1.adsStart_do.text_do.style().color = nBC;
     
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
        if(player1.embedWindow_do.closeButton_do){
            player1.embedWindow_do.closeButton_do.updateHEXColors(nBC, nBC);
            player1.embedWindow_do.copyLinkButton_do.updateHEXColors(nBC, sBC);
            player1.embedWindow_do.copyEmbedBtn.updateHEXColors(nBC, sBC);
            player1.embedWindow_do.sndBtn.updateHEXColors(nBC, sBC);
        }        
    };

    function updateSkin(){
        if(!window['player1'] || !player1.isAPIReady_bl) return;

        var ctrlBk;
        var ctrlScrubMid;
        var ctrlScrubLeft;
        var ctrlScrubRight;
        var ctrlLine;
        var volScrubMid;
        var volScrubLeft;
        var volScrubBRight;
        var prg;
        var adLines;
        var qltIcon;
        var qltBtnsBk;
        var volBk;
        var skipBk;
        var largePl;
        var ppBtn;
        var shareWBk;
        var sharecloseButton_do;
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
            qltIcon = 'content/hex_dark/youtube-quality-hd.png';  
            qltBtnsBk = 'content/hex_dark/controller-background.png';
            volScrubMid = 'content/hex_dark/scrubber-middle-background.png';
            volScrubLeft = 'content/hex_dark/scrubber-left-background.png';
            volScrubBRight = 'content/hex_dark/scrubber-right-background.png';
            skipBk = 'content/hex_dark/ads-background.png';
            largePl = 'content/hex_dark/large-play.png';
            ppBtn = 'content/hex_dark/close-button-normal.png';
            shareWBk = 'content/hex_dark/embed-window-background.png';
            sharecloseButton_do = 'content/hex_dark/embed-close-button.png';
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
            qltIcon = 'content/hex_white/youtube-quality-hd.png';
            qltBtnsBk = 'content/hex_white/controller-background.png';
            volScrubMid = 'content/hex_white/scrubber-middle-background.png';
            volScrubLeft = 'content/hex_white/scrubber-left-background.png';
            volScrubBRight = 'content/hex_white/scrubber-right-background.png';
            skipBk = 'content/hex_white/ads-background.png';
            largePl = 'content/hex_white/large-play.png';
            ppBtn = 'content/hex_white/close-button-normal.png';
            shareWBk = 'content/hex_white/embed-window-background.png';
            sharecloseButton_do = 'content/hex_white/embed-close-button.png';
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

        /*
        // A to b.
        player1.controller_do.atb.mainHld.style().background = "url('" + ctrlBk +  "')";
         if(player1.isMbl){
            player1.controller_do.atb.mainScrubberBkMiddle_do.style().background = "url('" + ctrlScrubMid + "') repeat-x";
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
        player1.controller_do.atb.left_do.style().background = txtClr;
        player1.controller_do.atb.left_do.style().color = txtClrInv;

        FWDAnimation.killTweensOf(player1.controller_do.atb.right_do.screen);
        player1.controller_do.atb.right_do.bkColorN = txtClr;
        player1.controller_do.atb.right_do.colorN = txtClrInv;
        player1.controller_do.atb.right_do.colorS = txtClr;
        player1.controller_do.atb.right_do.style().background = txtClr;
        player1.controller_do.atb.right_do.style().color = txtClrInv;
        
        if(isWhite){
            txtClrInv = "#DDDDDD";
        }
        
        player1.controller_do.atb.left_do.bkColorS = txtClrInv;
        player1.controller_do.atb.right_do.bkColorS = txtClrInv;*/

        // Large play.
        player1.largePlayButton_do.n_do.screen.src = largePl;

        // Controller.
        player1.controller_do.bk_do.style().background = "url('" + ctrlBk +  "')";
       
        player1.controller_do.mainScrubberBkMiddle_do.style().background = "url('" + ctrlScrubMid + "') repeat-x";
        player1.controller_do.volumeScrubberBkMiddle_do.style().background = "url('" + ctrlScrubMid + "') repeat-x";
      
        player1.controller_do.mainScrubberBkLeft_do.screen.src = ctrlScrubLeft;
        player1.controller_do.mainScrubberBkRight_do.screen.src = ctrlScrubRight;
        player1.controller_do.progressMiddle_do.style().background = "url('" + prg + "') repeat-x";
        player1.controller_do.mainScrubberBarLine_do.screen.src = ctrlLine;
        player1.controller_do.ytbQualityButton_do.d_sdo.screen.src = qltIcon;

        player1.controller_do.volumeScrubberBarLine_do.screen.src = ctrlLine;
        player1.controller_do.volumeScrubberBkLeft_do.screen.src = volScrubLeft;
        player1.controller_do.volumeScrubberBkRight_do.screen.src = volScrubBRight;

        if(player1.controller_do.line_ar){
            for(var i=0; i<player1.controller_do.line_ar.length; i++){
                var line = player1.controller_do.line_ar[i];
                line.style().background = "url('" + adLines + "') repeat-x";
            }
        }

        // Popup ads buttons.
        if(player1.popupAds_do){
            if(player1.popupAds_do.popupAdsButtons_ar){
                for(var i=0; i<player1.popupAds_do.popupAdsButtons_ar.length; i++){
                   player1.popupAds_do.popupAdsButtons_ar[i].closeButton_do.n_do.screen.src = ppBtn;  
                }
            }
        }

        // Annotations.
        if(player1.annotations_do){
             if(player1.annotations_do){
                for(var i=0; i<player1.annotations_do.ann_ar.length; i++){
                    try{
                        player1.annotations_do.ann_ar[i].closeButton_do.n_do.screen.src = anntBtn;  
                    }catch(e){}
                }
             }
        }
       
        // Skip button.
        player1.adsSkip_do.bk_do.style().background = "url('" + skipBk + "')";
        player1.adsStart_do.bk_do.style().background = "url('" + skipBk + "')"; 
        if(isDark){
            player1.adsStart_do.border_do.borderNColor_str = '#666666';
            player1.adsStart_do.border_do.style().borderColor = '#666666';
        }else{
            player1.adsStart_do.border_do.borderNColor_str = '#888888';
            player1.adsStart_do.border_do.style().borderColor = '#888888';
        }
        
        // Quality buttons.
        if(player1.controller_do.repeatBackground_bl){
            player1.controller_do.ytbButtonsHolder_do.style().background = "url('" + qltBtnsBk +  "')";
            //player1.controller_do.playbackRatesButtonsHolder_do.style().background = "url('" + qltBtnsBk +  "')";
            player1.controller_do.subtitlesButtonsHolder_do.style().background = "url('" + qltBtnsBk +  "')";
        }else{
            self.ytbButtonBackground_do.screen.src = qltBtnsBk;
            //self.playbackRatesButtonsHolder_do.screen.src = qltBtnsBk;
            self.subtitlesButtonsHolder_do.screen.src = qltBtnsBk;
        }

        // Share window.
        if(player1.shareWindow_do.clsBtn){
            player1.shareWindow_do.bk_do.style().background = "url('" + shareWBk + "')";
            player1.shareWindow_do.clsBtn.n_do.screen.src = sharecloseButton_do;
        }

        // Embed window.
        if(player1.embedWindow_do.closeButton_do){
            player1.embedWindow_do.bk_do.style().background = "url('" + shareWBk + "')";
            player1.embedWindow_do.closeButton_do.n_do.screen.src = sharecloseButton_do;
        }

        if(player1.embedWindow_do.linkAndEmbedHolderBk_do){
            player1.embedWindow_do.linkAndEmbedHolderBk_do.style().background = "url('" + txtMainHldBk + "')"; 
            player1.embedWindow_do.linkAndEmbedHolderBk_do.style().borderColor = txtMainHldBorder; 
            player1.embedWindow_do.sendMainHldBk.style().background = "url('" + txtMainHldBk + "')"; 
            player1.embedWindow_do.sendMainHldBk.style().borderColor = txtMainHldBorder; 
            player1.embedWindow_do.copyLinkButton_do.n_do.screen.src = copyLinkBtn; 
            player1.embedWindow_do.copyEmbedBtn.n_do.screen.src = copyLinkBtn; 
            player1.embedWindow_do.sndBtn.n_do.screen.src = sndBtn; 
        }
    }

    // Setup video player.
  
    if($('#myDivHolder').hasClass('fwd-hide-top')){
       $('#myDivHolder').addClass('reveal-top');
    }else{
       $('#myDivHolder').addClass('reveal');
    }

    setTimeout(function(){
        $('#myDivHolder').css({'transform':'none'});
    }, 2000);
  
    
    function setupVideoPlayer(){

        new FWDEVPlayer({       
            //main settings
            instanceName:"player1",
            parentId:"myDiv",
            mainFolderPath:"content",
            initializeOnlyWhenVisible:"no",
            skinPath:"hex_dark",
            displayType:"responsive",
            fillEntireVideoScreen:"no",
            playsinline:"yes",
            autoScale:"yes",
            openDownloadLinkOnMobile:"no",
            useVectorIcons:"no",
            useResumeOnPlay:"no",
            goFullScreenOnButtonPlay:"no",
            useHEXColorsForSkin:"yes",
            normalHEXButtonsColor:"#666666",
            privateVideoPassword:"428c841430ea18a70f7b06525d4b748a",
            startAtTime:"",
            stopAtTime:"",
            startAtVideoSource:2,
            videoSource:[
                {source:"content/videos/fwd-480p.mp4", label:"small version"},
                {source:"content/videos/fwd-720p.mp4", label:"hd720"},
                {source:"content/videos/fwd-1080p.mp4", label:"hd1080"}
            ],
            posterPath:"content/posters/mp4-poster.jpg",
            showErrorInfo:"yes",
            fillEntireScreenWithPoster:"yes",
            disableDoubleClickFullscreen:"no",
            addKeyboardSupport:"yes",
            useChromeless:"no",
            showPreloader:"yes",
            preloaderColors:["#999999", "#FFFFFF"],
            autoPlay:"no",
            enableAutoplayOnMobile:"no",
            loop:"no",
            scrubAtTimeAtFirstPlay:"00:00:00",
            maxWidth:980,
            maxHeight:551,
            volume:.8,
            greenScreenTolerance:200,
            backgroundColor:"#000000",
            posterBackgroundColor:"#000000",
            //lightbox settings
            lightBoxBackgroundOpacity:.6,
            lightBoxBackgroundColor:"#000000",
            //logo settings
            showLogo:"yes",
            hideLogoWithController:"yes",
            logoPosition:"topRight",
            logoLink:"http://www.webdesign-flash.ro",
            logoMargins:5,
            //controller settings
            showControllerWhenVideoIsStopped:"yes",
            showDefaultControllerForVimeo:"yes",
            showScrubberWhenControllerIsHidden:"yes",
            showVolumeScrubber:"yes",
            showVolumeButton:"yes",
            showTime:"yes",
            showRewindButton:"yes",
            showQualityButton:"yes",
            showShareButton:"yes",
            showEmbedButton:"yes",
            showDownloadButton:"no",
            showChromecastButton:"no",
            showFullScreenButton:"yes",
            showMainScrubberToolTipLabel:"yes",
            repeatBackground:"yes",
            controllerHeight:43,
            controllerHideDelay:3,
            startSpaceBetweenButtons:7,
            spaceBetweenButtons:9,
            mainScrubberOffestTop:14,
            scrubbersOffsetWidth:4,
            timeOffsetLeftWidth:5,
            timeOffsetRightWidth:3,
            volumeScrubberWidth:80,
            volumeScrubberOffsetRightWidth:0,
            timeColor:"#777777",
            youtubeQualityButtonNormalColor:"#777777",
            youtubeQualityButtonSelectedColor:"#FFFFFF",
            scrubbersToolTipLabelBackgroundColor:"#FFFFFF",
            scrubbersToolTipLabelFontColor:"#5a5a5a",
            //redirect at video end
            redirectURL:"",
            redirectTarget:"_blank",
            //cuepoints
            executeCuepointsOnlyOnce:"no",
            cuepoints:[],
            //annotations
            annotiationsListId:"none",
            showAnnotationsPositionTool:"no",
            //subtitles
            showSubtitleButton:"yes",
            subtitlesOffLabel:"Subtitle off",
            startAtSubtitle:1,
            subtitlesSource:[
                    {subtitlePath:"content/subtitles/english_subtitle.txt", subtileLabel:"English"},
                    {subtitlePath:"content/subtitles/romanian_subtitle.txt", subtileLabel:"Romanian"},
                    {subtitlePath:"content/subtitles/spanish_subtitle.txt", subtileLabel:"Spanish"}
                ],
            //audio visualizer
            audioVisualizerLinesColor:"#0099FF",
            audioVisualizerCircleColor:"#FFFFFF",
            //advertisement on pause window
            aopwTitle:"Advertisement",
            aopwSource:"",
            aopwWidth:400,
            aopwHeight:240,
            aopwBorderSize:6,
            aopwTitleColor:"#FFFFFF",
            //playback rate / speed
            showPlaybackRateButton:"no",
            defaultPlaybackRate:"1", //0.25, 0.5, 1, 1.25, 1.5, 2
            //sticky on scroll
            stickyOnScroll:"no",
            stickyOnScrollShowOpener:"yes",
            stickyOnScrollWidth:"700",
            stickyOnScrollHeight:"394",
            //sticky display settings
            showOpener:"yes",
            showOpenerPlayPauseButton:"yes",
            verticalPosition:"bottom",
            horizontalPosition:"center",
            showPlayerByDefault:"yes",
            animatePlayer:"yes",
            openerAlignment:"right",
            mainBackgroundImagePath:"content/minimal_skin_dark/main-background.png",
            openerEqulizerOffsetTop:-1,
            openerEqulizerOffsetLeft:3,
            offsetX:0,
            offsetY:0,
            //embed window
            embedWindowCloseButtonMargins:15,
            borderColor:"#333333",
            mainLabelsColor:"#FFFFFF",
            secondaryLabelsColor:"#a1a1a1",
            shareAndEmbedTextColor:"#5a5a5a",
            inputBackgroundColor:"#000000",
            inputColor:"#FFFFFF",
            //a to b loop
            useAToB:"no",
            atbTimeBackgroundColor:"transparent",
            atbTimeTextColorNormal:"#FFFFFF",
            atbTimeTextColorSelected:"#FF0000",
            atbButtonTextNormalColor:"#888888",
            atbButtonTextSelectedColor:"#FFFFFF",
            atbButtonBackgroundNormalColor:"#FFFFFF",
            atbButtonBackgroundSelectedColor:"#000000",
            //thumbnails preview
            thumbnailsPreview:"",
            thumbnailsPreviewWidth:196,
            thumbnailsPreviewHeight:110,
            thumbnailsPreviewBackgroundColor:"#000000",
            thumbnailsPreviewBorderColor:"#666",
            thumbnailsPreviewLabelBackgroundColor:"#666",
            thumbnailsPreviewLabelFontColor:"#FFF",
            // context menu
            contextMenuType:'default',
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
               window['player1'].addListener(FWDEVPlayer.GO_FULLSCREEN, function(){
                    $('.menu, .reviews').css({'display':'none'});
                });
                 window['player1'].addListener(FWDEVPlayer.GO_NORMALSCREEN, function(){
                    $('.menu').css({'display':'block'});
                    $('.reviews').css({'display':'flex'});
                });

                $('#theme').removeClass('theme-disabled');
                $('#theme').removeClass('theme-disabled2');
                allowToShwReview = true;
                showReviews();

                setTimeout(function(){
                    $('#theme').css({'transition':'none'});
                }, 800);
               
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
    if($('#quality_col_1').length){
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
    }

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
        $('.main-bnr').addClass('reveal');

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
            window.player1.addListener(FWDEVPlayer.READY, apiReadyHandler);
            window.player1.addListener(FWDEVPlayer.PLAY, apiPlayHandler);
            window.player1.addListener(FWDEVPlayer.PAUSE, apiPauseHandler);
            window.player1.addListener(FWDEVPlayer.STOP, apiStopHandler);
            window.player1.addListener(FWDEVPlayer.ERROR, apiErrorHandler);
            window.player1.addListener(FWDEVPlayer.UPDATE_VIDEO_SOURCE, apiUpdateVideoSource);
            window.player1.addListener(FWDEVPlayer.GO_FULLSCREEN, apiGoFullScreenHandler);
            window.player1.addListener(FWDEVPlayer.GO_NORMALSCREEN, apiGoNormalScreenHandler);
            window.player1.addListener(FWDEVPlayer.PLAY_COMPLETE, apiPlayCompleteHandler);
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
        }else if($(e.target).attr('id') == 'volume'){
            player1.setVolume(0.1);
        }else if($(e.target).attr('id') == 'get_time'){
            addMessage("total time: <font color='#07C7C7'>" + player1.getCurrentTime() + "</font>");
        }else if($(e.target).attr('id') == 'get_duration'){
            addMessage("total time: <font color='#07C7C7'>" + player1.getTotalTime() + "</font>");
        }else if($(e.target).attr('id') == 'set_youtube_src'){
            player1.setPosterSource("content/posters/youtube-poster.jpg");
            player1.setVideoSource("https://www.youtube.com/watch?v=IDZTCLNOfqU");
        }else if($(e.target).attr('id') == 'set_mp4_src'){
            player1.setPosterSource("content/posters/travel-poster.jpg");
            player1.setVideoSource("content/videos/travel.mp4");
            
        }

    });

    init();

});

// Green screen.
function setupVideoFixed(){
    new FWDEVPlayer({       
        //main settings
        useYoutube:"yes",
        useVimeo:"no",
        instanceName:"playerFixed",
        parentId:"fixedDiv",
        mainFolderPath:"content",
        skinPath:"minimal_skin_dark",
        displayType:"responsive",
        autoScale:"yes",
        fillEntireVideoScreen:"no",
        useHEXColorsForSkin:"no",
        normalHEXButtonsColor:"#FF0000",
        selectedHEXButtonsColor:"#FFFFFF",
        startAtVideoSource:2,
        videoSource:[
            {source:"content/videos/zombie.mp4", label:"", videoType:"greenScreenVideo"}
        ],
        posterPath:"content/posters/poster-zombie.png",
        rightClickContextMenu:"default",
        useChromeless:"no",
        addKeyboardSupport:"yes",
        disableDoubleClickFullscreen:"yes",
        showPreloader:"no",
        autoPlay:"no",
        loop:"no",
        maxWidth:300,
        maxHeight:300,
        volume:.8,
        greenScreenTolerance:200,
        backgroundColor:"transparent",
        posterBackgroundColor:"transparent",
        //logo settings
        showLogo:"no",
        hideLogoWithController:"yes",
        logoPosition:"topRight",
        logoLink:"http://www.webdesign-flash.ro",
        logoPath:"",
        logoMargins:5,
        //controller settings
        showController:"no",
        showControllerWhenVideoIsStopped:"yes",
        showVolumeScrubber:"yes",
        showVolumeButton:"yes",
        showTime:"yes",
        showQualityButton:"no",
        showShareButton:"no",
        showEmbedButton:"no",
        showDownloadButton:"no",
        showFullScreenButton:"no",
        repeatBackground:"yes",
        controllerHeight:41,
        controllerHideDelay:3,
        startSpaceBetweenButtons:7,
        spaceBetweenButtons:9,
        mainScrubberOffestTop:14,
        scrubbersOffsetWidth:4,
        timeOffsetLeftWidth:5,
        timeOffsetRightWidth:3,
        volumeScrubberWidth:80,
        volumeScrubberOffsetRightWidth:0,
        timeColor:"#888888",
        youtubeQualityButtonNormalColor:"#888888",
        youtubeQualityButtonSelectedColor:"#FFFFFF",
        //playback rate / speed
        showPlaybackRateButton:"no",
        defaultPlaybackRate:"1", //0.25, 0.5, 1, 1.25, 1.5, 2
        //embed window
        embedWindowCloseButtonMargins:0,
        borderColor:"#333333",
        mainLabelsColor:"#FFFFFF",
        secondaryLabelsColor:"#a1a1a1",
        shareAndEmbedTextColor:"#5a5a5a",
        inputBackgroundColor:"#000000",
        inputColor:"#FFFFFF",
        //subtitles
        showSubtitleButton:"no",
        subtitlesOffLabel:"Subtitle off",
        startAtSubtitle:1,
        subtitlesSource:[],
        //annotations
        annotiationsListId:"none",
        showAnnotationsPositionTool:"no",
        //ads
        openNewPageAtTheEndOfTheAds:"no",
        adsSource:[],
        adsButtonsPosition:"right",
        skipToVideoText:"You can skip to video in: ",
        skipToVideoButtonText:"Skip Ad",
        timeToHoldAds:4,
        adsTextNormalColor:"#999999",
        adsTextSelectedColor:"#FFFFFF",
        adsBorderNormalColor:"#666666",
        adsBorderSelectedColor:"#FFFFFF",
        // context menu
        showContextmenu:'no',
        showScriptDeveloper:"no",
        contextMenuBackgroundColor:"#1f1f1f",
        contextMenuBorderColor:"#1f1f1f",
        contextMenuSpacerColor:"#333",
        contextMenuItemNormalColor:"#888888",
        contextMenuItemSelectedColor:"#FFFFFF",
        contextMenuItemDisabledColor:"#444"
    });
}


// Open poupup page and center.
function openPopup(page, width, height){
    var left = parseInt((screen.width - width)/2);
    var top =  parseInt((screen.height - height)/2);
    
    if(FWDEVPUtils.isMobile){
        self.popupWindow = window.open(page);
    }else{
        self.popupWindow = window.open(page,"",'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
    }
};