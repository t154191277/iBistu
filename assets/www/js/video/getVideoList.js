

(function(){
	
	var width = screen.width,
		moduleId = 5,
		drives = "android" + width,
		url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=5&drives=" + drives,
		testUrl = "http://m.bistu.edu.cn/api/api.php?table=video";
	// http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=5&drives=android480
	
	console.log(testUrl);
	
	$.get(
		url,null,function(res){
			console.log("success");
			
			var len = res.length,list = "";
			for(var i = 0; i < len; i++){
				list += "<li title='"+res[i].source+"'><a href='video.html'>"+
				"<img src='"+res[i].picpath+"'/><span class='vertical_m'>" + res[i].title + "</span><a/></li>";
			}
			
			$("#videoListContent").html(list);
			$("#videoListContent").listview('refresh');
			
			// set album type id for next page.
			$("#videoListContent li").each(function(index){
				
				var source = $(this).attr("title");
				
				$(this).click(function(){
					window.localStorage.setItem("videoSource",source);
					console.log("To video source-->" + source);
				});
				
			});
			
		},
		"JSON"
	);
	
	
})();














