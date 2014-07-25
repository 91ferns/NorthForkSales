(function($) {
    
    $('.company-slider-wrapper').unslider({dots:true});
    $('.navbar a').each(function() {
		href = $(this).attr('href');
		if (href.indexOf('#') > -1 && href.length > 2) {
			//this means there is a hash in there let's get it and remove it
			elem = $(href);
			if (elem) {
				$(this).attr('href', 'javascript: void(0)');
				$(this).attr('data-href', elem.attr('id'));
				$(this).click(function() {
					id = $(this).attr('data-href');
					el = $('#'+id);
                    newOff = (el.offset().top) - ($('.nav').height());
					$('html,body').animate({scrollTop: newOff});
				});
			}
		}
	});
    var breakpoints = [];
    function setBreakpoints() {
        breakpoints = [];
        $.each($('ul.nav a'), function() {
            //lets add breakpoints in the code to highlight these items.
            sel = 'ul.nav li a[data-href="'+$(this).attr('data-href')+'"]';
            c = $("#"+$(this).attr('data-href'));
            theTop = parseInt(c.position().top);
            breakpoints[theTop] = sel;
        });	
    }
    $(function() {
        setBreakpoints();
    });
    $(window).scroll(function() {
        setBreakpoints();
        //now do the check to see if we are passed the breakpoints
        correct = 0;
        for (x in breakpoints) {
            if (x > $('body').scrollTop()) break;
            correct = x;
        }
        console.log(correct);
        if (correct == 0) {
            $('ul.nav li a').parent().removeClass('active');
        } else {
            sel = $(breakpoints[correct]);
            if (!sel.parent().hasClass('active')) {
                $('ul.nav li a').parent().removeClass('active');
                sel.parent().addClass('active');
            }
        }
    });
}(jQuery));
