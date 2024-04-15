/**
 * Front js file, handles most of the js functionality.
 *
 * @package rap
 * @since rap 1.0
 */
 
jQuery(document).ready(function($){
    
    'use strict';

    var last_scroll = 0;
    var scrollObj;
    var sW;
    var wW;
    var wH; 
    var scroll;
  
     // Initialized main.
    function init(){
        hideOrShowScondaryMenu();
    	initPlayerMainBk();
        setupPlayer();

        $(window).on('resize', resizeHandler);
        resizeHandler();
        checkScrollTheme();
        setTimeout(resizeHandler, 300);
        
        $(window).on('scroll',function(){

            scroll = $(window).scrollTop();
            if(Math.abs(scroll - last_scroll) > $(window).height() * 0.1){
                last_scroll = scroll;
                revealStuff();   
            }
            checkMainFeatures(true);
            checkScrollTheme();
        });
    }

    function resizeHandler(){
        wW = $(window).innerWidth(); 
        wH = $(window).height(); 
        sW = $(window).width();
        prevCntId = -1;
        hideOrShowScondaryMenu();
        checkMainFeatures();
        resizeFi();
        resizeAPi();
        resizeSwitcher();
    }

    // Player main bk.
    function initPlayerMainBk(){
    	var bk = $('.main-player .bk')[0];
        var src = 'https://baidu.com.im/audio/main-player-bk.jpg';
        bk.src = src;
        bk.onload = function(){
            setTimeout(function(){
                $('.main-player .bk').addClass('reveal-opacity');
            }, 400)
        }
    }

    // Reveal stuff.
    function revealStuff(){

        var connectOffset = -400;
        var offset1 = -400;
        var offset2 = -300;
        if(wW <= 998){
            offset1 = offset2 = -200;
        }

  	    if(isVisible($('.circle'), connectOffset)){
           initCirles();
           $('.connect').addClass('reveal');
        }

        if(isVisible($('.main-features-title'), offset1)){
           $('.main-features-title').addClass('reveal');
        }

        if(isVisible($('.main-features'), offset1)){
           $('.main-features').addClass('reveal-top');
        }

        if(isVisible($('.ft'), offset1)){
           $('.ft').addClass('reveal');
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

        if(isVisible($('.expand-more'), -200)){
            $('.expand-more').addClass('reveal');
        }

        if(isVisible($('.quality .col1'), -200)){
           $('.quality .col1').addClass('reveal');
           showQuality(0);
        }

        if(isVisible($('.quality .col2'), -200)){
           $('.quality .col2').addClass('reveal');
           showQuality(1);
        }

        if(isVisible($('.m-main-holder'), offset2)){
           $('.m-main-holder').addClass('reveal');
        }

        if(isVisible($('.ready'), -200)){
           $('.ready').addClass('reveal');
        }   

        if(isVisible($('.footer'), -200)){
           $('.footer').addClass('reveal');
        }      

        if(isVisible($('.footer-bar'), 100)){
           $('.footer-bar').addClass('reveal');
        }   

        if(isVisible($('.grid'), 100)){
           $('.grid').addClass('reveal');
        }   

        if(isVisible($('.api-header'), 100)){
           $('.api-header').addClass('reveal');
        }   
    }

    function isVisible(element, offset){
       
        if(!element.length || element.hasClass('reveal') || element.hasClass('fake-reveal')){
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

    
    // Menu.
    $('.buy-now').on('click', function(e){
        e.preventDefault();
    });

    $('.sub-menu').on('mouseover', function(){
        $(this).prt().addClass('active');
    });

    $('.sub-menu').on('mouseleave', function(){
        $(this).prt().removeClass('active');
    });
    
   
    $('.menu').addClass('reveal');
    setTimeout(function(){
        $('.menu').css({'transform':'none', 'transition':'none'});
    }, 100);

    var vMenuShowed = false;
    $('.vertical-menu-toggle').on('click', function(){
        if(!vMenuShowed){
            vMenuShowed = true;
            $('.vertical-menu-toggle').addClass('vertical-menu--showed');
            $('.secondary-navigation').addClass('secondary-menu-show');
            $('#theme_holder').css({'z-index':1});
            $(window).on('click', closeSecondaryMenu);
        }else{
            vMenuShowed = false;
            $('.vertical-menu-toggle').removeClass('vertical-menu--showed');
            $('.secondary-navigation').removeClass('secondary-menu-show');
        }
    });

    function closeSecondaryMenu(e){
        var vmc = FWDMSPUtils.getViewportMouseCoordinates(e);    
        if(!FWDMSPUtils.hitTest($('.vertical-menu-toggle')[0], vmc.screenX, vmc.screenY)
          && !FWDMSPUtils.hitTest($('.vertical-menu-toggle')[0], vmc.screenX, vmc.screenY)){
            vMenuShowed = false;
            $('.vertical-menu-toggle').removeClass('vertical-menu--showed');
            $('.secondary-navigation').removeClass('secondary-menu-show');
             $('#theme_holder').css({'z-index':200});
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

    // Main player.
    $('.main-player-holder').addClass('reveal');


    function setupPlayer(){
        FWDMSPUtils.checkIfHasTransofrms();
        if(page == 'demos'){
            setupDemoPlayer();
        }else{
            var maxWidth = 900;
            if(isFull) maxWidth = 1920;
            new FWDMSP({
                    //main settings
                    instanceName:"player1",
                    playlistsId:"playlists",
                    mainFolderPath:"content",
                    skinPath:"hex_dark",
                    privatePassword:"428c841430ea18a70f7b06525d4b748a",
                    soundCloudAPIKey:"",
                    showSoundCloudUserNameInTitle:"yes",
                    googleAnalyticsTrackingCode:"",
                    youtubeAPIKey:"AIzaSyDSlt_s493a1dFkFQ2yQLT4RvNycIlS6So",
                    proxyCors:"",
                    showMainBackground:"no",
                    verticalPosition:"bottom",
                    horizontalPosition:"center",
                    useDeepLinking:"yes",
                    useYoutube:"no",
                    useVideo:"yes",
                    useContinuousPlayback:'no',
                    useHEXColorsForSkin:"yes",
                    normalHEXButtonsColor:"#666666",
                    normalHEXButtonsColor2:"#666666",
                    rightClickContextMenu:"disabled",
                    showButtonsToolTips:"yes",
                    animate:"yes",
                    addKeyboardSupport:"yes",
                    autoPlay:"yes",
                    loop:"no",
                    shuffle:"no",
                    maxWidth:maxWidth,
                    volume:.9,
                    toolTipsButtonsHideDelay:1.5,
                    toolTipsButtonsBackgroundColor:"#FFFFFF",
                    toolTipsButtonFontColor:"#000000",
                    //controller settings
                    showControllerByDefault:"yes",
                    showThumbnail:"yes",
                    showFullScreenButton:"yes",
                    showNextAndPrevButtons:"yes",
                    showLoopButton:"yes",
                    showShuffleButton:"yes",
                    showDownloadMp3Button:"yes",
                    showBuyButton:"yes",
                    showShareButton:"yes",
                    showMainScrubberAndVolumeScrubberToolTipLabel:"yes",
                    expandBackground:"no",
                    titleColor:"#FFFFFF",
                    timeColor:"#888888",
                    scrubbersToolTipLabelBackgroundColor:"#FFFFFF",
                    scrubbersToolTipLabelFontColor:"#5a5a5a",
                    //controller align and size settings (described in detail in the documentation!)
                    controllerHeight:76,
                    startSpaceBetweenButtons:9,
                    spaceBetweenButtons:8,
                    separatorOffsetOutSpace:5,
                    separatorOffsetInSpace:9,
                    lastButtonsOffsetTop:14,
                    allButtonsOffsetTopAndBottom:14,
                    titleBarOffsetTop:13,
                    mainScrubberOffsetTop:47,
                    spaceBetweenMainScrubberAndTime:10,
                    startTimeSpace:10,
                    scrubbersOffsetWidth:2,
                    scrubbersOffestTotalWidth:0,
                    volumeButtonAndScrubberOffsetTop:47,
                    spaceBetweenVolumeButtonAndScrubber:6,
                    volumeScrubberOffestWidth:4,
                    scrubberOffsetBottom:10,
                    equlizerOffsetLeft:1,
                    //playlists window settings
                    showPlaylistsSearchInput:"yes",
                    usePlaylistsSelectBox:"yes",
                    showPlaylistsSelectBoxNumbers:"yes",
                    showPlaylistsButtonAndPlaylists:"yes",
                    showPlaylistsByDefault:"no",
                    useID3ForFolderPlaylist:"yes",
                    thumbnailSelectedType:"opacity",
                    startAtPlaylist:0,
                    startAtTrack:0,
                    startAtRandomTrack:"no",
                    playlistSelectorHeight: 37,
                    buttonsMargins:15,
                    thumbnailMaxWidth:330, 
                    thumbnailMaxHeight:330,
                    horizontalSpaceBetweenThumbnails:40,
                    verticalSpaceBetweenThumbnails:40,
                    mainSelectorBackgroundSelectedColor:"#FFFFFF",
                    mainSelectorTextNormalColor:"#FFFFFF",
                    mainSelectorTextSelectedColor:"#000000",
                    mainButtonTextNormalColor:"#888888",
                    mainButtonTextSelectedColor:"#FFFFFF",
                    //playlist settings
                    playTrackAfterPlaylistLoad:"no",
                    showPlayListButtonAndPlaylist:"yes",
                    showPlayListOnMobile:"yes",
                    showPlayListByDefault:"no",
                    showPlaylistItemPlayButton:"yes",
                    showPlaylistItemDownloadButton:"yes",
                    showPlaylistItemBuyButton:"yes",
                    forceDisableDownloadButtonForPodcast:"yes",
                    forceDisableDownloadButtonForOfficialFM:"yes",
                    forceDisableDownloadButtonForFolder:"yes",
                    addScrollBarMouseWheelSupport:"yes",
                    showTracksNumbers:"yes",
                    disableScrubber:"no",
                    randomizePlaylist:"no",
                    playlistBackgroundColor:"#000000",
                    trackTitleNormalColor:"#888888",
                    trackTitleSelectedColor:"#FFFFFF",
                    trackDurationColor:"#888888",
                    playlistItemHeight:33,
                    maxPlaylistItems:40,
                    nrOfVisiblePlaylistItems:9,
                    trackTitleOffsetLeft:0,
                    playPauseButtonOffsetLeftAndRight:11,
                    durationOffsetRight:9,
                    downloadButtonOffsetRight:11,
                    scrollbarOffestWidth:7,
                    //playback rate / speed
                    showPlaybackRateButton:"yes",
                    playbackRateButtonsMargins:7,
                    defaultPlaybackRate:1, //min - 0.5 / max - 3
                    playbackRateWindowTextColor:"#FFFFFF",
                    //visualizer
                    useVisualizer:'yes',
                    useDumyVisualizeOnIOS:'yes',
                    visualizerRandomPreset:"yes",
                    visualizerPreset:"wave1",
                    visualizerColor:["#AAAAAA", "#999999", "#888888", "#777777", "#666666"],
                    visualizerCapColor: "#FFFFFF",
                    //login
                    playIfLoggedIn:"no",
                    playIfLoggedInMessage:"Please <a href='https://google.com' target='_blank'>login</a> to access this track.",
                    //search bar settings
                    showSearchBar:"yes",
                    showSortButtons:"yes",
                    searchInputColor:"#999999",
                    searchBarHeight:38,
                    inputSearchTextOffsetTop:1,
                    inputSearchOffsetLeft:0,
                    //password window
                    borderColor:"#333333",
                    mainLabelsColor:"#FFFFFF",
                    secondaryLabelsColor:"#a1a1a1",
                    textColor:"#5a5a5a",
                    inputBackgroundColor:"#000000",
                    inputColor:"#FFFFFF",
                    //opener settings
                    showOpener:"yes",
                    openerAlignment:"right",
                    openerEqulizerOffsetLeft:3,
                    openerEqulizerOffsetTop:-1,
                    //popup settings
                    showPopupButton:"yes",
                    openPopupOnPlay:"no",
                    popupWindowBackgroundColor:"#878787",
                    popupWindowWidth:850,
                    popupWindowHeight:451,
                    //a to b loop
                    atbTimeTextColorNormal:"#888888",
                    atbTimeTextColorSelected:"#FFFFFF",
                    atbButtonTextNormalColor:"#888888",
                    atbButtonTextSelectedColor:"#FFFFFF",
                    atbButtonBackgroundNormalColor:"#FFFFFF",
                    atbButtonBackgroundSelectedColor:"#000000"
                });
        }
    }

    var playerReady;
    var registerAPIInterval;
        registerAPI();
        function registerAPI(){
            clearInterval(registerAPIInterval);
            if(window['player1']){

            /*window['player1'].addListener(FWDMSP.GO_FULLSCREEN, function(){
               // $('.menu, .reviews').css({'display':'none'});
            });
             window['player1'].addListener(FWDMSP.GO_NORMALSCREEN, function(){
                //$('.menu').css({'display':'block'});
                //$('.reviews').css({'display':'flex'});
            });*/
          

            window['player1'].addListener(FWDMSP.LOAD_PLAYLIST_COMPLETE, function(){
                playerReady = true;
                player1.stageContainer.style.zIndex = 22;
                player1._d.proxyCors = 'https://crs.webdesign-flash.ro/?q=';
                setTimeout(function(){
                   
                getCurVisId();
                setupDemoGrid();

                if(!window['c-1-1'] && $('.connect').length){
                    setTimeout(function(){
                        if($('.connect').offset().top < ($(window).scrollTop() + $(window).height())){
                           initCirles();
                               $('.connect').addClass('reveal');
                            }
                    }, 800);
                }

                if(player1.playlist_do && !player1.playlist_do.isShowed_bl){
                    showTheme();
                }

                }, 1000);
            });

            window['player1'].addListener('showplaylist', function(){
               if(!$('#theme').length) return;
               sW = Math.min($(window).width(), 1920);
               if(sW < 1083 || (player1.sW == sW)){
                    showTheme(true);
               }
            });

            window['player1'].addListener('hideplaylist', function(){
               if(!$('#theme').length) return;
               showTheme();
            });


            window['player1'].addListener('show', function(){
                if(!$('#theme').length) return;
                sW = Math.min($(window).width(), 1920);

                if(player1.playlist_do.isShowed_bl && player1.controller_do.isShowed_bl && (player1.sW > 900 || sW< 1083)){
                    showTheme(true);
                }
            });

            window['player1'].addListener('hide', function(){
                if(!$('#theme').length) return;
                showTheme();
            });

            window['player1'].addListener('goFullScreen', function(){
                if(!$('#theme').length) return;
                $('#theme_holder').css({'z-index':0});
            });

            window['player1'].addListener('goNormalScreen', function(){
                if(!$('#theme').length) return;
                $('#theme_holder').css({'z-index':200});
            });

        }else{
            registerAPIInterval = setInterval(registerAPI, 100);
        }
    };

    function showTheme(hide){
        if(hide){
            $('#theme').addClass('theme-disabled');
            $('#theme_holder').css({'pointer-events':'none'});  
        }else{
            if(allowToShowTheme){
                $('#theme').removeClass('theme-disabled');
                $('#theme_holder').css({'pointer-events':'auto'});  
            }
        }
    }

    var allowToShowTheme = true;
    function checkScrollTheme(){
        if(!$('.main-features').length) return;
        var t = $('.main-features').offset().top - 300;
        if(t < scroll){
            allowToShowTheme = false;
            showTheme(true);
        }else{
            allowToShowTheme = true;
            if(player1.playlist_do && !player1.playlist_do.isShowed_bl){
                showTheme();
            }
        }
    }

    // Theme and colors switcher.
    var whiteC = ['#888888', '#ef9b0f', '#E70909', '#6a00ff', '#008a00', '#0099ff'];
    var darkC = ['#666666', '#E78E09', '#f70c3e',  '#dbc300', '#48DF13', '#0099ff'];
    var darkL = ['Grey', 'Orange', 'Pink', 'Yellow', 'Green', 'Blue'];
    var whiteL = ['Grey', 'Orange', 'Pink', 'Dark Brown', 'Green', 'Blue'];
    window['isWhite'] = false;
    window['isDark'] = true;
    var isTop = false;
    var isFull = Math.round(Math.random());
    var isDark = true;
    var colorId = 0;
    var style_to;
    var nBC;
    var n2BC;
    var sBC;
    var clr;
    var clrShowed = false;

    checkPos();
    checkSize();
    resetColors();
    updateClrButton()
    addColorsEvents();
    enableDisableColors();

    function setDState(){
        colorId = 0;
        resetColors();
        checkThemeState();
        updateColors();
        enableDisableColors();
        updateSkin();
    }

    function checkPos(){
         if(isTop){
            $('.top').css({'display':'block'});
            $('.bottom').css({'display':'none'});
        }else{
            $('.top').css({'display':'none'});
            $('.bottom').css({'display':'block'});
        }

        if(window['player1']){
            if(isTop){
                player1.position_str = FWDMSP.POSITION_TOP;
            }else{
                player1.position_str = FWDMSP.BOTTOM;
            }


            player1.playlist_do.updateSpacersPosition();
            player1.resizeHandler();
        }
    }

    function checkSize(){
         if(isFull){
            $('.responsive').css({'display':'none'});
            $('.fluid-width').css({'display':'block'});

            if(window['player1'] && player1.playlist_do.isShowed_bl && player1.controller_do.isShowed_bl){
                showTheme(true);
            }
        }else{
            $('.responsive').css({'display':'block'});
            $('.fluid-width').css({'display':'none'});
        }

        if(window['player1']){
            if(isFull){
                player1.maxWidth = 1920;
            }else{
                player1.maxWidth = 900;
            }
            player1.resizeHandler();
        }
    }

    function checkThemeState(){
        if(isDark){
            $('#theme2 .dark').css({'display':'block'});
            $('#theme2 .white').css({'display':'none'});
            $('link[href="css/white.css"]').remove();
        }else{
            $('#theme2 .dark').css({'display':'none'});
            $('#theme2 .white').css({'display':'block'});
            $('<link rel="stylesheet" href="css/white.css" type="text/css"/>').insertAfter('#main_css');
        }
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
            if(isDark){
                $(el).find('.tp').html(darkL[i]);
            }else{
                $(el).find('.tp').html(whiteL[i]);
            }
         });
    }

    var vis_ar = ['wave1', 'wave2', 'bars1', 'bars2'];
    var curVisId;

    function getCurVisId(){
        for(var i=0; i<vis_ar.length; i++){
            if(vis_ar[i] == player1.vis.preset){
                curVisId = i;
                break;
            }
        }
    }

    function resizeSwitcher(){
        var th = $('#theme_holder');
        if(!th.length) return;
        var mW = 1920;
        var clrs = 210;

        if(wW < 900){
            $('#size').css({'display':'none'});
            clrs = 166;
        }else{
             $('#size').css({'display':'block'});
        }

        var h = th.height();
        var y = Math.round((wH - h)/2);
        var x = wW - 69;
        if(x > 1862){
            x = x - (wW - mW)/2
        }
        th.css({'top':y + 'px', 'left': x + 'px'});

        $('.colors').css({'top':clrs + 'px'});

        if(wH < 416){
            $('#theme_holder').css({'opacity':'0', 'pointer-events':'none'});
        }else{
             $('#theme_holder').css({'opacity':'1', 'pointer-events':'auto'});
        }

        sW = Math.min($(window).width(), 1920);
        if(window['player1'] && player1.playlist_do){
            if((sW < 1083 || (player1.sW == sW)) && player1.playlist_do.isShowed_bl && player1.controller_do.isShowed_bl){
                showTheme(true);
            }else{
                if(allowToShowTheme && !(player1.playlist_do.isShowed_bl && player1.controller_do.isShowed_bl) 
                 || (player1.playlist_do.isShowed_bl && player1.controller_do.isShowed_bl && player1.sW <= 900)){
                    showTheme();
                }
            }
        }
    }

    function checkColorsHit(e){
        var wc = FWDMSPUtils.getViewportMouseCoordinates(e);
        var vcX = wc.screenX;
        var vcY = wc.screenY;

        if(!FWDMSPUtils.hitTest($('.colors .dumy')[0], vcX, vcY) && !FWDMSPUtils.hitTest($('.colors')[0], vcX, vcY)){
           clrShowed = false;
           $('.colors').addClass('colors-disabled');
           window.removeEventListener('mousemove', checkColorsHit);
           window.removeEventListener('touchstart', checkColorsHit);
        }
    }

    function addColorsEvents(){
        $('#clr').on('mouseover', function(e){
            setTimeout(function(){
                clrShowed = true;
            },100);
            $('.colors').removeClass('colors-disabled');
            window.addEventListener('mousemove', checkColorsHit);
            window.addEventListener('touchstart', checkColorsHit);
        });

        $('#clr').on('click', function(e){
            if(!clrShowed) return;
            colorId ++;
            if(colorId > darkC.length - 1) colorId = 0;
            updateColors();
            enableDisableColors();
        });

        $('.visualizer').on('mouseover', function(e){
           if(FWDMSP.isMobile) return;
           var el = $(this).find('.tp');
           el.css({'display':'block'});
           FWDAnimation.to(el[0], .8, {css:{opacity:1}, ease: Expo.easeOut});
        });

        $('.visualizer').on('mouseleave', function(e){
            var el = $(this).find('.tp');
            FWDAnimation.killTweensOf(el[0]);
            el.css({'display':'none', 'opacity':0});
        });

        $('.visualizer').on('click', function(e){
            $('.visualizer .circle').removeClass('visualizer-animation')
            setTimeout(function(){
                $('.visualizer .circle').addClass('visualizer-animation');
            }, 50);
            curVisId ++;
            if(curVisId > vis_ar.length -1) curVisId = 0;
            player1.vis.preset = vis_ar[curVisId];
            player1.resizeVisualizer();
        });

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

        $('.dark, .white, .top, .bottom, .responsive, .fluid-width').on('mouseover', function(e){
            var el = $(this).find('.tp');
            el.css({'display':'block'});
            FWDAnimation.to(el[0], .8, {css:{opacity:1}, ease: Expo.easeOut});
        });

        $('.dark, .white, .top, .bottom, .responsive, .fluid-width').on('mouseleave', function(e){
            var el = $(this).find('.tp');
            FWDAnimation.killTweensOf(el[0]);
            el.css({'display':'none', 'opacity':0});
        });

        $('.dark, .white').on('click', function(e){
            if($(this).attr('class').indexOf('dark') != -1){
                isDark = false;
                window['isWhite'] = true;
                setDState();
                updateOpener();
            }else if($(this).attr('class').indexOf('white') != -1){
                isDark = true;
                window['isWhite'] = false;
                setDState();
                updateOpener();
            }
        });

        $('.top, .bottom').on('click', function(e){
            if($(this).attr('class').indexOf('top') != -1){
                isTop = false;
                checkPos();
                updateOpener();
            }else if($(this).attr('class').indexOf('bottom') != -1){
                isTop = true;
                checkPos();
                updateOpener();
            }
        });

        $('.responsive, .fluid-width').on('click', function(e){
            if($(this).attr('class').indexOf('responsive') != -1){
                isFull = true;
                checkSize();
            }else if($(this).attr('class').indexOf('fluid-width') != -1){
                isFull = false;
                checkSize();
            }
        });
    }

    function updateClrButton(){
         var c_n = getColorAr()[colorId];
         $('.ok .path1').css({'fill':c_n});
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
        var n2BC = "#666666";
        if(!isDark){
            c_s = "#000000";
            n2BC = "#888888";
        }
        var c_n = s[colorId];
        updateClrButton();
        updateHEXColors(c_n, n2BC, c_s);
        updateCSSColors(c_n);
    };

    function updateCSSColors(color){
        
        if(!$('#hex_css').length){
            $("head").append('<style id="hex_css" type="text/css"></style>');
        }
       
        color = nBC;
        if(color == '#666666' && isDark){
            color = '#FFFFFF';
        }else if(color == '#888888'){
            color = '#000000';
        }

        var new_stylesheet = $("head #hex_css");
        var css = '';

        css += '.fwdmsp-categories-dark-text.active .fwdmsp-title,';
        css += '.fwdChangeColor{color:' + color + ' !important;}';
       
        if(color == "#FFFFFF" || color == "#000000"){
            color = '#FFFFFF';
        }
        
       // css += '.main-player .main-player-holder h1{'
       // css += 'color:' + color + ' !important;}';
       
        new_stylesheet.html(css);
       
        $('#temp_css').remove();
        $("head").append('<style id="temp_css" type="text/css"></style>');
        var temp_stylesheet = $("head #temp_css");
        temp_stylesheet.html('.fwdmsp-playlist-item-dark-text.active .fwdmsp-artist{transition:none !important;}');

        clearTimeout(style_to);
        style_to = setTimeout(function(){
            $('#temp_css').remove();;
        }, 100);
    }


    function updateHEXColors(nnBC, nn2BC, ssBC){
        if(!window['player1'] || !player1.isAPIReady_bl) return;
        var ctrl = player1.controller_do;
        nBC = nnBC;
        n2BC = nn2BC;
        sBC = ssBC;
        ctrl.nBC = nBC;
        ctrl.sBC = sBC;

        player1._d.nBC = nBC;
        player1._d.sBC = sBC;

        // Visiualizer.
        var clrs = [nBC,nBC,nBC,nBC,nBC];
        if(nBC == '#666666' || nBC == '#888888'){
           clrs =  ["#AAAAAA", "#999999", "#888888", "#777777", "#666666"]
        }
        player1.vis.updateColor(clrs);

        // Categories.
        player1.categories_do.clsBtn.updateHEXColors(nBC, nBC);
        player1.categories_do.nextButton_do.updateHEXColors(nBC, nBC);
        player1.categories_do.prevButton_do.updateHEXColors(nBC, nBC);
        
        // Controler.
        FWDMSPUtils.changeCanvasHEXColor(ctrl.mainScrubberDragLeft_img, ctrl.mainScrubberDragLeft_canvas, nBC);
        try{
            FWDMSPUtils.changeCanvasHEXColor(ctrl.volumeScrubberDragBottom_img, ctrl.volumeScrubberDragBottom_canvas, nBC);
        }catch(e){}

        var newCenterImage = FWDMSPUtils.changeCanvasHEXColor(ctrl.mainScrubberMiddleImage, ctrl.mainSCrubberMiddleCanvas, nBC, true);
        ctrl.mainScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
        try{
            FWDMSPUtils.changeCanvasHEXColor(ctrl.volumeScrubberDragLeft_img, ctrl.volumeScrubberDragLeft_canvas, nBC);
            ctrl.volumeScrubberDragMiddle_do.getStyle().background = "url('" + newCenterImage.src + "') repeat-x";
        }catch(e){}

        ctrl.playPauseButton_do.updateHEXColors(nBC, sBC);
        if(ctrl.volumeButton_do) ctrl.volumeButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.playlistButton_do){
            var clr = nBC;
            if(nBC == '#888888' && !isDark){
                clr = sBC;
            }else if(nBC == '#666666'){
                clr = sBC;
            }
            ctrl.playlistButton_do.updateHEXColors(n2BC, clr);
        } 

        player1.fullScreenButton_do.updateHEXColors(nBC, sBC);
        player1.largePlayButton_do.updateHEXColors(nBC, nBC);

        if(ctrl.downloadButton_do) ctrl.downloadButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.categoriesButton_do) ctrl.categoriesButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.nextButton_do) ctrl.nextButton_do.updateHEXColors(nBC, sBC);
        if(ctrl.shareButton_do) ctrl.shareButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.prevButton_do) ctrl.prevButton_do.updateHEXColors(nBC, sBC);
        if(ctrl.loopButton_do) ctrl.loopButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.shuffleButton_do) ctrl.shuffleButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.buyButton_do) ctrl.buyButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.popupButton_do) ctrl.popupButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.playbackRateButton_do) ctrl.playbackRateButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.atbButton_do) ctrl.atbButton_do.updateHEXColors(n2BC, sBC);
        if(ctrl.currentTime_do) ctrl.currentTime_do.getStyle().color = n2BC;
        if(ctrl.totalTime_do) ctrl.totalTime_do.getStyle().color = n2BC;

      
        // Combobox.
        var cmb = player1.playlist_do.comboBox_do;
        var clr1 = '#000000'
        var clr2 = '#FFFFFF';
        if(!isDark){
            clr1 = '#FFFFFF';
            clr2 = '#000000';
        }
        cmb.selector_do.textNormalColor_str = clr2;
        cmb.selector_do.textSelectedColor_str = clr1;
        cmb.selector_do.setNormalState();

        var clr = '#888888';
        var clr2 = '#000000'
        if(!isDark){
            clr = '#666666';
            clr2 = '#FFFFFF';
        } 

        var arrowImage = FWDMSPUtils.changeCanvasHEXColor(cmb.selector_do.arrowN_img, cmb.selector_do.arrowN_cnv.canvas, clr, true);
        cmb.selector_do.arrowN_sdo.getStyle().background = "url('" + arrowImage.src + "')";

        arrowImage = FWDMSPUtils.changeCanvasHEXColor(cmb.selector_do.arrowS_img, cmb.selector_do.arrowS_cnv.canvas, clr2, true);
        cmb.selector_do.arrowS_sdo.getStyle().background = "url('" + arrowImage.src + "')";

        clr2 = nBC;
       
        if(clr2 == '#888888' && !isDark){
            clr2 = '#000000';
        }else  if(clr2 == '#666666'){
            clr2 = '#FFFFFF';
        }

        var ar =  player1.playlist_do.comboBox_do.buttons_ar;
        var tt = ar.length;
        for(var i=0; i<tt; i++){
            var btn = ar[i];
            btn.nBC = clr;
            btn.sBC = clr2;
            if(btn.isDisabled_bl) btn.setSelectedState();
        }


        // Playlist.
        player1.playlist_do.nBC = nBC;
        player1.playlist_do.sBC = sBC;
       
        if(player1.playlist_do.mainScrubberDragTop_canvas){
            FWDMSPUtils.changeCanvasHEXColor(player1.playlist_do.playlistScrDragTop_img, player1.playlist_do.mainScrubberDragTop_canvas, nBC);
            FWDMSPUtils.changeCanvasHEXColor(player1.playlist_do.comboBox_do.playlistScrDragTop_img, player1.playlist_do.comboBox_do.mainScrubberDragTop_canvas, nBC);

            var middleImage = FWDMSPUtils.changeCanvasHEXColor(player1.playlist_do.middleImage, player1.playlist_do.scrubberDragMiddle_canvas.canvas, nBC, true);
            player1.playlist_do.scrHandlerMiddle_do.getStyle().background = "url('" + middleImage.src + "') repeat-y";
            player1.playlist_do.comboBox_do.scrHandlerMiddle_do.getStyle().background = "url('" + middleImage.src + "') repeat-y";

            var bottomImage_img = FWDMSPUtils.changeCanvasHEXColor(player1.playlist_do.scrHandlerBottom_img, player1.playlist_do.scrubberDragBottom_canvas.canvas, nBC, true);
            player1.playlist_do.scrHandlerBottom_do.getStyle().background = "url('" + bottomImage_img.src + "') repeat-y";
            player1.playlist_do.comboBox_do.scrHandlerBottom_do.getStyle().background = "url('" + bottomImage_img.src + "') repeat-y";
        }

        var ar =  player1.playlist_do.items_ar;
        var tt = ar.length;

        var clr = n2BC;
        if(isDark){
            clr = '#888888';
        }else{
            clr = '#666666';
        }
        var clr2 = nBC;
        player1.playlist_do.sBC = nBC;
       
        if(clr2 == "#888888" && !isDark){
            clr2 = '#000000';
        }else if(clr2 == "#666666"){
            clr2 = '#FFFFFF';
        }

        player1._d.trackTitleNormalColor_str = clr;
        player1._d.trackTitleSelected_str = clr2;
        player1._d.trackDurationColor_str = clr;
       
        for(var i=0; i<tt; i++){
            var itm = ar[i];
            itm.sBC = nBC;
            itm.updateHEXColors(clr, clr2, sBC);
        }
        
        player1.playlist_do.sortNButton_do.updateHEXColors(n2BC, clr2);
        player1.playlist_do.sortAButton_do.updateHEXColors(n2BC, clr2);
        player1.playlist_do.ascDscButton_do.updateHEXColors(n2BC, clr2);

        // Playback rate window.
        var plbWin = player1.playbackRateWindow_do;
        plbWin.clsBtn.updateHEXColors(nBC, nBC);

        FWDMSPUtils.changeCanvasHEXColor(plbWin.mainScrubberDragLeft_img, plbWin.scrubberDragLeft_canvas, nBC);
        var middleImage = FWDMSPUtils.changeCanvasHEXColor(plbWin.mainScrubberMiddleImage, plbWin.mainSCrubberMiddleCanvas, nBC, true);
        plbWin.mainScrubberDragMiddle_do.getStyle().background = "url('" + middleImage.src + "') repeat-x";

        // A to b window.
        var atobWin = player1.atb_do;
        if(atobWin){
            atobWin.clsBtn.updateHEXColors(nBC, nBC);
            var middleImage = FWDMSPUtils.changeCanvasHEXColor(atobWin.parentScrubberMiddleImage, atobWin.middleScrbCanvas, nBC, true);
            atobWin.middleScrb_do.getStyle().background = "url('" + middleImage.src + "') repeat-x";

            var nTxtClr = '#666666';
            var sTxtClr = '#FFFFFF';
            var btnTxtNC = "#666666";
            var btnTxtSC = "#FFFFFF";
            var btnBkNC = "#FFFFFF";
            var btnBkSC = "#000000";

            if(isWhite){
                nTxtClr = '#666666';
                sTxtClr = '#000000';
                btnTxtNC = "#FFFFFF";
                btnTxtSC = "#FFFFFF";
                btnBkNC = "#666666";
                btnBkSC = "#000000";
            }
            atobWin.timeTextColorNormal = nTxtClr;
            atobWin.timeTextColorSelected = sTxtClr;
            atobWin.leftText_do.getStyle().color = nTxtClr;
            atobWin.rightText_do.getStyle().color = nTxtClr;
            atobWin.left_do.colorN_str = atobWin.right_do.colorN_str = btnTxtNC;
            atobWin.left_do.colorS_str = atobWin.right_do.colorS_str = btnTxtSC;
            atobWin.left_do.bkColorN_str = atobWin.right_do.bkColorN_str = btnBkNC;
            atobWin.left_do.bkColorS_str = atobWin.right_do.bkColorS_str = btnBkSC;
            atobWin.left_do.setNormalState();
            atobWin.right_do.setNormalState();
        }

        // Share window.
        var shrWin = player1.shareWindow_do;
        shrWin.clsBtn.updateHEXColors(nBC, nBC);
        shrWin.facebookButton_do.updateHEXColors(nBC, sBC);
        shrWin.twitterButton_do.updateHEXColors(nBC, sBC);
        shrWin.likedinButton_do.updateHEXColors(nBC, sBC);
        shrWin.bufferButton_do.updateHEXColors(nBC, sBC);
        shrWin.diggButton_do.updateHEXColors(nBC, sBC);
        shrWin.redditButton_do.updateHEXColors(nBC, sBC);
        shrWin.thumbrlButton_do.updateHEXColors(nBC, sBC);

        // Login window.
        player1.lgdWindow_do.clsBtn.updateHEXColors(nBC, nBC);

        // Opener.
        player1.opener_do.openButton_do.updateHEXColors(nBC, nBC);
        player1.opener_do.closeButton_do.updateHEXColors(nBC, nBC);
        player1.opener_do.play_do.updateHEXColors(nBC, nBC);
        player1.opener_do.pause_do.updateHEXColors(nBC, nBC);

        // Password window.
        var pssWin = player1.passWindow_do;
        pssWin.passBtn.updateHEXColors(nBC, nBC);
        pssWin.clsBtn.updateHEXColors(nBC, nBC);
    }

    function updateSkin(){
        if(!window['player1'] || !player1.isAPIReady_bl) return;

        // Categories.
        var catsClsBk;
        var catsNextBk;
        var catsPrevBk;
        var srcIcn;

        if(isDark){
            window['catsClsBk'] = catsClsBk = 'content/hex_dark/categories-close-button.png';
            catsNextBk = 'content/hex_dark/categories-next-button.png';
            catsPrevBk = 'content/hex_dark/categories-prev-button.png';
            srcIcn = 'content/hex_dark/input-arrow.png';
        }else{
            window['catsClsBk'] = catsClsBk = 'content/hex_white/categories-close-button.png';
            catsNextBk = 'content/hex_white/categories-next-button.png';
            catsPrevBk = 'content/hex_white/categories-prev-button.png';
            srcIcn = 'content/hex_white/input-arrow.png';
        }
        player1.categories_do.clsBtn.n_do.screen.src = catsClsBk;
        player1.categories_do.nextButton_do.n_do.screen.src = catsNextBk;
        player1.categories_do.prevButton_do.n_do.screen.src = catsPrevBk;
        player1.categories_do.inputArrow_do.screen.src = srcIcn;

        // Controller.
        var contr = player1.controller_do;
        var ctrlScrubLeft;
        var ctrlScrubRight;
        var titleBarBkLeft;
        var titleBarBkRight;
        var gradLeft;
        var gradRight;
        var separator;
        var largePlay;
        var embedCls;
        var passBtn;
        var scrbLine;
      
        if(isDark){
            ctrlScrubLeft = 'content/hex_dark/scrubber-left-background.png';
            ctrlScrubRight = 'content/hex_dark/scrubber-right-background.png';
            titleBarBkLeft = 'content/hex_dark/titlebar-left-pattern.png';
            titleBarBkRight = 'content/hex_dark/titlebar-right-pattern.png';
            gradLeft = 'content/hex_dark/titlebar-grad-left.png';
            gradRight = 'content/hex_dark/titlebar-grad-right.png';
            separator = 'content/hex_dark/separator.png';
            largePlay = 'content/hex_dark/large-play.png';
            embedCls = 'content/hex_dark/embed-close-button.png';
            passBtn = 'content/hex_dark/pass-button.png';
            scrbLine = 'content/hex_dark/scrubber-line.png';
        }else{
            ctrlScrubLeft = 'content/hex_white/scrubber-left-background.png';
            ctrlScrubRight = 'content/hex_white/scrubber-right-background.png';
            titleBarBkLeft = 'content/hex_white/titlebar-left-pattern.png';
            titleBarBkRight = 'content/hex_white/titlebar-right-pattern.png';
            gradLeft = 'content/hex_white/titlebar-grad-left.png';
            gradRight = 'content/hex_white/titlebar-grad-right.png';
            separator = 'content/hex_white/separator.png';
            largePlay = 'content/hex_white/large-play.png';
            embedCls = 'content/hex_white/embed-close-button.png';
            passBtn = 'content/hex_white/pass-button.png';
            scrbLine = 'content/hex_white/scrubber-line.png';
        }

        contr.mainScrubberBkLeft_do.screen.src = ctrlScrubLeft;
        contr.mainScrubberBkRight_do.screen.src = ctrlScrubRight;
        contr.volumeScrubberBkLeft_do.screen.src = ctrlScrubLeft;
        contr.volumeScrubberBkRight_do.screen.src = ctrlScrubRight;
        contr.titleBarLeft_do.screen.src = titleBarBkLeft;  
        contr.titleBarRight_do.screen.src = titleBarBkRight; 
        contr.titleBarGradLeft_do.screen.src = gradLeft;
        contr.titlebarGradRight_do.screen.src = gradRight;
        contr.firstSeparator_do.screen.src = separator;
        contr.secondSeparator_do.screen.src = separator;
        player1.largePlayButton_do.n_do.screen.src = largePlay;
        contr.mainScrubberBarLine_do.screen.src = scrbLine;
        contr.volumeScrubberBarLine_do.screen.src = scrbLine;


        // Playback rate / share window.
        player1.playbackRateWindow_do.scrubberBkLeft_do.screen.src = ctrlScrubLeft;
        player1.playbackRateWindow_do.scrubberBkRight_do.screen.src = ctrlScrubRight;
        player1.playbackRateWindow_do.clsBtn.n_do.screen.src = embedCls;
        player1.shareWindow_do.clsBtn.n_do.screen.src = embedCls;
        if(player1.atb_do){
            player1.atb_do.clsBtn.n_do.screen.src = embedCls;
            player1.atb_do.scrubberBkLeft_do.screen.src = ctrlScrubLeft;
            player1.atb_do.scrubberBkRight_do.screen.src = ctrlScrubRight;
        }
    
        player1.lgdWindow_do.clsBtn.n_do.screen.src = embedCls;


        // Password window.
        player1.passWindow_do.clsBtn.n_do.screen.src = catsClsBk;
        player1.passWindow_do.passBtn.n_do.screen.src = passBtn;

        
        // Playlist
        var playLst = player1.playlist_do;
        var scrTrackTopBk;
        var scrTrackBtmBk;
        var scrbLines1;
        var scrbLines2;

        if(isDark){
            scrTrackTopBk = 'content/hex_dark/playlist-scrollbar-background-top.png';
            scrTrackBtmBk = 'content/hex_dark/playlist-scrollbar-background-bottom.png';
            scrbLines1 = 'content/hex_dark/playlist-scrollbar-lines.png';
            scrbLines2 = 'content/hex_dark/playlist-scrollbar-lines-over.png';
        }else{
            scrTrackTopBk = 'content/hex_white/playlist-scrollbar-background-top.png';
            scrTrackBtmBk = 'content/hex_white/playlist-scrollbar-background-bottom.png';
            scrbLines1 = 'content/hex_white/playlist-scrollbar-lines2.png';
            scrbLines2 = 'content/hex_white/playlist-scrollbar-lines-over2.png';
        }

        if(playLst.comboBox_do.scrTrackTop_do){
            playLst.comboBox_do.scrTrackTop_do.screen.src = scrTrackTopBk;
            playLst.comboBox_do.scrTrackBottom_do.screen.src = scrTrackBtmBk;
            playLst.comboBox_do.scrHandlerLinesN_do.screen.src = scrbLines1;
            playLst.comboBox_do.scrHandlerLinesS_do.screen.src = scrbLines2;
        }

        playLst.inputArrow_do.screen.src = srcIcn;

        if(playLst.scrTrackTop_do){
            playLst.scrTrackTop_do.screen.src = scrTrackTopBk;
            playLst.scrTrackBottom_do.screen.src = scrTrackBtmBk;
            playLst.scrHandlerLinesN_do.screen.src = scrbLines1;
            playLst.scrHandlerLinesS_do.screen.src = scrbLines2;
        }


        playLst.titleBarLeft_do.screen.src = titleBarBkLeft;
        playLst.titleBarRight_do.screen.src = titleBarBkRight;

    }

    function updateOpener(){
        var opnBtn
        var clsBtn;
        var play;
        var pause;
        var rt = 0

        if(isDark){
            if(isTop){
                opnBtn = 'content/hex_dark/open-button-normal-top.png';
                rt = 180;
            }else{
                opnBtn = 'content/hex_dark/open-button-normal-bottom.png';
            }
            clsBtn = 'content/hex_dark/close-button-normal.png';
            play = 'content/hex_dark/open-play-button-normal.png';
            pause = 'content/hex_dark/open-pause-button-normal.png';
        }else{
            if(isTop){
                opnBtn = 'content/hex_white/open-button-normal-top.png';
                 rt = 180;
            }else{
                opnBtn = 'content/hex_white/open-button-normal-bottom.png';
               
            }
            clsBtn = 'content/hex_white/close-button-normal.png';
            play = 'content/hex_white/open-play-button-normal.png';
            pause = 'content/hex_white/open-pause-button-normal.png';
        }
        player1.opener_do.openButton_do.s_sdo.getStyle().transform = 'rotate(' + rt + 'deg)';
        player1.opener_do.openButton_do.n_do.screen.src = opnBtn;
        player1.opener_do.closeButton_do.n_do.screen.src = clsBtn;
        player1.opener_do.play_do.n_do.screen.src = play;
        player1.opener_do.pause_do.n_do.screen.src = pause;
    }

    // Circles.
    var circInit;
    function initCirles(){
        if(!$('.lines-holder').length || circInit) return;
        if(!playerReady) return;
        circInit = true;
        $('.circle').removeClass('hide-circle');
        $('.circle').addClass('fake-reveal');
        $('.lines-holder').removeClass('hide-circle-lines');


        setTimeout(function(){
             new FWDSI({ 
                //main settings
                instanceName:"c-1-1",
                displayType:"afterparent",
                parentId:"c-1",
                imageSource:"assets/c-1.png",
                initializeOnlyWhenVisible:"no",
                maskType:"circle",
                showPreloader:'no',
                maxWidth:367,
                maxHeight:367
            });

         
            setTimeout(function(){
                new FWDSI({ 
                    //main settings
                    instanceName:"c-2-2",
                    displayType:"afterparent",
                    parentId:"c-2",
                    imageSource:"assets/c-2.png",
                    initializeOnlyWhenVisible:"no",
                    maskType:"circle",
                    showPreloader:'no',
                    maxWidth:367,
                    maxHeight:367
                });
            }, 300);
           
            setTimeout(function(){
                new FWDSI({ 
                    //main settings
                    instanceName:"c-3-3",
                    displayType:"afterparent",
                    parentId:"c-3",
                    imageSource:"assets/c-3.png",
                    initializeOnlyWhenVisible:"no",
                    maskType:"circle",
                    showPreloader:'no',
                    maxWidth:367,
                    maxHeight:367
                });
            }, 600);

            setTimeout(function(){
                 new FWDSI({ 
                    //main settings
                    instanceName:"c-4-4",
                    displayType:"afterparent",
                    parentId:"c-4",
                    imageSource:"assets/c-4.png",
                    initializeOnlyWhenVisible:"no",
                    maskType:"circle",
                    showPreloader:'no',
                    maxWidth:367,
                    maxHeight:367
                });
            }, 900);

            setTimeout(function(){
                 new FWDSI({ 
                    //main settings
                    instanceName:"c-5-5",
                    displayType:"afterparent",
                    parentId:"c-5",
                    imageSource:"assets/c-5.png",
                    initializeOnlyWhenVisible:"no",
                    maskType:"circle",
                    showPreloader:'no',
                    maxWidth:367,
                    maxHeight:367
                });
            }, 1200);
        }, 200);
       
    }


    // Main features.
    var mainCnt = $('.main-features');
    var cntHolder = $('.main-features .holder');
    var cntEl = $('.item');
    var cntH;
    var ctnTT = cntEl.length;
    var prevCntId = -1;
    
 
    function checkMainFeatures(anim){
        if(!cntHolder.length) return;
        var scrTop = $(window).scrollTop();
        var mainCntH = mainCnt.height();
        cntH = cntHolder.height();
        var mainCntTop = mainCnt.offset().top;
        var prc = 0;

        if(scrTop >= (mainCntTop + mainCntH - cntH)){
            cntHolder.css({'position':'absolute', 'top':'auto', 'bottom': '0'});
            prc = 1;
        }else if(scrTop >= mainCntTop ){
            cntHolder.css({'position':'fixed'});
            prc = (scrTop - mainCntTop) / ((mainCntH - cntH));
        }else if(scrTop < mainCntTop){
            cntHolder.css({'position':'absolute', 'top':'0', 'bottom': 'auto'});
           
        }
        posMainFeatureText(prc, anim);
    }

    function posMainFeatureText(prc, anim){
     
        var cntId = Math.floor(prc * ctnTT);
        if(cntId >= ctnTT - 1) cntId = ctnTT - 1;
        if(cntId == prevCntId) return;
        var cntW = cntHolder.width();
        var op = .3;
        var offset = 200;
        if(wW < 1300){
            offset = 0;
        }else if(wW < 1650){
            offset = 100;
        }
    
        for(var i=0; i<ctnTT; i++){
            var item = $(cntEl[i])[0];
            var x;
            if(i === undefined) break;
            item.style.top = Math.round((cntH - item.offsetHeight)/2) + 'px';
            if(i == cntId){
                op = 1;
                x = Math.round((cntW - item.offsetWidth)/2);
            }else if(i > cntId){
                op = .3;
                x = cntW - offset;
            }else if(i <= cntId - 1){
                op = .3;
                x = -item.offsetWidth + offset;
            }

            if(i > cntId + 1){
                op = .3;
                x = cntW + cntW/2;
            }

            if(i <= cntId - 2){
                op = .3;
                x = -item.offsetWidth - cntW/2;
            }

           
            if(anim){
                FWDAnimation.to(item, 1, {transform:'translate3d(' + x + 'px,0,0)', opacity:op, ease:Quart.easeOut});
            }else{
                FWDAnimation.killTweensOf(item);
                item.style.transform = 'translate3d(' + x + 'px,0,0)';
                item.style.opacity = op;
            }
        }

        prevCntId = cntId;
    }

    // Features icons.
    var isFiSowed = false;
    $('.more').on('click', function(){
        if(isFiSowed){
            isFiSowed = false;
            $('.more p').html('Expand more features<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="14.5" y1="2.26093e-08" x2="14.5" y2="29" stroke="#F70C3E"/><line x1="29" y1="14.5" x2="-4.37114e-08" y2="14.5" stroke="#F70C3E"/></svg></span>');
            $('.more .svg1').css({'display':'inline'});
            $('.more .svg2').css({'display':'none'});
        }else{
            isFiSowed = true;
            $('.more p').html('Shorten more features<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="14.5" y1="2.26093e-08" x2="14.5" y2="29" stroke="#111112"/><line x1="29" y1="14.5" x2="-4.37114e-08" y2="14.5" stroke="#F70C3E"/></svg></span>');
            $('.more .svg1').css({'display':'none'});
            $('.more .svg2').css({'display':'inline'});
            $('.expand-more').css({'margin-left':'-28px'});
            
        }

        resizeFi(true);
    })

    function resizeFi(anim){
        var h;
        var gradOp;
        if(isFiSowed){
            h = $('.ft2 .flex').height() + $('.more').height() - 70;
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

    // Quality.
    function showQuality(id){
         if($('.quality').length){

            if(id == 0){
                setTimeout(function(){
                     new FWDSI({ 
                        //main settings
                        instanceName:"q-1",
                        displayType:"afterparent",
                        parentId:"quality_col_1",
                        imageSource:"assets/q-1.jpg",
                        initializeOnlyWhenVisible:"no",
                        maskType:"square",
                        showPreloader:'no',
                        maxWidth:1650,
                        maxHeight:506
                    });
                }, 100);
            }else if(id == 1){
                setTimeout(function(){
                    new FWDSI({ 
                        //main settings
                        instanceName:"q-2",
                        displayType:"afterparent",
                        parentId:"quality_col_2",
                        imageSource:"assets/q-2.jpg",
                        initializeOnlyWhenVisible:"no",
                        maskType:"square",
                        showPreloader:'no',
                        maxWidth:1650,
                        maxHeight:506
                    });
                }, 50);
            }
        }
    }

    // Ready.
    if($('#ready_img').length){
         new FWDSI({ 
            //main settings
            instanceName:"ready_img_",
            displayType:"afterparent",
            parentId:"ready_img",
            imageSource:"assets/ready.jpg",
            initializeOnlyWhenVisible:"yes",
            maskType:"square",
            showPreloader:'no',
            maxWidth:1920,
            maxHeight:541
        });
    }
    

    // Demo grid.
    function setupDemoGrid(){
        if(!$('#myGDiv').length || window['grid']) return;

        window['grid'] = new FWDVS({
            //main settings 
            gridType:"classic",
            rightClickContextMenu:"default",
            instanceName:"myUGP",
            parentId:"myGDiv",
            mainFolderPath:"content",
            gridSkinPath:"grid_skin_classic",
            playlistId:"gridPlaylist",
            allCategoriesLabel:"ALL GALLERIES",
            notFoundLabel:"Nothing found",
            showAllCategories:"yes",
            randomizeCategories:"no",
            animateParent:"no",
            initializeOnlyWhenVisible:"yes",
            prelaoderAllScreen:"no",
            searchLabel:"Search",
            startAtCategory:0,
            slideshowRadius:10,
            slideshowBackgroundColor:"#FFFFFF",
            slideshowFillColor:"#000000",
            slideshowStrokeSize:2,
            disabledId: gridId,
            // menu settings
            showMenu:"yes",
            showMenuButtonsSpacers:"no",
            comboboxSelectorLabel:"Categories",
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
            thumbnailMaxWidth:520,
            thumbnailMaxHeight:256,
            horizontalSpaceBetweenThumbnails:20,
            verticalSpaceBetweenThumbnails:30,
            thumbnailBorderSize:0,
            thumbnailBorderRadius:0,
            //preset settings
            preset:"team",
            previewText:"Read more",
            thumbnailOverlayOpacity:.5
        });
    }

    // API.
  
    if($('.api').length){
        regesterApi()
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
            player1.addListener(FWDMSP.START, playerStartHandler);
            player1.addListener(FWDMSP.PLAY, playerPlayHandler);
            player1.addListener(FWDMSP.PAUSE, playerPauseHandler);
            player1.addListener(FWDMSP.UPDATE, playerUpdateHandler);
            player1.addListener(FWDMSP.UPDATE_TIME, playerUpdateTimeHandler);
            player1.addListener(FWDMSP.POPUP, playerPopupHandler);
            player1.addListener(FWDMSP.STOP, playerStopHandler);

            window.player1.addListener(FWDMSP.READY, apiReadyHandler);
            window.player1.addListener(FWDMSP.PLAY, apiPlayHandler);
            window.player1.addListener(FWDMSP.PAUSE, apiPauseHandler);
            window.player1.addListener(FWDMSP.STOP, apiStopHandler);
            window.player1.addListener(FWDMSP.ERROR, apiErrorHandler);
            window.player1.addListener(FWDMSP.PLAY_COMPLETE, apiPlayCompleteHandler);
            window.player1.addListener(FWDMSP.START_TO_LOAD_PLAYLIST, apiStartToLoadPlaylistHandler);
            window.player1.addListener(FWDMSP.LOAD_PLAYLIST_COMPLETE, apiLoadPlaylistCompleteHandler);
            setTimeout(setupAPIGrid, 2000);
            setTimeout(function(){
                $('.api').addClass('reveal');
            }, 2500);
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
        prevCatId = player1.getCatId();
        addMessage("start to load playlist - id: " + "<font color='#F70C3E'>" + player1.getCatId() + "</font>");
    };

    function apiLoadPlaylistCompleteHandler(e){
        addMessage("playlist load complete - id: " + "<font color='#F70C3E'>" + player1.getCatId() + "</font>");
      
        if(playWithDL){
            player1.play();
            playWithDL = false;
        }
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
        addMessage("video source updated to " + "<font color='#F70C3E'>" + player1.getVideoSource() + "</font>");
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
        }else if($(e.target).attr('id') == 'add_new_track'){
            player1.addTrack("content/mp3/01.mp3", "<span style='font-weight:bold'>New added track</span> - new added artist", "content/thumbnails/brian.jpg", "06:16", true);
        }else if($(e.target).attr('id') == 'stop'){
            player1.stop();
        }else if($(e.target).attr('id') == 'play_vid'){
            player1.playSpecificTrack(0,1);
        }else if($(e.target).attr('id') == 'scrub'){
            player1.scrub(.5);
        }else if($(e.target).attr('id') == 'show_playlist'){
            player1.showCategories();
        }else if($(e.target).attr('id') == 'show_share'){
            player1.share();
        }else if($(e.target).attr('id') == 'download'){
            player1.downloadMP3();
        }else if($(e.target).attr('id') == 'get_playlist_id'){
            addMessage("playlist id: <font color='#F70C3E'>" + player1.getCatId() + "</font>");
        }else if($(e.target).attr('id') == 'get_video_id'){
            addMessage("track id: <font color='#F70C3E'>" + player1.getTrackId() + "</font>");
        }else if($(e.target).attr('id') == 'get_time'){
            addMessage("total time: <font color='#F70C3E'>" + player1.getCurrentTime() + "</font>");
        }else if($(e.target).attr('id') == 'get_duration'){
            addMessage("total time: <font color='#F70C3E'>" + player1.getDuration() + "</font>");
        }else if($(e.target).attr('id') == 'load_html'){
            player1.loadPlaylist(0);
        }else if($(e.target).attr('id') == 'load_youtube'){
            player1.loadPlaylist(4);
        }else if($(e.target).attr('id') == 'load_soundcloud'){
            player1.loadPlaylist(2);
        }else if($(e.target).attr('id') == 'load_mixed'){
            player1.loadPlaylist(2);
        }

    });

    var catId;
    var prevCatId;
    var trackId;
    var grid_do;
    var thumb;
    var playWithDL;
    var playWithDL_to;

    function playerStartHandler(){
        //if(FWDMSPUtils.isMobile) return;
        if(thumb){
            thumb.setButtonState(1);
            thumb.updateProgress(0);
            thumb.updateTime("00:00/00:00");
        }
        
        catId = player1.getCatId();
        trackId = player1.getTrackId();
        
        if(catId == 0 && trackId == 0){
            thumb = grid_do.thumbs_ar[0];
        }else if(catId == 0 && trackId == 1){
            thumb = grid_do.thumbs_ar[1];
        }else if(catId == 0 && trackId == 2){
            thumb = grid_do.thumbs_ar[2];
        }else if(catId == 0 && trackId == 3){
            thumb = grid_do.thumbs_ar[3];
        }else{
            thumb = null;
        }

        grid_do.removeHands();
        
        if(thumb){
            grid_do.addVis(thumb.id, false);
            thumb.setMoveHand();
        }else{
            grid_do.addVis(0, true);

            if(catId != 0) playWithDL = true;
        }
    };

    function playerPlayHandler(){
        if(thumb) thumb.setButtonState(0);

    };

    function playerPauseHandler(){
        if(thumb) thumb.setButtonState(1);
    };

    function playerUpdateHandler(e){
        if(thumb){
            thumb.updateProgress(e.percent);
        }
    };

    function playerUpdateTimeHandler(e){
        if(thumb){
            thumb.updateTime(e.curTime + "/" + e.totalTime);
        }
    };

    function playerStopHandler(){
        if(thumb){
            thumb.setButtonState(1);
            if(!FWDMSPUtils.isMobile) thumb.updateProgress(0);
            thumb.updateTime("00:00/00:00");
            grid_do.removeActiveEvents();
        }
    }

    function playerPopupHandler(){
        if(thumb){
            thumb.setButtonState(1);
            if(!FWDMSPUtils.isMobile) thumb.updateProgress(0);
            thumb.updateTime("00:00/00:00");
        }
        disableAPIButtons();
        grid_do.disableAllPlayPauseButton();
    };

 
    function setupAPIGrid(){
        var gridHolder_el = $('#api_grid')[0];
        if(!gridHolder_el) return;
        gridHolder_el.className ='fwd-hide reveal';
        FWDMSPPageGrid.setPrototype();
        grid_do = new FWDMSPPageGrid({
            mainContainer:gridHolder_el,
            bkColor:'#191919'
        });
       
        gridHolder_el.appendChild(grid_do.screen);
        grid_do.addListener(FWDMSPPageGrid.SCRUB, gridScrubHandler);
        grid_do.addListener(FWDMSPPageGrid.PLAY, gridPlayHandler);
        grid_do.addListener(FWDMSPPageGrid.PAUSE, gridPuseHandler);
    }

    function gridPlayHandler(e){

        catId = player1.getCatId();
        trackId = player1.getTrackId();
        
        if(thumb && e.thumbId == trackId && catId == 0){
            clearTimeout(playWithDL_to);
            player1.play();
        }else{
            if(e.thumbId == 0){
                player1.playSpecificTrack(0,0);
            }else if(e.thumbId == 1){
                player1.playSpecificTrack(0,1);
            }else if(e.thumbId == 2){
                player1.playSpecificTrack(0,2);
            }else if(e.thumbId == 3){
                player1.playSpecificTrack(0,3);
            }
            player1.play();
            if(catId != 0) playWithDL = true;
        }
    };

    function gridPuseHandler(e){
        if(thumb){
            player1.pause();
        }
    };

    function gridScrubHandler(e){
        player1.scrub(e.percent);
    };


    window['buyCustomFunction'] = function(){
        alert("The buy button can open a custom link or a custom javascript function.");
    }

    window['ld_id'];
    window['pl_id'];
    window['loadPlaylist'] = function(e, id){
         e.preventDefault();
         player1.loadPlaylist(id); 
         return false;
    }

    window['playTrack'] = function(e, plId, trkId){
        e.preventDefault();
        window['plId'] = plId;
        window['trkId'] = trkId;

        player1.playSpecificTrack(window['plId'], window['trkId']);
        setTimeout(function(){    
            player1.play();
        }, 800);
       
        return false;
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


    init();

});
