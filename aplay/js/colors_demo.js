 /**
 * Theme accent color change, only used in the demo page.
 *
 * @package acora
 * @since acora 1.0
 */
 
jQuery(document).ready(function($){

    'use strict';

    var markerImg;
    var markerPath;
    var accentColors_ar = ['#ffba00', '#ff6c00', '#1BBF3F', '#0099FF'];
    var accentColorsShowed_bl = true;
    var accentColorsMarkerPath;
    var accentColorsCreated;
    var addSelector = true;
    var curId = 0;
 
    function initAccentColor(){
      
        if(location.href.indexOf('ultimate-video-player-homepage') != -1
        || location.href.indexOf('ultimate-video-player-gallery') != -1){
            addSelector = false;
        }
       
        $('body').append('<div class="accent-colors-holder acora-button-hide"><div class="color-boxes"></div><div class="settings-button"><div class="table"><span class="table-cell fwdicon-settings"></span></div></div></div><div class="color-style"><div class="holder"><span class="dark">Dark</span><span class="white">White</span></div></div>');
        setTimeout(function(){
            $('.accent-colors-holder').addClass('reveal');
        }, 10);
        for(var i=0; i<accentColors_ar.length; i++){
            $('.color-boxes').append('<div class="color-box" data-id="' + i + '" data-color="' + accentColors_ar[i] + '"  style="background-color:' + accentColors_ar[i] + '"></div>');
        }

        $('.color-box').each(function(index, element){
            $(element).on('click', function (e) {
                curId = $(this).data('id');
                disableEnableColorBoxes(curId);
                setAccentColor(accentColors_ar[$(this).data('id')]);
                document.cookie = 'acora_accent_color=' + accentColors_ar[$(this).data('id')] + '; expires=Thu, 18 Dec 2040 00:00:01 GMT; path=/';

            });
        });
        
        accentColorsCreated = true;
        hideShowColorBoxes(false);
        $('.settings-button').on('click', function(){
            hideShowColorBoxes(true);
        });
        if(!addSelector){
            $('.accent-colors-holder').css({'visibility':'hidden'})
        }
       
        var re = new RegExp('[; ]?acora_accent_color=([^\\s;]*)');
        var sMatch = (' ' + document.cookie).match(re);
        
        if(sMatch){
            for(var i=0; i<accentColors_ar.length; i++){
                if(accentColors_ar[i] == sMatch[1]){
                    curId = i;
                } 
            }
            disableEnableColorBoxes(curId);
        }else{
            disableEnableColorBoxes(0);
        }

 
        $('.dark').on('click', function(){
              document.cookie = 'acora_style_theme=dark; expires=Thu, 18 Dec 2040 00:00:01 GMT; path=/';
              $('<link rel="stylesheet" href="' + ACORA_URI + '/css/style-dark.css" type="text/css" />').insertAfter('#acora-theme-style-css');
              window['is_dark'] = true;
              $('.dark').addClass('color-style-disabled');
              $('.white').removeClass('color-style-disabled');
              disableEnableColorBoxes(curId);
        });

        $('.white').on('click', function(){
            document.cookie = 'acora_style_theme=white; expires=Thu, 18 Dec 2040 00:00:01 GMT; path=/';
            $('link[href="' + ACORA_URI + '/css/style-dark.css"]').remove();
            window['is_dark'] = false;
            $('.dark').removeClass('color-style-disabled');
            $('.white').addClass('color-style-disabled');
            disableEnableColorBoxes(curId);
        });

        var sMatch = getCookie('acora_style_theme');
        if(sMatch == 'dark'){
            $('<link rel="stylesheet" href="' + ACORA_URI + '/css/style-dark.css" type="text/css" />').insertAfter('#acora-theme-style-css');
            window['is_dark'] = true;
            $('.dark').addClass('color-style-disabled');
            $('.white').removeClass('color-style-disabled');
        }else{
            $('link[href="' + ACORA_URI + '/css/style-dark.css"]').remove();
            window['is_dark'] = false;
            $('.dark').removeClass('color-style-disabled');
            $('.white').addClass('color-style-disabled');
        }

        disableEnableColorBoxes(curId);
    }

    function getCookie(name) {
          var value = `; ${document.cookie}`;
          var parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function disableEnableColorBoxes(id){
        $('.color-box').each(function(index, element){
            if($(this).data('id') == id){
                $(this).css({'transform':'scale(.8)'});
            }else{
                $(this).css({'transform':'scale(1)'});
            }

            var firstColor = '#FFF';
            if(window['is_dark']){
                firstColor = '#1A1A1A';
            }
           
            $('#commentform input:not([type=submit])').css({'background-color':'' + firstColor + ''});

            var changeDarkLogo = true;
            var loc = window.location;

            if($('#acora_home').length
             || $('#acora_portfolio_archive').length
             || $('#home_simple').length
             || $('#acora_portfolio_igp_archive').length
             || $('#page_only_shortcode_fullscreen').length
             || $('#uvp_home').length
             || $('#contact_simple').length
             || $('.portfolio-fullscreen').length
             || $('.portfolio-vertical').length
             || $('#fwdsiscPlaylist_fullscreen_playlist_1').length){
                changeDarkLogo = false;
            }

            var imgPath;
            var imgPath2;
            if(id == 0){
                if(is_dark){
                    imgPath = ACORA_URI +'/assets/img/logo-1-1.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-1.png';
                }else{
                    imgPath = ACORA_URI +'/assets/img/logo-1.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-1-1.png';
                }
            }else if(id == 1){
                if(is_dark){
                    imgPath = ACORA_URI +'/assets/img/logo-2-2.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-2.png';
                }else{
                    imgPath = ACORA_URI +'/assets/img/logo-2.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-2-2.png';
                }
            }else if(id == 2){
                if(is_dark){
                    imgPath = ACORA_URI +'/assets/img/logo-3-3.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-3.png';
                }else{
                    imgPath = ACORA_URI +'/assets/img/logo-3.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-3-3.png';
                }
            }else if(id == 3){
                if(is_dark){
                    imgPath = ACORA_URI +'/assets/img/logo-4-4.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-4.png';
                }else{
                    imgPath = ACORA_URI +'/assets/img/logo-4.png';
                    imgPath2 = ACORA_URI +'/assets/img/logo-4-4.png';
                }
            }
           
            $('.has-logo img, .left-column img').attr('src', imgPath); 
            if(changeDarkLogo){
                $('.vm-logo img').attr('src', imgPath2);
            }else{
                if(is_dark){
                    $('.vm-logo img').attr('src', imgPath); 
                    $('.uvp-info img').attr('src', imgPath); 
                }else{
                    $('.vm-logo img').attr('src', imgPath2); 
                    $('.uvp-info img').attr('src', imgPath2); 
                }
            }
             
            $('.contact-simple .info img, .logo img').attr('src', imgPath2); 
        });
    }

    function hideShowColorBoxes(animate, forceHide){
        var pos =  $('.color-boxes').height() + 'px';
        var pos2 = -$('.color-style .holder').width() + 'px';
        if(forceHide) accentColorsShowed_bl = true;
        if(accentColorsShowed_bl){
            pos =  $('.color-boxes').height() + 'px';
            pos2 = (-$('.color-style .holder').width()) + 'px';
            accentColorsShowed_bl = false;
        }else{
            pos = 0;
            pos2 = 0;
            accentColorsShowed_bl = true;
            setTimeout(function(){
                window.addEventListener('click', hideColorBoxesOnWindowClick);
            }, 50);
        }

        $('.color-boxes').stop();
        $('.color-style .holder').stop();
        if(animate){
            $('.color-boxes').animate({ // call animate on the object
                top: pos 
            }, {
                duration: 800,
                easing: 'easeInOutExpo'
            });
             $('.color-style .holder').animate({ // call animate on the object
                left: pos2 
            }, {
                duration: 800,
                easing: 'easeInOutExpo'
            });
        }else{
            $('.color-boxes').css({'top':pos});
            $('.color-style .holder').css({'left':pos2});
        }
    }

    function hideColorBoxesOnWindowClick(){
        window.removeEventListener('click', hideColorBoxesOnWindowClick);
        $('.color-boxes').stop();
        hideShowColorBoxes(true, true);
    }

    function setAccentColor(color){
        $('#accent_color').remove();
        var style = '<style id="accent_color" type="text/css">';

        /* Categories selector. */
        style += '.FWDHS .main-holder .text{';
        style +=    'color:' + color + ' !important;';
        style += '}';

        /* Vertical menu. */
        style += '.acora-menu-search-holder .submit:hover,';
        style += '.acora-menu-search-holder .close:hover,';
        style += '.acora-menu-search-holder .close:hover,';

        style += '.vertical-menu a.vertical-menu-item-active,';
        style += '.vertical-menu .copyright-main .icons-wrapper a:hover,'
        style += '.vertical-menu-link:hover{';
        style +=    'color:' + color + ';'
        style += '}';

        style += '.fwd-scrollbar-handler{';
        style +=    'background:' + color + ';'
        style += '}';

        /* Horizontal menu. */
        style += '.site-navigation .search-icon:hover,';
        style += '.site-navigation .current-menu-ancestor > a,';
        style += '.site-navigation .current-menu-item > a,';
        style += '.site-navigation .active > a,';
        style += '.site-navigation a:hover{';
        style +=    'color:' + color + ';'
        style += '}';
    

        /* Extended homepage. */
        style += '.home-extended .header-holder .pp-play:hover path,';
        style += '.home-extended .header-holder .pp-pause:hover path{';
        style +=    'fill:' + color + ';'
        style += '}'
        style += '.home-extended .images .large-info .first-button{';
        style +=    'background:' + color + ';'
        style += '}';
        style += '.home-extended .our-blog .grid-holder .category,';
        style += '.home-extended .our-blog .grid-holder .blog-read-more a:hover,';
        style += '.home-extended .our-blog .grid-holder .blog-read-more a:hover:after,';
        style += '.home-extended .our-team .grid-holder .name a:hover,';
        style += '.home-extended .our-team .grid-holder .link a:hover,';
        style += '.portfolio .default-categories-main .categories .fwdicon:before,';
        style += '.portfolio .default-likes-main .like .fwdicon:before,';
        style += '.default-categories-main .categories .category,';
        style += '.home-extended .story #st_img2 a:hover .arrow,';
        style += '.wp-block-quote p:before{';
        style +=    'color:' + color + ' !important;'
        style += '}';

        /* Home simple. */
        style += '.home-simple .entry-content .first-button{';
        style +=    'background:' + color + ';'
        style += '}';
        style += '.about-us .team .email a{';
        style +=    'background-image: linear-gradient(transparent calc(100% - 1px), ' + color + ' 1px);';
        style += '}';
        style += '.about-us .detailed-grid .details .holder .button-light:hover{';
        style +=    'background: ' + color + ';';
        style +=    'border-color: ' + color + ';';
        style += '}';
        
        /* About us. */
        style += '.about-us #acora_team_grid .link a:hover,';
        style += '.about-us #acora_team_grid .name a:hover,';
        style += '.about-us .detailed-grid .details .holder .main-color,';
        style += '.about-us .we-are-grid .image a .text strong,';
        style += '.about-us .we-are-grid .image a:hover .arrow,';
        style += '.about-us .share-btns-container a:hover,';
        style += '.about-us .team .position{';
        style +=    'color:' + color + ' !important;';
        style += '}';
        style += '.about-us .video-holder .pp-play:hover path,';
        style += '.about-us .video-holder .pp-pause:hover path{';
        style +=    'fill:' + color + ';'
        style += '}'

        /* About me. */
        style += '.about-me .contact .form-submit input,';
        style += '.about-me .main-info .info span{';
        style +=    'background:' + color + ';'
        style += '}';
        style += '.contact-simple .cs-main-form-holder .fwdicon-close:hover,';
        style += '.about-me .accordion .panel-title a:hover,';
        style += '.about-me .main-info .info .share-btns-container a:hover span{';
        style +=    'color:' + color + ';'
        style += '}';

        /* Contact. */
        style += '.contact-simple .entry-content .first-button,';
        style += '.contact .comment-respond .inline:before,';
        style += '.contact-simple .comment-respond .inline:before{';
        style +=    'background:' + color + ';'
        style += '}';

        /* 404 page. */
        style += '.page-not-found a:hover{';
        style +=    'color:' + color + ';'
        style += '}';

        /* Blog, page, post. */
        style += ' blockquote p:before,';
        style += '.wp-block-pullquote p:before,';
        style += '.related-posts .extra-text-selected,';
        style += '.profile-widget .icons-wrapper a:hover,';
        style += '.profile-widget .icons-wrapper a:focus,';
        style += '.blog-main .read-more .button:hover,';
        style += '.blog-main .entry-content .title a:hover,';
        style +=  '.blog-main .read-more .button:hover:before{';
        style +=    'color:' + color + ' !important;'
        style += '}';
        
        style += ' .widget_search .wp-block-search__button,'
        style += '.sidebar .widget_search button:hover,';
        style +=  '.blog-main .entry.sticky .title:after,';
        style +=  '.blog-main article.sticky .title:after,';
        style +=  '.posts .single .entry-content .wp-block-file a:nth-child(2),';
        style +=  '.related-posts .title:before{';
        style +=    'background:' + color + ';'
        style += '}';
       
        /* Portfolio archive. */
        style += '.PGMenuSelectorTextSelected,';
        style += '.PGMenuButtonTextSelected,';
        style += '.FWDSButtonSelectedState,'
        style += '.posts .single .meta .entry-date.comments a:hover,',
        style += '.related-projects .default-categories-main .categories .fwdicon-categories:before,'
        style += '.related-projects .default-likes-main .like .fwdicon:before,';
        style += '.fwdigp .default-categories-main .categories .fwdicon-categories:before,';
        style += '.fwdigp .default-likes-main .like .fwdicon:before,';
        style += '.portolio-archive .default-categories-main .categories .fwdicon-categories:before,';
        style += '.portolio-archive .default-likes-main .like .fwdicon:before{';
        style +=    'color:' + color + ' !important;'
        style += '}';
        
        /* Portfolio single. */
        style += '.fwdigp .close,';
        style +=  '.protected-post-form input[type="submit"],';
        style += '.portfolio-main .related-projects .title:before{';
        style +=    'background:' + color + ';'
        style += '}';
        style += '.posts .single .meta .entry-date.categories a:hover,';
        style += '.posts .single .meta .entry-date.posted-by a:hover,';
        style += '.posts .single .fwdicon-love{';
        style +=    'color:' + color + ';'
        style += '}';

        /* Comments. */
        style += '#comments .bypostauthor .bypostauthor-icon{';
        style +=    'border-color:' + color + ';'
        style += '}';
        style += '#respond .submit,';
        style += '#respond #cancel-comment-reply-link,';
        style += '#respond #cancel-comment-reply-link,';
        style += ' #reply-title:before,';
        style += '#comments .comment-actions a,';
        style += '#comments .comment-actions .comment-reply-link,';
        style += '#comments .title:before{';
        style +=    'background:' + color + ';'
        style += '}';
        style += '#comments .bypostauthor .bypostauthor-icon,';
        style += '.posts .single .fwdicon-love{';
        style +=    'color:' + color + ';'
        style += '}';
        style += '</style>';
        $('head').append(style);
        
    }

    /*
     *  Replace commets avatars.
     *  -----------------------------------------------------
    */
    function replaceCommentImagesForDemo(){
        var i =0;
        $('.commentlist li').children().each(function(){
            var src;
            if(i == 0){
                src = ACORA_URI + '/assets/img/avatar/1.png';
            }else if(i == 1){
                src = ACORA_URI + '/assets/img/avatar/2.png';
            }else if(i == 3){
                src = ACORA_URI + '/assets/img/avatar/4.png';
            }else if(i == 4){
                src = ACORA_URI + '/assets/img/avatar/6.png';
            }
            $(this).find('img').removeAttr('srcset');
            $(this).find('img').attr('src', src);
            i++;
        })
    }
    initAccentColor();
    replaceCommentImagesForDemo();
});