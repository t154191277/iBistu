
(function(){
	
	Bistu.closeAble = false;
	var width = screen.width,
		moduleId = 6,
		drives = "android" + width,
		url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=6&drives=" + drives;
	// http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=6&drives=android480
	
	console.log(url);
	
	$.get(
		url,null,function(results){
			console.log("success");
			
			var pic,typename,id,len = results.length,list = "";
			//	
			for(var i = 0; i < len; i++){
				
				pic = results[i].coverpath;
				
				list += "<li title='"+results[i].id+"'><a href='album.html'>"+
				"<img src='"+pic+"'/><span class='vertical_m'>" + results[i].typename + "</span><a/></li>";
				
			}
			
			$("#albumListContent").html(list);
			$("#albumListContent").listview('refresh');
			
			// set album type id for next page.
			$("#albumListContent li").each(function(index){
				
				var typeid = $(this).attr("title");
				
				$(this).click(function(){
					window.localStorage.setItem("albumTypeId",typeid);
					console.log("To album typeId-->" + typeid);
				});
				
			});
			
		},
		"JSON"
	);
	
	
})();


