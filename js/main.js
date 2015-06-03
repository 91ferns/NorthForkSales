(function($) {

  var inTouchForm = $('#getInTouchForm');

  function createAPIInput(field, value) {
    return $('<input>').attr('name', 'api_mail['+field+']').attr('type', 'hidden').val(value).hide()
  }

  function APIRedirectTo(url) {
    return $('<input>').attr('name', 'redirect_to').attr('type', 'hidden').val(url).hide();
  }

  if (inTouchForm) {
    inTouchForm.submit(function() {
      var ctxt = $(this);

      $('.api', ctxt).remove();
      $('<div>').addClass('api').appendTo(ctxt);

      var name = $('[name="FullName"]', ctxt).val();
      var company = $('[name="Company"]', ctxt).val();
      var email = $('[name="Email"]', ctxt).val();
      var message = $('[name="Message"]', ctxt).val();

      company = company || '';

      if (!name) {
        alert('Please enter your name');
        return false;
      } else if (!email) {
        alert('Please enter your email address');
        return false;
      } else if (!message) {
        alert('Please enter a message');
        return false;
      }

      var fullMessage = "New Message from " + name + "\n\n" + message + "\n\nCompany: " + company;

      var apiFrom = createAPIInput('from', name),
          apiMessage = createAPIInput('message', fullMessage),
          apiApplication = createAPIInput('application', 'northfork'),
          apiAdditional = createAPIInput('additional', ''),
          apiSubject = createAPIInput('subject', "New Message from " + name),
          apiName = createAPIInput('name', name),
          redirect = APIRedirectTo(window.location.href);

      ctxt
        .find('.api')
        .append(apiFrom)
        .append(apiMessage)
        .append(apiApplication)
        .append(apiAdditional)
        .append(apiSubject)
        .append(apiName)
        .append(redirect);

      return true;

    }); //attr('action', 'javascript: void(0)')
  }

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
