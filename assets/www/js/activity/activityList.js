
//http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=4&drives=android480
/**
 * Get activity module 4
 * 
 * 
 * 
 * */

(function(){
	
	Bistu.closeAble = false;
	var url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=4";
	
	
	$.get(
		url,
		null,
		function(result){
			
			var len = result.length,
				inhtm = "";
			
			//<li><a href="#" class="ui-btn-active">最新</a></li>
			
			for(var i = 0; i < len; i++){
				inhtm += "<li><a href='#' onclick='getActivityById("+result[i].id+")'>" + result[i].typename + "</a></li>";
			}
			
			$("#activityListNavbar").html(inhtm);
			$("#activityListNavbar").listview("refresh");
			
		},
		"JSON"
	)
	
})();

function getActivityById(id){
		
	var url = "http://m.bistu.edu.cn/api/api.php?table=activitytime&typeid=" + id;
	
	$.get(
		url,
		null,
		function(result){
			
		},
		"JSON"
	)
	
}















