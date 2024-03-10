/**
 * Vertical menu.
 *
 * @package acora
 * @since acora 1.0
 */
 
(function ($, window, document) {

  "use strict";

  var self;
  var pluginName = 'vertical-menu',
      defaults = {
        slideTime: 500,
        items: []
      };
  var logoHolder;
  var copyright ='';
  var icons = '';
  var VerticalMenu = function (settings) {
    self = this;
   
    if(fwdpt_logoPath){
      logoHolder = '<div class="has-logo"><a href="' + fwdpt_home +  '"><img src="' +  fwdpt_logoPath + '" alt="logo"/></a></div>';
    }else{
      logoHolder = '<p class="no-logo"><a href="' + fwdpt_home +  '">' + blog_name + '</a></p>';
    }
    if(acora_copyright){
      copyright += '<p class="copyright-text">' + acora_copyright + '</p>';
    }
    
   
    var acora_menuShare = JSON.parse(FWDUtils.decodeHtml(window['acora_menuShare']));
   
    if(acora_menuShare){
      var has_icons = false;
      $.each(acora_menuShare, function(key, value){ 
        if(value.length){
          has_icons = true;
        }
      });
      if(has_icons){
        icons = '<div class="icons-wrapper">';
        
        $.each(acora_menuShare, function(key, value){ 
          if(value){
            if(key == 'facebook'){
              icons += '<a href="' + value + '" target="_blank"><span class="fwdicon fwdicon-facebook"></span></a>';
            }else if(key == 'google'){
              icons += '<a href="' + value + '" target="_blank"><span class="fwdicon fwdicon-google-plus"></span></a>';
            }else if(key == 'twitter'){
              icons += '<a href="' + value + '" target="_blank"><span class="fwdicon fwdicon-twitter"></span></a>';
            }else if(key == 'pinterest'){
              icons += '<a href="' + value + '" target="_blank"><span class="fwdicon fwdicon-pinterest"></span></a>';
            }else if(key == 'linkedin'){
              icons += '<a href="' + value + '" target="_blank"><span class="fwdicon fwdicon-linkedin"></span></a>';
            }else if(key == 'instagram'){
              icons += '<a href="' + value + '" target="_blank"><span class="fwdicon fwdicon-instagram"></span></a>';
            }else if(key == 'flickr'){
              icons += '<a href="' + value + '" target="_blank"><span class="fwdicon fwdicon-flikr"></span></a>';
            }
          }
         });
      }
      icons += '</div>';
    }
    this.settings     = settings;
    this.$html        = this._buildHTML();
    this.$menu        = this.$html.find('.vertical-menu-items');
    this.$toggle      = this.$html.find('.vertical-menu-toggle');
    this.$toggleIn    = this.$menu.find('.vertical-menu-toggle');
    this.$overlay     = $('<div class="vertical-menu-dim"></div>').appendTo($('body'));
    this.$opened      = false;
    $('body').append(this.$html);
    this.menuItems = $('.vertical-menu-level-0');
    this.menuBottom = $('.copyright-main');
    $(self.menuBottom).css({'position':'relative'});
    
    window.addEventListener('resize', function(){
        if(!self.$opened) return;
        self.checkMenuBottom();
        self.position();
        self.stopUpdateBurgerScrollbar();
      }
    );
    setTimeout(self.checkMenuBottom, 500);
    this.startUpdateBurgerScrollbar = function(){
      if(window['menuScrollbar']) window['menuScrollbar'].allowMouseWheel = false;
      cancelAnimationFrame(self.animR);
      self.animR = requestAnimationFrame(self.checkMenuBottom);
    }
    this.stopUpdateBurgerScrollbar = function(){
      if(window['menuScrollbar']) window['menuScrollbar'].allowMouseWheel = true;
      cancelAnimationFrame(self.animR);
    }
    this.position = function(){
      if(!self.$opened) return;
      var menuWidth = $('.vertical-menu').width();
      $('.vertical-menu .fwd-scrollbar').not('.scroll-content').css({'transform':'translate(' + (-menuWidth + 'px') + ',0)'});
      $('.vertical-menu .background').not('.scroll-content').css({'transform':'translate(' + (-menuWidth + 'px') + ',0)'});
    }
   
    this.checkMenuBottom = function(){
     
      self.animR = requestAnimationFrame(self.checkMenuBottom);
      var scroll_pos = $(window).scrollTop();
      var window_height = $(window).height();
      var menu_items_top = $(window).height() - ($(self.menuItems).offset().top - scroll_pos + $(self.menuItems).height()) - $('.copyright-main').height() - 50;
      menu_items_top = Math.max(0, menu_items_top - 10);
      $(self.menuBottom).css({'transform':'translate(0,' + (menu_items_top + "px") + ')'});
    }
    self.checkMenuBottom();
    self.stopUpdateBurgerScrollbar();
    this.stopMenuOpenClicks = false;
   
    this.$toggle.on('click', function (e) {
      e && e.preventDefault();
      if(self.stopMenuOpenClicks) return;
      self.stopMenuOpenClicks = true;
      setTimeout(function(){self.stopMenuOpenClicks = false;}, 700);
      if(self.$html.is('.vertical-menu--showed')){
         self.hide();
      }else{
         if(window['menuScrollbar']) window['menuScrollbar'].hideScrollbar(true);
         if(window['menuScrollbar']) window['menuScrollbar'].showScrollbar(.9);
         self.startUpdateBurgerScrollbar();
         setTimeout(self.stopUpdateBurgerScrollbar, 100);
         self.show();
      }
    });
    this.stopMenuItemsOpenClicks = false;
    this.$html.find('.vertical-menu-children-toggle').on('click.vertical-menu', function (e) {
      e && e.preventDefault();
      
      if(self.stopMenuItemsOpenClicks) return;
      self.stopMenuItemsOpenClicks = true;
      setTimeout(function(){
        self.stopMenuItemsOpenClicks = false;
        self.stopUpdateBurgerScrollbar();
      }, 700);
      var $parent = $(this).parent(),
          $subMenu = $parent.children('ul'),
          showed = $parent.is('.vertical-menu-item-showed');
      var $allSubMenus = $('.vertical-menu-item-showed');
      var $allSubMenus = $(this).parent().parent().children();
      var $allSubMenus_ar = [];
      
      if($(this).parent().parent().hasClass('vertical-menu-level-0')){
          $('.vertical-menu-children-toggle').parent().removeClass('vertical-menu-item-showed');
          $('.vertical-menu-children-toggle').parent().children('ul').slideUp(700, 'easeInOutExpo', function() {});
      }
      $allSubMenus.each(function(index, el){
        if($(el).find('.vertical-menu-children-toggle').length !== 0) {
            $allSubMenus_ar.push($(el));
        } 
      });
      self.startUpdateBurgerScrollbar();
      if(showed){
          $subMenu.slideUp(700, 'easeInOutExpo', function() {});
          $subMenu.children().each(function(index, el){
              $(el).stop();
          });
      } else {
         
          //if(!$(this).parents().is('.vertical-sub-menu.vertical-menu-level-1')){
            $.each($allSubMenus_ar, function(inxex, el){
              $(el).find('.vertical-menu-children-toggle').parent().removeClass('vertical-menu-item-showed');
              $(el).children('ul').slideUp(700, 'easeInOutExpo', function() {});
            });
         // }
          $subMenu.slideDown(700, 'easeInOutExpo');
          var delay = 200;
          $subMenu.children().each(function(index, el){
            $(el).css('opacity', 0);
            setTimeout(function(){
              $(el).animate({opacity: 1}, 700, 'easeInOutExpo', function() {});
            }, delay);
            delay += 100
          });
      }
      $parent.toggleClass('vertical-menu-item-showed', !showed);
    });
    this.$html.find('.vertical-menu-link').on('click.vertical-menu', function () {
      $(this).addClass('vertical-menu-link-clicked');
    });
    this.$overlay.on('click', function (e) {
      self.hide();
    });
  };
  VerticalMenu.prototype = {
    show: function () {
      if (this.$html.is('.vertical-menu--showed')) {
        return;
      }
      $('html').addClass('vertical-menu-visible');
      this.$html.addClass('vertical-menu--showed');
      var menuWidth = $('.vertical-menu').width();
      FWDAnimation.to( $('.vertical-menu .fwd-scrollbar').not('.scroll-content')[0], .8, {transform:'translate(' + (-menuWidth + 'px') + ',0)', delay:.1, ease:Expo.easeInOut});
      FWDAnimation.to( $('.vertical-menu .background')[0], .8, {transform:'translate(' + (-menuWidth + 'px') + ',0)', ease:Expo.easeInOut});
      if(window['menuScrollbar']) window['menuScrollbar'].startToUpdate();
       self.$opened = true;
    },
    hide: function () {
      if (!this.$html.is('.vertical-menu--showed')) {
        return;
      }
      acoraResetToggleButton();
      $('html').removeClass('vertical-menu-visible');
      this.$html.removeClass('vertical-menu--showed');
      FWDAnimation.to( $('.vertical-menu .fwd-scrollbar').not('.scroll-content')[0], .8, {transform:"translate(0,0)", ease:Expo.easeInOut, onComplete:function(){
       
      }});
      FWDAnimation.to( $('.vertical-menu .background')[0], .8, {transform:"translate(0,0)", ease:Expo.easeInOut});
      if(window['menuScrollbar']) window['menuScrollbar'].stopToUpdate();
      self.$opened = false;
    },
    enable: function () {
      if (this.$html.is('.vertical-menu--enabled')) {
        return;
      }
      this.$html.addClass('vertical-menu--enabled');
      this.$html.show();
    },
    disable: function () {
      if (!this.$html.is('.vertical-menu--enabled')) {
        return;
      }
      var self = this;
      this.$html.removeClass('vertical-menu--enabled');
      this.$html.is('.showed') && this.hide();
      // this.$html.hide().removeClass('active');
    },
    _walker: function (items, level) {
      var html = '';
      _.each(items, function (item) {
        var el = '<li class="%activeClass"><a class="vertical-menu-link %activeClass" href="%href">%content</a>%childrenToggle%children</li>',
            children = '',
            activeClass = item.active ? 'vertical-menu-item-active' : '',
            childrenToggle = '';
        if (item.children) {
          children = self._walker.call(self, item.children, level + 1);
          childrenToggle = '<a href="#" class="vertical-menu-children-toggle"></a>';
        }
        var finalContent = (item.content);
        html += el.replace('%href', item.href)
                  .replace('%childrenToggle', childrenToggle)
                  .replace('%content', item.content)
                  .replace('%children', children)
                  .replace(new RegExp('%activeClass', 'g'), activeClass);
      });
      return '<ul class="vertical-sub-menu vertical-menu-level-' + level + '">' + html + '</ul>';
    },
    _buildHTML: function () {
      var html = '<div class="vertical-menu">' +
                      '<div class="vertical-menu-toggle-holder acora-button-hide"><a class="vertical-menu-toggle" href="#"><span></span></a></div>' +  
                      '<div class="background"></div>' +
                      '<div class="vertical-menu-items fwd-scrollbar">' +
                        logoHolder +
                         this._walker(this.settings.items, 0) +
                        '<div class="copyright-main">' +
                        '<div class="copyright">' + icons + copyright + '</div>' +
                        '</div>' +
                      '</div>' +
                   '</div>',
          $html = $(html);
          $html.find('.vertical-menu-item-active').parents('li').each(function () {
          $(this)
            .addClass('vertical-menu-item-active vertical-menu-item-showed')
            .children('.vertical-menu-link').addClass('vertical-menu-item-active');
          });
      return $html;
    },
  };
  window.VerticalMenu = VerticalMenu;
})(jQuery, window, document);