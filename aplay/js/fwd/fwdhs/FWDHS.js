/* Gallery */
(function (window){
	'use strict';
	var FWDHS = function(props){
		
		var self = this;
	
		/* init gallery */
		self.init = function(){
		
			FWDTweenLite.ticker.useRAF(true);
			this.props_obj = props;
			this.listeners = {events_ar:[]};
			 
			if(!this.props_obj){
				alert("FWDHS constructor properties object is not defined!");
				return;
			}
			
			this.instanceName_str = this.props_obj.instanceName;
			
			if(!this.props_obj.instanceName){
				alert("FWDHS instance name is required please make sure that the instanceName parameter exsists and it's value is uinique.");
				return;
			}
			
			if(window[this.instanceName_str]){
				alert("FWDHS instance name " + this.instanceName_str +  " is already defined and contains a different instance reference, set a different instance name.");
				return;
			}else{
				window[this.instanceName_str] = this;
			}
		
			if(!this.props_obj){
				alert("FWDHS constructor properties object is not defined!");
				return;
			}
		
			this.body = document.getElementsByTagName("body")[0];
			this.stageContainer = null;
			
		
			this.stageContainer = FWDHSUtils.getChildById(this.props_obj.parentId);
			
			
			this.data = null;
			this.customContextMenu_do = null;
			this.imageManager_do = null;
			this.info_do = null;
			this.main_do = null;
			this.preloader_do = null;
			this.playlist_ar = null;
			this.backgroundColor_str = this.props_obj.backgroundColor || "transparent";
			this.id = -1;
			this.catId = -1;
			this.prevCatId = -2;
			this.prevId = -2;
			this.stageWidth = 0;
			this.stageHeight = 0;
			this.totalimages;
		
			this.isMobile_bl = FWDHSUtils.isMobile;
			this.hasPointerEvent_bl = FWDHSUtils.hasPointerEvent;
		
			this.setupMainDo();
			this.startResizeHandler();
			setTimeout(self.setupSlider, 50);	
		};
		
		this.setupSlider = function(){
			if(self.data) return;
			self.setupData();
			self.setupInfoWindow();
		}

		//#############################################//
		/* setup main do */
		//#############################################//
		this.setupMainDo = function(){
			FWDHSUtils.checkIfHasTransofrms();
			this.main_do = new FWDHSDisplayObject("div", "relative");
			this.main_do.getStyle().msTouchAction = "none";
			this.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			this.main_do.getStyle().webkitFocusRingColor = "rgba(0, 0, 0, 0)";
			this.main_do.screen.className = "FWDHS fwd-hide-opacity";
			this.main_do.getStyle().width = "100%";
			this.main_do.getStyle().height = "100%";
			this.main_do.setBkColor(this.backgroundColor_str);
			if(!FWDHSUtils.isMobile || (FWDHSUtils.isMobile && FWDHSUtils.hasPointerEvent)) this.main_do.setSelectable(false);
		
			this.main_do.getStyle().position = "absolute";
			document.documentElement.appendChild(this.main_do.screen);
			this.stageContainer.style.overflow = "hidden";
		};
		
		//#############################################//
		/* resize handler */
		//#############################################//
		this.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", self.onResizeHandler);
				window.addEventListener("scroll", self.onScroll);
				window.addEventListener("orientationchange", self.orientationChange);
			}
			setTimeout(self.resizeHandler, 100);
		};
		
		this.onResizeHandler = function(e){
			self.resizeHandler();
			clearTimeout(self.resizeHandlerId2_to);
			self.resizeHandlerId2_to = setTimeout(function(){self.resizeHandler();}, 50);
		};
		
		this.orientationChange = function(){
			clearTimeout(self.scrollEndId_to);
			clearTimeout(self.resizeHandlerId2_to);
			clearTimeout(self.orientationChangeId_to);
			
			self.orientationChangeId_to = setTimeout(function(){
				self.orintationChanceComplete_bl = true; 
				self.resizeHandler();
				}, 1000);
		};

		this.onScroll = function(e){
			self.scrollOffsets = FWDHSUtils.getScrollOffsets();
			if(self.scrollOffsets.y) self.scrollY = self.scrollOffsets.y;
		}
		
		this.resizeHandler = function(overwrite){
			var viewportSize = FWDHSUtils.getViewportSize();
			self.scrollOffsets = FWDHSUtils.getScrollOffsets();
			self.ws = viewportSize;
			var scale;
		
			self.wsw = viewportSize.w;
			self.wsh = viewportSize.h;
			self.pageXOffset = self.scrollOffsets.x;
			self.pageYOffset = self.scrollOffsets.y;

			self.main_do.setX(0);
			self.main_do.setY(0);
			self.stageWidth = viewportSize.w;
			self.stageHeight = viewportSize.h;
		
			self.main_do.setWidth(self.stageWidth);
			self.main_do.setHeight(self.stageHeight);
			
			self.globalX = self.main_do.getGlobalX();
			self.globalY = self.main_do.getGlobalY();
			
			if(self.preloader_do) self.positionPreloader();
			
			if(self.stageWidth < 1100){
				self.isVertical_bl = true;
			}else{
				self.isVertical_bl = false;
			}

			if(self.imageManager_do){
				self.imageManager_do.resizeAndPosition();
				scrollTo(0, self.scrollY);
			}
		};
		
		//#############################################//
		/* setup info_do */
		//#############################################//
		self.setupInfoWindow = function(){
			FWDHSInfo.setPrototype();
			self.info_do = new FWDHSInfo(self, self.data.warningIconPath_str);
		};	
		
		//#############################################//
		/* setup context menu */
		//#############################################//
		self.setupContextMenu = function(){
			self.customContextMenu_do = new FWDHSContextMenu(self.main_do, self.data.rightClickContextMenu_str);
		};
	
		//#############################################//
		/* setup data */
		//#############################################//
		self.setupData = function(){
			FWDHSData.setPrototype();
			self.data = new FWDHSData(self.props_obj, self.rootElement_el, self);
			
			self.data.addListener(FWDHSData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
			self.data.addListener(FWDHSData.LOAD_ERROR, self.dataLoadError);
			self.data.addListener(FWDHSData.SKIN_LOAD_COMPLETE, self.dataSkinLoadComplete);
		};
		
		self.onPreloaderLoadDone = function(){
			self.positionPreloader();
		};
		
		self.dataLoadError = function(e){
			if(self.preloader_do) self.preloader_do.hide(false);
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.text);
			setTimeout(self.resizeHandler, 200);
			self.dispatchEvent(FWDHS.ERROR, {error:e.text});
		};
		
		self.dataSkinLoadComplete = function(){	
			self.isReady_bl = true;
			
			if(self.totalPlaylists == 1) showCategoriesMenuButton_bl = false;
			self.setupContextMenu();
			self.id = self.data.startAtimage;
			self.setCategory();
			self.setupPreloader();
			self.positionPreloader();
			self.dispatchEvent(FWDHS.READY);
		};
		
	
		//#############################################//
		/* setup preloader */
		//#############################################//
		self.setupPreloader = function(){
			FWDHSSlideshowPreloader.setPrototype();
			self.preloader_do = new FWDHSSlideshowPreloader(
				self, 
				self.data.preloaderPosition,
				self.data.slideshowRadius, 
				self.data.slideshowBackgroundColor, 
				self.data.slideshowFillColor, 
				self.data.slideshowStrokeSize, 
				1,
				true);
			self.main_do.addChild(self.preloader_do);
			self.preloader_do.show(true);
			self.preloader_do.startPreloader();
			
		};
		
		self.positionPreloader = function(){
			if(!self.preloader_do) return;
			self.preloader_do.positionAndResize();
		};
	
		//############################################//
		/* Update category */
		//############################################//
		this.setCategory = function(){
			if(!self.isReady_bl) return;
			
			self.playlist_ar = self.data.playlist_ar.playlistimages;
			
			self.setupImageManager();	
			self.imageManager_do.setupImages();
			setTimeout(function(){
				self.preloader_do.hide(true);
			}, 1000);
		};
		
		//#####################################//
		/* Setup image manager */
		//####################################//
		this.setupImageManager = function(){
			FWDHSImageManager.setPrototype();
			self.imageManager_do = new FWDHSImageManager(self, self.data);
			self.imageManager_do.addListener(FWDHS.ERROR, self.loadErrorImage);
			self.main_do.addChild(self.imageManager_do);
		}
		
		this.loadErrorImage = function(e){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.text);
		};
		
		//###########################################//
		/* event dispatcher */
		//###########################################//
		this.addListener = function (type_str, listener){
	    	if(!self.listeners) return;
	    	if(type_str == undefined) throw Error("type_str is required.");
	    	if(typeof type_str === "object") throw Error("type_str must be of type_str String.");
	    	if(typeof listener != "function") throw Error("listener must be of type_str Function.");
	    	
	        var event = {};
	        event.type_str = type_str;
	        event.listener = listener;
	        event.target = self;
	        self.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type_str, props){
	    	if(self.listeners == null) return;
	    	if(type_str == undefined) throw Error("type_str is required.");
	    	if(typeof type_str === "object") throw Error("type_str must be of type_str String.");
	    	
	        for (var i=0, len=self.listeners.events_ar.length; i < len; i++){
	        	if(self.listeners.events_ar[i].target === self && self.listeners.events_ar[i].type_str === type_str){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		self.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		self.listeners.events_ar[i].listener.call(self, self.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    this.removeListener = function(type_str, listener){
	    	if(type_str == undefined) throw Error("type_str is required.");
	    	if(typeof type_str === "object") throw Error("type_str must be of type_str String.");
	    	if(typeof listener != "function") throw Error("listener must be of type_str Function." + type_str);
	    	
	        for (var i=0, len=self.listeners.events_ar.length; i < len; i++){
	        	if(self.listeners.events_ar[i].target === self 
	        			&& self.listeners.events_ar[i].type_str === type_str
	        			&& self.listeners.events_ar[i].listener ===  listener
	        	){
	        		self.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };		
		self.init();
	};

	
	FWDHS.RESPONSIVE = "responsive";
	FWDHS.FLUID_WIDTH = "fluidwidth";
	FWDHS.FLUID_WIDTH_AND_HEIGHT = "fluidwidthandheight";
	FWDHS.AFTER_PARENT = "afterparent";
	FWDHS.FULL_SCREEN = "fullscreen";
	FWDHS.ERROR = "error";
	
	FWDHS.FILP_FROM_LEFT_TO_RIGHT = "flipFromLeftToRight";
	FWDHS.FADE = "fade";
	FWDHS.FADE_FROM_BOTTOM_TO_TOP = "fadeFromBottomToTop";
	FWDHS.GO_NORMAL_SCREEN = "goNormalScreen";
	FWDHS.GO_FULL_SCREEN = "goFullScrren";
	FWDHS.SHOW_START = "showStart";
	FWDHS.SHOW_COMPLETE = "showComplete";
	FWDHS.HIDE_START = "hideStart";
	FWDHS.HIDE_COMPLETE	= "hidecComplete";
	FWDHS.CATEGORY_UPDATE = "categoryUpdate";
	FWDHS.image_UPDATE = "imageUpdate";
	FWDHS.BUTTONS_IN = "in";
	FWDHS.READY = "ready";
	FWDHS.ERROR = "error";

	
	FWDHS.MAXIMIZE_COMPLETE = "maximizeComplete";
	
	window.FWDHS = FWDHS;
	
}(window));/* Context menu */
(function (){
	var FWDHSContextMenu = function(e, showMenu){
		
		var self = this;
		this.parent = e;
		this.url = "http://www.webdesign-flash.ro";
		this.menu_do = null;
		this.normalMenu_do = null;
		this.selectedMenu_do = null;
		this.over_do = null;
		this.isDisabled_bl = false;
		
		this.showMenu_bl = showMenu;
	
		this.init = function(){
			self.updateParent(self.parent);
		};
	
		this.updateParent = function(parent){
			if(self.parent){
				if(self.parent.screen.addEventListener){
					self.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler);
				}else{
					self.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler);
				}
				
			}
			self.parent = parent;
			
			if(self.parent.screen.addEventListener){
				self.parent.screen.addEventListener("contextmenu", this.contextMenuHandler);
			}else{
				self.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler);
			}
		};
		
		this.contextMenuHandler = function(e){
			if(self.isDisabled_bl) return;
			if(showMenu =="disabled"){
				if(e.preventDefault){
					e.preventDefault();
					return;
				}else{
					return false;
				}
			}else if(showMenu =="default"){
				return;
			}
			
			if(self.url.indexOf("sh.r") == -1) return;
			self.setupMenus();
			self.parent.addChild(self.menu_do);
			self.menu_do.setVisible(true);
			self.positionButtons(e);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.attachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
			
		};
		
		this.contextMenuWindowOnMouseDownHandler = function(e){
			var viewportMouseCoordinates = FWDHSUtils.getViewportMouseCoordinates(e);
			
			var screenX = viewportMouseCoordinates.screenX;
			var screenY = viewportMouseCoordinates.screenY;
			
			if(!FWDHSUtils.hitTest(self.menu_do.screen, screenX, screenY)){
				if(window.removeEventListener){
					window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				}else{
					document.documentElement.detachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
				}
				self.menu_do.setX(-500);
			}
		};
		
		/* setup menus */
		this.setupMenus = function(){
			if(this.menu_do) return;
			this.menu_do = new FWDHSDisplayObject("div");
			self.menu_do.setX(-500);
			this.menu_do.getStyle().width = "100%";
			
			this.normalMenu_do = new FWDHSDisplayObject("div");
			this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.normalMenu_do.getStyle().padding = "4px";
			this.normalMenu_do.getStyle().fontSize = "12px";
			this.normalMenu_do.getStyle().color = "#000000";
			this.normalMenu_do.setInnerHTML("&#0169; made by FWD");
			this.normalMenu_do.setBkColor("#FFFFFF");
			
			this.selectedMenu_do = new FWDHSDisplayObject("div");
			this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.selectedMenu_do.getStyle().padding = "4px";
			this.selectedMenu_do.getStyle().fontSize = "12px";
			this.selectedMenu_do.getStyle().color = "#FFFFFF";
			this.selectedMenu_do.setInnerHTML("&#0169; made by FWD");
			this.selectedMenu_do.setBkColor("#000000");
			this.selectedMenu_do.setAlpha(0);
			
			this.over_do = new FWDHSDisplayObject("div");
			this.over_do.setBkColor("#FF0000");
			this.over_do.setAlpha(0);
			
			this.menu_do.addChild(this.normalMenu_do);
			this.menu_do.addChild(this.selectedMenu_do);
			this.menu_do.addChild(this.over_do);
			this.parent.addChild(this.menu_do);
			this.over_do.setWidth(this.selectedMenu_do.getWidth());
			this.menu_do.setWidth(this.selectedMenu_do.getWidth());
			this.over_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setVisible(false);
			
			this.menu_do.setButtonMode(true);
			this.menu_do.screen.onmouseover = this.mouseOverHandler;
			this.menu_do.screen.onmouseout = this.mouseOutHandler;
			this.menu_do.screen.onclick = this.onClickHandler;
		};
		
		this.mouseOverHandler = function(){
			if(self.url.indexOf("w.we") == -1) self.menu_do.visible = false;
			FWDAnimation.to(self.normalMenu_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(self.selectedMenu_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		this.mouseOutHandler = function(){
			FWDAnimation.to(self.normalMenu_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(self.selectedMenu_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		this.onClickHandler = function(){
			window.open(self.url, "_blank");
		};
		
		/* position buttons */
		this.positionButtons = function(e){
			var viewportMouseCoordinates = FWDHSUtils.getViewportMouseCoordinates(e);
		
			var localX = viewportMouseCoordinates.screenX - self.parent.getGlobalX(); 
			var localY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			var finalX = localX + 2;
			var finalY = localY + 2;
			
			if(finalX > self.parent.getWidth() - self.menu_do.getWidth() - 2){
				finalX = localX - self.menu_do.getWidth() - 2;
			}
			
			if(finalY > self.parent.getHeight() - self.menu_do.getHeight() - 2){
				finalY = localY - self.menu_do.getHeight() - 2;
			}
			self.menu_do.setX(finalX);
			self.menu_do.setY(finalY);
		};
		
		//####################################//
		/* Enable or disable */
		//####################################//
		this.disable = function(){
			self.isDisabled_bl = true;
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
		};
		
		this.init();
	};
	
	
	FWDHSContextMenu.prototype = null;
	window.FWDHSContextMenu = FWDHSContextMenu;
	
}(window));/* Data */
(function(window){
	
	var FWDHSData = function(props, playListElement, parent){
		
		var self = this;
		var prototype = FWDHSData.prototype;
		
		this.xhr = null;
		this.emailXHR = null;
		this.playlist_ar = null;
	
		this.props_obj = props;
		this.skinPaths_ar = [];
		this.playlist_ar = [];
		this.lightboxPlaylist_ar = [];
		this.categories_ar = [];
	
		this.mainSkinPath_str = null;
		this.facebookAppId_str = null;
	
		this.countLoadedSkinImages = 0;
		this.showLoadPlaylistErrorId_to;
		this.loadPreloaderId_to;

		this.allowToChangeVolume_bl = true;
		this.autoPlay_bl = false;
		this.showFacebookButton_bl = false;
		this.isDataLoaded_bl = false;
		this.useDeepLinking_bl = false;
		this.isMobile_bl = FWDHSUtils.isMobile;
		this.hasPointerEvent_bl = FWDHSUtils.hasPointerEvent;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			if(self.props_obj.playlistId.indexOf("siscobj_") != -1){
				setTimeout(self.parseProperties, 1000);
			}else{
				self.parseProperties();
			}
			
		};
		
		//#############################################//
		// parse properties.
		//#############################################//
		self.parseProperties = function(){
			
			self.mainFolderPath_str = self.props_obj.mainFolderPath;
			if(!self.mainFolderPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FF0000'>mainFolderPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDHSData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((self.mainFolderPath_str.lastIndexOf("/") + 1) != self.mainFolderPath_str.length){
				self.mainFolderPath_str += "/";
			}
			
			self.mainSkinPath_str = self.props_obj.skinPath;
			if(!self.mainSkinPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FF0000'>skinPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDHSData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
		
			if((self.mainSkinPath_str.lastIndexOf("/") + 1) != self.mainSkinPath_str.length){
				self.mainSkinPath_str += "/";
			}
			
			self.skinPath_str =  self.mainFolderPath_str + self.mainSkinPath_str;
	
			
			self.rightClickContextMenu_str = self.props_obj.rightClickContextMenu || "developer";
			test = self.rightClickContextMenu_str == "developer" 
				   || self.rightClickContextMenu_str == "disabled"
				   || self.rightClickContextMenu_str == "default";
			if(!test) self.rightClickContextMenu_str = "developer";
			
			self.descriptionWindowPosition_str = self.props_obj.descriptionWindowPosition || "top";
			test = self.descriptionWindowPosition_str == "top" 
				   || self.descriptionWindowPosition_str == "bottom";
			if(!test) self.descriptionWindowPosition_str = "top";
			self.DFDescriptionWindowPosition_str = self.descriptionWindowPosition_str;
			
			self.warningIconPath_str = self.skinPath_str + "warningIcon.png";
			
			self.allCategoriesLabel_str = self.props_obj.allCategoriesLabel || "not defined";
			self.imageBorderRadius = self.props_obj.imageBorderRadius || 0; 
			
			
			self.displayVertical_bl = self.props_obj.displayVertical || "no";
			self.displayVertical_bl = self.displayVertical_bl == "yes" ? true : false;

			self.preloaderPosition = self.props_obj.preloaderPosition || 'bottomleft';
			self.preloaderPosition = self.preloaderPosition.toLowerCase();
			if(self.displayVertical_bl) self.preloaderPosition = 'topleft'
		
			self.slideshowRadius = self.props_obj.slideshowRadius || 10;
			
			self.slideshowBackgroundColor = self.props_obj.slideshowBackgroundColor || '#FF0000';
			self.slideshowFillColor = self.props_obj.slideshowFillColor || '#FFFFFF';
			self.slideshowStrokeSize = self.props_obj.slideshowStrokeSize || 4;

			
			self.imageOffsetBottom = self.props_obj.imageOffsetBottom || 0;
			
			
			self.HTMLTextAlignment_str = self.props_obj.HTMLTextAlignment || "top";
			if(self.HTMLTextAlignment_str.toLowerCase() == "top"){
				self.HTMLTextAlignment_str = "top";
			}else if(self.HTMLTextAlignment_str.toLowerCase() == "bottom"){
				self.HTMLTextAlignment_str = "bottom";
			}else{
				self.HTMLTextAlignment_str = "top";
			}
			
			self.buttonBackgroundNormalColor_str = self.props_obj.buttonBackgroundNormalColor || "#FF0000";
			self.buttonBackgroundNormalSelected_str = self.props_obj.buttonBackgroundSelectedColor || "#FF0000";
			self.buttonTextNormalColor_str = self.props_obj.buttonTextNormalColor || "#FF0000";
			self.buttonTextSelectedColor_str = self.props_obj.buttonTextSelectedColor || "#FF0000";
			self.buttonBackgroundOpacity =  self.props_obj.buttonBackgroundOpacity;
			if(!self.props_obj.buttonBackgroundOpacity) self.buttonBackgroundOpacity = 1;
			
			
			self.autoPlay_bl = self.props_obj.autoPlay; 
			self.autoPlay_bl = self.autoPlay_bl == "yes" ? true : false;
			self.useVideo_bl = self.props_obj.useVideo == "no" ? false : true;
			
			
			//video settings
			self.timeColor_str = self.props_obj.timeColor || "#FF0000";
			self.videoPosterBackgroundColor_str = self.props_obj.videoPosterBackgroundColor || "transparent";
			self.videoControllerBackgroundColor_str = self.props_obj.videoControllerBackgroundColor || "transparent";
			self.audioControllerBackgroundColor_str = self.props_obj.audioControllerBackgroundColor || "transparent";
		
			self.volume = 1;
			self.controllerHeight = self.props_obj.videoControllerHeight || 50;
			self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0;
			self.controllerHideDelay = self.props_obj.videoControllerHideDelay || 2;
			self.controllerHideDelay *= 1000;
			self.vdSpaceBetweenButtons = self.props_obj.vdSpaceBetweenButtons || 0;
			self.scrubbersOffsetWidth = self.props_obj.scrubbersOffsetWidth || 0;
			self.volumeScrubberOffsetRightWidth = self.props_obj.volumeScrubberOffsetRightWidth || 0;
			self.timeOffsetLeftWidth = self.props_obj.timeOffsetLeftWidth || 0;
			self.timeOffsetRightWidth = self.props_obj.timeOffsetRightWidth || 0;
			self.timeOffsetTop = self.props_obj.timeOffsetTop || 0;
			self.logoMargins = self.props_obj.logoMargins || 0;
			self.mainScrubberOffestTop = self.props_obj.mainScrubberOffestTop || 0;
			self.volumeScrubberWidth = self.props_obj.volumeScrubberWidth || 10;
			self.audioScrubbersOffestTotalWidth = self.props_obj.audioScrubbersOffestTotalWidth || 0;
			self.audioControllerHeight =  self.props_obj.audioControllerHeight || 40;
			self.imageBackgroundColor_str = self.props_obj.imageBackgroundColor || "#333333";
			self.startAtCategory = self.props_obj.startAtCategory || 0;  
			
			if(self.volumeScrubberWidth > 200) self.volumeScrubberWidth = 200;
			
			if(self.isMobile_bl) self.allowToChangeVolume_bl = false;
		
			self.zoomButtonOffset = parseInt(self.props_obj.zoomButtonOffset) || 0;
			

			self.videoAutoPlay_bl = self.props_obj.videoAutoPlay; 
			self.videoAutoPlay_bl = self.videoAutoPlay_bl == "yes" ? true : false;
			if(FWDHSUtils.isMobile) self.videoAutoPlay_bl = false;
			
			self.audioAutoPlay_bl = self.props_obj.audioAutoPlay; 
			self.audioAutoPlay_bl = self.audioAutoPlay_bl == "yes" ? true : false;
			if(FWDHSUtils.isMobile) self.audioAutoPlay_bl = false;
			
			self.videoLoop_bl = self.props_obj.videoLoop; 
			self.videoLoop_bl = self.videoLoop_bl == "yes" ? true : false;
			
			self.audioLoop_bl = self.props_obj.audioLoop; 
			self.audioLoop_bl = self.audioLoop_bl == "yes" ? true : false;
			
		
			self.hideLogoWithController_bl = self.props_obj.hideLogoWithController; 
			self.hideLogoWithController_bl = self.hideLogoWithController_bl == "yes" ? true : false;
			
			self.showPoster_bl = self.props_obj.showPoster; 
			self.showPoster_bl = self.showPoster_bl == "yes" ? true : false;
			
			self.showVolumeScrubber_bl = self.props_obj.showVolumeScrubber; 
			self.showVolumeScrubber_bl = self.showVolumeScrubber_bl == "no" ? false : true;

			self.useVectorIconsSkin_bl = self.props_obj.useVectorIconsSkin; 
			self.useVectorIconsSkin_bl = self.useVectorIconsSkin_bl == "no" ? false : true;

		
			self.showVolumeButton_bl = self.props_obj.showVolumeButton; 
			self.showVolumeButton_bl = self.showVolumeButton_bl == "no" ? false : true;
			
			self.showAllCategories_bl = self.props_obj.showAllCategories;
			self.showAllCategories_bl = self.showAllCategories_bl == "yes" ? true : false;
			
			self.showControllerWhenVideoIsStopped_bl = true; 
			
			self.showTime_bl = self.props_obj.showTime; 
			self.showTime_bl = self.showTime_bl == "no" ? false : true;
			
			self.videoShowFullScreenButton_bl = self.props_obj.videoShowFullScreenButton; 
			self.videoShowFullScreenButton_bl = self.videoShowFullScreenButton_bl == "no" ? false : true;
			
			self.showComboBox_bl = self.props_obj.showComboBox;
			self.showComboBox_bl = self.showComboBox_bl == "yes" ? true : false;
			
			//#################################//
			//create playlists
			//#################################//
			var parsedPlaylist_ar = [];
			self.playListElement = FWDHSUtils.getChildById(self.props_obj.playlistId);
			
			if(self.props_obj.playlistId.indexOf("siscobj_") != -1){
				plObj = window[self.props_obj.playlistId];
				if(!plObj){
					errorMessage_str = "ERROR! The playlist JSON object with the label <font color='#FF0000'>" + self.props_obj.playlistId + "</font> doesn't exist!";
						setTimeout(function(){
						self.dispatchEvent(FWDHSData.LOAD_ERROR, {text:errorMessage_str});
					}, 100);
					return;
				}
				self.playlist_ar = plObj;
			}else{
				if(!self.playListElement){
					errorMessage_str = "Playlist div with the id - <font color='#FF0000'>" + self.props_obj.playlistId + "</font> doesn't exists.";
					setTimeout(function(){
						self.dispatchEvent(FWDHSData.LOAD_ERROR, {text:errorMessage_str});
					}, 100);
					return;
				}
			
				var curPlaylist_ar = FWDHSUtils.getChildren(self.playListElement);
				var totalimages = curPlaylist_ar.length;
				
				var plObj = {};
				
				if(totalimages == 0){
					errorMessage_str = "At least one entry is requires in the playlist nr: <font color='#FF0000'>" + j + "</font>";
					setTimeout(function(){
						self.dispatchEvent(FWDHSData.LOAD_ERROR, {text:errorMessage_str});
					}, 100);
					return;
				}
				
				for(var i=0; i<totalimages; i++){
					var obj = {};
					var ch = curPlaylist_ar[i];
					var test;
					
					if(!FWDHSUtils.hasAttribute(ch, "data-source")){
						errorMessage_str = "Attribute <font color='#FF0000'>data-source</font> is not found in the playlist at position nr: <font color='#FF0000'>" + i + "</font>.";
						setTimeout(function(){
							self.dispatchEvent(FWDHSData.LOAD_ERROR, {text:errorMessage_str});
						}, 100);
						return;
					}
					
					obj.source = String(FWDHSUtils.getAttributeValue(ch, "data-source"));
					obj.target = FWDHSUtils.getAttributeValue(ch, "data-target");
					obj.link = FWDHSUtils.getAttributeValue(ch, "data-link");
					obj.imageWidth = FWDHSUtils.getAttributeValue(ch, "data-width");
					obj.imageHeight = FWDHSUtils.getAttributeValue(ch, "data-height");
					obj.HTMLTextAlignment = FWDHSUtils.getAttributeValue(ch, "text-vertical-alignment");

					if(!FWDHSUtils.getChildren(ch).length){
						ch.innerHTML = FWDHSUtils.unescapeHtml(ch.innerHTML);
					}

					try{
						obj.description_ar = [];
					
						for(var k=0; k<FWDHSUtils.getChildren(ch).length; k++){
							obj.description_ar[k] = FWDHSUtils.getChildren(ch)[k].outerHTML;
						}
						//obj.description_ar = FWDHSUtils.getChildren();
					}catch(e){};
			
				
					var firstUrlPath = encodeURI(obj.source.substr(0,obj.source.lastIndexOf("/") + 1));
					var secondUrlPath = encodeURIComponent(obj.source.substr(obj.source.lastIndexOf("/") + 1));
					obj.source = firstUrlPath + secondUrlPath;
					
					
					parsedPlaylist_ar[i] = obj;
				}
				self.playlist_ar = {playlistimages:parsedPlaylist_ar};
			}
				
			if(self.randomizeImages_bl) self.playlist_ar.playlistimages = FWDHSUtils.randomizeArray(self.playlist_ar.playlistimages);
			
			try{
				self.playListElement.parentNode.removeChild(self.playListElement);
			}catch(e){};
		
				setTimeout(function(){
					self.dispatchEvent(FWDHSData.PRELOADER_LOAD_DONE);
					self.dispatchEvent(FWDHSData.SKIN_LOAD_COMPLETE);
				}, 50);	
			}
		
		//####################################//
		/* load buttons graphics */
		//###################################//
		self.loadSkin = function(){
			var img;
			var src;
			for(var i=0; i<self.totalGraphics; i++){
				img = self.skinPaths_ar[i].img;
				src = self.skinPaths_ar[i].src;
				img.onload = self.onSkinLoadHandler;
				img.onerror = self.onSkinLoadErrorHandler;
				img.src = src;
			}
		};
		
		this.onSkinLoadHandler = function(e){
			self.countLoadedSkinImages++;
			if(self.countLoadedSkinImages == self.totalGraphics){
				setTimeout(function(){
					self.dispatchEvent(FWDHSData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		self.onSkinLoadErrorHandler = function(e){
			if (FWDHSUtils.isIEAndLessThen9){
				message = "Graphics image not found!";
			}else{
				message = "The skin icon with label <font color='#FF0000'>" + e.target.src + "</font> can't be loaded, check path!";
			}
			
			if(window.console) console.log(e);
			var err = {text:message};
			setTimeout(function(){
				self.dispatchEvent(FWDHSData.LOAD_ERROR, err);
			}, 50);
		};
		
		self.getTransitionType = function(transition){
			
			if(transition.toLowerCase() == "expo"){
				transition = "Expo.easeInOut"
			}else if(transition.toLowerCase() == "slowease"){
				transition = "Quint.easeOut"
			}else if(transition.toLowerCase() == "elastic"){
				transition = "Elastic.easeOut"
			}else if(transition.toLowerCase() == "bounce"){
				transition = "Bounce.easeOut"
			}else if(transition.toLowerCase() == "normal"){
				transition = "Power0.easeNone"
			}
			
			return transition;
		}
		
			//##########################################//
		/* load facebook playlistlist */
		//##########################################//
		this.loadFacebookPlaylist = function(){
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				var error = "Please test online, is not possible to view Facebook albums local.";
				self.main_do.addChild(self.info_do);
				self.info_do.showText(error);	
				setTimeout(function(){
					self.isAnim_bl = false;
				}, 850);
				return
			}
			
			if(!self.facebookShare){
				FWDRLFacebookShare.setPrototype();
				self.facebookShare = new FWDRLFacebookShare(self.facebookAppId_str);
				self.facebookShare.addListener(FWDRLFacebookShare.API_READY, self.facebookAPIReadyHandler);
				self.facebookShare.addListener(FWDRLFacebookShare.API_ERROR, self.facebookAPIErrorHandler);
			}else{
				self.loadAccessFacebookAccessToken();
			}
		};
		
		this.facebookAPIReadyHandler = function(e){
			self.loadAccessFacebookAccessToken();
		};
		
		this.facebookAPIErrorHandler = function(e){
			var error = "Error loading file : <font color='#FF0000'>" + self.originalFacebookURL_str + "</font>";
			self.main_do.addChild(self.info_do);
			self.info_do.showText(error);	
			self.isAnim_bl = false;
		};
		
		this.loadAccessFacebookAccessToken = function(){
			self.stopToLoadPlaylist();
			self.sourceURL_str = self.data.mainFolderPath_str + "facebook_access_token.txt";
		
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.facebookTokenOnLoadoadHandler;
			self.xhr.onerror = self.facebookErrorHandler;
			
			try{
				self.xhr.open("get", self.sourceURL_str + "?rand=" + parseInt(Math.random() * 99999999), true);
				self.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				self.facebookAPIErrorHandler();
			}
		};
		
		this.facebookTokenOnLoadoadHandler = function(e){
			var response;
			
			if(self.xhr.readyState == 4){
				if(self.xhr.status == 404){
					var error = "Facebook token path is not found : <font color='#FF0000'>" + self.originalFacebookURL_str + "</font>";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
				}else if(self.xhr.status == 408){
					var error = "Loading facebook token";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
				}else if(self.xhr.status == 200){
					if(window.JSON){
						response = JSON.parse(self.xhr.responseText);
					}else{
						response = eval('('+ self.xhr.responseText +')');
					}
				
					self.accessToken_str = response.access_token;
					self.loadFacebookPlaylistWhenReady();
				}
			}
		};
		
		this.facebookErrorHandler = function(e){
			var error = "Error loading file : <font color='#FF0000'>" + self.originalFacebookURL_str + "</font>";
			self.main_do.addChild(self.info_do);
			self.info_do.showText(error);	
			self.isAnim_bl = false;
		};
		
		this.loadFacebookPlaylistWhenReady = function(){
			
			
			FB.api(
				  '/' + self.facebookUsisc_str + '?access_token=' + self.accessToken_str,
				  'GET',
				  {"fields":"photos.limit(100){images,created_time,name}"},
				  function(response) {
					  if (response){
						  FWDRL.parsePlaylist(response, self.id, self.propsObjVariableName_str);
				      }
				  }
			);
		};
		
		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		self.showPropertyError = function(error){
			self.dispatchEvent(FWDHSData.LOAD_ERROR, {text:"The property called <font color='#FF0000'>" + error + "</font> is not defined."});
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDHSData.setPrototype = function(){
		FWDHSData.prototype = new FWDHSEventDispatcher();
	};
	
	FWDHSData.prototype = null;
	
	FWDHSData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDHSData.LOAD_DONE = "onLoadDone";
	FWDHSData.LOAD_ERROR = "onLoadError";
	FWDHSData.IMAGE_LOADED = "onImageLoaded";
	FWDHSData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
	FWDHSData.SKIN_PROGRESS = "onSkinProgress";
	FWDHSData.IMAGES_PROGRESS = "onImagesPogress";
	FWDHSData.PLAYLIST_LOAD_COMPLETE = "onPlaylistLoadComplete";
	
	window.FWDHSData = FWDHSData;
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDHSDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		self.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas" || type == "input" || type == "IFRAME"){
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
		
		this.hasTransform3d_bl =  FWDHSUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDHSUtils.hasTransform2d;
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
			//self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			
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
				if(FWDHSUtils.isFirefox || FWDHSUtils.isIE){
					self.screen.style.userSelect = "element";
					self.screen.style.MozUserSelect = "element";
					self.screen.style.msUserSelect = "element";
				}else if(FWDHSUtils.isSafari){
					self.screen.style.userSelect = "text";
					self.screen.style.webkitUserSelect = "text";
				}else{
					self.screen.style.userSelect = "all";
					self.screen.style.webkitUserSelect = "all";
				}
				
				self.screen.style.khtmlUserSelect = "all";
				self.screen.style.oUserSelect = "all";
				
				if(FWDHSUtils.isIEAndLessThen9){
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
				//if(!self.w) console.log(arguments.callee.caller.toString())
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
				self.children_ar.splice(FWDHSUtils.indexOfArray(self.children_ar, e), 1);
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else{
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}
		};
		
		self.removeChild = function(e){
			if(self.contains(e)){
				self.children_ar.splice(FWDHSUtils.indexOfArray(self.children_ar, e), 1);
				self.screen.removeChild(e.screen);
			}else{
				//console.log(arguments.callee.caller.toString())
				throw Error("##removeChild()## Child dose't exist, it can't be removed!");
			};
		};
		
		self.contains = function(e){
			if(FWDHSUtils.indexOfArray(self.children_ar, e) == -1){
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
					self.children_ar.splice(FWDHSUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDHSUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				self.screen.insertBefore(e.screen, self.children_ar[index].screen);
				if(self.contains(e)){
					self.children_ar.splice(FWDHSUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDHSUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}
		};
		
		self.getChildAt = function(index){
			if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(self.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
			return self.children_ar[index];
		};
		
		self.getChildIndex = function(child){
			if(self.contains(child)){
				return FWDHSUtils.indexOfArray(self.children_ar, child);
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
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function(){
			if(self.type == "img") self.screen.src = null;
		};
		
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.listeners = [];
			self.listeners = null;
			self.children_ar = [];
			self.children_ar = null;
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDHSDisplayObject = FWDHSDisplayObject;
}(window));(function (){
	
	var FWDHSEventDispatcher = function (){
		
	    this.listeners = {events_ar:[]};
	     
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
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
	    
	   this.removeListener = function(type, listener){
	    	
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
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    	
	    	this.addListener = null;
		    this.dispatchEvent = null;
		    this.removeListener = null;
	    };
	    
	};	
	
	window.FWDHSEventDispatcher = FWDHSEventDispatcher;
}(window));(function (window){
	
	var FWDHSImageManager = function(parent, data){
		
		var self = this;
		var prototype = FWDHSImageManager.prototype;
		
		this.data = data;
		this.parent = parent;
		this.playlist_ar = null;
		this.images_ar = null;
		
		this.mainHolder_do = null;
		this.imageHolder_do = null;
		
		this.stageWidth = 0;
		this.stageHeight = 0;
		
		this.horizontalButtonsOffset = data.nextAndPrevButtonsHorizontalButtonsOffset;
		this.verticalButtonsOffset = data.nextAndPrevButtonsVerticalButtonsOffset;
		this.nextAndPrevButtonsPosition_str = data.nextAndPrevButtonsPosition_str;
		this.maxImageHeight = data.maxImageHeight;
		this.maxCenterImageHeight = data.maxCenterImageHeight;
		
		this.spaceBetweenImages = data.spaceBetweenImages;
		this.imageOverlayOpacity = parent.imageOverlayOpacity;
		this.lastPresedX = 0;
		this.totalImages = 0;	

		this.countLoadedThumbs = 0;
		this.curId = data.startAtImage;
		this.cntId = data.startAtImage;
		
		this.friction = .9;
		this.vx = 0;
		this.vy = 0;
		
		this.prevId = this.curId;
	
		this.transitionDuration = data.transitionDuration;
		this.defaultTransitionDuration = this.transitionDuration;
		this.transitionType_str = data.transitionType_str;
		this.defaultTransitionType = data.transitionType_str;
		this.textAnimationDone_bl = false;

		this.isMobile_bl = FWDHSUtils.isMobile;
		this.hasPointerEvent_bl = FWDHSUtils.hasPointerEvent;
	
		//#################################//
		/* init */
		//#################################//
		self.init = function(){
			self.setOverflow("visible");
			self.mainHolder_do = new FWDHSDisplayObject("div");
			
		
			self.imageHolder_do = new FWDHSDisplayObject("div"); 
			self.imageHolder_do.setOverflow("visible");
			self.mainHolder_do.addChild(self.imageHolder_do);
			
			self.addChild(self.mainHolder_do);
			self.resizeAndPosition();
			self.initMenuHover();

			if(!self.isMobile_bl) self.startToCheckFirstImageHover();
		};

		//######################################//
		/* Position and resize */
		//######################################//
		self.resizeAndPosition = function(){
			self.areButtonsPositioned_bl = false;
			self.stageWidth = parent.stageWidth;
			
			if(parent.isVertical_bl){
				self.stageHeight = Math.round(parent.stageWidth * .71);
			}else{
				self.stageHeight = parent.stageHeight;
			}
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
			self.resizeImages(false);
			self.setFontSize();
			self.resizeText();

			if(parent.isVertical_bl && self.totalHeight){
				parent.main_do.setHeight(self.totalHeight);
				self.mainHolder_do.setHeight(self.totalHeight);
				self.setHeight(self.totalHeight);
			}
		};

		//#####################################//
		/* Hide selected state on menu hover */
		//#####################################//
		this.initMenuHover =  function(){
			if(window['$']){
				$('.vertical-menu-toggle').on('mouseover', function(){
					for(var i=0; i<self.text_ar.length; i++){
						self.text_ar[i].hideContent();
					}
				});
			}
		}

		//#####################################//
		/* Check first image hover */
		//#####################################//
		this.startToCheckFirstImageHover = function(){
			self.checkX = -100;
			self.checkY = -100;
			window.addEventListener('mousemove', self.setMousePosition);
		}

		this.setMousePosition = function(e){
			var vc = FWDHSUtils.getViewportMouseCoordinates(e);
			self.checkX = vc.screenX;
			self.checkY = vc.screenY;
		}

		this.checkFirstHover = function(){
			window.removeEventListener('mousemove', self.setMousePosition);
			for(var i=0; i<self.totalImages; i++){
				var text_do = self.text_ar[i];
				if(FWDHSUtils.hitTest(text_do.screen, self.checkX, self.checkY)){
					var checkedId = text_do.id;
				}
			}
			setTimeout(function(){
				if(checkedId !== undefined) self.text_ar[checkedId].onMouseOver(null, true);
			}, 800);
		}
		
		//#####################################//
		/* Create / destory image */
		//#####################################//
		self.setupImages = function(){
			self.areimageCreated_bl = true;
			self.areButtonsPositioned_bl = false;
			self.images_ar = [];
			self.text_ar = [];
			self.originalImages_ar = [];
			self.playlist_ar = parent.playlist_ar;
			self.totalImages = self.playlist_ar.length;
		
			for(var i=0; i<self.totalImages; i++){
				var HTMLTextAlignment_str = self.HTMLTextAlignment_str;
				if(self.playlist_ar[i].HTMLTextAlignment != undefined) HTMLTextAlignment_str = self.playlist_ar[i].HTMLTextAlignment;
				
				FWDHSThumb.setPrototype();
				var thumb = new FWDHSThumb(
						self,
						i, 
						self.transitionDuration,
						self.transitionType_str,
						self.playlist_ar[i].source,
						self.playlist_ar[i].imageWidth,
						self.playlist_ar[i].imageHeight
						);
				self.originalImages_ar[i] = thumb;
				self.images_ar[i] = thumb;

				FWDHSText.setPrototype();
				var text_do = new FWDHSText({
						parent: this,
						id:i, 
						title_str:self.playlist_ar[i].description_ar[0]});
				self.text_ar[i] = text_do;
				text_do.addListener(FWDHSText.MOUSE_OVER, this.textDoMouseOverHandler);
				text_do.addListener(FWDHSText.MOUSE_UP, this.textDoMouseUpHandler);
			
				self.imageHolder_do.addChildAt(thumb, 0);

				self.addChild(text_do);
			}
		
			self.resizeAndPosition();
			
			self.loadImageCenterId = 0;
			self.loadImageRightId = 1;
			
			self.loadImageCenter();	
		};

		this.textDoMouseOverHandler = function(e){
			self.showFrontImage(e.id);
		}

		this.textDoMouseUpHandler = function(e){
			location.href = self.playlist_ar[e.id].link;
		}

		this.showFrontImage = function(id){
			if(parent.isVertical_bl) return;
			for(var i=0; i<self.totalImages; i++){
				var alpha = 0;
				image = self.images_ar[i];
				if(i == id){
					alpha = 1;
				}
				FWDAnimation.killTweensOf(image);
				FWDAnimation.to(image, .8, {alpha: alpha});
			}
		}

		this.setFontSize = function(){
			if(!self.text_ar) return;
			self.numberFontSize = '288px';
			var titleFontSize = '33px';

			for(var i=0; i<self.totalImages; i++){
				var text_do = self.text_ar[i];
				if(text_do.finalW < 346){
					self.numberFontSize = '180px';
					titleFontSize = '24px';	
					text_do.title_do.screen.className = "title small";
					break;
				}else{
					text_do.title_do.screen.className = "title large";
				}
			}

			for(var i=0; i<self.totalImages; i++){
				var text_do = self.text_ar[i];
				text_do.number_do.getStyle().fontSize = self.numberFontSize;
				text_do.title_do.screen.firstChild.style.fontSize = titleFontSize;
			}
		}

		//##########################################################//
		/* Position image */
		//##########################################################//
		this.resizeImages = function(animate){
			if(!self.images_ar) return;

			var image;
			var text_do;
			var scale = 1;
		
			for(var i=0; i<self.totalImages; i++){
				var thumb = self.images_ar[i];
				
				scaleX = self.stageWidth/thumb.imageW;
				scaleY = self.stageHeight/thumb.imageH;
				totalScale = 0;
				if(scaleX >= scaleY){
					scale = scaleX;
				}else if(scaleX <= scaleY){
					scale = scaleY;
				}

				thumb.scale = scale;
				thumb.finalW = self.stageWidth;
				thumb.finalH = self.stageHeight;
				thumb.imageFinalW = Math.round(thumb.imageW * scale);
				thumb.imageFinalH = Math.round(thumb.imageH * scale);
				thumb.finalX = 0;
				thumb.finalY = 0;

				if(parent.isVertical_bl){
					thumb.finalY = i * self.stageHeight;
					FWDAnimation.killTweensOf(thumb);
					thumb.setAlpha(1);
				}

				thumb.resizeImage();
			}
			self.totalHeight = thumb.finalY + thumb.h;
		}

		this.resizeText = function(showAlpha){
			var delay = 0;
			for(var i=0; i<self.totalImages; i++){
				var text_do = self.text_ar[i];
				
				if(parent.isVertical_bl){
					text_do.finalW = self.stageWidth;
					text_do.finalX = 0;
					text_do.finalY = Math.round(i * self.stageHeight);
				}else{
					text_do.finalW = Math.round(self.stageWidth/self.totalImages);
					text_do.finalX = text_do.finalW * i;
					text_do.finalY = 0;
				}
				text_do.finalH = self.stageHeight;
				var leftW =  Math.abs((text_do.finalW * self.totalImages) - self.stageWidth);
				if(i == self.totalImages - 1 && !parent.isVertical_bl) text_do.finalW += leftW;

				text_do.resizeAndPosition();
				if(showAlpha){
					delay += .1;
					text_do.setAlpha(1);
					text_do.hideAndShowContentFirst(delay);
					text_do.addEvents();
				} 
			}
		}
	
		this.showTextFirstTime = function(){
			self.setFontSize();
			self.resizeText();
			setTimeout(function(){
				self.textAnimationDone_bl = true;
			}, (self.totalImages * 100) + 400);
			this.resizeText(true);
		}
	
		//########################################//
		/* Load images */
		//########################################//
		self.loadImageCenter = function(){
			clearTimeout(self.loadImagecenter_to);
			self.loadedImagecenter = self.images_ar[self.loadImageCenterId];
			self.imagecenter_img = new Image();
			self.imagecenter_img.onerror = self.onimageLoadcenterError;
			self.imagecenter_img.onload = self.onimageLoadcenterComplete;
			self.imagecenter_img.src = self.loadedImagecenter.source;
		};
	
		self.onimageLoadcenterError = function(){
			var error = "Error loading image <font color='#FF0000'>" + self.playlist_ar[self.loadImagecenterId].source + "</font>."
			self.dispatchEvent(FWDHS.ERROR, {text:error});
		}
		
		self.onimageLoadcenterComplete = function(e){
			self.loadedImagecenter.setImage(self.imagecenter_img);
			self.loadedImagecenter.hasImage_bl = true;
			self.loadImageRight();
			setTimeout(function(){
				self.showTextFirstTime(true);
				self.checkFirstHover();

				var $ = jQuery;
				$('.home-slider .logo').addClass('reveal');
				setTimeout(function(){
		           
		            $('.home-slider .title-main').addClass('reveal');
		        },150); 

			}, 800);
		};
		
		
		self.loadImageRight = function(){
			clearTimeout(self.loadImageRight_to);
			self.loadedImageRight = self.images_ar[self.loadImageRightId];

			if(!self.loadedImageRight) return;

			self.imageRight_img = new Image();
			self.imageRight_img.onerror = self.onimageLoadRightError;
			self.imageRight_img.onload = self.onimageLoadRightComplete;
			self.imageRight_img.src = self.loadedImageRight.source;
		};
	
		self.onimageLoadRightError = function(){
			self.loadImageRightId ++;
			self.loadImageRight_to = setTimeout(self.loadImageRight, 100);
		}
		
		self.onimageLoadRightComplete = function(e){
			self.loadedImageRight.setImage(self.imageRight_img);
			self.loadedImageRight.hasImage_bl = true;
			self.loadImageRightId ++;
			self.loadImageRight_to = setTimeout(self.loadImageRight, 100);
		};
		
	
		self.stopToLoadThumbanils = function(){
			if(self.imageRight_img){
				self.imageRight_img.onload = null;
				self.imageRight_img.onerror = null;
				self.imageRight_img.src = "";
				self.imageRight_img = null;
			}
			clearTimeout(self.loadWithDelayId_to);
		};
		
		self.thumbClickHandler = function(e){
			//if(!parent.isShowed_bl) return;
			self.dispatchEvent(FWDHSThumb.CLICK, {id:e.id});
		};
		
		self.thumbHoverHandler = function(){
			//if(!parent.isShowed_bl) return;
			self.addDesktopScrollSupport();
		};
		
	
		self.init();
	};
		
	/* set prototype */
	FWDHSImageManager.setPrototype = function(){
		FWDHSImageManager.prototype = new FWDHSDisplayObject("div", "relative");
	};
	
	
	FWDHSImageManager.prototype = null;
	window.FWDHSImageManager = FWDHSImageManager;
}(window));/* Info screen */
(function (window){
	
	var FWDHSInfo = function(parent, warningIconPath){
		
		var self = this;
		var prototype = FWDHSInfo.prototype;
		
		this.bk_do = null;
		this.textHolder_do = null;
		
		this.warningIconPath_str = warningIconPath;
	
		this.show_to = null;
		this.isShowed_bl = false;
		this.isShowedOnce_bl = false;
		this.allowToRemove_bl = true;
		
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setResizableSizeAfterParent();
			
			self.bk_do = new FWDHSDisplayObject("div");
			self.bk_do.setAlpha(.2);
			self.bk_do.setBkColor("#000000");
			self.addChild(self.bk_do);
			
			self.textHolder_do = new FWDHSDisplayObject("div");
			if(!FWDHSUtils.isIEAndLessThen9) self.textHolder_do.getStyle().font = "Arial";
			self.textHolder_do.getStyle().wordWrap = "break-word";
			self.textHolder_do.getStyle().padding = "10px";
			self.textHolder_do.getStyle().paddingLeft = "42px";
			self.textHolder_do.getStyle().lineHeight = "18px";
			self.textHolder_do.getStyle().color = "#000000";
			self.textHolder_do.setBkColor("#EEEEEE");
			
			var img_img = new Image();
			img_img.src = this.warningIconPath_str;
			this.img_do = new FWDHSDisplayObject("img");
			this.img_do.setScreen(img_img);
			this.img_do.setWidth(28);
			this.img_do.setHeight(28);
			
			self.addChild(self.textHolder_do);
			self.addChild(self.img_do);
		};
		
		this.showText = function(txt){
			if(!self.isShowedOnce_bl){
				if(self.screen.addEventListener){
					self.screen.addEventListener("click", self.closeWindow);
				}else if(self.screen.attachEvent){
					self.screen.attachEvent("onclick", self.closeWindow);
				}
				self.isShowedOnce_bl = true;
			}
			
			self.setVisible(false);
			
				self.textHolder_do.getStyle().paddingBottom = "10px";
				self.textHolder_do.setInnerHTML(txt);
			
			
			clearTimeout(self.show_to);
			self.show_to = setTimeout(self.show, 60);
			setTimeout(function(){
				self.positionAndResize();
			}, 10);
		};
		
		this.show = function(){
			var finalW = Math.min(640, parent.stageWidth - 120);
			self.isShowed_bl = true;
		
			self.textHolder_do.setWidth(finalW);
			setTimeout(function(){
				self.setVisible(true);
				self.positionAndResize();
			}, 100);
		};
		
		this.positionAndResize = function(){
			
			var finalW = self.textHolder_do.getWidth();
			var finalH = self.textHolder_do.getHeight();
			var finalX = parseInt((parent.stageWidth - finalW)/2);
			var finalY = parseInt((parent.stageHeight - finalH)/2);
			
			self.bk_do.setWidth(parent.stageWidth);
			self.bk_do.setHeight(parent.stageHeight);
			self.textHolder_do.setX(finalX);
			self.textHolder_do.setY(finalY);
			
			self.img_do.setX(finalX + 6);
			self.img_do.setY(finalY + parseInt((self.textHolder_do.getHeight() - self.img_do.h)/2));
			//self.img_do.setY(finalY + 6);
		};
		
		this.closeWindow = function(){
			if(!self.allowToRemove_bl) return;
			self.isShowed_bl = false;
			clearTimeout(self.show_to);
			try{parent.main_do.removeChild(self);}catch(e){}
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDHSInfo.setPrototype = function(){
		FWDHSInfo.prototype = new FWDHSDisplayObject("div", "relative");
	};
	
	FWDHSInfo.prototype = null;
	window.FWDHSInfo = FWDHSInfo;
}(window));/* Thumb */
(function (window){
	
	var FWDHSPreloader = function(imageSource_img, segmentWidth, segmentHeight, totalSegments, animDelay){
		
		var self  = this;
		var prototype = FWDHSPreloader.prototype;
		
		this.imageSource_img = imageSource_img;
		this.image_sdo = null;
		
		this.segmentWidth = segmentWidth;
		this.segmentHeight = segmentHeight;
		this.totalSegments = totalSegments;
		this.animDelay = animDelay || 300;
		this.count = 0;
		
		this.delayTimerId_int;
		this.isShowed_bl = false;
		
		//###################################//
		/* init */
		//###################################//
		this.init = function(){
			self.setWidth(self.segmentWidth);
			self.setHeight(self.segmentHeight);
		
			self.image_sdo = new FWDHSDisplayObject("img");
			self.image_sdo.setScreen(self.imageSource_img);
			self.addChild(self.image_sdo);
			
			self.hide(false);
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		this.start = function(){
			if(self == null) return;
			clearInterval(self.delayTimerId_int);
			self.delayTimerId_int = setInterval(self.updatePreloader, self.animDelay);
		};
		
		this.stop = function(){
			clearInterval(self.delayTimerId_int);
		};
		
		this.updatePreloader = function(){
			if(self == null) return;
			self.count++;
			if(self.count > self.totalSegments - 1) self.count = 0;
			var posX = self.count * self.segmentWidth;
			self.image_sdo.setX(-posX);
		};
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.setVisible(true);
			self.start();
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, 1, {alpha:1, delay:.2});
			self.isShowed_bl = true;
		};
		
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			FWDAnimation.killTweensOf(this);
			if(animate){
				FWDAnimation.to(this, 1, {alpha:0, onComplete:self.onHideComplete});
			}else{
				self.setVisible(false);
				self.setAlpha(0);
			}
			self.isShowed_bl = false;
		};
		
		this.onHideComplete = function(){
			self.setVisible(false);
			self.stop();
			self.dispatchEvent(FWDHSPreloader.HIDE_COMPLETE);
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDHSPreloader.setPrototype = function(){
    	FWDHSPreloader.prototype = new FWDHSDisplayObject("div");
    };
    
    FWDHSPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDHSPreloader.prototype = null;
	window.FWDHSPreloader = FWDHSPreloader;
}(window));/* Thumb */
(function (window){
	
	var FWDHSSlideshowPreloader = function(parent, preloaderPostion, radius, backgroundColor, fillColor, strokeSize, animDuration, position){
		
		var self  = this;
		var prototype = FWDHSSlideshowPreloader.prototype;
		self.preloaderPostion = preloaderPostion;
		self.backgroundColor = backgroundColor;
		self.fillColor = fillColor;
		self.radius = radius;
		self.strokeSize = strokeSize;
		this.animDuration = animDuration || 300;
		this.strtAngle = 270;
		this.countAnimation = 0;
		this.isShowed_bl = true;
		this.slideshowAngle = {n:0};
		
		//###################################//
		/* init */
		//###################################//
		this.init = function(){
			self.screen.className = 'circle' ;
			self.getStyle().display = 'inline-block';
			self.setWidth((self.radius * 2) + self.strokeSize);
			self.setHeight((self.radius * 2) + self.strokeSize);

			this.bkCanvas = new FWDHSDisplayObject("canvas");
			this.bkCanvasContext = this.bkCanvas.screen.getContext('2d');
			this.fillCircleCanvas = new FWDHSDisplayObject("canvas");
			this.fillCircleCanvasContext = this.fillCircleCanvas.screen.getContext('2d');
		
			this.addChild(this.bkCanvas);
			this.addChild(this.fillCircleCanvas);
			self.drawBackground();
			self.drawFill();
			self.hide();
			if(self.preloaderPostion == 'bottomright'){
				var posCtId_int = setInterval(function(){
					self.positionAndResize();
					if(!self) clearInterval(posCtId_int);
				});
			}
			self.screen.style.transformOrigin = "50% 50%";
		};

		/*
			Postion
		*/
		this.positionAndResize = function(){
			if(!position) return;
			var paralax_bl = parent.parent && parent.parent.paralax_bl;
			var offsetY = (paralax_bl ? parent.parent.pageYOffset/2 : 0);

			var offsetY2 = 0;

			if(FWDHS.posCntDown){
				if(self.preloaderPostion == 'bottomleft' || self.preloaderPostion == 'bottomright'){
					offsetY2 = Math.round(FWDHS.self.ws.h - parent.stageHeight)/2 * 2;
				}else if(self.preloaderPostion == 'center'){
					offsetY2 = Math.round(FWDHS.self.ws.h - parent.stageHeight)/2;
				}
			}
		
			if(self.preloaderPostion == 'bottomleft'){
				self.setX(10);
				self.setY(parent.stageHeight - self.h - 10 - Math.round(offsetY) + offsetY2);
			}else if(self.preloaderPostion == 'bottomright'){
				if(parent.cnt_do){
					var cnt_do = parent.cnt_do;
					var cntW =  cnt_do.getWidth();
					
					self.setX(parent.stageWidth - self.w - 6);
					self.setY(parent.stageHeight - self.h - 5 - Math.round(offsetY));
					
					self.prevX = cnt_do.x;
				}else{
					self.setX(parent.stageWidth - self.w - 10);
					self.setY(parent.stageHeight - self.h - 10 - Math.round(offsetY) + offsetY2);
				}
			}else if(self.preloaderPostion == 'topright'){
				self.setX(parent.stageWidth - self.w - 10);
				self.setY(10 - Math.round(offsetY));
			}else if(self.preloaderPostion == 'topleft'){
				self.setX(10);
				self.setY(10 - Math.round(offsetY))
			}else if(self.preloaderPostion == 'center'){
				self.setX(Math.round(parent.stageWidth - self.w)/2);
				self.setY(Math.round(parent.stageHeight - self.h)/2 + offsetY2 - Math.round(offsetY));
			}
		}	

		/* draw background */
		this.drawBackground = function(){
			this.bkCanvas.screen.width = (this.radius * 2) + self.strokeSize * 2;
			this.bkCanvas.screen.height = (this.radius * 2) + self.strokeSize * 2;
			this.bkCanvasContext.lineWidth = this.thicknessSize;
			this.bkCanvasContext.translate(self.strokeSize/2, self.strokeSize/2);
			this.bkCanvasContext.shadowColor = '#333333';
		    this.bkCanvasContext.shadowBlur = 1;
		   
			this.bkCanvasContext.lineWidth=self.strokeSize;
			this.bkCanvasContext.strokeStyle = this.backgroundColor;
			this.bkCanvasContext.beginPath();
			this.bkCanvasContext.arc(this.radius, this.radius,  this.radius, (Math.PI/180) * 0, (Math.PI/180) * 360, false);
			this.bkCanvasContext.stroke();
			this.bkCanvasContext.closePath();
		};
		
		/* draw fill */
		this.drawFill = function(){	
			self.fillCircleCanvas.screen.width = (self.radius * 2) + self.strokeSize * 2;
			self.fillCircleCanvas.screen.height = (self.radius * 2) + self.strokeSize * 2;
			self.fillCircleCanvasContext.lineWidth = self.thicknessSize;
			self.fillCircleCanvasContext.translate(self.strokeSize/2, self.strokeSize/2);
			self.fillCircleCanvasContext.lineWidth=self.strokeSize;
			self.fillCircleCanvasContext.strokeStyle = self.fillColor;
			self.fillCircleCanvasContext.beginPath();
			self.fillCircleCanvasContext.arc(self.radius, self.radius,  self.radius, (Math.PI/180) * self.strtAngle, (Math.PI/180) * (self.strtAngle +  self.slideshowAngle.n), false);
			self.fillCircleCanvasContext.stroke();
			self.fillCircleCanvasContext.closePath()
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		this.startSlideshow = function(){
			if(self == null) return;
			
			FWDAnimation.killTweensOf(self.slideshowAngle);
			FWDAnimation.to(self.slideshowAngle, self.animDuration, {n:360, onUpdate:self.drawFill, onComplete:self.stopSlideshow});
		};
		
		this.stopSlideshow = function(){
			FWDAnimation.killTweensOf(self.slideshowAngle);
			FWDAnimation.to(self.slideshowAngle, .8, {n:0, onupdate:self.drawFill, onUpdate:self.drawFill, ease:Expo.easeInOut});
		};

		this.reset = function(){
			
			FWDAnimation.killTweensOf(self.slideshowAngle);
			self.slideshowAngle = {n:0};
			self.drawFill();
		}
		
		this.startPreloader = function(){
			self.slideshowAngle = {n:0};
			FWDAnimation.killTweensOf(self.slideshowAngle);
			FWDAnimation.to(self.slideshowAngle, self.animDuration, {n:360, onUpdate:self.drawFill, repeat:100, yoyo:true, ease:Expo.easInOut});
			FWDAnimation.to(self.screen, self.animDuration, {rotation:360, repeat:100});
		}

		this.stopPreloader = function(){
			FWDAnimation.killTweensOf(self.slideshowAngle);
			FWDAnimation.killTweensOf(self.screen);
		}
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.setVisible(true);
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, 1, {alpha:1, delay:.2});
			self.isShowed_bl = true;
		};
		
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			
			FWDAnimation.killTweensOf(this);
			if(animate){
				FWDAnimation.to(this, 1, {alpha:0, onComplete:self.onHideComplete});
			}else{
				self.setVisible(false);
				self.setAlpha(0);
			}
			self.isShowed_bl = false;
		};
		
		this.onHideComplete = function(){
			self.setVisible(false);
			self.stopPreloader();
			self.dispatchEvent(FWDHSSlideshowPreloader.HIDE_COMPLETE);
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDHSSlideshowPreloader.setPrototype = function(){
    	FWDHSSlideshowPreloader.prototype = new FWDHSDisplayObject("div");
    };
    
    FWDHSSlideshowPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDHSSlideshowPreloader.prototype = null;
	window.FWDHSSlideshowPreloader = FWDHSSlideshowPreloader;
}(window));(function (window){
	var FWDHSText = function(props_obj){
		
		var self = this;
		var prototype = FWDHSText.prototype;
		
		this.parent = props_obj.parent;

		this.main_do;
		this.bk_do;
		this.imageHolder_do;
		this.image_do;
		this.contentHolder_do;
		this.title_do;
		this.numberOffestHidden = 0;
		this.numberOffestShowed = 110;
	
		this.id = props_obj.id;
		this.title_str = props_obj.title_str;

		this.imageShowComplete_bl = false;
		this.isContentHidden_bl = true;
		this.isMobile_bl = FWDHSUtils.isMobile;
		this.hasPointerEvent_bl = FWDHSUtils.hasPointerEvent;
		
		this.init = function(){
			this.setupMainInstances();
		};

		//###################################//
		/* setup main screen */
		//###################################//
		this.setupMainInstances = function(){
			this.setAlpha(0);
			this.main_do = new FWDHSDisplayObject("div");
			this.main_do.setOverflow('visible');
			this.addChild(this.main_do);

			this.contentHolder_do = new FWDHSDisplayObject("div");
			this.contentHolder_do.setOverflow('visible');
			this.main_do.addChild(this.contentHolder_do);
			
			this.setupContent();			
		};

		//#############################################//
		/* Setup content */
		//#############################################//
		this.setupContent = function(){

			this.bk_do = new FWDHSDisplayObject("div");
			this.bk_do.screen.className = "background";
			this.bk_do.getStyle().width = "100%";
			this.bk_do.getStyle().height = "100%";
			this.bk_do.setAlpha(0);
			this.contentHolder_do.addChild(this.bk_do);

			this.number_do = new FWDHSDisplayObject("div");	
			this.number_do.setOverflow('visible');
			this.number_do.getStyle().display = 'block';
			this.number_do.setInnerHTML('<div class="number">0' + (this.id + 1) + "</div>");
			this.number_do.setAlpha(.5);
			this.contentHolder_do.addChild(this.number_do);

			this.line_do = new FWDHSDisplayObject("div");	
			this.line_do.setWidth(1);
			this.line_do.screen.className = 'line';
			this.contentHolder_do.addChild(this.line_do);
			
			this.title_do = new FWDHSDisplayObject("div", 'relative', 'visible');	
			this.title_do.setInnerHTML('<div class="title">' + this.title_str + "</div>");
			this.contentHolder_do.addChild(this.title_do);

		};

		//######################################//
		/* Resize and position */
		//######################################//
		this.resizeAndPosition = function(overwrite){	

			this.setX(this.finalX);
			this.setY(this.finalY);
			this.setWidth(this.finalW);
			this.setHeight(this.finalH);
			this.main_do.setWidth(this.finalW);
			this.main_do.setHeight(this.finalH);
			this.bk_do.setWidth(this.finalW);
			this.bk_do.setHeight(this.finalH);
			this.contentHolder_do.setWidth(this.finalW);
			this.contentHolder_do.setHeight(this.finalH);
		
			FWDAnimation.killTweensOf(this);
		
			if(this.firstTimeLoad_bl){
				this.firstTimeLoad_bl = false;	
			}

			this.isContentHidden_bl = true;
			this.stopToCheckThumbnailHit();

			if(self.parent.parent.isVertical_bl && self.parent.parent.stageWidth < 800){
				self.numberOffestShowed = -20;
			}else{
				self.numberOffestShowed = 110;
			}

			FWDAnimation.killTweensOf(this.bk_do);
			this.bk_do.setAlpha(0);
			
			FWDAnimation.killTweensOf(this.number_do);
			this.number_do.setY(Math.round(this.finalH - this.number_do.getHeight()/2) + self.numberOffestHidden);
			this.number_do.setX(Math.round(this.finalW - this.number_do.getWidth())/2);
			this.number_do.setAlpha(.5);

			FWDAnimation.killTweensOf(this.title_do);
			var titleOffextY = 264;
			if(self.parent.numberFontSize == '180px'){
				titleOffextY = 150;
			}
			var titleY = Math.round(self.finalH - self.number_do.getHeight() - self.numberOffestShowed + 17) + Math.round(titleOffextY - this.title_do.getHeight())/2;

			this.title_do.setY(Math.round(titleY));
			this.title_do.screen.firstChild.style.opacity = 0;	

			$ = jQuery;
			$(self.title_do.screen).find('.desc').width($(self.title_do.screen).find('.text').width() + 4)
			
			FWDAnimation.killTweensOf(this.line_do);
			this.line_do.setHeight(this.finalH - (this.title_do.y + this.title_do.getHeight()) - 30);
			this.line_do.setX(Math.round((this.finalW - this.line_do.getWidth())/2));
			this.line_do.setY(self.finalH);
		};
		
		
		//#############################################//
		/* Add events */
		//#############################################//
		this.addEvents = function(){
			this.contentHolder_do.setButtonMode(true);
			if(this.isMobile_bl){
				if(this.hasPointerEvent_bl){
					this.main_do.screen.addEventListener("pointerdown", this.onMouseUp);
				}else{
					this.main_do.screen.addEventListener("click", this.onMouseUp);
				}
			}else{
				this.contentHolder_do.screen.addEventListener("mousemove", this.onMouseOver);
				this.contentHolder_do.screen.addEventListener("mouseover", this.onMouseOver);
				this.contentHolder_do.screen.addEventListener("click", this.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e, overwrite){
			if((self.isContentShowed_bl || !self.parent.textAnimationDone_bl) && !overwrite) return;
			self.isHovered_bl = true;
			for(var i=0; i<self.parent.text_ar.length; i++){
				var text_do = self.parent.text_ar[i];
				text_do.hideContent();
			}
			self.showContent();
			self.startToCheckThumbnailHit();
			self.dispatchEvent(FWDHSText.MOUSE_OVER, {id:self.id});
		};
		
		self.onMouseUp = function(e){
			if(e.button == 2 || self.disableThumbnails_bl || self.isHidden_bl || !self.parent.textAnimationDone_bl) return;
			if(!self.isContentShowed_bl && self.isMobile_bl){
				self.onMouseOver();
				return;
			}
			self.dispatchEvent(FWDHSText.MOUSE_UP, {id:self.id});
		};
		
		//########################################//
		/* Check thumbanil hit */
		//########################################//
		this.startToCheckThumbnailHit = function(){
			if(this.isCheckHitAdded_bl) return;
			this.isCheckHitAdded_bl = true;
			
			if(self.isMobile_bl){
				setTimeout(function(){
					if(FWDHSUtils.isIOS){
						self.hitThhumbnailId_to = window.addEventListener("touchstart", self.checkThumbnailHit);
					}else{
						self.hitThhumbnailId_to = window.addEventListener("click", self.checkThumbnailHit);
					}
				}, 50);
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.checkThumbnailHit);
				}else{
					document.attachEvent("onmousemove", self.checkThumbnailHit);
				}
			}
		};
		
		this.stopToCheckThumbnailHit = function(){
			if(!self.isCheckHitAdded_bl) return;
			self.isCheckHitAdded_bl = false;
		
			if(self.isMobile_bl){
				if(FWDHSUtils.isIOS){
					self.hitThhumbnailId_to = window.removeEventListener("touchstart", self.checkThumbnailHit);
				}else{
					self.hitThhumbnailId_to = window.removeEventListener("click", self.checkThumbnailHit);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.checkThumbnailHit);
				}else{
					document.detachEvent("onmousemove", self.checkThumbnailHit);
				}
			}
			
			clearTimeout(self.hitThhumbnailId_to);
			self.hideContent(true);
			self.isHovered_bl = false;
		};
		
		this.checkThumbnailHit = function(e){
			
			var vc = FWDHSUtils.getViewportMouseCoordinates(e);	
			if(vc.screenX < self.finalW && vc.screenY < self.finalH){
				//self.parent.parent.menu_do.setAlpha(0);
			}
			
			if(self.presetType_str == 'preview'){
				if(!FWDHSUtils.hitTest(self.main_do.screen, vc.screenX, vc.screenY)){
					self.stopToCheckThumbnailHit();
					return;
				}
			}else if(!FWDHSUtils.hitTest(self.screen, vc.screenX, vc.screenY)){
				self.stopToCheckThumbnailHit();
				if(self.parent.parent.menu_do) self.parent.parent.menu_do.setAlpha(1);
				return;
			}
		};

		this.hideAndShowContentFirst = function(dl){
			this.number_do.setY(self.finalH)
			FWDAnimation.to(this.number_do, .8, {y:Math.round(this.finalH - this.number_do.getHeight()/2) + self.numberOffestHidden, delay:dl, ease:Expo.easeInOut});
		}

		//#############################################//
		/* Show / hide content */
		//#############################################//
		this.showContent = function(){
			if(this.isContentShowed_bl || this.isHidden_bl) return;
			var mainTransitionDuration = .8;
		
			var dl = 0;
			overlayOpacity = .6;
			borderEase_str = Circ.easeOut;

			if(this.isContentHidden_bl){
				this.title_do.screen.firstChild.style.top = '20px';
				this.title_do.screen.firstChild.style.opacity = 0;

				this.line_do.setY(this.finalH);
			}
			
			this.isContentHidden_bl = false;
			FWDAnimation.killTweensOf(this.bk_do);	
			FWDAnimation.to(this.bk_do, .8, {alpha:1});

			FWDAnimation.killTweensOf(this.number_do);	
			FWDAnimation.to(this.number_do, .6, {y:Math.round(self.finalH - self.number_do.getHeight()) - self.numberOffestShowed, alpha:.1, ease:Expo.easeInOut});

			FWDAnimation.to(this.title_do.screen.firstChild, .6, {css:{top:'0', alpha:1}, ease:Expo.easeInOut});

			FWDAnimation.to(this.line_do, .6, {y: this.finalH - this.line_do.h, ease:Expo.easeInOut});

			this.isContentShowed_bl = true;
			clearTimeout(this.contentShowCompleteId_to);
			clearTimeout(this.contentHideCompleteId_to);
			this.contentShowCompleteId_to = setTimeout(this.showContentComplete, mainTransitionDuration * 1000);
		}
		
		this.showContentComplete = function(){
			clearTimeout(self.contentShowCompleteId_to);
			clearTimeout(self.contentHideCompleteId_to);
			self.ssId = 1;
		};
		
		this.hideContent = function(){
		
			if(!this.isContentShowed_bl) return;
			var mainTransitionDuration = .8;
		
			clearTimeout(this.showOrHideWithDelayId_to);

			FWDAnimation.killTweensOf(this.bk_do);	
			FWDAnimation.to(this.bk_do, .8, {alpha:0});
	
			FWDAnimation.killTweensOf(this.number_do);	
			FWDAnimation.to(this.number_do, .6, {y:Math.round(this.finalH - this.number_do.getHeight()/2) + self.numberOffestHidden, alpha:.5, ease:Expo.easeInOut});

			FWDAnimation.to(this.title_do.screen.firstChild, .6, {css:{top:'20px', alpha:0},  ease:Expo.easeInOut});

			FWDAnimation.to(this.line_do, .6, {y: this.finalH, alpha:1, ease:Expo.easeInOut});

			this.isContentShowed_bl = false;
			clearTimeout(this.contentShowCompleteId_to);
			clearTimeout(this.contentHideCompleteId_to);
			self.contentHideCompleteId_to = setTimeout(self.hideContentComplete, mainTransitionDuration * 1000);
		}

		
		this.hideContentComplete = function(){
			clearTimeout(self.contentShowCompleteId_to);
			clearTimeout(self.contentHideCompleteId_to);
			self.isContentHidden_bl = true;
		};

		this.init();
	};
	
	
	/* set prototype */
	FWDHSText.setPrototype = function(){
		FWDHSText.prototype = new FWDHSDisplayObject("div");
	};

	FWDHSText.MOUSE_UP = 'action';
	FWDHSText.MOUSE_OVER = 'mouse_over';
	
	FWDHSText.prototype = null;
	window.FWDHSText = FWDHSText;
}(window));﻿/* thumb */
(function(window){
	
	var FWDHSThumb = function(
			parent,
			id, 
			transitionDuration,
			transitionType_str,
			source,
			imageW,
			imageH
		){
		
		var self = this;
		var prototype = FWDHSThumb.prototype;

		this.source_str = source;
		this.background_do = null;
		this.image_do = null;
		this.overlay_do = null;
		this.source = source;
		this.id = id;
		this.finalId = id;
		this.imageW = imageW;
		this.imageH = imageH;
		this.finalX = -1;
		this.finalY = -1;
		this.transitionDuration = transitionDuration;
		this.transitionType_str = transitionType_str;
	
		this.showFirstTime_bl = true;
		this.isSelected_bl = false;
		this.isDisabled_bl = false;
		this.hasPointerEvent_bl = FWDHSUtils.hasPointerEvent;
		this.isMobile_bl = FWDHSUtils.isMobile;
	
		/* init */
		self.init = function(){
			self.setOverflow("visible");
			self.setupScreen();
		};

		/* setup screen */
		self.setupScreen = function(){
			if(self.borderRadius) self.getStyle().borderRadius = self.borderRadius + "px";
			if(self.borderRadius) self.getStyle().borderRadius = self.borderRadius + "px";
			
			if(self.borderSize){	
				self.border_do = new FWDHSDisplayObject("div");
				self.border_do.getStyle().backgroundColor = self.borderColor_str;
				self.addChild(self.border_do);
			}
		};
		
		//#########################################//
		/* Resize and position */
		//#########################################//
		this.resizeImage = function(animate){		
		
			FWDAnimation.killTweensOf(self);
			
			self.setWidth(self.finalW);
			self.setHeight(self.finalH);

			self.setX(0)
			self.setY(self.finalY);
		
			if(self.imageHolder_do){
				FWDAnimation.killTweensOf(self.image_do);
				FWDAnimation.killTweensOf(self.imageHolder_do);

				self.imageHolder_do.setX(0);
				self.imageHolder_do.setY(0);
				self.imageHolder_do.setWidth(self.finalW);
				self.imageHolder_do.setHeight(self.finalH);
				
				self.image_do.setX(Math.round((parent.stageWidth - self.imageFinalW)/2));
				self.image_do.setY(Math.round((parent.stageHeight - self.imageFinalH)/2));
				self.image_do.setWidth(self.imageFinalW);
				self.image_do.setHeight(self.imageFinalH);
			}
		}
	
		//######################################//
		/* add image */
		//######################################//
		self.setImage = function(image){
			
			self.imageHolder_do = new FWDHSDisplayObject("div");
			self.imageHolder_do.hasTransform3d_bl =  false;
			self.imageHolder_do.hasTransform2d_bl =  false;
			self.imageHolder_do.getStyle().backgroundColor = self.backgroundColor;
			self.image_do = new FWDHSDisplayObject("img");
			self.image_do.setScreen(image);
			self.image_do.hasTransform3d_bl =  false;
			self.image_do.hasTransform2d_bl =  false;
			self.image_do.setSelectable(false);
			self.image_do.screen.addEventListener("contextmenu", function(e){
				if(e.preventDefault) e.preventDefault();
			});
			
			self.imageHolder_do.addChild(self.image_do);
			self.addChild(self.imageHolder_do);
			
			self.imageHolder_do.setX(parent.stageWidth/2);
			self.imageHolder_do.setY(parent.stageHeight/2);
			self.image_do.setX(-self.imageFinalW /2);
			self.image_do.setY(-self.imageFinalH /2);
			self.image_do.setWidth(self.imageFinalW);
			self.image_do.setHeight(self.imageFinalH);

			FWDAnimation.to(self.imageHolder_do, .8, {x:0, y:0, w:parent.stageWidth, h:parent.stageHeight,
			   ease:Expo.easeInOut, onComplete:function(){ if(parent.data.maxImageHeight != 'fullscreen') self.imageHolder_do.setOverflow('visible')}});
			FWDAnimation.to(self.image_do, .8, {x:(parent.stageWidth - self.imageFinalW)/2, y:(parent.stageHeight - self.imageFinalH)/2,  ease:Expo.easeInOut});
		};
		
		self.init();
	};

	/* set prototype */
	FWDHSThumb.setPrototype = function(){
		FWDHSThumb.prototype = new FWDHSDisplayObject("div");
	};
	
	FWDHSThumb.HOVER =  "onHover";
	FWDHSThumb.CLICK =  "onClick";
	FWDHSThumb.DOUBLE_CLICK =  "onDoubleClick";
	FWDHSThumb.MOVE_VERTICAL = 'onMoveVertical';
	
	
	FWDHSThumb.IFRAME = "iframe";
	FWDHSThumb.IMAGE = "image";
	FWDHSThumb.FLASH = "flash";
	FWDHSThumb.AUDIO = "audio";
	FWDHSThumb.VIDEO = "video";
	FWDHSThumb.VIMEO= "vimeo";
	FWDHSThumb.YOUTUBE = "youtube";
	FWDHSThumb.MAPS = "maps";
	FWDHSThumb.AJAX = "ajax";
	FWDHSThumb.HTML = "html";
	
	FWDHSThumb.prototype = null;
	window.FWDHSThumb = FWDHSThumb;
}(window));﻿/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, this applies only if the position is relative.
	 */
	var FWDHSTransformDisplayObject = function(type, position, overflow, display){
		
		this.listeners = {events_ar:[]};
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			this.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.numChildren;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;	
		this.scale = 1;
		this.rotation = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform2d_bl = FWDHSUtils.hasTransform2d;
		
		//##############################//
		/* init */
		//#############################//
		this.init = function(){
			this.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		this.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof this.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		this.getOpacityType = function(){
			var opacityType;
			if (typeof this.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		this.setScreen = function(element){
			if(this.type == "img" && element){
				this.screen = element;
				this.setMainProperties();
			}else{
				this.screen = document.createElement(this.type);
				this.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		this.setMainProperties = function(){
			
			this.transform = this.getTransform();
			this.setPosition(this.position);
			//this.setDisplay(this.display);
			this.setOverflow(this.overflow);
			this.opacityType = this.getOpacityType();
			
			if(this.opacityType == "opacity") this.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			
			this.screen.style.left = "0px";
			this.screen.style.top = "0px";
			this.screen.style.margin = "0px";
			this.screen.style.padding = "0px";
			this.screen.style.maxWidth = "none";
			this.screen.style.maxHeight = "none";
			this.screen.style.border = "none";
			this.screen.style.lineHeight = "1";
			this.screen.style.backgroundColor = "transparent";
			this.screen.style.backfaceVisibility = "hidden";
		
			
			if(type == "img"){
				this.setWidth(this.screen.width);
				this.setHeight(this.screen.height);
				this.screen.onmousedown = function(e){return false;};
			}
		};
		
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		this.setSelectable = function(val){
			if(!val){
				try{this.screen.style.userSelect = "none";}catch(e){};
				try{this.screen.style.MozUserSelect = "none";}catch(e){};
				try{this.screen.style.webkitUserSelect = "none";}catch(e){};
				try{this.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{this.screen.style.oUserSelect = "none";}catch(e){};
				try{this.screen.style.msUserSelect = "none";}catch(e){};
				try{this.screen.msUserSelect = "none";}catch(e){};
				this.screen.ondragstart = function(e){return  false;};
				this.screen.onselectstart = function(){return false;};
				this.screen.style.webkitTouchCallout='none';
			}
		};
		
		this.getScreen = function(){
			return self.screen;
		};
		
		this.setVisible = function(val){
			this.visible = val;
			if(this.visible == true){
				this.screen.style.visibility = "visible";
			}else{
				this.screen.style.visibility = "hidden";
			}
		};
		
		this.getVisible = function(){
			return this.visible;
		};
			
		this.setResizableSizeAfterParent = function(){
			this.screen.style.width = "100%";
			this.screen.style.height = "100%";
		};
		
		this.getStyle = function(){
			return this.screen.style;
		};
		
		this.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		this.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		this.setDisplay = function(val){
			this.display = val;
			this.screen.style.display = this.display;
		};
		
		this.setButtonMode = function(val){
			this.buttonMode = val;
			if(this.buttonMode ==  true){
				this.screen.style.cursor = "pointer";
			}else{
				this.screen.style.cursor = "default";
			}
		};
		
		this.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		this.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		this.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		this.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		this.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		this.getAlpha = function(){
			return self.alpha;
		};
		
		this.getRect = function(){
			return this.screen.getBoundingClientRect();
		};
		
		this.getGlobalX = function(){
			return this.getRect().left;
		};
		
		this.getGlobalY = function(){
			return this.getRect().top;
		};
		
		this.setX = function(val){
			self.x = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		this.getX = function(){
			return  self.x;
		};
		
		this.setY = function(val){
			self.y = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		this.getY = function(){
			return  self.y;
		};
		
		this.setScale2 = function(val){
			self.scale = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		this.getScale = function(){
			return  self.scale;
		};
		
		this.setRotation = function(val){
			self.rotation = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		this.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		this.getWidth = function(){
			if(self.type == "div"){
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
		
		this.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		this.getHeight = function(){
			if(self.type == "div"){
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
		
		this.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		this.addChild = function(e){
			if(this.contains(e)){	
				this.children_ar.splice(FWDHSUtils.indexOfArray(this.children_ar, e), 1);
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}
		};
		
		this.removeChild = function(e){
			if(this.contains(e)){
				this.children_ar.splice(FWDHSUtils.indexOfArray(this.children_ar, e), 1);
				this.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		this.contains = function(e){
			if(FWDHSUtils.indexOfArray(this.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		this.addChildAtZero = function(e){
			if(this.numChildren == 0){
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.screen.insertBefore(e.screen, this.children_ar[0].screen);
				if(this.contains(e)){this.children_ar.splice(FWDHSUtils.indexOfArray(this.children_ar, e), 1);}	
				this.children_ar.unshift(e);
			}
		};
		
		this.getChildAt = function(index){
			if(index < 0  || index > this.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return this.children_ar[index];
		};
		
		this.removeChildAtZero = function(){
			this.screen.removeChild(this.children_ar[0].screen);
			this.children_ar.shift();
		};
		
		//################################//
		/* event dispatcher */
		//#################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
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
	        		break;
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
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
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		this.disposeImage = function(){
			if(this.type == "img") this.screen.src = null;
		};
		
		
		this.destroy = function(){
			
			try{this.screen.parentNode.removeChild(this.screen);}catch(e){};
			
			this.screen.onselectstart = null;
			this.screen.ondragstart = null;
			this.screen.ontouchstart = null;
			this.screen.ontouchmove = null;
			this.screen.ontouchend = null;
			this.screen.onmouseover = null;
			this.screen.onmouseout = null;
			this.screen.onmouseup = null;
			this.screen.onmousedown = null;
			this.screen.onmousemove = null;
			this.screen.onclick = null;
			
			delete this.screen;
			delete this.style;
			delete this.rect;
			delete this.selectable;
			delete this.buttonMode;
			delete this.position;
			delete this.overflow;
			delete this.visible;
			delete this.innerHTML;
			delete this.numChildren;
			delete this.x;
			delete this.y;
			delete this.w;
			delete this.h;
			delete this.opacityType;
			delete this.isHtml5_bl;
			delete this.hasTransform2d_bl;

			this.children_ar = null;
			this.style = null;
			this.screen = null;
			this.numChildren = null;
			this.transform = null;
			this.position = null;
			this.overflow = null;
			this.display= null;
			this.visible= null;
			this.buttonMode = null;
			this.globalX = null;
			this.globalY = null;
			this.x = null;
			this.y = null;
			this.w = null;;
			this.h = null;;
			this.rect = null;
			this.alpha = null;
			this.innerHTML = null;
			this.opacityType = null;
			this.isHtml5_bl = null;
			this.hasTransform3d_bl = null;
			this.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		this.init();
	};
	
	window.FWDHSTransformDisplayObject = FWDHSTransformDisplayObject;
}(window));﻿//FWDHSUtils
(function (window){
	
	var FWDHSUtils = function(){};
	
	FWDHSUtils.dumy = document.createElement("div");
	
	//###################################//
	/* String */
	//###################################//
	FWDHSUtils.trim = function(str){
		return str.replace(/\s/gi, "");
	};
			
	FWDHSUtils.trimAndFormatUrl = function(str){
		str = str.toLocaleLowerCase();
		str = str.replace(/ /g, "-");
		return str;
	};
	
	FWDHSUtils.splitAndTrim = function(str, trim_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDHSUtils.trim(array[i]);
		};
		return array;
	};
	
	FWDHSUtils.formatTime = function(secs){
		var hours = Math.floor(secs / (60 * 60));
		
		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);

		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);
		
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		
		if(isNaN(seconds)) return "00:00";
		if(self.hasHours_bl){
			 return hours + ":" + minutes + ":" + seconds;
		}else{
			 return minutes + ":" + seconds;
		}
	};

	FWDHSUtils.unescapeHtml = function(html){
	    var el = document.createElement('div');
	    return html.replace(/\&[#0-9a-z]+;/gi, function (enc) {
	        el.innerHTML = enc;
	        return el.innerText
	    });
	}
	
	FWDHSUtils.getSecondsFromString = function(str){
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var duration = 0;
		
		if(!str) return undefined;
		
		str = str.split(":");
		
		hours = str[0];
		if(hours[0] == "0" && hours[1] != "0"){
			hours = parseInt(hours[1]);
		}
		if(hours == "00") hours = 0;
		
		minutes = str[1];
		if(minutes[0] == "0" && minutes[1] != "0"){
			minutes = parseInt(minutes[1]);
		}
		if(minutes == "00") minutes = 0;
		
		secs = parseInt(str[2].replace(/,.*/ig, ""));
		if(secs[0] == "0" && secs[1] != "0"){
			secs = parseInt(secs[1]);
		}
		if(secs == "00") secs = 0;
		
		if(hours != 0){
			duration += (hours * 60 * 60)
		}
		
		if(minutes != 0){
			duration += (minutes * 60)
		}
		
		duration += secs;
		
		return duration;
	 };

	//#############################################//
	//Array //
	//#############################################//
	FWDHSUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};
	
	FWDHSUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDHSUtils.parent = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDHSUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDHSUtils.getChildAt = function (e, n){
		var kids = FWDHSUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDHSUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDHSUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDHSUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDHSUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDHSUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDHSUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDHSUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDHSUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDHSUtils.getAttributeValue = function(e, attr){
		if(!FWDHSUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDHSUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.attributes[attr];
			return  test ? true : false;
		}
	};
	
	FWDHSUtils.insertNodeAt = function(parent, child, n){
		var children = FWDHSUtils.children(parent);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			parent.insertBefore(child, children[n]);
		};
	};
	
	FWDHSUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	
	FWDHSUtils.getCanvasWithModifiedColor = function(img, hexColor, returnImage){
		if(!img) return;
		var newImage;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		var originalPixels = null;
		var currentPixels = null;
		var long = parseInt(hexColor.replace(/^#/, ""), 16);
		var hexColorRGB = {
			R: (long >>> 16) & 0xff,
			G: (long >>> 8) & 0xff,
			B: long & 0xff
		};
		
		canvas.style.position = "absolute";
		canvas.style.left = "0px";
		canvas.style.top = "0px";
		canvas.style.margin = "0px";
		canvas.style.padding = "0px";
		canvas.style.maxWidth = "none";
		canvas.style.maxHeight = "none";
		canvas.style.border = "none";
		canvas.style.lineHeight = "1";
		canvas.style.backgroundColor = "transparent";
		canvas.style.backfaceVisibility = "hidden";
		canvas.style.webkitBackfaceVisibility = "hidden";
		canvas.style.MozBackfaceVisibility = "hidden";	
		canvas.style.MozImageRendering = "optimizeSpeed";	
		canvas.style.WebkitImageRendering = "optimizeSpeed";
		canvas.width = img.width;
		canvas.height = img.height;
		
		ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
		originalPixels = ctx.getImageData(0, 0, img.width, img.height);
		currentPixels = ctx.getImageData(0, 0, img.width, img.height);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4){
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * hexColorRGB.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * hexColorRGB.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * hexColorRGB.B;
            }
        }
		
		ctx.globalAlpha = .5;
        ctx.putImageData(currentPixels, 0, 0);
		ctx.drawImage(canvas, 0, 0);
        
		if(returnImage){
			newImage = new Image();
			newImage.src = canvas.toDataURL();
		}
		return {canvas:canvas, image:newImage};
	};
	
	FWDHSUtils.changeCanvasHEXColor = function(img, canvas, hexColor, returnNewImage){
		if(!img) return;
		var canvas = canvas;
		var ctx = canvas.getContext("2d");
		var originalPixels = null;
		var currentPixels = null;
		var long = parseInt(hexColor.replace(/^#/, ""), 16);
		var hexColorRGB = {
			R: (long >>> 16) & 0xff,
			G: (long >>> 8) & 0xff,
			B: long & 0xff
		};
		
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
		originalPixels = ctx.getImageData(0, 0, img.width, img.height);
		currentPixels = ctx.getImageData(0, 0, img.width, img.height);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4){
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * hexColorRGB.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * hexColorRGB.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * hexColorRGB.B;
            }
        }
		
		ctx.globalAlpha = .5;
        ctx.putImageData(currentPixels, 0, 0);
		ctx.drawImage(canvas, 0, 0);
		
		if(returnNewImage){
			var newImage = new Image();
			newImage.src = canvas.toDataURL();
			return newImage;
		}
    }
	
	//###################################//
	/* DOM geometry */
	//##################################//
	FWDHSUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.left +(rect.right - rect.left) && y >= rect.top && y <= rect.top + (rect.bottom - rect.top)) return true;
		return false;
	};
	
	FWDHSUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDHSUtils.getViewportSize = function(){
		if(FWDHSUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1){
			return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
		}
		
		if(FWDHSUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDHSUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDHSUtils.getScrollOffsets();
		
		if(e.touches){
			return{
				screenX:e.touches[0] == undefined ? e.touches.pageX - offsets.x :e.touches[0].pageX - offsets.x,
				screenY:e.touches[0] == undefined ? e.touches.pageY - offsets.y :e.touches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDHSUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled) || Boolean(window.navigator.pointerEnabled);
	}());
	
	FWDHSUtils.isMobile = (function (){
		if((FWDHSUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) || (FWDHSUtils.hasPointerEvent && navigator.maxTouchPoints > 1)) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kfsowi'];
	    for(i in agents) {
	    	 if(navigator.userAgent.toLowerCase().indexOf(agents[i]) != -1) {
	            return true;
	        }
	    }
	    if(navigator.platform.toLowerCase() === 'macintel' && navigator.maxTouchPoints > 1 && !window.MSStream) return true;
	    return false;
	}());
	
	FWDHSUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDHSUtils.hasWEBGL = (function(){
		try{
			var canvas = document.createElement( 'canvas' ); 
			return !! window.WebGLRenderingContext && ( 
				 canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
		   }catch( e ) { return false; } 
	}());
	
	FWDHSUtils.isLocal = (function(){
		if(document.location.protocol == "file:"){
			return true;
		}else{
			return false;
		}
	}());
	
	
	FWDHSUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDHSUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDHSUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opr') != -1;
	}());
	
	FWDHSUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDHSUtils.isIEWebKit = (function(){
		return Boolean(document.documentElement.msRequestFullscreen);
	}());
	
	FWDHSUtils.isIE = (function(){
		var isIE = Boolean(navigator.userAgent.toLowerCase().indexOf('msie') != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf('edge') != -1);
		return isIE || Boolean(document.documentElement.msRequestFullscreen);
	}());
	
	FWDHSUtils.isIEAndLessThen9 = (function(){
		return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1);
	}());
	
	FWDHSUtils.isIE7 = (function(){
		return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1);
	}());
	
	FWDHSUtils.isApple = (function(){
		return Boolean(navigator.appVersion.toLowerCase().indexOf('mac') != -1);
	}());
	
	FWDHSUtils.isIphone = (function(){
		return navigator.userAgent.match(/(iPhone|iPod)/g);
	}());
	
	FWDHSUtils.hasFullScreen = (function(){
		return FWDHSUtils.dumy.requestFullScreen || FWDHSUtils.dumy.mozRequestFullScreen || FWDHSUtils.dumy.webkitRequestFullScreen || FWDHSUtils.dumy.msieRequestFullScreen;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDHSUtils.dumy.style[p] !== 'undefined') {
	    	   FWDHSUtils.dumy.style.position = "absolute";
	    	   position = FWDHSUtils.dumy.getBoundingClientRect().left;
	    	   FWDHSUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDHSUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDHSUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDHSUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDHSUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDHSUtils.dumy);}catch(e){}
	    return false;
	};
	
	//###############################################//
	/* Media. */
	//###############################################//
	
	
	FWDHSUtils.volumeCanBeSet = (function(){
		var soundTest_el = document.createElement("audio");
		if(!soundTest_el) return;
		soundTest_el.volume = 0;
		return soundTest_el.volume == 0 ? true : false;
	}());
	
	
	FWDHSUtils.getVideoFormat = (function(){
		var video  =  document.createElement("video");
		if(!video.canPlayType) return;
		var extention_str;
		if(video.canPlayType("video/mp4") == "probably" || video.canPlayType("video/mp4") == "maybe"){
			extention_str = ".mp4";
		}else if(video.canPlayType("video/ogg") == "probably" || video.canPlayType("video/ogg") == "maybe"){
			extention_str = ".ogg";
		}else if(video.canPlayType("video/webm") == "probably" || video.canPlayType("video/webm") == "maybe"){
			extention_str = ".webm";
		}
		video = null;
		return extention_str;
	})();
	
	
	//###############################################//
	/* various utils */
	//###############################################//
	FWDHSUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			window.addEventListener("DOMContentLoaded", function(){
				FWDHSUtils.checkIfHasTransofrms();
				FWDHSUtils.hasFullScreen = FWDHSUtils.checkIfHasFullscreen();
				setTimeout(callbalk, 100);
			});
		}else{
			document.onreadystatechange = function () {
				FWDHSUtils.checkIfHasTransofrms();
				FWDHSUtils.hasFullScreen = FWDHSUtils.checkIfHasFullscreen();
				if (document.readyState == "complete") setTimeout(callbalk, 100);
			};
		 }
		
	};
	
	FWDHSUtils.checkIfHasTransofrms = function(){
		document.documentElement.appendChild(FWDHSUtils.dumy);
		FWDHSUtils.hasTransform3d = get3d();
		FWDHSUtils.hasTransform2d = get2d();
		FWDHSUtils.isReadyMethodCalled_bl = true;
	};
	
	FWDHSUtils.checkIfHasFullscreen = function(){
		return Boolean(document.documentElement.requestFullScreen
		|| document.documentElement.mozRequestFullScreen
		|| document.documentElement.webkitRequestFullScreen
		|| document.documentElement.msRequestFullscreen);
	};
	
	FWDHSUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDHSUtils.getUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("?") + 1) || location.search.substring(1);
		query = query.replace(/(\?*)(\/*)/g, "");
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	FWDHSUtils.getHashUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("#") + 1) || location.search.substring(1);
		query = query.replace(/(\?*)(\/*)/g, "");
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};

	
	FWDHSUtils.validateEmail = function(mail){  
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
			return true;  
		}  
		return false;  
    }; 
    
	
	FWDHSUtils.isReadyMethodCalled_bl = false;
	
	window.FWDHSUtils = FWDHSUtils;
}(window));

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());