/*
 * This is the main JS.
 *
 * */

$(document).bind("mobileinit", function() {
	
    $.mobile.defaultPageTransition = 'none';
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    $.mobile.buttonMarkup.hoverDelay = true;
    
    $("#initPopup").popup('open');
    
});


