/**
 * FWDUtils.
 *
 * @package acora
 * @since acora 1.0
 */
 
;(function ($){
	'use strict';
	
	var FWDUtils = function(){};
	//#############################################//
	//Array //
	//#############################################//
	FWDUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};
	
	FWDUtils.randomizeArray = function(aArray) {
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

	//###################################//
	/* DOM */
	//##################################//
	FWDUtils.decodeHtml =  function(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    FWDUtils.encodeHtml = function(str) {
	    var map = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        "\"": "&quot;",
			"'": "&#039;"
	    };
		//str = str.replace(/'/g, "\"");
	    return str.replace(/[&<>"']/g, function(m){
	    	return map[m]; 
	 	});
	}

	FWDUtils.setTextAreaText = function(str, id){
        $("#" + id)[0].value  = FWDUtils.decodeHtml(str);
    }

    FWDUtils.getTextAreaText = function(id, encode){
        var val = $("#" + id).val().replace(/"/g, "'").replace(/\n/g, "");
        if(encode){
        	val = FWDUtils.encodeHtml(val);
    	}
        return val;
    }

	FWDUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.left +(rect.right - rect.left) && y >= rect.top && y <= rect.top + (rect.bottom - rect.top)) return true;
		return false;
	};
	
	FWDUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDUtils.getViewportSize = function(){
	
		if(FWDUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:window.innerWidth || document.documentElement.clientWidth, h:window.innerHeight || document.documentElement.clientHeight};
	};
	
	FWDUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDUtils.getScrollOffsets();
		
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

	FWDUtils.checkIfHas3D = function(){
		FWDUtils.dumy = document.createElement("div");
		document.documentElement.appendChild(FWDUtils.dumy);
		FWDUtils.hasTransform3d = get3d();
	};
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDUtils.dumy.style[p] !== 'undefined') {
	    	   FWDUtils.dumy.style.position = "absolute";
	    	   position = FWDUtils.dumy.getBoundingClientRect().left;
	    	   FWDUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDUtils.dumy.getBoundingClientRect().left - position);
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDUtils.dumy);}catch(e){}
	};
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled) || Boolean(window.navigator.pointerEnabled);
	}());
	
	FWDUtils.isMobile = (function (){
		//if((FWDUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) || (FWDUtils.hasPointerEvent && navigator.maxTouchPoints > 1)) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kfsowi'];
	    for(var i in agents) {
	    	 if(navigator.userAgent.toLowerCase().indexOf(agents[i]) != -1) {
	            return true;
	        }
	    }
	    if(navigator.platform.toLowerCase() === 'macintel' && navigator.maxTouchPoints > 1 && !window.MSStream) return true;
	    return false;
	}());
	
	FWDUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	FWDUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opr') != -1;
	}());
	
	FWDUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDUtils.isIEWebKit = (function(){
		return Boolean(document.documentElement.msRequestFullscreen);
	}());
	
	FWDUtils.isIE = (function(){
		var isIE = Boolean(navigator.userAgent.toLowerCase().indexOf('msie') != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf('edge') != -1);
		return isIE || Boolean(document.documentElement.msRequestFullscreen);
	}());
	
	FWDUtils.isIEAndLessThen9 = (function(){
		return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1);
	}());
	
	FWDUtils.isIE7 = (function(){
		return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1);
	}());
	
	FWDUtils.isApple = (function(){
		return Boolean(navigator.appVersion.toLowerCase().indexOf('mac') != -1);
	}());
	
	FWDUtils.isIphone = (function(){
		return navigator.userAgent.match(/(iPhone|iPod)/g);
	}());
	
	FWDUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDUtils.getUrlArgs = function urlArgs(string){
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
	
	FWDUtils.getHashUrlArgs = function urlArgs(string){
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
	
	FWDUtils.validateEmail = function(mail){  
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
			return true;  
		}  
		return false;  
    }; 
    
	
	FWDUtils.isReadyMethodCalled_bl = false;
	
	window.FWDUtils = FWDUtils;
}(jQuery));