/*!
 * Helper functions: Autogrowing Textareas, Hide URL Bar, Load stylesheet
 * http://www.blog.highub.com/
 * by Shi Chuan
 */
 
 
// Hide URL Bar
// http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/
function hideURLbar(){
	/mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function () {
	window.scrollTo(0, 1);
	}, 1000);
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

function splashScreen() {
  var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';
  document.write('<link rel="apple-touch-startup-image" href="/images/' + filename + 'splash.png" />' );
}

