
(function(jQuery) {
    "use strict";
    jQuery(window).on('load', function(e) {

        jQuery('p:empty').remove();

        /*------------------------
                Page Loader
        --------------------------*/
        jQuery("#gen-loading").fadeOut();
        jQuery("#gen-loading").delay(0).fadeOut("slow");
        /*------------------------
                Search Button
        --------------------------*/
        jQuery('#gen-seacrh-btn').on('click', function() {
            jQuery('.gen-search-form').slideToggle();
            jQuery('.gen-search-form').toggleClass('gen-form-show');
            if (jQuery('.gen-search-form').hasClass("gen-form-show")) {
                jQuery(this).html('<i class="fa fa-times"></i>');
            } else {
                jQuery(this).html('<i class="fa fa-search"></i>');
            }
        });
        /*------------------------
                Search Button
        --------------------------*/
        jQuery('#gen-html-btn').on('click', function() {
            jQuery('.gen-html-form').slideToggle();
            jQuery('.gen-html-form').toggleClass('gen-html-show');
            if (jQuery('.gen-hml-form').hasClass("gen-html-show")) {
                jQuery(this).html('<i class="fa fa-times"></i>');
            } else {
                jQuery(this).html('<i class="ion-code-working"></i>');
            }
        });
        
        
        jQuery('.gen-account-menu').hide();
         jQuery('#gen-user-btn').on('click', function(e) {
            
            jQuery('.gen-account-menu').slideToggle();

             e.stopPropagation();
            // jQuery('.gen-account-menu').toggleClass('gen-form-show');
            // if (jQuery('.gen-account-menu').hasClass("gen-form-show")) {
            //     jQuery(this).html('<i class="fa fa-times"></i>');
            // } else {
            //     jQuery(this).html('<i class="fa fa-user"></i>');
            // }
        });

        jQuery('body').on('click' , function(){
            if(jQuery('.gen-account-menu').is(":visible"))
            {
                jQuery('.gen-account-menu').slideUp();
            }
        });
        /*------------------------
                Sidebar Toggle
        --------------------------*/
        jQuery("#gen-toggle-btn").on('click', function() {
            jQuery('#gen-sidebar-menu-contain').toggleClass("active");
        });
        jQuery('.gen-toggle-btn').click(function() {
            jQuery('body').addClass('gen-siderbar-open');
        });
        jQuery('.gen-close').click(function() {
            jQuery('body').removeClass('gen-siderbar-open');
        });
        /*------------------------
                Sticky Header
        --------------------------*/
        var view_width = jQuery(window).width();
        if (!jQuery('header').hasClass('gen-header-default') && view_width >= 1023)
        {
            var height = jQuery('header').height();
            jQuery('.gen-breadcrumb').css('padding-top', height * 1.3);
        }
        if (jQuery('header').hasClass('gen-header-default'))
        {
            jQuery(window).scroll(function() {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > 300) {
                    jQuery('.gen-bottom-header').addClass('gen-header-sticky animated fadeInDown animate__faster');
                } else {
                    jQuery('.gen-bottom-header').removeClass('gen-header-sticky animated fadeInDown animate__faster');
                }
            });
        }
        if (jQuery('header').hasClass('gen-has-sticky')) {
            jQuery(window).scroll(function() {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > 300) {
                    jQuery('header').addClass('gen-header-sticky animated fadeInDown animate__faster');
                } else {
                    jQuery('header').removeClass('gen-header-sticky animated fadeInDown animate__faster');
                }
            });
        }
        /*------------------------
                Back To Top
        --------------------------*/
        jQuery('#back-to-top').fadeOut();
        jQuery(window).on("scroll", function() {
            if (jQuery(this).scrollTop() > 250) {
                jQuery('#back-to-top').fadeIn(1400);
            } else {
                jQuery('#back-to-top').fadeOut(400);
            }
        });
        jQuery('#top').on('click', function() {
            jQuery('top').tooltip('hide');
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        if(jQuery('.tv-show-back-data').length)
        {
            var url = jQuery('.tv-show-back-data').data('url');
            console.log(url);
            var html = '';
            html += `<div class="tv-single-background">
                <img src="`+url+`">
            </div>`;
            jQuery('#main').prepend(html);
           
        }
    });
})(jQuery);

