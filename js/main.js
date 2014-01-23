$(function() {

	// Set padding on the profile links in the header to not cover up the text
	var highest = 0;
	$('.desc-part').each(function() {
		var height = $(this).innerHeight();
		highest = height > highest ? height : highest;
	});

	$('.bio-nav').css('padding-top', (highest) + 'px');
	
	(function() {
		var currentIndex = 0,
				pCount       = $('.desc-part').length;

		// Description scrolling
		$('.bio-nav a').on('click', function() {
			var $active  = $('.desc-part.active'),
					isNext   = $(this).hasClass('next');
			currentIndex = (currentIndex + (isNext ? 1 : -1)) % pCount;
			if (currentIndex === -1) {
				currentIndex = pCount - 1;
			}
			var $next = $('.desc-part:eq(' + currentIndex + ')');
			$active.addClass(isNext ? 'next-out' : 'prev-out');
			$next.addClass('active').addClass(isNext ? 'next-in' : 'prev-in');
			setTimeout(function() { 
				$active.removeClass('active next-out prev-in');
				$next.removeClass('next-in prev-in')
			}, 500);
			return false;
		});
	})();

})