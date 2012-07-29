
document.addEventListener("deviceready", function(){
	var myPhotoSwipe = $(".gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
}, false);


(function(window, $, PhotoSwipe){
	
	$(document).ready(function(){
		
		$('div.gallery-page')
			.live('pageshow', function(e){
				
				var currentPage = $(e.target),
					options = {},
					photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
					
				return true;
				
			})
			
			.live('pagehide', function(e){
				
				var currentPage = $(e.target),
					photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));

				if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
					PhotoSwipe.detatch(photoSwipeInstance);
				}
				
				return true;
				
			});
		
	});

}(window, window.jQuery, window.Code.PhotoSwipe));


(function(){
	
	var  typeId = window.localStorage.getItem("albumTypeId"),
		url = "http://m.bistu.edu.cn/api/api.php?table=album";
	
	$.get(url,null,getSuccess,"JSON")
	
	function getSuccess(res){
		
		console.log(res);
		
		
		
	}
	
	
	
	
	

	
})();
























