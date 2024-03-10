/**
 * Share.
 *
 * @package acora
 * @since acora 1.0
 */
 
 (function (window){
	'use strict';
	var FWDShare = function(holder, title, permalink, images_ar){
		var self = this;
		this.buttonsData_ar = ["copy", "facebook", "twitter", "google+", "LinkedIn", "pinterest"];
		this.stageContainer = document.getElementsByTagName("body")[0];
		this.buttons_ar = [];
		this.main_do = null;
		this.buttonW = 30;
		this.buttonH = 29;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.isMobile_bl = FWDUtils.isMobile;
		
		this.init = function(){
			if(holder){
				this.setupMainDo();
				this.setupButtons();
				this.addToContainer();
			}
			this.setupInfo();
		}

		// Setup main containers
		this.setupMainDo = function() {
            this.main_do = new FWDSDisplayObject("div", "absolute");
            this.main_do.getStyle().msTouchAction = "none";
            this.stageContainer.appendChild(this.main_do.screen);
        }

        // Setup info window.
        this.setupInfo = function(){
        	this.info = new FWDSDisplayObject("div");
            this.info.screen.className = "copy-link";
            this.info.setInnerHTML("The link has been copied to clipboard");
            this.info.setX(-5e3);
            document.documentElement.appendChild(this.info.screen);
        }

        // Setup buttons
     	this.setupButtons = function() {
            for (var i=0; i<this.buttonsData_ar.length; i++) {
                var data = this.buttonsData_ar[i];
                var icon;
                if(data == 'facebook'){
                	icon = " fwdicon fwdicon-facebook";
                }else if(data == 'google+'){
                	icon = " fwdicon fwdicon-google-plus";
                }else if(data == 'twitter'){
                	icon = " fwdicon fwdicon-twitter";
                }else if(data == 'pinterest'){
                	icon = " fwdicon fwdicon-pinterest";
                }else if(data == 'LinkedIn'){
                	icon = " fwdicon fwdicon-linkedin";
                }else if(data == 'copy'){
                	icon = " fwdicon fwdicon-clipboard";
                }
             	FWDSSimpleButton.setPrototype();
                var button = new FWDSSimpleButton(undefined,
                								 undefined,
                								 undefined,
                								 undefined,
                								 undefined,
                								 undefined,
                								 undefined,
                								 "<div class='table-fwds-button'><span class='table-cell-fwds-button" + icon + "'></span></div>",
                								 undefined,
                								 "FWDSButtonNormalState",
                								 "FWDSButtonSelectedState");
            	button.setX((this.buttonW + 2) * i)
               	button.id = i;
               	this.buttons_ar[i] = button;
               	this.main_do.addChild(button)
               	button.addListener(FWDSSimpleButton.MOUSE_UP, this.buttonCLick)
            }
            self.main_do.setWidth(this.buttonW * self.buttons_ar.length);
            self.main_do.setHeight(this.buttonH);
        }

        this.buttonCLick = function(e) {
            var id = e.target.id;
           
            if("facebook" == self.buttonsData_ar[id]){
            	self.openPopup("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(permalink), 700, 450);
            }else if("twitter" == self.buttonsData_ar[id]){
            	self.openPopup("https://twitter.com/home?status=" + self.title, 700, 450);
            }else if("LinkedIn" == self.buttonsData_ar[id]){
            	self.openPopup("https://www.linkedin.com/shareArticle?mini=true&url=" + permalink + "&title=" + self.title, 700, 450);
            }else if("google+" == self.buttonsData_ar[id]){
            	self.openPopup("https://plus.google.com/share?url=" + encodeURIComponent(permalink), 700, 450);
            }else if("pinterest" == self.buttonsData_ar[id]) {
                var n = images_ar ? "&media=" + images_ar[0] : "";
                self.openPopup("http://pinterest.com/pin/create/link/?url=" + encodeURIComponent(permalink) + n, 700, 450)
            }else if ("copy" == self.buttonsData_ar[id]) {
                var el = document.createElement("textarea");
                el.value = permalink;
                el.style = {
                    position: "absolute",
                    left: "-9999px"
                }
                document.body.appendChild(el);
                el.select();
                document.execCommand("copy");
                document.body.removeChild(el);
                self.shareBtn = e.e.currentTarget;
                self.showInfo(self.shareBtn, "The link has been copied to clipboard")
            }
        }

        // Show info
        this.showInfo = function(target, text, n, i) {
            self.info.setInnerHTML(text);
            self.ws = FWDUtils.getViewportSize();
            self.scrOffset = FWDUtils.getScrollOffsets();
            self.globalElX = target.getBoundingClientRect().left + target.offsetWidth;
            self.globalElY = target.getBoundingClientRect().top;
            if(n){
            	self.globalElY = (target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2 + self.info.getHeight() / 2);
            } 
            var x = self.globalElX - (self.info.getWidth() + target.offsetWidth) / 2;
            if(x < 0){
            	x = 0;
            }else if(x + self.info.getWidth() > self.ws.w){
            	self = self.ws.w - self.info.getWidth();
            }
          
            self.info.setX(x);
             self.info.setY(Math.round(self.globalElY + self.scrOffset.y - self.info.getHeight()));
            var s = "#000",
                r = "#FFF",
                a = 1;
            FWDAnimation.killTweensOf(self.info.screen), self.info.screen.style.opacity = 1, FWDAnimation.to(self.info.screen, .1, {
                backgroundColor: s,
                color: r,
                ease: Sine.easeOut
            }), FWDAnimation.to(self.info.screen, .1, {
                backgroundColor: r,
                color: s,
                delay: .1,
                ease: Sine.easeOut
            }), FWDAnimation.to(self.info.screen, .1, {
                backgroundColor: s,
                color: r,
                delay: .2,
                ease: Sine.easeOut
            }), FWDAnimation.to(self.info.screen, .1, {
                backgroundColor: r,
                color: s,
                delay: .3,
                ease: Sine.easeOut
            }), FWDAnimation.to(self.info.screen, 2, {
                opacity: 0,
                delay: a,
                onComplete: function() {
                    self.info.setX(-5e3)
                }
            })
        }
        // Open popup
        this.openPopup = function(e, t, n) {
            var i = parseInt((screen.width - t) / 2),
                o = parseInt((screen.height - n) / 2);
            FWDUtils.isMobile ? self.popupWindow = window.open(e) : self.popupWindow = window.open(e, "", "width=" + t + ", height=" + n + ", top=" + o + ", left=" + i)
        }
        // Add buttons to main container
        this.addToContainer = function() {
            holder.appendChild(this.main_do.screen);
            this.main_do.getStyle().position = "relative";
            this.main_do.setX(0);
        }
		this.init();
	};
	window.FWDShare = FWDShare;
}(window));

 /* FWDSSimpleButton */
(function (window){
var FWDSSimpleButton = function(nImg, 
								  sPath, 
								  dPath, 
								  alwaysShowSelectedPath, 
								  useHEXColorsForSkin_bl,
								  normalButtonsColor_str,
								  selectedButtonsColor_str,
								  iconCSSString, 
								  showHDIcon, 
								  normalCalssName,
								  selectedCalssName
								 ){
		
		var self = this;
		var prototype = FWDSSimpleButton.prototype;
		
		this.iconCSSString = iconCSSString;
		this.showHDIcon = showHDIcon;
		
		this.nImg = nImg;
		this.sPath_str = sPath;
		this.dPath_str = dPath;
		
		self.testButton = Boolean(String(self.iconCSSString).indexOf("download") != -1);
	
		this.n_do;
		this.s_sdo;
		this.d_sdo;
		
		this.toolTipLabel_str;
		
		if(this.nImg){
			this.totalWidth = this.nImg.width;
			this.totalHeight = this.nImg.height;
			self.buttonWidth = self.totalWidth;
			self.buttonHeight = self.totalHeight;
		}
		
		
		this.normalCalssName = normalCalssName;
		this.selectedCalssName = selectedCalssName;
		
		this.useHEXColorsForSkin_bl = useHEXColorsForSkin_bl;
		this.normalButtonsColor_str = normalButtonsColor_str;
		this.selectedButtonsColor_str = selectedButtonsColor_str;
		
		this.isShowed_bl = true;
		this.isSetToDisabledState_bl = false;
		this.isDisabled_bl = false;
		this.isDisabledForGood_bl = false;
		this.isSelectedFinal_bl = false;
		this.isActive_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl || alwaysShowSelectedPath;
		this.useFontAwesome_bl = Boolean(this.iconCSSString);
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			if(self.iconCSSString) self.setOverflow('visible');
			self.setupMainContainers();
			self.setNormalState();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			if(self.useFontAwesome_bl){
				self.n_do = new FWDSDisplayObject("div");	
				self.n_do.setInnerHTML(self.iconCSSString);
				self.addChild(self.n_do);
				
				if(self.showHDIcon){
					var hdImage = new Image();
					hdImage.src = "http://www.webdesign-flash.ro/icons/hd.png";
					self.hd_do = new FWDUVPDisplayObject("img");
					self.hd_do.setScreen(hdImage);
					self.hd_do.setWidth(7);
					self.hd_do.setHeight(5);
					self.setOverflow("visible");
					self.addChild(self.hd_do);
				};
			
				self.setFinalSize();
			}else{
				if(self.useHEXColorsForSkin_bl){
					self.n_do = new FWDSDisplayObject("div");
					self.n_do.setWidth(self.totalWidth);
					self.n_do.setHeight(self.totalHeight);
					self.n_do_canvas = FWDUtils.getCanvasWithModifiedColor(self.nImg, self.normalButtonsColor_str).canvas;
					self.n_do.screen.appendChild(self.n_do_canvas);
					self.addChild(self.n_do);
				}else{
					self.n_do = new FWDSDisplayObject("img");	
					self.n_do.setScreen(self.nImg);
					self.addChild(self.n_do);
				}
				
				if(self.allowToCreateSecondButton_bl){
					
					self.img1 = new Image();
					self.img1.src = self.sPath_str;
					var img2 = new Image();
					self.sImg = img2;
					
					if(self.useHEXColorsForSkin_bl){
						self.s_sdo = new FWDSDisplayObject("div");
						self.s_sdo.setWidth(self.totalWidth);
						self.s_sdo.setHeight(self.totalHeight);
						self.img1.onload = function(){
							self.s_sdo_canvas = FWDUtils.getCanvasWithModifiedColor(self.img1, self.selectedButtonsColor_str).canvas;
							self.s_sdo.screen.appendChild(self.s_sdo_canvas);
						}
						self.s_sdo.setAlpha(0);
						self.addChild(self.s_sdo);
					}else{
						self.s_sdo = new FWDUVPDisplayObject("img");
						self.s_sdo.setScreen(self.img1);
						self.s_sdo.setWidth(self.totalWidth);
						self.s_sdo.setHeight(self.totalHeight);
						self.s_sdo.setAlpha(0);
						self.addChild(self.s_sdo);
					}
					
					if(self.dPath_str){
						img2.src = self.dPath_str;
						self.d_sdo = new FWDUVPDisplayObject("img");
						self.d_sdo.setScreen(img2);
						self.d_sdo.setWidth(self.totalWidth);
						self.d_sdo.setHeight(self.totalHeight);
						self.d_sdo.setX(-100);
						self.addChild(self.d_sdo);
					};
					self.setWidth(self.totalWidth);
					self.setHeight(self.totalHeight);
				}
			}
			
			self.setButtonMode(true);
			self.screen.style.yellowOverlayPointerEvents = "none";
			
			if(self.hasPointerEvent_bl){
				self.screen.addEventListener("pointerup", self.onMouseUp);
				self.screen.addEventListener("pointerover", self.onMouseOver);
				self.screen.addEventListener("pointerout", self.onMouseOut);
			}else if(self.screen.addEventListener){	
				if(!self.isMobile_bl){
					self.screen.addEventListener("mouseover", self.onMouseOver);
					self.screen.addEventListener("mouseout", self.onMouseOut);
					self.screen.addEventListener("mouseup", self.onMouseUp);
				}
				self.screen.addEventListener("touchend", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e){
			self.dispatchEvent(FWDSSimpleButton.SHOW_TOOLTIP, {e:e});
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDSSimpleButton.MOUSE_OVER, {e:e});
				self.setSelectedState(true);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDSSimpleButton.MOUSE_OUT, {e:e});
				self.setNormalState(true);
			}
		};
		
		self.onMouseUp = function(e){
			
			if(self.isDisabledForGood_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2) return;
		
			self.dispatchEvent(FWDSSimpleButton.MOUSE_UP, {e:e});
		};
		
		self.checkCount = 0;
		this.setFinalSize = function(){
			
			clearInterval(self.checkId_int);
			if(self.checkCount > 6) return;
			self.lastWidth = self.n_do.screen.firstChild.offsetWidth;
			self.checkCount +=1;
		
			self.checkId_int = setInterval(function(){
				self.setFinalSize();
			},100);
			
			if(self.prevWidth == self.lastWidth || self.lastWidth == 0) return;
			self.setWidth(self.n_do.screen.firstChild.offsetWidth);
			self.setHeight(self.n_do.screen.firstChild.offsetHeight);
			self.n_do.setWidth(self.w);
			self.n_do.setHeight(self.h);
			self.buttonWidth = self.w;
			self.buttonHeight = self.h;
			self.totalWidth = self.w;
			self.totalHeight = self.h;
	
			
			if(self.hd_do){
				self.hd_do.setX(self.w - self.hd_do.w + 2);
				self.hd_do.setY( -2);	
			}
			
			self.prevWidth = self.lastWidth;
		}
		
		//##############################//
		// set select / deselect final.
		//##############################//
		self.setSelected = function(){
			self.isSelectedFinal_bl = true;
			if(!self.s_sdo) return;
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		self.setUnselected = function(){
			self.isSelectedFinal_bl = false;
			if(!self.s_sdo) return;
			FWDAnimation.to(self.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(animate){
			if(self.doNotallowToSetNormal) return;
			if(self.useFontAwesome_bl){
				FWDAnimation.killTweensOf(self.n_do.screen);
				if(animate){
					FWDAnimation.to(self.n_do.screen, .8, {className:self.normalCalssName, ease:Expo.easeOut});	
				}else{
					self.n_do.screen.className = self.normalCalssName;
				}
			}else{
				FWDAnimation.killTweensOf(self.s_sdo);
				FWDAnimation.to(self.s_sdo, .5, {alpha:0, ease:Expo.easeOut});	
			}
		};
		
		this.setSelectedState = function(animate){
			if(self.useFontAwesome_bl){
				FWDAnimation.killTweensOf(self.n_do.screen);
				if(animate){
					FWDAnimation.to(self.n_do.screen, .8, {className:self.selectedCalssName, ease:Expo.easeOut});	
				}else{
					self.n_do.screen.className = self.selectedCalssName;
				}
			}else{
				FWDAnimation.killTweensOf(self.s_sdo);
				FWDAnimation.to(self.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			}
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		this.setDisabledState = function(){
			if(self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = true;
			if(self.d_sdo) self.d_sdo.setX(0);
			if(self.hd_do) self.hd_do.setX(self.w - self.hd_do.w);
		};
		
		this.setEnabledState = function(){
			if(!self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = false;
			if(self.d_sdo) self.d_sdo.setX(-100);
			if(self.hd_do) self.hd_do.setX(-100000);
		};
		
		this.disable = function(){
			if(self.isDisabledForGood_bl  || self.isDisabled_bl) return;
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .6, {alpha:.4});
			self.setNormalState(true);
		};
		
		this.enable = function(){
			if(self.isDisabledForGood_bl || !self.isDisabled_bl) return;
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .6, {alpha:1});
		};
		
		this.disableForGood = function(){
			self.isDisabledForGood_bl = true;
			self.setButtonMode(false);
		};
		
		this.showDisabledState = function(){
			if(self.d_sdo) if(self.d_sdo.x != 0) self.d_sdo.setX(0);
			if(self.hd_do) self.hd_do.setX(self.w - self.hd_do.w + 2);
		};
		
		this.hideDisabledState = function(){
			if(self.d_sdo) if(self.d_sdo.x != -100) self.d_sdo.setX(-100);
			if(self.hd_do) self.hd_do.setX(-10000);
		};
	
		
		//#####################################//
		/* show / hide */
		//#####################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			
			FWDAnimation.killTweensOf(self);
			if(!FWDUtils.isIEAndLessThen9){
				if(FWDUtils.isIEWebKit){
					FWDAnimation.killTweensOf(self.n_do);
					self.n_do.setScale2(0);
					FWDAnimation.to(self.n_do, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastiself.easeOut});
				}else{
					self.setScale2(0);
					FWDAnimation.to(self, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastiself.easeOut});
				}
			}else if(FWDUtils.isIEAndLessThen9){
				self.setVisible(true);
			}else{
				self.setAlpha(0);
				FWDAnimation.to(self, .4, {alpha:1, delay:.4});
				self.setVisible(true);
			}
		};	
			
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			FWDAnimation.killTweensOf(self);
			FWDAnimation.killTweensOf(self.n_do);
			self.setVisible(false);
		};
		
		//##########################################//
		/* Update HEX color of a canvaas */
		//##########################################//
		self.updateHEXColors = function(normalColor_str, selectedColor_str){
			FWDUtils.changeCanvasHEXColor(self.nImg, self.n_do_canvas, normalColor_str);
			FWDUtils.changeCanvasHEXColor(self.img1, self.s_sdo_canvas, selectedColor_str);
		}
		
		self.init();
	};
	
	/* set prototype */
	FWDSSimpleButton.setPrototype = function(){
		FWDSSimpleButton.prototype = null;
		FWDSSimpleButton.prototype = new FWDSDisplayObject("div");
	};
	
	FWDSSimpleButton.CLICK = "onClick";
	FWDSSimpleButton.MOUSE_OVER = "onMouseOver";
	FWDSSimpleButton.SHOW_TOOLTIP = "showTooltip";
	FWDSSimpleButton.MOUSE_OUT = "onMouseOut";
	FWDSSimpleButton.MOUSE_UP = "onMouseDown";
	
	FWDSSimpleButton.prototype = null;
	window.FWDSSimpleButton = FWDSSimpleButton;
}(window));

 /* Display object */
