/*!
 * MBP - Moible boilerplate helper functions: 
 */

 
var MBP = MBP || {}; 
 
// Hide URL Bar for iOS
// http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/

MBP.hideUrlBar = function () {
	/mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function () {
	window.scrollTo(0, 1);
	}, 1000);
}


// Fast Buttons
// http://code.google.com/mobile/articles/fast_buttons.html

MBP.fastButton = function (element, handler) {
    this.element = element;
    this.handler = handler;
	element.addEventListener('touchstart', this, false);
	element.addEventListener('click', this, false);
};

MBP.fastButton.prototype.handleEvent = function(event) {
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
    if(Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
		this.reset();
    }
};
MBP.fastButton.prototype.onClick = function(event) {
    event.stopPropagation();
    this.reset();
    this.handler(event);
    if(event.type == 'touchend') {
		preventGhostClick(this.startX, this.startY);
    }
    this.element.style.backgroundColor = "";
};
MBP.fastButton.prototype.reset = function() {
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
// https://github.com/shichuan/mobile-html5-boilerplate/issues#issue/2

MBP.splash = function () {
  var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';
  document.write('<link rel="apple-touch-startup-image" href="/img/' + filename + 'splash.png" />' );
}


// Autogrow
// http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html

MBP.autogrow = function (element, lh) {
	var setLineHeight = (lh) ? 11 : 12;
	var textLineHeight = element.style.lineHeight;
	if (textLineHeight.indexOf("px") == -1) {
		textLineHeight = setLineHeight;
	} else {
		textLineHeight = parseInt(textLineHeight, 10);
	}
	element.style.overflow = "hidden";
	element.onkeyup = function(e){
		var newHeight = this.scrollHeight;
		var currentHeight = this.clientHeight;
		if (newHeight > currentHeight) {
			this.style.height = newHeight + 3 * textLineHeight + "px";
		}
	}
}



