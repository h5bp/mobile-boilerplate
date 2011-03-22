/*!
 * mbp - Moible boilerplate helper functions: 
 * http://www.blog.highub.com/
 * by Shi Chuan
 */
 
// Hide URL Bar for iOS
// http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/
function hideUrlBar() {
	/mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function () {
	window.scrollTo(0, 1);
	}, 1000);
}


// Fast Buttons
// http://code.google.com/mobile/articles/fast_buttons.html
function fastButton(element, handler) {
    this.element = element;
    this.handler = handler;
	element.addEventListener('touchstart', this, false);
	element.addEventListener('click', this, false);
};

fastButton.prototype.handleEvent = function(event) {
    switch (event.type) {
		case 'touchstart': this.onTouchStart(event); break;
        case 'touchmove': this.onTouchMove(event); break;
        case 'touchend': this.onClick(event); break;
        case 'click': this.onClick(event); break;
    }
};

fastButton.prototype.onTouchStart = function(event) {
    event.stopPropagation();
    this.element.addEventListener('touchend', this, false);
	document.body.addEventListener('touchmove', this, false);
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.element.style.backgroundColor = "rgba(0,0,0,.7)";
};

fastButton.prototype.onTouchMove = function(event) {
    if(Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
		this.reset();
    }
};
fastButton.prototype.onClick = function(event) {
    event.stopPropagation();
    this.reset();
    this.handler(event);
    if(event.type == 'touchend') {
		preventGhostClick(this.startX, this.startY);
    }
    this.element.style.backgroundColor = "";
};
fastButton.prototype.reset = function() {
    this.element.removeEventListener('touchend', this, false);
    document.body.removeEventListener('touchmove', this, false);
    this.element.style.backgroundColor = "";
};
function preventGhostClick(x, y) {
    coordinates.push(x, y);
    window.setTimeout(gpop, 2500);
};
function gpop() {
	coordinates.splice(0, 2);
};
function gonClick(event) {
	for(var i = 0; i < coordinates.length; i += 2) {
		var x = coordinates[i];
        var y = coordinates[i + 1];
        if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
			event.stopPropagation();
            event.preventDefault();
        }
    }
};
document.addEventListener('click', gonClick, true);
var coordinates = [];


// iOS Startup Image
function iosStrtSrn() {
  var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';
  document.write('<link rel="apple-touch-startup-image" href="/img/' + filename + 'splash.png" />' );
}


// Autogrow
(function( $ ){

  $.fn.growingTextarea = function( options ) {
	
	var settings = {
      'lineHeight' : 12
    };
	
    return this.each(function() {
		if ( options ) { 
			$.extend( settings, options );
		}
		var $this = $(this);
		var textLineHeight = $this.css("line-height");
		
		if (textLineHeight.indexOf("px") == -1) {
			textLineHeight = settings.lineHeight;
		} else {
			textLineHeight = parseInt(textLineHeight, 10);
		}
		$this.css('overflow','hidden');
		$this.keyup(function(e){
			var newHeight = $this.attr("scrollHeight");
			var currentHeight = $this.attr("clientHeight");
			if (newHeight > currentHeight) {
				$this.css('height', newHeight + 3 * textLineHeight + 'px');
			}
		});
    });

  };
})( jQuery );
