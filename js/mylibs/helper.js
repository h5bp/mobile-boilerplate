/*
 * MBP - Mobile boilerplate helper functions
 */
(function(document){

window.MBP = window.MBP || {}; 

// Fix for iPhone viewport scale bug 
// http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/

MBP.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
MBP.ua = navigator.userAgent;

MBP.scaleFix = function () {
  if (MBP.viewportmeta && /iPhone|iPad|iPod/.test(MBP.ua) && !/Opera Mini/.test(MBP.ua)) {
    MBP.viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    document.addEventListener("gesturestart", MBP.gestureStart, false);
  }
};
MBP.gestureStart = function () {
    MBP.viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
};


// Hide URL Bar for iOS and Android by Scott Jehl
// https://gist.github.com/1183357

MBP.hideUrlBar = function () {
	var win = window,
		doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash || !win.addEventListener ){

		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,

		//reset to 0 on bodyready, if needed
		bodycheck = setInterval(function(){
			if( doc.body ){
				clearInterval( bodycheck );
				scrollTop = "scrollTop" in doc.body ? doc.body.scrollTop : 1;
				win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
			}	
		}, 15 );

		win.addEventListener( "load", function(){
			setTimeout(function(){
				//reset to hide addr bar at onload
				win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
			}, 0);
		}, false );
	}
};


// Fast Buttons - read wiki below before using
// https://github.com/h5bp/mobile-boilerplate/wiki/JavaScript-Helper
MBP.fastButton = function (element, handler) {
    this.element = element;
    this.handler = handler;
	
	addEvt(element, "touchstart", this, false);
	addEvt(element, "click", this, false);
	
    /*if (element.addEventListener) {
		try {
		  element.addEventListener('touchstart', this, false);
		  element.addEventListener('click', this, false);
		} catch (e) {
			element.addEventListener('click', handler, false);
		}
	} else if ("attachEvent" in element) {
		if(typeof this == "object" && this.handleEvent) {
			element.attachEvent("onclick", function(){
                // Bind fn as this
                this.handleEvent.call(this);
            });
		} else {
			element.attachEvent("onclick", handler);
		}
	}*/
};

MBP.fastButton.prototype.handleEvent = function(event) {
	event = event || window.event;
    switch (event.type) {
        case 'touchstart': this.onTouchStart(event); break;
        case 'touchmove': this.onTouchMove(event); break;
        case 'touchend': this.onClick(event); break;
        case 'click': this.onClick(event); break;
    }
};

MBP.fastButton.prototype.onTouchStart = function(event) {
    event.stopPropagation();
    this.element.addEventListener('touchend', this, false);
    document.body.addEventListener('touchmove', this, false);
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.element.style.backgroundColor = "rgba(0,0,0,.7)";
};

MBP.fastButton.prototype.onTouchMove = function(event) {
    if(Math.abs(event.touches[0].clientX - this.startX) > 10 || 
       Math.abs(event.touches[0].clientY - this.startY) > 10    ) {
        this.reset();
    }
};

MBP.fastButton.prototype.onClick = function(event) {
	event = event || window.event;
    if (event.stopPropagation) { event.stopPropagation(); }
    this.reset();
    this.handler(event);
    if(event.type == 'touchend') {
        MBP.preventGhostClick(this.startX, this.startY);
    }
    this.element.style.backgroundColor = "";
};

MBP.fastButton.prototype.reset = function() {
	rmEvt(this.element, "touchend", this, false);
	rmEvt(document.body, "touchmove", this, false);
    this.element.style.backgroundColor = "";
};

MBP.preventGhostClick = function (x, y) {
    MBP.coords.push(x, y);
    window.setTimeout(function (){
        MBP.coords.splice(0, 2);
    }, 2500);
};

MBP.ghostClickHandler = function (event) {
    for(var i = 0, len = MBP.coords.length; i < len; i += 2) {
        var x = MBP.coords[i];
        var y = MBP.coords[i + 1];
        if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
};

if (document.addEventListener) {
    document.addEventListener('click', MBP.ghostClickHandler, true);
}
                            
MBP.coords = [];

// fn arg can be an object or a function, thanks to handleEvent
// read more about the explanation at: http://www.thecssninja.com/javascript/handleevent
function addEvt(el, evt, fn, bubble) {
    if("addEventListener" in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
            el.addEventListener(evt, fn, bubble);
        } catch(e) {
            if(typeof fn == "object" && fn.handleEvent) {
                el.addEventListener(evt, function(e){
                    // Bind fn as this and set first arg as event object
                    fn.handleEvent.call(fn,e);
                }, bubble);
            } else {
                throw e;
            }
        }
    } else if("attachEvent" in el) {
        // check if the callback is an object and contains handleEvent
        if(typeof fn == "object" && fn.handleEvent) {
            el.attachEvent("on" + evt, function(){
                // Bind fn as this
                fn.handleEvent.call(fn);
            });
        } else {
            el.attachEvent("on" + evt, fn);
        }
    }
}

function rmEvt(el, evt, fn, bubble) {
    if("removeEventListener" in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
            el.removeEventListener(evt, fn, bubble);
        } catch(e) {
            if(typeof fn == "object" && fn.handleEvent) {
                el.removeEventListener(evt, function(e){
                    // Bind fn as this and set first arg as event object
                    fn.handleEvent.call(fn,e);
                }, bubble);
            } else {
                throw e;
            }
        }
    } else if("detachEvent" in el) {
        // check if the callback is an object and contains handleEvent
        if(typeof fn == "object" && fn.handleEvent) {
            el.detachEvent("on" + evt, function(){
                // Bind fn as this
                fn.handleEvent.call(fn);
            });
        } else {
            el.detachEvent("on" + evt, fn);
        }
    }
}


// iOS Startup Image
// https://github.com/h5bp/mobile-boilerplate/issues#issue/2

MBP.splash = function () {
    var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';
    document.write('<link rel="apple-touch-startup-image" href="/img/' + filename + 'splash.png" />' );
};


// Autogrow
// http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html

MBP.autogrow = function (element, lh) {

    function handler(e){
        var newHeight = this.scrollHeight,
            currentHeight = this.clientHeight;
        if (newHeight > currentHeight) {
            this.style.height = newHeight + 3 * textLineHeight + "px";
        }
    }

    var setLineHeight = (lh) ? lh : 12,
        textLineHeight = element.currentStyle ? element.currentStyle.lineHeight : 
                         getComputedStyle(element, null).lineHeight;

    textLineHeight = (textLineHeight.indexOf("px") == -1) ? setLineHeight :
                     parseInt(textLineHeight, 10);

    element.style.overflow = "hidden";
    element.addEventListener ? element.addEventListener('keyup', handler, false) :
                               element.attachEvent('onkeyup', handler);
};

})(document);


// Prevent iOS from zooming onfocus
// http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/

var $viewportMeta = $('meta[name="viewport"]');
$('input, select, textarea').bind('focus blur', function(event) {
  $viewportMeta.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
});