function show_history(cookie_name) {
  var history = $.cookie("history_tvweal");
  var history_data = [];
  var history_html = '';
  if ((history != undefined) && (history != '')) {
    history_data = eval(history);
  }
  if (history_data.length > 0) {
    for (var $i = 0; $i < history_data.length; $i++) {
      history_html += '<li><a href="' + history_data[$i].vod_url + '" title="' + history_data[$i].vod_name + '" class="drop-item-link"><i class="fa fa-play-circle"></i>' + history_data[$i].vod_name + '[' + history_data[$i].vod_part + ']</a></li>';
      historyclean_html = '<li><a onClick="javascript:new weal().removeCookie(&#39;history_tvweal&#39;);"><i class="fa fa-trash-alt"></i>Delete</a></li>';
    }
  } else {
    history_html = '<li><a><i class="fa fa-compass"></i>There is no record of watching the film</a></li>';
  }
  $(".historical").append(history_html);
  try {
    $(".historical").append(historyclean_html);
  } catch (e) { }
}



function weal() {
    this.setCookies = function(name) {
        var now = new Date();
        now.setDate(now.getDate() + 1);
        document.cookie = name + "=1;expires=" + now.toGMTString() + ";path=/;";
    },
    this.getCookies = function(name) {
        var idx = document.cookie.indexOf(name + "=");
        if (idx != -1) {
            var edx = document.cookie.indexOf(";", idx + name.length);
            var result = document.cookie.substring(idx, edx);
            return result;
        }
        return '';
    },
    this.weal = function(name) {
        var ck = this.getCookies(name);
        if (ck != '') {
            window.parent.location.reload();
        } else {
            this.setCookies(name);
            window.parent.location.reload();
        }
    },
    this.removeCookie = function(name) {
        var now = new Date();
        now.setDate(now.getDate() - 2);
        document.cookie = name + "=1;expires=" + now.toGMTString() + ";path=/;";
        window.parent.location.reload();
    }
}

function setCookie(name, value) {
  var now = new Date();
  now.setDate(now.getDate() + 30);
  document.cookie = name+"="+escape(value)+";expires=" + now.toGMTString() + "; path=/;";   
  window.parent.location.reload();
}

	
$(function() {
	$(window).scroll(function(event) {
		var ah = $(window).scrollTop();
		var ch = $(window).height()
		$('.gen-movie-img').each(function() {
			var bh = $(this).offset().top;
			if(ch + ah - 200 > bh) {
				var a = $(this).find('img').attr("data-src");
				$(this).find('img').attr("src", a);
			}
		})
	});
})
		
function fun() {
    let a = document.getElementById('playInfo')
    if(a.style.display == 'block'){
        a.style.display = 'none'
    }else{
        a.style.display = 'block'
    }
}
function funa() {
    let a = document.getElementById('playInfoa')
    if(a.style.display == 'block'){
        a.style.display = 'none'
    }else{
        a.style.display = 'block'
    }
}
function copyToClip(content, message) {
    var aux = document.createElement("input"); 
    aux.setAttribute("value", content); 
    document.body.appendChild(aux); 
    aux.select();
    document.execCommand("copy"); 
    document.body.removeChild(aux);
    if (message == null) {
        alert("The copy succeeded");
    } else{
        alert(message);
    }
}
$(function () {
  show_history();
  $(".historyclean").on("click", function () {
    $.cookie("history_tvweal", null, { expires: -1, path: '/' });
  });
});



function cookiesave(n, v, mins, dn, path) {
	if(n) {
		if(!mins) mins = 365 * 24 * 60;
		if(!path) path = "/";
		var date = new Date();
		date.setTime(date.getTime() + (mins * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
		if(dn) dn = "domain=" + dn + "; ";
		document.cookie = n + "=" + v + expires + "; " + dn + "path=" + path;
	}
}

function cookieget(n) {
	var name = n + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) == ' ') c = c.substring(1, c.length);
		if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function closeclick() {
	document.getElementById('bulletin-note').style.display = 'none';
	cookiesave('closeclick', 'closeclick', '', '', '');
	var thisNode=document.getElementById("bulletin-gg");
     thisNode.parentNode.removeChild(thisNode);
}

function clickclose() {
	if(cookieget('closeclick') == 'closeclick') {
		document.getElementById('bulletin-note').style.display = 'none';
      	var thisNode=document.getElementById("bulletin-gg");
         thisNode.parentNode.removeChild(thisNode);
	} else {
		document.getElementById('bulletin-note').style.display = 'block';
		var oDiv = document.querySelector('#bulletin-gg') ; oDiv.innerHTML = '<div class="mac_pop_bg"></div>'
	}
}
window.onload = clickclose;