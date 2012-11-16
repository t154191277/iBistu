

(function(){
	
	var width = screen.width,
		moduleId = 5,
		drives = "android" + width,
		url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=5&drives=" + drives;
	// http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=5&drives=android480
	
	Bistu.closeAble = false;
	
	$.get(
		url,null,function(results){
			var typename,id,len = results.length,list = "";

			for(var i = 0; i < len; i++){
				
				list += "<li data-icon=\"false\" title='"+results[i].id+"'><a href='videoList.html'>"+
				"<img src='"+results[i].coverpath+"'/><h3 class='vertical_m'>" + results[i].typename + "</h3><a/></li>";
				
			}
			
			$("#videoTypeContent").html(list);
			$("#videoTypeContent").listview('refresh');
			
			// set album type id for next page.
			$("#videoTypeContent li").each(function(index){
				var typeid = $(this).attr("title");
				$(this).click(function(){
					window.localStorage.removeItem("videoTypeId");
					window.localStorage.setItem("videoTypeId",typeid);
					console.log("To video typeId-->" + typeid);
				});
			});
		},
		"JSON"
	);
	
})();











