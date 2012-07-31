
(function(){

	//http://m.bistu.edu.cn/api/api.php?table=album&drives=android480&typeid=2&action=getalbum
	var  typeId = window.localStorage.getItem("albumTypeId"),
		deviceType = "android480",
		action = "getalbum",
		url = "http://m.bistu.edu.cn/api/api.php?table=album"+"&drives="+deviceType+"&typeid="+typeId+"&action="+action;
	
	console.log("TypeId-->" + typeId);
	
	$.get(url,null,getSuccess,"JSON")
	function getSuccess(res){
		
		var len = res.length,
			innerhtm = '';
		
		for(var i = 0; i < len; i++){
			innerhtm += '<li><a href="' + res[i].picpath_big + '" rel="external"><img src="'+res[i].picpath+'" alt="'+res[i].title+'" /></a></li>';
		}
		
		$("#albumContent").html(innerhtm);
		$("#albumContent").trigger("create");
		
		$(".gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
			
		// document.addEventListener("deviceready", function(){
			// var myPhotoSwipe = $(".gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
		// }, false);
		
	}
})();


// (function(window, $, PhotoSwipe){
// 	
	// $(document).ready(function(){
// 		
		// $('div.gallery-page')
			// .live('pageshow', function(e){
// 				
				// var currentPage = $(e.target),
					// options = {},
					// photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
// 					
				// return true;
// 				
			// })
// 			
			// .live('pagehide', function(e){
// 				
				// var currentPage = $(e.target),
					// photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));
// 
				// if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
					// PhotoSwipe.detatch(photoSwipeInstance);
				// }
// 				
				// return true;
// 				
			// });
// 		
	// });
// 
// }(window, window.jQuery, window.Code.PhotoSwipe));


























