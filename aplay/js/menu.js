/**
 * Menu.
 *
 * @package acora
 * @since acora 1.0
 */
jQuery(document).ready(function($){
    
    'use strict';

    use_only_vertical_menu = Boolean(use_only_vertical_menu);
    initMenu();
    initFocusMenuButton();

    /*
     *  Horizontal menu.
     *  -----------------------------------------------------
    */
    // Scroll horizontal menu.
    var siteNavigation =  $('.site-navigation');
    var fluid = $('.site-navigation .fluid');
    var horizontalMenuShowed = true;
    var sw;
    var limitW = 1015;
    var scrollTop = 0;
    var menuOffestY = 5;
    var lastScrollTop = 0;
    var navbarHeight;
    var hMenuHidden = false;
    var wasResizedId_to;
    var wasResized = false;
    var horizontalMenuInitizlized = false;
    var hMenuShowed;
    var ajaxResponse;
    var sidebarAdded = false;

    // Fixes horizontal menu show that is not possible in the theme header php file.
    if($('#acora_portfolio_igp_archive').length){
        use_only_vertical_menu = true;
    }

    if(!use_only_vertical_menu){
        $('.vm-logo').css({'display':'none'});
    }
    
    // Load vertical menu sidebar with AJAX to improve loading time.
    loadVerticalMenuSidebar();
    function loadVerticalMenuSidebar(){
        $.ajax({
            url:ajaxURL,
            type:'post',
            data:{
                action:'acora_load_vertical_sidebar'
            },
            error: function(response){
                console.log(response);
            },
            success: function(response){
                ajaxResponse = response;
                
                // Add sidebar only if menu is opened to improve performance.
                if(window['primarymenu'] && window['primarymenu'].$opened){
                    addSidebar();
                }  
            }
        });
    }

    function addSidebar(){
        if(sidebarAdded || !ajaxResponse){
            return;
        }
        sidebarAdded = true;
        $('.copyright').prepend(ajaxResponse);
        if(window['primarymenu']){
            window['primarymenu'].checkMenuBottom(); 
            window['primarymenu'].stopUpdateBurgerScrollbar();
        }    
    }

    // Hide and show menus logic.
    hideOrShowMenus();
    fixFooterCssWhenPreviewBarIsActive();
    $(window ).on('resize', menuResizeHandler);
    clearTimeout(self.clId_to);
    self.clId_to = setTimeout(function(){
        hideOrShowMenus();
        fixFooterCss();
    }, 100);

    function menuResizeHandler(){
        if(horizontalMenuInitizlized){
            resizeHorizontalMenu();
        }
        fixFooterCss();
    }

    function hideOrShowMenus(){
        if(!fluid.length){
            return;
        }
        if(use_only_vertical_menu){
            hideHorizontalMenu();
        }else{
            initHorizontalMenu();
        }
    }

    // Swap menus.
    function swapMenus(){
        sw = FWDUtils.getViewportSize().w;
        if(!use_only_vertical_menu){
            if(sw < limitW){
                hideHorizontalMenu();
            }else{
                showHorizontalMenu();
            }
        }
    }

    // Add / remove horizontal / vertical menus.
    function hideHorizontalMenu(){
        hMenuHidden = true;
        hMenuShowed = false;
        
        if(!use_only_vertical_menu){
            $('.site-navigation, .site-navigation .margin').css({'height':'80px'});
            $('.site-navigation .search-icon').css({'display':'none'});
            $('.primary-navigation').css({'display':'none'});
            $('.vertical-menu-toggle').css({'display':'block'});

            FWDAnimation.killTweensOf(fluid[0]);
            FWDAnimation.to(fluid[0], .01, {'transform':'translateY(0)'});
            horizontalMenuShowed = true;
            clearTimeout(self.clId2_to);
            self.clId2_to = setTimeout(function(){    
                FWDAnimation.killTweensOf(fluid[0]);
                FWDAnimation.to(fluid[0], .01, {'transform':'translateY(0)'});
                horizontalMenuShowed = false;
            }, 200);
        }else{
             $('.site-navigation').css({'display':'none'});
        }
    }

    function showHorizontalMenu(){
       if(hMenuShowed){
            return
        }
       
        hMenuHidden = false;
        hMenuShowed = true;
        horizontalMenuShowed = true;

        $('.site-navigation, .site-navigation .margin').css({'height':'auto'});
        $('.primary-navigation').css({'display':'inline-block'});
        $('.site-navigation .search-icon').css({'display':'table-cell'});
        
        siteNavigation.css({'display':'block'});
        fluid.css({'display':'block'});
        navbarHeight = $('.site-navigation .fluid').height();
        siteNavigation.height(navbarHeight);
        scrollTop = $(window).scrollTop();
        
        FWDAnimation.killTweensOf(fluid[0]);
        $('.vertical-menu-toggle').css({'display':'none'});
        if(window['primarymenu']){
            window['primarymenu'].hide();
        }
    }

    // Initialize horizontal menu scroll and position.
    function initHorizontalMenu(){
        resizeHorizontalMenu();
        horizontalMenuInitizlized = true;
        $('.site-navigation .fluid2').addClass('reveal');
        FWDAnimation.killTweensOf(fluid[0]);
        FWDAnimation.to(fluid[0], .01, {'transform':'translateY(' + (-navbarHeight - menuOffestY) + 'px)'});
        horizontalMenuShowed = false;
        setTimeout(function(){ 
            setMenuPosition();
            checkVmMenu();
            window.addEventListener('scroll',function(e){
                setMenuPosition();
                checkVmMenu();
            });
            if(scrollTop < navbarHeight * 2){
                FWDAnimation.killTweensOf(fluid[0]);
                FWDAnimation.to(fluid[0], .01, {'transform':'translateY(0)'});
            }
        }, 200);
    }

    function resizeHorizontalMenu(){
        wasResized = true;
        clearTimeout(wasResizedId_to);
        wasResizedId_to = setTimeout(function(){
            wasResized = false;
        }, 100)
        if(!hMenuHidden){
            navbarHeight = $('.site-navigation .fluid').height();
            siteNavigation.height(navbarHeight);
        }
        swapMenus();
    }

    function setMenuPosition(){
        scrollTop = $(window).scrollTop();
        
        if(hMenuHidden || wasResized){
            return;
        } 

        if(scrollTop > lastScrollTop && scrollTop > navbarHeight * 2){            
            // Hide.
            if(!horizontalMenuShowed){
                FWDAnimation.killTweensOf(fluid[0]);
                FWDAnimation.to(fluid[0], .8, {'transform':'translateY(' + (-navbarHeight - menuOffestY) + 'px)', ease:Expo.easeInOut});
                horizontalMenuShowed = true;
            }
        }else{
            // Show.
            if(horizontalMenuShowed){
                FWDAnimation.killTweensOf(fluid[0]);
                FWDAnimation.to(fluid[0], .8, {'transform':'translateY(0)', ease:Expo.easeInOut});
                horizontalMenuShowed = false;
            }
        }
        setTimeout(function(){
            lastScrollTop = scrollTop;
        }, 50);
    }

    // VM menu.
    var vmLogo = $('.vm-logo');
    if(vmLogo.length){
        checkVmMenu();
        setTimeout(checkVmMenu, 100);
        window.addEventListener('scroll',function(e){
            setMenuPosition();
            checkVmMenu();
        });
    }
   
    function checkVmMenu(){
        var sisc = $('.FWDSISC');
        scrollTop = $(window).scrollTop();

        if(sisc.length){
            if(sisc.height()){
                if(Math.abs(sisc[0].getBoundingClientRect().y) > (sisc.height() - 150)){
                    vmLogo.removeClass('acora-hide');
                    vmLogo.removeClass('reveal');
                    vmLogo.addClass('acora-hide-up');
                }else{
                    vmLogo.addClass('reveal');
                }
            }
        }
       
    }

    // Fix horizontal menu.
    var $thirdSubmenu;
    $('#acora_menu_search_button').remove();

    $('.sub-menu').on('mouseover', function(){
        $(this).parent().addClass('active')
    });

    $('.sub-menu').on('mouseleave', function(){
        $(this).parent().removeClass('active');
    });
   
    $('.menu').children().each(function(){
        $(this).on('mouseleave', function(e){
            $('.sub-menu').removeClass('sub-menu-right');
        })
    });
    
    $('.site-navigation li').hover(
        function(){
            var $submenu = $(this).children('.sub-menu');
            if($submenu.length) {
                var posRight = false;
                $submenu.children('.has-children').each(function(i, e){
                    var $thirdSubmenu = $(e).children('.sub-menu');
                    if($thirdSubmenu.offset().left + $thirdSubmenu.width() > $(window).width()){
                        $submenu.addClass('sub-menu-right');
                        $thirdSubmenu.addClass('sub-menu-right');
                    }
                })
               if($submenu.offset().left + $submenu.width() > $(window).width()){
                     $submenu.addClass('sub-menu-right');
                }
            }
        },
        function() {
            $(this).children('.sub-menu').removeClass('sub-menu-right');
        }
    );

    $('.site-navigation .sub-menu').each(function(index, element){
        var has = false;
        $(element).children().each(function(index2, element2){
            if($(element2).is('.has-children')){
                has = true;
            }
        });
        if(!has){
            $(element).addClass('no-chidren');
        }
    });

    // Fix horizontal menu on mobile.
    if(FWDUtils.isMobile){
        $('.site-navigation li').on('click', function(e){
            e.stopImmediatePropagation();
            if($(this).children('.sub-menu').length){
                e.preventDefault();
                return false;
            }
         });
    }

    /*
     *  Vertical menu.
     *  -----------------------------------------------------
    */
    var menuFousId_int;
    var nmenuFocusRun = 0;
    var menuBottom;
    var menuItems;
    var $menuItems;

    // Menu button blinking.
    function initFocusMenuButton(){
        if(! $('.vertical-menu-toggle').length) return;
        if(!blink_menu_button) return;
        var re = new RegExp('[; ]?acora_menu_focus=([^\\s;]*)');
        var sMatch = (' ' + document.cookie).match(re);
        var clicks;
        if(!sMatch){
            clicks = 0;
        }else{
            clicks = sMatch[1];
        }
        if(clicks > 5) return;
        setTimeout(focusMenuButton, 5000 + Math.random(10000));
    }

    function stopFocusMenuButton(){
        var menuToggle = $('.vertical-menu-toggle');
        clearInterval(menuFousId_int);
        menuToggle.removeClass('vertical-menu-toggle-normal');
        menuToggle.removeClass('vertical-menu-toggle-seleted');
    }

    function focusMenuButton(){
        if(window['primarymenu']['$opened']){
            stopFocusMenuButton();
            return;
        } 
    
        var state = 0;
        var menuToggle = $('.vertical-menu-toggle');
        menuFousId_int = setInterval(function(){
            if(state%2 == 0){
                menuToggle.removeClass('vertical-menu-toggle-normal');
                menuToggle.addClass('vertical-menu-toggle-seleted');
            }else{
                menuToggle.removeClass('vertical-menu-toggle-seleted');
                menuToggle.addClass('vertical-menu-toggle-normal');
            }
            state++;
            if(state == 7){
                stopFocusMenuButton();
                if(nmenuFocusRun < 2) initFocusMenuButton();
                nmenuFocusRun ++;
            } 
        },100)
    }

    // Setup menu.
    function initMenu(){
        $menuItems = $(".primary-navigation > ul");
        if(window['acora_search_label']){
            $menuItems.append($('<li id="acora_menu_search_button" class="menu-item"><a href="acora-menu-search-button">' + acora_search_label + '</a></li>'));
        }
      
        if($menuItems.length > 0) {
            window['primarymenu'] = new VerticalMenu({
                items: menuWalker($menuItems),
                backgroundImage:''
            });
            window['primarymenu'].enable();
        }
       menuBottom = $('.copyright');
       menuItems = $('.vertical-menu-level-0');
       addMenuHover();
       setTimeout(function(){
            $('.vertical-menu-toggle-holder').addClass('reveal');
           
       },50); 
      window['menuScrollbar'] = new FWDScrollbar($('.vertical-menu .fwd-scrollbar')[0]);
    }

    var menuOpenedOnce = false;
    function addMenuHover(){
        $('.vertical-menu-toggle').on('mouseover mouseout click', function (e) {
            addSidebar();
            if(e.type == 'mouseover' && !FWDUtils.isMobile){
                if($('.vertical-menu--showed').length){
                    $('.vertical-menu-toggle').addClass('vertical-menu-toggle-selected-showed');
                    $('.vertical-menu-toggle span').addClass('vertical-menu-toggle-lines-selected-showed');
                }else{
                    $('.vertical-menu-toggle').addClass('vertical-menu-toggle-selected');
                    $('.vertical-menu-toggle span').addClass('vertical-menu-toggle-lines-selected');
                }
            }else if(e.type == 'mouseout' || e.type == 'click'){
                if($('.vertical-menu--showed').length){
                    $('.vertical-menu-toggle').removeClass('vertical-menu-toggle-selected-showed');
                    $('.vertical-menu-toggle span').removeClass('vertical-menu-toggle-lines-selected-showed');
                    if(FWDUtils.isMobile){
                        $('.vertical-menu-toggle').addClass('vertical-menu-toggle-selected');
                        $('.vertical-menu-toggle span').addClass('vertical-menu-toggle-lines-selected');
                    }
                    if(window['is_dark']){
                        $('.vertical-menu-toggle').removeClass('vertical-menu-toggle-selected');
                        $('.vertical-menu-toggle span').removeClass('vertical-menu-toggle-lines-selected');
                    }
                }else{
                    $('.vertical-menu-toggle').removeClass('vertical-menu-toggle-selected');
                    $('.vertical-menu-toggle span').removeClass('vertical-menu-toggle-lines-selected');
                    if(FWDUtils.isMobile){
                        $('.vertical-menu-toggle').addClass('vertical-menu-toggle-selected-showed');
                        $('.vertical-menu-toggle span').addClass('vertical-menu-toggle-lines-selected-showed');
                    }
                }
            }
            if(e.type == 'click' && !menuOpenedOnce){
                if(window['primarymenu']['$opened']) setMenuFocusCookie();
                stopFocusMenuButton();
            }
        });
    }

     window.acoraResetToggleButton = function(){
        $('.vertical-menu-toggle').removeClass('vertical-menu-toggle-selected-showed');
        $('.vertical-menu-toggle span').removeClass('vertical-menu-toggle-lines-selected-showed');
        $('.vertical-menu-toggle').removeClass('vertical-menu-toggle-selected');
        $('.vertical-menu-toggle span').removeClass('vertical-menu-toggle-lines-selected');
    }

    var isPageSet = false;
    function setMenuFocusCookie(){
        if(document.cookie.indexOf('acora_menu_focus') == -1){
            document.cookie = "acora_menu_focus=1; expires=Thu, 18 Dec 2040 00:00:01 GMT; path=/";
        }else{
            var re = new RegExp('[; ]?acora_menu_focus=([^\\s;]*)');
            var sMatch = (' ' + document.cookie).match(re);
            var clicks = sMatch[1];
            clicks ++;
            if(!isPageSet) document.cookie = "acora_menu_focus=" + clicks + "; expires=Thu, 18 Dec 2040 00:00:01 GMT; path=/"; 
        }
        isPageSet = true;
    }

    function menuWalker($root) {
        var items = [];
        $root.find('> li > a').each(function () {
            var $el = $(this),
                $parent = $el.parent(),
                $subEl = $el.next(),
                item = {
                    href: $el.attr('href'),
                    content: $el.html()
                };
            if ($subEl.length) {
                item.children = menuWalker($subEl);
            }
            if ($parent.is('.current-menu-item')) {
                item.active = true;
            }
            items.push(item);
        });
        return items;
    };

    /*
     *  Search window close / open.
     *  -----------------------------------------------------
    */
    $('.site-navigation .search-icon .search, a[href="acora-menu-search-button"]').on('click', function(e){
        e.preventDefault();
        var target = $('.acora-menu-search-holder');
        if(FWDAnimation.isTweening(target)){
             return;
        }
        target.css({'display':'block',
                    'transform':'translateY(100px)',
                    'opacity':'0'
                   });
        FWDAnimation.to(target[0], .8, {'transform':'translateY(0px)', opacity:1, ease:Expo.easeInOut});
    });

    $('.acora-menu-search-holder .close').on('click', function(){
        var target = $('.acora-menu-search-holder');
        
        if(FWDAnimation.isTweening(target)){
            return;
        }
        FWDAnimation.to(target[0], .8, {'transform':'translateY(100px)', 'opacity':0, ease:Expo.easeInOut, onComplete:function(){
             target.css({'display':'none'});}
        });
    });

    /*
     *  Fix footer CSS.
     *  -----------------------------------------------------
    */
    function fixFooterCss(){
        if(!window['use_only_vertical_menu']){
            sw = FWDUtils.getViewportSize().w;
            var menuHeight = 0; 
            var wpAdminHeight = 0;
            if($(window).width() >= limitW){
                menuHeight = $('.site-navigation').height();
            }
            if($('#wpadminbar').length){
                menuHeight = $('#wpadminbar').height();
                $('body').css({'padding-top': + menuHeight + 'px'});
               
                if(sw >= limitW){
                     menuHeight += navbarHeight;
                }
            }
            menuHeight += 160;
            $('.page-wrapper, .page-main .wrapper, .contact .wrapper, .blog-main .wrapper, .portfolio-main .wrapper').css({'min-height':'calc(100vh - ' + menuHeight + 'px)'});
        }else{
            // For custom pages with vertical menu by default.
            if($('.home-extended').length){
                if($('#wpadminbar').length){
                    menuHeight = $('#wpadminbar').height();
                    $('body').css({'padding-top': + menuHeight + 'px'});
                   
                    if(sw >= limitW){
                         menuHeight -= navbarHeight;
                    }
                    menuHeight += 160;
                    $('.home-extended .wrapper').css({'min-height':'calc(100vh - ' + menuHeight + 'px)'});
                }
            }
        }

        $('.vertical-menu--enabled .vertical-menu-toggle').css({'transition': 'none'});
        setTimeout(function(){
            $('.vertical-menu--enabled .vertical-menu-toggle').css({'transition': 'background-color .32s ease-out, color .32s ease-out, left .8s cubic-bezier(.7,0,.2,1), top .8s cubic-bezier(.7,0,.2,1)'});
        }, 50);
        
        var sh = FWDUtils.getViewportSize().h;
        if($('#home_simple, #contact_simple').length){
            $("body").css({'height':sh + 'px'});
        }
    }
    
    function fixFooterCssWhenPreviewBarIsActive(){
        if($('#wpadminbar').length){
            $("body").after('<style id="fix-preview" type="text/css">#wpadminbar{position:fixed;} html{margin-top: 0 !important;}</style>');
        }
    }
});