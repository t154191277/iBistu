/*
 * This is the main JS.
 *
 * */

$(document).bind("mobileinit", function() {
	
    $.mobile.defaultPageTransition = 'none';
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    $.mobile.buttonMarkup.hoverDelay = true;
});

// $("#displayIntroduce").load("http://m.bistu.edu.cn/api/api.php?table=intro&action=list", function(response, status) {
    // $("#displayIntroduce").html = response;
// });

// $(document).ready(function() {
    // $(".mainpage a").each(function(index) {
        // //点击每一个图标时候，把相应的ID存入localStorage中。
        // $(this).click(function() {
            // var id = $(this).attr("id").slice(6);
            // window.localStorage.setItem("collegeQueryId",id);
        // });
// 
    // });
// });

window.onload = function(){
	var splashScreen = document.createElement('div');
	splashScreen.id = 'splashScreen';
	splashScreen.innerText = 'window is loading!';
    document.body.appendChild(splashScreen);
	console.log('document loaded.');
}

// $(document).ready(function(){
	// var splashScreen = document.createElement('div');
	// // splashScreen.style.position = 'absolute';
	// // splashScreen.style.width = '100%';
	// // splashScreen.style.height = '100%';
	// splashScreen.id = 'splashScreen';
	// // splashScreen.style.left = '0';
	// // splashScreen.style.top = '0';
    // splashScreen.innerText = 'this is splashScreen';
    // document.body.appendChild(splashScreen);
// });