(function (window){
	'use strict';
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDSDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		self.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas" || "input"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "inline-block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl =  FWDUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDUtils.hasTransform2d;
		if(FWDUtils.isFirefox || FWDUtils.isIE) self.hasTransform3d_bl = false;
		if(FWDUtils.isFirefox || FWDUtils.isIE) self.hasTransform2d_bl = false;
		this.hasBeenSetSelectable_bl = false;
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = null;
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}else{
				if(FWDUtils.isFirefox || FWDUtils.isIE){
					self.screen.style.userSelect = "element";
					self.screen.style.MozUserSelect = "element";
					self.screen.style.msUserSelect = "element";
				}else if(FWDUtils.isSafari){
					self.screen.style.userSelect = "text";
					self.screen.style.webkitUserSelect = "text";
				}else{
					self.screen.style.userSelect = "auto";
					self.screen.style.webkitUserSelect = "auto";
				}
				
				self.screen.style.khtmlUserSelect = "auto";
				self.screen.style.oUserSelect = "auto";
				
				if(FWDUtils.isIEAndLessThen9){
					self.screen.ondragstart = null;
					self.screen.onselectstart = null;
					self.screen.ontouchstart = null;
				}else{
					self.screen.ondragstart = undefined;
					self.screen.onselectstart = undefined;
					self.screen.ontouchstart = undefined;
				}
				
				self.screen.style.webkitTouchCallout='default';
				self.hasBeenSetSelectable_bl = false;
			}
			
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';	
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
				self.screen.style.width = self.w + "px";
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		self.getWidth = function(){
			if(self.type == "div" || self.type == "input"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
				self.screen.style.height = self.h + "px";
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		self.getHeight = function(){
			if(self.type == "div" || self.type == "input"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		self.addChild = function(e){
			if(self.contains(e)){	
				self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1);
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else{
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}
		};
		
		self.removeChild = function(e){
			if(self.contains(e)){
				self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1);
				self.screen.removeChild(e.screen);
			}else{
				//console.log(arguments.callee.caller.toString())
				throw Error("##removeChild()## Child dose't exist, it can't be removed!");
			};
		};
		
		self.contains = function(e){
			if(FWDUtils.indexOfArray(self.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		self.addChildAt = function(e, index){
			if(self.getNumChildren() == 0){
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else if(index == 1){
				self.screen.insertBefore(e.screen, self.children_ar[0].screen);
				self.screen.insertBefore(self.children_ar[0].screen, e.screen);	
				if(self.contains(e)){
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				self.screen.insertBefore(e.screen, self.children_ar[index].screen);
				if(self.contains(e)){
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}
		};
		
		self.getChildAt = function(index){
			if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(self.getNumChildren() == 0) throw Error("##getChildAt## Child dose not exist!");
			return self.children_ar[index];
		};
		
		self.getChildIndex = function(child){
			if(self.contains(child)){
				return FWDUtils.indexOfArray(self.children_ar, child);
			}
			return 0;
		};
		
		self.removeChildAtZero = function(){
			self.screen.removeChild(self.children_ar[0].screen);
			self.children_ar.shift();
		};
		
		self.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		
		//################################//
		/* event dispatcher */
		//#################################//
		self.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    self.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    self.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	
	    /* init */
		self.init();
	};
	
	window.FWDSDisplayObject = FWDSDisplayObject;
}(window));