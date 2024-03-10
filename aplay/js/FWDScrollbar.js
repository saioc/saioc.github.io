/**
 * Content scrollbar.
 *
 * @package acora
 * @since acora 1.0
 */
 
;(function($){

	'use strict';
	
	var FWDScrollbar = function(
			container
		){
		if(!container){
			return;
		}
	
		var self  = this;
		self.mContainer;
		self.container = container;
		self.scollbarSpeedSensitivity = .8;
		self.scrollBarHandlerFinalY = 0;
		self.allowMouseWheel = true;
		
		this.init = function(){
			if(FWDUtils.isMobile){
				return;
			} 
			self.isInitialized_bl = true;
			self.addResizeHandler();
			self.setupContainers();
			self.setupDisable();
			self.addMouseWheelSupport();
			self.update();
			self.stopToUpdate();
			setTimeout(function(){
				self.update();
				self.stopToUpdate();
			}, 200);
		};

		// Add resize handler
		this.addResizeHandler = function(){
			window.addEventListener('resize', self.positionAndResize);
		}
		
		this.positionAndResize = function(){
			if(!self.isInitialized_bl) return;
			self.stageHeight = self.mContainer.screen.offsetHeight;
			self.containerH = self.container.offsetHeight;
			self.updateScrollBarSizeActiveAndDeactivate();
			self.updateScrollBarHandlerAndContent();
		};

		// Setup main containers
		this.setupContainers =  function(){
			// Main containers
			self.mContainer =  new FWDSDisplayObject('div');
			self.mContainer.screen.className = 'fwd-scrollbar';
			self.mContainer.getStyle().position = 'relative';
			self.mContainer.getStyle().overflow = 'visible';
			self.mContainer.getStyle().height = '100%';
			
			self.container.style.position = 'relative';
			self.container.style.height = 'auto';
			self.container.style.overflow = 'visible';
			$(self.container).addClass('scroll-content');
			$(self.mContainer.screen).insertBefore(container);
			$(self.mContainer.screen).append(self.container);
			// Scrollbar
			self.scrMainHolder_do = new FWDSDisplayObject("div");
			self.scrMainHolder_do.screen.className = 'fwd-scrollbar-holder';
			
			self.scrTrack_do = new FWDSDisplayObject("div");
			self.scrTrack_do.screen.className = 'fwd-scrollbar-track';
			self.scrHandler_do = new FWDSDisplayObject("div");
			self.scrHandler_do.screen.className = 'fwd-scrollbar-handler';
			self.scrHandler_do.setButtonMode(true);
			self.scrMainHolder_do.addChild(self.scrTrack_do);
			self.scrMainHolder_do.addChild(self.scrHandler_do);
			self.mContainer.addChild(self.scrMainHolder_do);
			self.scrHandler_do.screen.addEventListener("mouseover", self.scrollBarHandlerOnMouseOver);
			self.scrHandler_do.screen.addEventListener("mouseout", self.scrollBarHandlerOnMouseOut);
			self.scrHandler_do.screen.addEventListener("mousedown", self.scrollBarHandlerOnMouseDown);
		}

		this.scrollBarHandlerOnMouseOver = function(e){
			if(self.isDragging_bl  || !self.allowToScrollAndScrollBarIsActive_bl) return; 
			$(self.scrHandler_do.screen).addClass('fwd-scrollbar-handler-active');
		};
		
		this.scrollBarHandlerOnMouseOut = function(e){
			if(self.isDragging_bl || !self.allowToScrollAndScrollBarIsActive_bl) return;
			$(self.scrHandler_do.screen).removeClass('fwd-scrollbar-handler-active');
		};
		
		this.scrollBarHandlerOnMouseDown = function(e){
			if(!self.allowToScrollAndScrollBarIsActive_bl) return;
			var vc = FWDUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.yPositionOnPress = self.scrHandler_do.y;
			self.lastPresedY = vc.screenY;
			FWDAnimation.killTweensOf(self.scrHandler_do);
			self.showDisable();
			
			window.addEventListener("mousemove", self.scrollBarHandlerMoveHandler);
			window.addEventListener("mouseup", self.scrollBarHandlerEndHandler);	
		};

		this.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var vc = FWDUtils.getViewportMouseCoordinates(e);	
			self.scrollBarHandlerFinalY = Math.round(self.yPositionOnPress + vc.screenY - self.lastPresedY);
			
			if(self.scrollBarHandlerFinalY >= self.stageHeight - self.scrHandler_do.h){
				self.scrollBarHandlerFinalY = self.stageHeight -  self.scrHandler_do.h;
			}else if(self.scrollBarHandlerFinalY <= 0){
				self.scrollBarHandlerFinalY = 0;
			}
			
			self.scrHandler_do.setY(self.scrollBarHandlerFinalY);
			self.updateScrollBarHandlerAndContent(true);
		};

		self.scrollBarHandlerEndHandler = function(e){
			var vc = FWDUtils.getViewportMouseCoordinates(e);	
			self.isDragging_bl = false;
			
			if(!FWDUtils.hitTest(self.scrHandler_do.screen, vc.screenX, vc.screenY)){
				$(self.scrHandler_do.screen).removeClass('fwd-scrollbar-handler-active');
			}
			
			self.hideDisable();
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", self.scrollBarHandlerEndHandler);	
			}
		};

		// Update / activate / deactiveate
		this.startToUpdate = function(){
			self.stopToUpdate();
			self.animR = requestAnimationFrame(self.update);
		}

		this.stopToUpdate = function(){
			cancelAnimationFrame(self.animR);
		}

		this.update = function(){
			self.positionAndResize();
			self.animR = requestAnimationFrame(self.update);
		}

		this.updateScrollBarSizeActiveAndDeactivate = function(){
			if(self.containerH  > self.stageHeight){
				self.allowToScrollAndScrollBarIsActive_bl = true;
			}else{
				self.allowToScrollAndScrollBarIsActive_bl = false;
			}
			if(self.allowToScrollAndScrollBarIsActive_bl){
				self.showScrollbar();
			}else{
				self.hideScrollbar();
			}
			self.scrMainHolder_do.setHeight(self.stageHeight);
			self.scrTrack_do.setHeight(self.scrMainHolder_do.h);
			self.scrHandler_do.setHeight(Math.max(120, Math.round(Math.min(1,(self.scrMainHolder_do.h/self.containerH)) * self.scrMainHolder_do.h)));
		}

		this.showScrollbar = function(dl){
			if(!self.isInitialized_bl) return;
			if(!self.scrShowed){
				var dl = dl;
				if(!dl) dl = 0;
				FWDAnimation.to(self.scrMainHolder_do, .6, {alpha:1, delay:dl});
				self.scrShowed = true;
			} 
			self.scrHandler_do.setButtonMode(true);
		}

		this.hideScrollbar = function(overwrite){
			if(!self.isInitialized_bl) return;
			if(self.scrShowed || overwrite){
				FWDAnimation.killTweensOf(self.scrMainHolder_do);
				if(overwrite){
					self.scrMainHolder_do.setAlpha(0);
				}else{
					FWDAnimation.to(self.scrMainHolder_do, .6, {alpha:0});
				}
				
				self.scrShowed = false;
			} 
			
			self.scrHandler_do.setButtonMode(false);
		}

		this.updateScrollBarHandlerAndContent = function(animate, overwrite){
		
			var percentScrolled = 0;
			if(self.isDragging_bl){
				percentScrolled = (self.scrollBarHandlerFinalY/(self.stageHeight - self.scrHandler_do.h));
				if(percentScrolled == "Infinity" || percentScrolled < 0){
					percentScrolled = 0;
				}else if(percentScrolled >= 1){
					percentScrolled = 1;
				}
				self.containerFinalY = Math.round(percentScrolled * (self.containerH - self.stageHeight)) * -1;
			}else{
				self.scrollBarHandlerFinalY = self.scrHandler_do.getRect().top;
				if((self.lastContainerH != self.containerH)
				|| (self.prevStageHeight != self.stageHeight)){
					var y = self.container.getBoundingClientRect().top;
					percentScrolled = y/(self.stageHeight - self.containerH);
					if(percentScrolled < 0){
						percentScrolled = 0;
					}else if(percentScrolled >= 1){
						percentScrolled = 1;
					}
					self.containerFinalY = Math.round(percentScrolled * (self.containerH - self.stageHeight)) * -1;
					self.scrHandler_do.setY(Math.round(percentScrolled * (self.stageHeight - self.scrHandler_do.h)));
				}
			}
			
			if(self.lastContentFinalY != self.containerFinalY){
				FWDAnimation.killTweensOf(self.container);
				if(animate){
					FWDAnimation.to(self.container, .5, {y:self.containerFinalY, ease:Quart.easeOut});
				}else{
					FWDAnimation.to(self.container, 0.001, {y:self.containerFinalY});
				}
			}
			
			self.lastContentFinalY = self.containerFinalY;
			self.lastContainerH = self.containerH;
			self.prevStageHeight = self.stageHeight;
		};

		// Add mouse wheel support
		this.addMouseWheelSupport = function(){
			self.mContainer.screen.addEventListener('DOMMouseScroll', self.mouseWheelHandler);
			self.mContainer.screen.addEventListener ("mousewheel", self.mouseWheelHandler);
		};
		
		self.mouseWheelHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isDragging_bl || !self.allowMouseWheel) return false;
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			//if(FWDUtils.isOpera) dir *= -1;
		
			if(dir > 0){
				self.scrollBarHandlerFinalY += Math.round((160 * self.scollbarSpeedSensitivity)  * (self.stageHeight/self.containerH));
			}else if(dir < 0){
				self.scrollBarHandlerFinalY -= Math.round((160 * self.scollbarSpeedSensitivity)  * (self.stageHeight/self.containerH));
			}
			
			if(self.scrollBarHandlerFinalY >= self.stageHeight - self.scrHandler_do.h){
				self.scrollBarHandlerFinalY = self.stageHeight -  self.scrHandler_do.h;
			}else if(self.scrollBarHandlerFinalY <= 0){
				self.scrollBarHandlerFinalY = 0;
			}
			
			FWDAnimation.killTweensOf(self.scrHandler_do);
			FWDAnimation.to(self.scrHandler_do, .5, {y:self.scrollBarHandlerFinalY, ease:Quart.easeOut});
			self.isDragging_bl = true;
			self.updateScrollBarHandlerAndContent(true);
			self.isDragging_bl = false;
		
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};

		// Setup disable
		this.setupDisable = function(){
			self.disable =  new FWDSDisplayObject('div');
			self.disable.getStyle().width = '100%';
			self.disable.getStyle().height = '100%';
			self.disable.getStyle().zIndex = 99999999;
			self.disable.getStyle().backgroundColor = 'rgba(0,0,0,0)';
		}

		this.showDisable = function(){
			document.documentElement.appendChild(self.disable.screen);
		}

		this.hideDisable = function(){
			document.documentElement.removeChild(self.disable.screen);
		}
		
		// Sow hide
		this.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.setVisible(true);
			FWDAnimation.killTweensOf(self);
			if(animate){
				//FWDAnimation.to(self, .8, {alpha:1, ease:Expo.easeInOut});
			}else{
				//self.setAlpha(1);
			}
		};
		
		this.hide = function(animate, overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			self.isShowed_bl = false;
			FWDAnimation.killTweensOf(self);
			
		};
		
		this.init();
	};
	
    FWDScrollbar.prototype = null;
	window.FWDScrollbar = FWDScrollbar;
 })(jQuery);