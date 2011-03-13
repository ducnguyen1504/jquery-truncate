(function($) {
	$.fn.extend({

		truncate: function(options) {
			var defaults = {
				width: 'auto',
				after: '&hellip;',
				center: false,
				addclass: false,
				addtitle: false
			};

			options = $.extend(defaults, options);

			return this.each(function() {

				var element = $(this);
								
				if ( options.width == 'auto' ) {
					truncateWidth = element.width()-1;
				} else {
					if( element.width() == options.width ) options.width--;
					truncateWidth = options.width;
				}
				
				var elementText   = element.text();
				var truncatedText = elementText;
				
				var fontCSS = {
					'fontFamily': element.css('fontFamily'),
					'fontSize': element.css('fontSize'),
					'fontStyle': element.css('fontStyle'),
					'fontWeight': element.css('fontWeight'),
					'text-transform': element.css('text-transform'),
					'word-spacing': element.css('word-spacing')
				};
				
				var $truncateWorker = $('<span/>').css($.merge(fontCSS, {'display': 'none'})).appendTo('body');
				
				$truncateWorker.text(elementText);
				var originalWidth = $truncateWorker.width();
				$truncateWorker.text('');
				
				if ( originalWidth > truncateWidth ) {
				
					i = 1;
					while ( $truncateWorker.width() < truncateWidth ) {
						$truncateWorker.html(elementText.substr(0, i) + options.after);
						if( $truncateWorker.width() > truncateWidth ) break;
						truncatedText = elementText.substr(0, i);
						i++;
					}
					$truncateWorker.remove();
					
					if (options.center) {
						var leftText  = truncatedText.substr(0, Math.floor(truncatedText.length/2));
						var rightText = elementText.substr(0-Math.floor(truncatedText.length/2));
						truncatedText = leftText + options.after + rightText;
					}
					else {
						truncatedText = truncatedText + options.after;
					}
					
					element.html(truncatedText);
					if( options.addclass ) {
						element.addClass(options.addclass);
					}
					if( options.addtitle ) {
						element.attr('title', elementText);
					}
				}

			});

		}

	});
})(jQuery);