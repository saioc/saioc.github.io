/**
 * Front js file, handles most of the js functionality.
 *
 * @package acora
 * @since acora 1.0
 */
 
jQuery(document).ready(function($){
    
    'use strict';
    
    var last_scroll = 0;
    var mainW = 1340;
    var limitW = 1015;
    var wInnerW;
   
    function init(){
        FWDUtils.checkIfHas3D();
        initHome();
        initSliderHeader();
        setTimeout(initBlogPosts, 300);
        initSideBar();
        initPageTemplates(); 
        initPortfolioSingle();
        initFooter();
        initContactParalax();
        initContactSimple();
        initStartCountNumber();
        initAboutMe();
        initAboutUs();
        resizeStuff();
        setTimeout(function(){ 
            resizeStuff();
            fixCSS();
        }, 100);

        // Make sure sidebar height is correct.
        setTimeout(function(){
             sidebarH = $('.sidebar .inner').outerHeight();
             positionSidebar();
        }, 500);

        
        $(window).resize(function() {
            resizeStuff();
            setTimeout(resizeStuff, 50);
            setTimeout(resizeStuff, 101);
            fixCSS();
        }); 
    }

    function resizeStuff(){
        var vs =  FWDUtils.getViewportSize();
        var wInnerW = $(window).width();
        sidebarH = $('.sidebar .inner').outerHeight();

        $('.acora-16-9').each(function(index, element){
            $(element).height(Math.round(element.offsetWidth*9/16));
        });

        $('.acora-16-8').each(function(index, element){
            $(element).height(Math.round(element.offsetWidth*10/16));
        });

        $('.acora-16-8-no-height').each(function(index, element){
            if(vs.w > 1015){
                $(element).height(Math.round(element.offsetWidth*10/16));
            }
        });

        $('.acora-16-4').each(function(index, element){
            var h = Math.max(Math.round(element.offsetWidth*4/16), 160);
            $(element).height(h);
        });

        $('.acora-16-6').each(function(index, element){
            var h = Math.max(Math.round(element.offsetWidth*6/16), 160);
             if(h < 350){
                h = 350;  
            }else if(h > vs.h){
                h= vs.h;
            }
            $(element).height(h);
        });

        $('.acora-16-4-link').each(function(index, element){
            var h = Math.min(Math.round(element.offsetWidth*4/16), 260);
            if(h < 200) h = 200;
            $(element).height(h);
        });

        $('.acora-16-3').each(function(index, element){
            var h = Math.max(Math.round(element.offsetWidth*3/16), 160);
            $(element).height(h);
        });

        $('.portfolio-16-8').each(function(index, element){
            var h = Math.round(element.offsetWidth*7/16);
    
            if(h > vs.h){
                h = vs.h;
            }
           
            if($('.site-navigation').length){
                if(h > vs.h - $('.site-navigation').height()){
                    h = vs.h - $('.site-navigation').height();
                }
            }
            if(h < 350){
                h = 350;  
            }
            $(element).height(h);
        });

        $('.portfolio-16-7').each(function(index, element){
            var h = Math.round(element.offsetWidth*7/16);
            if(h < 350) h = 350;
            $(element).width(vs.w);
            $(element).height(h);
        });

        $('.portfolio-16-7.fluidwidth').each(function(index, element){
            var h = Math.round(element.offsetWidth*7/16);
            if(h < 350) h = 350;
            $(element).width(vs.w);
            $(element).height(h);
            var pos = Math.round($('.entry-content').offset().left);
            if(pos){
                $(element).css({'left':'-' + pos + 'px'});
            }
        });

        $('.about-us-gallery-fluidwidth').each(function(index, element){
            var h = Math.round(element.offsetWidth*5/16);
            if(h < 350) h = 350;
            $(element).width(vs.w + 2);
            $(element).height(h);
            $(element).css({'margin-left':(Math.round(-wInnerW/2) - 1)+ 'px'})
            $('.main-map-holder').height(h);  
        });

        $('.page-template-contact .maps').each(function(index, element){
            var h = Math.round(element.offsetWidth*5/16);
            if(h < 350){
                h = 350;  
            } 
            $(element).width(vs.w + 2);
            $(element).height(h);
            $(element).css({'margin-left':Math.round((-wInnerW/2) -1) + 'px'})
        });

        $('.about-us-gallery-responsive, .acora-main-header').each(function(index, element){
            $(element).height(Math.max(300, Math.round(element.offsetWidth*5/16)));
        });

        $('.portfolio-vertical').each(function(index, element){
            $(element).width(vs.w);
        });

        $('.portfolio-fullscreen').each(function(index, element){
            var h = vs.h;
            if(h < 350){
                h = 350;  
            } 
            $(element).height(h);
        });

        $('#acora_portfolio_igp_archive').each(function(index, element){
            $(element).width(vs.w);
            $(element).height(vs.h);
            if($('#wpadminbar').length){
                var barH = $('#wpadminbar').height();
                $(element).height(vs.h - barH);
                $(element).css({'top':barH + 'px'});
            }
        });

        $('#uvp_home').each(function(index, element){
            $(element).width(vs.w);
            $(element).height(vs.h);
            if($('#wpadminbar').length){
                var barH = $('#wpadminbar').height();
                $(element).height(vs.h - barH);
                $(element).css({'top':barH + 'px'});
            }
        });

        $('.home-simple .single').height(vs.h);
        $('.contact-simple .single').height(vs.h);
        $('.alignwide, .alignfull').width((wInnerW + 2)  + 'px');
        $('.wp-block-columns.alignwide, .wp-block-columns.alignfull').width((wInnerW - 40) + 'px');

        $('.alignfull').each(function(index, element){
            var left = Math.min(Math.round(-(wInnerW - mainW)/2), -20);
            $(element).css({'margin-left': (left - 1) + 'px'});
        });

         $('.alignwide').each(function(index, element){
            var left = Math.round(-(wInnerW - $('.alignwide').width())/2);

            //$(element).css({'margin-left': (left - 1) + 'px'});
        });
        
        $('.blocks-gallery-item, .wp-block-image figure').each(function(index, element){
            var elCaption = $(element).find('figcaption');
            if($(element).width() <= 250){
                elCaption.css({'font-size': '16px',
                                'line-height':1.4});
            }else{
               elCaption.css({'font-size': '24px', 'line-height':1.2});
            }
        });
        positionSidebar();
        positionPSidebar();
        resizeAboutUs();
        resizeContactSimple(vs);
        resizeAboutUsWeAreGridImages();
        resizeAboutMeProfile();
    }

    /**
     * Tweek some CSS rules that are not possible to do with plain CSS.
     * --------------------------------------------------------
     */
    function fixCSS(){
       
        // Fix first p tag if added directly after the title.
        if($('.page-main').length){
            var $firstChild = $('.entry-content').children();
            if($firstChild.tagName){
                if($firstChild.get(0).tagName.toLowerCase() == 'p'){
                    $firstChild.get(0).style.marginTop = '-11px';
                }
            }
        }

        if($('.blog-main').length){
            var $firstChild = $('.entry-content').children();
            if($firstChild.length && ($firstChild.get(0).tagName.toLowerCase() == 'p')){
               $firstChild.get(0).style.marginTop = '-4px';
            }
        }

        // Fix first featured image if added directly after the title.
        if($('.featured-image').length){
            var $firstChild = $('.entry-content').children();
            if($firstChild.get(1).className == 'featured-image'){
               $firstChild.get(1).style.marginTop = '52px';
            }
        }
        
        // Fix comments form if only the form is present without children.
        if($('.comments-area').length){
            var $firstChild = $('.comments-area').children();
            if($firstChild.get(0).className == 'comment-respond'){
               $firstChild.get(0).style.marginTop = '2px';
            }
        }

        // Fix alignleft and alignright image followed by p tag.
        $('.wp-block-image .alignleft, .wp-block-image .alignright').each(function() {
            var $this = $(this);
            var next = $(this).parent().next();
            if(next.is('p')){
                next.addClass('p-fix');
            }
        });

        // Remove all empty p tags.
        $('p').each(function() {
            var $this = $(this);
            if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.remove();
        });

        // Fix old editor p tags with images in them.
        $('p').each(function(){
            if($(this).find('img')[0]){
                $(this).css({'padding-top':'10px'});
                if(!$(this).text().trim().length) {
                     $(this).css({'padding-top':'0'});
                }
            }
        });

        // Set overflow visible to the audio post format.
        setTimeout(function(){
             $('.single .audio .audio').addClass('overflow-visible');
        }, 2000);
    }

    /*
     *  Slider all home pages.
     *  -----------------------------------------------------
    */
    function initHome(){
       
    }
    
    /*
     *  Slider header.
     *  -----------------------------------------------------
    */
    var hasComments = window.location.href.indexOf("#comment") != -1 ? true : false;
    function initSliderHeader(){
        if($('.acora-main-header').length){
            $('.acora-main-header').addClass('reveal');
            setTimeout(function(){
                if(($(window).scrollTop() == 0)){
                    scrollHeader(false);
                }
            },800);
            $(window).on('mousewheel touchstart', hdWheel);
        }
    }

    function hdWheel(){
        $(scrollObj).stop();
        $(window).off('mousewheel touchstart', hdWheel);
    }

    var scrollObj;
    function scrollHeader(anim){
        return;
        if(hasComments) return;
        scrollObj = {scrollPos:$(window).scrollTop()}
        
        $(scrollObj).animate({ // call animate on the object
            scrollPos: $('.acora-main-header').height() // specify the t property of the object to be animated
        }, {
            duration: 800,
            easing: 'easeInOutExpo',
            step: function(now) { // called for each animation step (now refers to the value changed)
                window.scrollTo(0,now);
            }
        });
    }

    /*
     *  Blog posts.
     *  -----------------------------------------------------
    */
    function initBlogPosts(){
        if(!$('#blog_main').length
            && !$('#page_main').length
            && !$('#page_only_shortcode_full_width').length
            && !$('#page_only_shortcode_fullscreen').length
            && !$('#about_us').length
            && !$('#contact').length
            && !$('#portfolio').length
            && !$('#portfolio_main')) return;
        
        revealPosts();
        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
            if(Math.abs(scroll - last_scroll) > $(window).height() * 0.1){
                last_scroll = scroll;
                revealPosts();
                stopAboutUsOneVideoOnScroll();
            }
        });
    }

    function isVisible(element, offset){
       
        if(element.hasClass('reveal')
        || element.hasClass('fwd-reveal-opacity')
        || element.hasClass('reveal-top')
        ){
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

        if(result){
            if(element.hasClass('acora-format-audio')){
                setTimeout(function(){
                    $(element).find('.audio').css({'overflow': 'visible'});
                }, 800)
            }
        }
        return result;
    }
    
    function revealPosts(){
        var dl = 0;
        var s_to;
        if($('.portfolio-main').length == 0){
            $('.entry:not(.reveal)').each(function(index, element){
                if(isVisible($(element))){
                    setTimeout(function(){
                        $(element).addClass('reveal');
                    }, dl);
                    dl += 200;
                    if(($(element).parents().is('.single'))){
                        setTimeout(function(){
                            $(element).addClass('reveal');
                        }, 50);
                    }
                }
            });
        }

        if($('.team-members').length){
            $('.team-member:not(.reveal)').each(function(index, element){
                if(isVisible($(element))){
                    setTimeout(function(){
                        $(element).addClass('reveal');
                    }, dl);
                    dl += 200;
                }
            });
        }

        if($('.blog-content').length){
            if(isVisible($('.blog-content'))){
                $('.posts.yes-sidebar').addClass('reveal-border');
            }
        }

        if($('.blog-main .single').length){
            if(isVisible($('.blog-main .single'))){
                $('.blog-main .single').addClass('reveal');
            }
        }

        
        if($('.sidebar').length){
            if(isVisible($('.sidebar'))){
                $('.sidebar .scrollbar-macosx').addClass('reveal');
            }
        }

        if($('.paging').length){
            if(isVisible($('.posts .entry').last())){
                 setTimeout(function(){
                    $('.paging').addClass('reveal');
                }, 100)
            }
        }

        if($('.entry-navigation').length){
            if(isVisible($('.entry-navigation'), 200)){
                $('.entry-navigation').addClass('reveal');
            }
        }
 
        if($('.related-projects').length){
            if(isVisible($('.related-projects'))){
                $('.related-projects').addClass('reveal');
            }
        }
        
        if($('#comments').length){
            if(isVisible($('#comments'), -100)){
                $('#comments').addClass('reveal');
            }
        }

        if($('.related-posts').length){
            if(isVisible($('.related-posts'))){
                $('.related-posts').addClass('reveal');
            }
        }

        if($('.about-us-gallery').length){
            if(isVisible($('.about-us-gallery'))){
                $('.about-us-gallery').addClass('reveal');
            }
        }

        if($('.we-are-grid').length){
            if(isVisible($('.we-are-grid'))){
                $('.we-are-grid').addClass('reveal');
                startCountNumber();
            }
        }

        if($('.video-holder').length){
            if(isVisible($('.video-holder'))){
                $('.video-holder').addClass('reveal');
                startCountNumber();
            }
        }

        if($('.about-us-info').length){
            if(isVisible($('.about-us-info'))){
                $('.about-us-info').addClass('reveal');
                startCountNumber();
            }
        }

        if($('.contact').length){
            if(isVisible($('.contact'))){
                $('.contact').addClass('reveal');
                startCountNumber();
            }
        }
        
        if($('.title-holder').length){
            if(isVisible($('.title-holder'))){
                $('.title-holder').addClass('reveal');
            }
        }

        if($('.clients').length){
            if(isVisible($('.clients'))){
                $('.clients').addClass('reveal');
            }
        }

        if($('.discover-us').length){
            if(isVisible($('.discover-us'))){
                $('.discover-us').addClass('reveal');
            }
        }

        if($('.write-us').length){
            if(isVisible($('.write-us'))){
                $('.write-us').addClass('reveal');
            }
        } 

        if($('.detailed-grid').length){
            if(isVisible($('.detailed-grid'))){
                $('.detailed-grid').addClass('reveal');
            }
        } 

        if($('.portfolio').length){
            if(isVisible($('.portfolio'))){
                $('.portfolio').addClass('reveal');
            }
        } 

        if($('.what-i-do').length){
            if(isVisible($('.what-i-do'))){
                $('.what-i-do').addClass('reveal');
            }
        } 
        
        if($('.main-info').length){
            if(isVisible($('.main-info'))){
                $('.main-info').addClass('reveal');
            }
        }

        if($('.no-results').length){
            if(isVisible($('.no-results'))){
                $('.no-results').addClass('reveal');
            }
        }

        if($('.fwd-hide').length){
            if(isVisible($('.fwd-hide'), 100)){
                $('.fwd-hide').addClass('reveal');
            }
        }

        if($('.acora-hide').length){
            if(isVisible($('.acora-hide'), 100)){
                $('.acora-hide').addClass('reveal');
            }
        }

        if($('.acora-hide-top').length){
            if(isVisible($('.acora-hide-top'), 100)){
                $('.acora-hide-top').addClass('reveal-top');
            }
        }

        if($('.fwd-hide-opacity').length){
            $('.fwd-hide-opacity').each(function(){
                if(isVisible($(this), 100)){
                    $(this).addClass('fwd-reveal-opacity');
                }
            })
        }
    }
    
    /*
     *  Sidebar
     *  -----------------------------------------------------
    */
    var sidebarH; 
    var lastScrollY = 0;
    var step = 0;
    var curY;
   
    function initSideBar(){
        if(!$('.sidebar').length) return;
        if($('.sidebar').data('show-sidebar') == 'no'){
            $('.sidebar').css({'display':'none'});
            $('.blog-content .wrapper').css({'margin-right':'0px'});
            return;
        }
       
        sidebarH = $('.sidebar .inner').outerHeight();
        window.addEventListener('scroll',function(e){
           positionSidebar();
        });
    }

    function positionSidebar(){
        if(!$('.sidebar').length) return;
        
        var offsetTop = 59;
        var leftOffsetTop = 40;
        var scroll_pos = $(window).scrollTop();
        var postsH = $('.posts').height();
        var windowH = $(window).height();
        var position = scroll_pos - $('.sidebar').offset().top - offsetTop;
        var sidebarPos = $('.sidebar').offset().top;
        var footerTop = $('.footer').offset().top;
        var postsH = $('.posts').height();
        var finalPos = '';
    
        if(sidebarH >= postsH){
             $('.posts').height(sidebarH);
        }

        if(postsH <= sidebarH){
            if(FWDUtils.hasTransform3d){
                finalPos = 'translate3d(0, 0, 0)';
            }else{
                finalPos = 'translateY(0)';
            }
            $('.sidebar .inner').css({
                'position':'relative',
                'transform': finalPos
               });
            return;
        }
      
        if(position > 0 && sidebarH < windowH){
            curY = offsetTop
            if(FWDUtils.hasTransform3d){
                finalPos = 'translate3d(0,-' + curY +  'px,0)';
            }else{
                finalPos = 'translateY(-' + curY +  'px)';
            }
            $('.sidebar .inner').css(
                {'position':'fixed',
                 'transform': finalPos,
                 'top':0
             });
         
            if((scroll_pos + sidebarH - offsetTop + 100)  >  footerTop){
                var ft = -(scroll_pos - footerTop + sidebarH + 100);
                if(FWDUtils.hasTransform3d){
                    finalPos = 'translate3d(0,-' + ft +  'px,0)';
                }else{
                    finalPos = 'translateY(-' + finalPos +  'px)';
                }
                $('.sidebar .inner').css(
                    {'transform':'translate3d(0,' + ft +  'px, 0)'
                });
            }
        }else{
            if(FWDUtils.hasTransform3d){
                finalPos = 'translate3d(0,0,0)';
            }else{
                finalPos = 'translateY(0)';
            }
            $('.sidebar .inner').css({
                'position':'relative',
                'transform': finalPos,
                'top':0
               });
        }
     
        if(sidebarH > windowH && position > 0){
            if(!curY) curY = 0;
            if(lastScrollY != 0){
                step = lastScrollY - scroll_pos;
            }
            lastScrollY = scroll_pos;
            curY += step;
            if(curY > -offsetTop){
                curY = -offsetTop;
            }
            if((position + offsetTop) < offsetTop){
                var ft = position + offsetTop;
                curY = -position - offsetTop;
            }
            if(curY + sidebarH + offsetTop - 20 < windowH){
               curY = windowH - sidebarH - offsetTop + 20;
            }
            if(scroll_pos + windowH + 100 >  footerTop){
                var ft = -(scroll_pos - footerTop + windowH + 100);
                var ft2 = ft + offsetTop - 20;
                if(ft2 < 0) ft2 = 0;
                curY = windowH -sidebarH + ft - ft2;
            }
            
            if(FWDUtils.hasTransform3d){
                finalPos = 'translate3d(0,' + curY + 'px,0)';
            }else{
                finalPos = 'translateY(' + curY + 'px)';
            }
            $('.sidebar .inner').css(
                {'position':'fixed',
                'transform': finalPos,
                'top':0
            });
        }
    }
    
    function resizeBlogContent(){
    }

    /*
     *  About me.
     *  -----------------------------------------------------
    */
    var amOW = 1170;
    var toW = 1170;
    var toH = 700;

    function initAboutMe(){
         if(!$('.about-me').length) return;
    }

    function resizeAboutMeProfile(){
        if(!$('.about-me').length) return;
        var t = $('.about-me .main-info');
        var i = $('.about-me .image');
        if(!t.length) return;
        var vs = FWDUtils.getViewportSize()
        var sW = vs.w;
        var scale = sW/amOW;
      
        var fW = Math.ceil(scale * amOW) - (sW - amOW)/2;
        var offsetW = Math.round((sW - 1210)/2);
        if(offsetW < -20){
            offsetW = -20;
        }
        if(sW > 1210){
            offsetW = 0;
        }
        offsetW = Math.abs(offsetW);
    
        if(scale < 1){
            fW = sW;
        }
        t.width(fW - offsetW);
        var iW = Math.round(fW - 386);
        var iH = Math.round(toH * (iW/toW));
        if(iH < 650){
            iH = 650;
        }
       
        if(window.innerWidth <= 1015){
            iW = sW - 40;
            var iH = Math.round(toH * (iW/toW));
        }
        i.width(iW);
        i.height(iH);
        $('.info').css({'top':Math.round((iH - $('.info').height())/2) + 'px'})
    }

    /*
     *  About us.
     *  -----------------------------------------------------
    */
    var minW;
    var videoStartFirstTime = true;
    var header = $('.video-holder')[0];
    var headerVideoStoped = true;
    var headerVideoOutsideViewport = false;
    var myReq;
    function initAboutUs(){
        // Fix detailed grid.
        if($('.about-us .detailed-grid').length){
             $('.holder-fix').children().each(function(){
                $( '<p class="dumy">s</p>' ).insertBefore($(this));
             });
             $('.holder-fix h1').children().each(function(){
                $( '<p class="dumy">s</p>' ).insertBefore($(this));
             });
        }
    }

    function resizeAboutUs(){
        resizeAboutUsTeam();
        if($('.about-us .we-are-grid').length){
            $('.about-us .video-holder .info').css({'transform': 'translate(-50%, calc(-50% + 80px))'});
        }
    }

    function resizeAboutUsTeam(){
        if(!$('.team-members').length) return;
        
        if($(window).width() < 1000) return;
        var sw = Math.round($('.team-members').innerWidth());
        
        $('.team-member').each(function(i, el){
            var title = $(el).find('.avatar-holder');
            var content = $(el).find('.entry-excerpt');
            var avatar = $(el).find('.avatar');
            var share = $(el).find('.share-btns-container');
            if(avatar.innerHeight() + 6 < content.innerHeight()){
                share.css({'margin-top':'0'});
            }else{
                share.css({'margin-top':'-29px'});
            }
            $(el).find('.entry-excerpt').width(sw - Math.round(title.innerWidth()) - 60);
        });
        $(".about-us-info .entry-excerpt").html(FWDUtils.decodeHtml($(".about-us-info .entry-excerpt").html()));  
    }

    function resizeAboutUsWeAreGridImages(){
        if(!$('.we-are-grid').length) return;
        var w;
        var h;
        var parent = $('.we-are-grid .holder');
        var vs = FWDUtils.getViewportSize()
        var sW = FWDUtils.getViewportSize().w;
       
        $('.we-are-grid .image').each(function(){
        if(sW > 768){
            if($(this).hasClass('one')){
                w = '100%';
                h = '250px';
            }else if($(this).hasClass('two')){
                w = parent.width()/2;
                h = '250px';
            }else if($(this).hasClass('three')){
                w = parent.width()/3;
                h = '250px';
            }
            $(this).css({'width':w, 'height':h})
        }else{
            w = parent.width();
            var h = Math.max(Math.round(parent.width()*9/16), 160);
            
            if(h < 250){
                h = 250;  
            }
            w = w + 'px';
            h = h + 'px'
        }
       
        $(this).css({'width':w, 'height':h})
        });
    }

    // Init video header.
    initHeaderVideo();
    function initHeaderVideo(){
        if(!$('.video-holder .video').length) return;
        registerAPI();
        
        //Register API (an setInterval is required because the player is not available until the youtube API is loaded).
        var registerAPIInterval;
        function registerAPI(){
            clearInterval(registerAPIInterval);
            if(window['fwdevp_video']){
               window['fwdevp_video'].addListener(FWDEVPlayer.READY, aboutUsOneReadyHandler);
               window['fwdevp_video'].addListener(FWDEVPlayer.PLAY, aboutUsOnePlayHandler);
               window['fwdevp_video'].addListener(FWDEVPlayer.PAUSE, aboutUsOnePauseHandler);
               window['fwdevp_video'].addListener(FWDEVPlayer.STOP, aboutUsOneStopHandler);
            }else{
                registerAPIInterval = setInterval(registerAPI, 100);
            }
        };
    }

    function aboutUsOneReadyHandler(){
        initAboutUsOnePlayButton();
    }

    function initAboutUsOnePlayButton(){
        $('.video-holder .pp-play').on('click', function(e){
            window['fwdevp_video'].play();
        })
        $('.video-holder .pp-pause').on('click', function(e){
            window['fwdevp_video'].pause();
        })
    }

    function aboutUsOnePlayHandler(){
        var video = $('.video-holder #video')[0];
        var playButton = $('.video-holder .pp-play')[0];
        var pauseButton = $('.video-holder .pp-pause')[0];
        playButton.style.display = 'none';
        if(videoStartFirstTime){
            video.style.display = 'block';
            video.style.opacity = 0;
            FWDAnimation.to(video, 1, {opacity:1, delay: .4});
        }
        setTimeout(function(){
            pauseButton.style.display = 'block';
            FWDAnimation.killTweensOf(playButton);
            FWDAnimation.to(playButton, .00001, {transform:'translate(-50%, -50%) scale(0)'})
            FWDAnimation.killTweensOf(pauseButton);
            FWDAnimation.to(pauseButton, .00001, {transform:'translate(-50%, -50%) scale(0)'})
            FWDAnimation.to(pauseButton, .8, {transform:'translate(-50%, -50%) scale(1)', delay: .1, ease:Elastic.easeOut});
        }, 100);
        if(FWDUtils.getViewportSize().w > 768 &&  $('.we-are-grid').length){
            $('.we-are-grid').css({'opacity': '0', 'pointer-events':'none'});
            FWDAnimation.to($('.video-holder')[0], .8, {'margin-top': '-280px', onUpdate:revealPosts, ease:Expo.easeInOut});
            $('.about-us .video-holder .info').css({'transform': 'translate(-50%, -50%)'});
        }
        videoStartFirstTime = false;
        headerVideoStoped = false;
    }

    function aboutUsOnePauseHandler(){
        showAboutUsPlayButton();
    }

    function aboutUsOneStopHandler(){
        var video = $('.video-holder #video')[0];
        var playButton = $('.video-holder .pp-play')[0];
        var image = $('.video-holder .header')[0];
        playButton.style.display = 'none';
        videoStartFirstTime = true;
        video.style.display = 'none';
        showAboutUsPlayButton();
        headerVideoStoped = true;
        window['fwdevp_video'].goNormalScreen();
        image.style.opacity = 0;
        FWDAnimation.to(image, .8, {opacity: 1});
    }

    function showAboutUsPlayButton(){
        var playButton = $('.video-holder .pp-play')[0];
        var pauseButton = $('.video-holder .pp-pause')[0];
        pauseButton.style.display = 'none';
        setTimeout(function(){
            playButton.style.display = 'block';
            
            FWDAnimation.killTweensOf(pauseButton);
            FWDAnimation.to(pauseButton, .00001, {transform:'translate(-50%, -50%) scale(0)'})
            
            FWDAnimation.killTweensOf(playButton);
            FWDAnimation.to(playButton, .00001, {transform:'translate(-50%, -50%) scale(0)'})
            FWDAnimation.to(playButton, .8, {transform:'translate(-50%, -50%) scale(1)', delay: .1, ease:Elastic.easeOut});
        }, 100);
      
        if(FWDUtils.getViewportSize().w > 768 &&  $('.we-are-grid').length){
            $('.we-are-grid').css({'opacity': '1', 'pointer-events':'auto'});
            FWDAnimation.to($('.video-holder')[0], .8, {'margin-top': '-155px', ease:Expo.easeInOut});
            $('.about-us .video-holder .info').css({'transform': 'translate(-50%, calc(-50% + 80px))'});
        }
    }

    function stopAboutUsOneVideoOnScroll(){
        
        if(!window['fwdevp_video']) return;
        var scroll_pos = $(window).scrollTop();
        var el_top = $(header).offset().top;
        var el_height = $(header).height();
        var el_bottom = el_top + el_height;
        
        if(scroll_pos > el_bottom){
            headerVideoOutsideViewport = true;
            if(!headerVideoStoped){
                window['fwdevp_video'].stop();
            }
        }else{
            headerVideoOutsideViewport = false;
        }
    }

    var hasAboutUsWeAreCount;
    var startCount = false;
    var countObject;
    var aboutUsObject_ar;
    function initStartCountNumber(){
        if($('.excerpt-table').length != 0 || $('.excerpt-table .col-holder') != 0){
            hasAboutUsWeAreCount = true;
        }
    }

    function startCountNumber(){
        if(!hasAboutUsWeAreCount || startCount){
            return
        }
       
        startCount = true;
        aboutUsObject_ar = [];
        var nrs = $('.excerpt-table .col .count');
       
        nrs.each(function(index, element){
           countObject = {element:element, startCount:0, endCount:Math.round(element.innerHTML)};
           aboutUsObject_ar.push(countObject);
           element.innerHTML = 0;
        });
       
        $.each(aboutUsObject_ar, function(index, element){
            var obj = element;
            FWDAnimation.to(obj, 4, {startCount:obj.endCount, onUpdate:function(){   
                obj.element.innerHTML = Math.round(obj.startCount)
           },delay:.3});
        })
    }

    
    /*
     *  Portfolio single.
     *  -----------------------------------------------------
    */
    var pSidebarH; 
    function initPortfolioSingle(){
        if(!$('.portfolio-main.single').length) return;
        pSidebarH = $('.portfolio-main .inner').height();
      
        window.addEventListener('scroll',function(e){
            positionPSidebar(e);
        });
    }

    function positionPSidebar(){
        if(!$('.portfolio-main .entry-header').length || $(window).width() < 1000) return;
        var offsetTop = -60;
        var leftOffsetTop = -60;
        var scroll_pos = $(window).scrollTop();
        var windowH = $(window).height();
        var position = scroll_pos - $('.entry-header').offset().top + offsetTop;
        var contentH = $('.entry-content').height();
        var footerTop = 0;
        if($('.separator2').length){
            var footerTop = $('.separator2').offset().top;
        }
        if(contentH < pSidebarH){
            $('.portfolio-main .inner').css({
                'position':'relative',
                'top':0});
            return;
        }
       
        if(position > 0 && pSidebarH < windowH){
           curY = offsetTop;
         
           $('.portfolio-main .inner').css(
                {'position':'fixed',
                 'top':curY + 'px'});
          
            if((scroll_pos + pSidebarH + offsetTop)  >  footerTop){
                var ft = -(scroll_pos - footerTop + pSidebarH - offsetTop) - offsetTop;
                $('.portfolio-main .inner').css(
                    {'top':ft + 'px'});
            }
        }else{
            $('.portfolio-main .inner').css({
                'position':'relative',
                'top':0});
        }
    }
    
    setTimeout(function(){
        $('.page_only_shortcode_full_width .fwdvugp').css({'height':'auto'});
    },1000);

    /*
     *  Footer.
     *  -----------------------------------------------------
    */
    function initFooter(){
        if($('.footer').length){
            $('.footer .wrapper').addClass('reveal');
        }
    }

    /*
     *  Page templates.
     *  -----------------------------------------------------
    */
    function initPageTemplates(){
        if($('.page_only_shortcode_fullscreen').length
        || $('.page-not-found').length
       ){
            $('body, html').css({'overflow':'hidden'});
        }
    }

    /*
     *  Setup contact us and paralax.
     *  -----------------------------------------------------
    */
    var myReq;
    function initContactParalax(){
        if(!$('.page-template-contact').length || !window['paralax']){
            return; 
        } 
        if(paralax == 'no'){
            return;
        }
        startRAF();
        window.addEventListener('scroll', function(e){
            var top = $('.map-holder')[0].getBoundingClientRect().top;
            var scrollTop = $(window).scrollTop();
            var elementH = $('.map-holder').height();
            var windowH = $(window).height();
         
            if(top >= -elementH && top < windowH){
                cancelAnimationFrame(myReq);
                startRAF();
            }
        });
    }

    function startRAF(){
        if(!$('.main-map-holder').length){
            return;
        }
        
        function step() {
            var top = $('.main-map-holder')[0].getBoundingClientRect().top;
            var windowH = $(window).height();
            var elementH = $('.map-holder').height();
            var scrollTop = $(window).scrollTop();
            if(top >= -elementH && top < windowH){
               $('.map-holder').css({'transform':'translateY(' + Math.round(scrollTop/2) + 'px' + ')'})
               myReq = requestAnimationFrame(step);
            }
           
        }
        cancelAnimationFrame(myReq);
        myReq = requestAnimationFrame(step);
    }

    /*
     *  Contact simple.
     *  -----------------------------------------------------
    */
    function initContactSimple(){
        if(!$('.cs-main-form-holder').length) return;
       
        // Write us
        if($('.first-button.write-us').length){
            $('.first-button.write-us').on('click', function(e){
                e.preventDefault();
                var vs =  FWDUtils.getViewportSize();
                $('.cs-main-form-holder').css({'display':'block'});
                $('.cs-main-form-holder').css({'transform':'translateY(' + (-vs.h) + 'px)'});
                FWDAnimation.to( $('.cs-main-form-holder')[0], .8, {transform:'translateY(0)', ease:Expo.easeInOut});
            })
        }
        if($('.cs-main-form-holder .fwdicon-close').length){
            $('.cs-main-form-holder .fwdicon-close').on('click', function(e){
                e.preventDefault();
                var vs =  FWDUtils.getViewportSize();
                FWDAnimation.to($('.cs-main-form-holder')[0], .8, {transform:'translateY(' + (-vs.h) + 'px)', onComplete:function(){$('.cs-main-form-holder').css({'display':'none'});}, ease:Expo.easeInOut});
            })
        }

        // Map.
        if($('.map').data('lat')){
            window['lat'] = $('.map').data('lat');
        }
        if($('.map').data('long')){
            window['long'] = $('.map').data('long');
        }
        if($('.second-button.map').length){
            $('.second-button.map').on('click', function(e){
                e.preventDefault();
                var vs =  FWDUtils.getViewportSize();
                $('.cs-main-map-holder').css({'display':'block'});
                $('.cs-main-map-holder').css({'transform':'translateY(' + (-vs.h) + 'px)'});
                FWDAnimation.to( $('.cs-main-map-holder')[0], .8, {transform:'translateY(0)', ease:Expo.easeInOut});
            })
        }
        if($('.cs-main-map-holder .fwdicon-close').length){
            $('.cs-main-map-holder .fwdicon-close').on('click', function(e){
                e.preventDefault();
                var vs =  FWDUtils.getViewportSize();
                FWDAnimation.to($('.cs-main-map-holder')[0], .8, {transform:'translateY(' + (-vs.h) + 'px)', onComplete:function(){$('.cs-main-map-holder').css({'display':'none'});}, ease:Expo.easeInOut});
            })
        }
    }

    function resizeContactSimple(vs){
        if(!$('.cs-main-form-holder').length) return;
        $('.cs-main-form-holder, .cs-main-map-holder').width(vs.w);
        $('.cs-main-form-holder, .cs-main-map-holder').height(vs.h);
        
        if($('.cs-from-holder').height() > vs.h){
            $('.cs-from-holder').css({'top':0, 'transform': 'none'});
        }else{
           $('.cs-from-holder').css({'top':'50%', 'transform': 'translateY(-50.1%)'});
        }
    }

    // Contact map.
    if($('.main-map-holder').length){
        initMapProperies();
        setTimeout(loadMap, 200);
    }

    function initMapProperies(){
       
        window['markerPath'] =  ACORA_URI + '/img/marker-yellow.png';
        var accentColors_ar = ["#ffba00", "#b1ba77", "#5ca667", "#fc82d0", "#a94ac8", "#1ab7ea", "#0099FF", "#c4c1bc"];
        var re = new RegExp("[; ]?acora_accent_color=([^\\s;]*)");
        var sMatch = (" " + document.cookie).match(re);
        if(sMatch){
            var id;
            for(var i=0; i<accentColors_ar.length; i++){
                if(accentColors_ar[i] == sMatch[1]) id = i;
            }
            if(id == 0){
                window['markerPath'] =  ACORA_URI + '/img/marker-yellow.png';
            }else if(id == 1){
                window['markerPath'] = ACORA_URI + '/img/marker-olive.png';
            }else if(id == 2){
                window['markerPath'] = ACORA_URI +  '/img/marker-green.png';
            }else if(id == 3){
                window['markerPath'] = ACORA_URI + '/img/marker-red.png';
            }else if(id == 4){
                window['markerPath'] = ACORA_URI + '/img/marker-purple.png';
            }else if(id == 5){
                window['markerPath'] = ACORA_URI + '/img/marker-blue.png';
            }else if(id == 6){
                window['markerPath'] = ACORA_URI + '/img/marker-blue2.png';
            }else if(id == 7){
                window['markerPath'] = ACORA_URI + '/img/marker-light-gray.png';
            }
        }
    }

    function loadMap(){
        var my_awesome_script = document.createElement('script');
        my_awesome_script.setAttribute('src','//maps.googleapis.com/maps/api/js?key=' + maps_api_key + '&callback=initMap');
        document.head.appendChild(my_awesome_script);
    }


    /*
     *  Shortcodes.
     *  -----------------------------------------------------
    */

    // Tabs.
    $('.tabs').each(function () {
        var $t = $(this);
        $t.find('.tabs-menu a').on('click', function () {
            var $t = $(this),
                $p = $t.parent(),
                index = $p.prevAll().length;
            if($p.is('.active')) return false;
            $p.parent().find('.active').removeClass('active');
            $p.addClass('active');
            $p.closest('.tabs').find('.tab').hide().end().find('.tab:eq(' + index + ')').show();
            return false;
        }).each(function (index) {
            $(this).wrapInner($('<span />'))
                   .append($('<b>' + (index + 1) + '</b class="index">'));
        });
    });

    // Accordion.
    $('.accordion').each(function () {
        var $accordion = $(this);
        $accordion.find('.panel-title a').on('click', function () {
            var $t = $(this);
            if($t.closest('.panel-active').length){
                $t.closest('.panel-active').find('.panel-content').slideUp(500, function(){
                    $(this).closest('.panel-active').removeClass('panel-active');
                });
                return false;
            }
            var $newPanel = $t.closest('.panel'),
                index = $newPanel.prevAll().length;
            var $panelActive = $accordion.find('.panel-active');
            if ($panelActive.length) {
                $panelActive.find('.panel-content').slideUp(500, function(){
                    $(this).closest('.panel').removeClass('panel-active');
                    $accordion.find('.panel:eq(' + index + ') .panel-content').slideDown(300)
                              .closest('.panel').addClass('panel-active');
                });
            }else{
                $accordion.find('.panel:eq(' + index + ') .panel-content').slideDown(300)
                          .closest('.panel').addClass('panel-active');
            }
            return false;
        });
    });

    init();
});

/*
 *  This function has to be declared before the DOM loads
 *  and is responsible for loading the google MAP.
 *  -----------------------------------------------------
*/
 function initMap(){
    // The location of Uluru
    var uluru = {'lat': Number(window['lat']), 'lng': Number(window['long'])};
    // The map, centered at Uluru
    var image = '';
    var map = new google.maps.Map(
    document.getElementById("maps"), {zoom: 15, disableDefaultUI: true, center: uluru, backgroundColor: "transparent",
    stysles:[{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":.42}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
    });
   var beachMarker = new google.maps.Marker({position: uluru, map: map,icon: image});   
}