/*!
 * Helper functions: Autogrowing Textareas, Hide URL Bar, Load stylesheet
 * http://www.blog.highub.com/
 * by Shi Chuan
 */
 
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


// Hide URL Bar
function hideURLbar(){
	setTimeout(scrollTo, 0, 0, 1);
}


//loadStylesheet(file) usage: loadStylesheet(filename.css);
function loadStylesheet(filename) {
	var link = $("<link>");
	link.attr({
			rel: 'stylesheet',
			href: filename
	});
	$("head").append( link );
}


function splashScreen() {
  var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';
  document.write('<link rel="apple-touch-startup-image" href="/images/' + filename + 'splash.png" />' );
}