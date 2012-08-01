//http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=4&drives=android480
/**
 * Get activity module 4
 *
 *
 *
 * */

(function() {
	//backbutton closeable listener.
	Bistu.closeAble = false;

	var url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=4";
		

	$.get(url, null, function(result) {

		var len = result.length, inhtm = "",
			date = Bistu.currentActivityDay;
			
		console.log("length is " + len);
		//<li><a href="#" class="ui-btn-active">最新</a></li>

		for (var i = 0; i < len; i++) {
			inhtm += "<li data-icon='false'><a href='#' data-icon='false' onclick='getActivityById(" + result[i].id + ")'>" + result[i].typename + "</a></li>";
		}
		
		$("#activityListUl").html(inhtm);
		$("#activityListUl").listview("refresh");
		$("#activityListNavbar").trigger("create");
		$("#activityListPage").trigger("pagecreate");
		refreshTime(date);
		
		Bistu.currentActivityId = result[0].id;
		getActivityById(Bistu.currentActivityId);
		
	}, "JSON")

})();

function getActivityById(id, day) {

	var date = day || (new Date()).toJSON().slice(0, 10), 
		url = "http://m.bistu.edu.cn/api/api.php?table=activitytime&typeid=" + id + "&day=" + date;
		Bistu.currentActivityId = id;
	console.log("1st url is " + url);

	$.get(url, null, function(result) {
		
		var len = result.length,
			url = "http://m.bistu.edu.cn/api/api.php?table=activity&id=", 
			inhtml = "";
		
		for(var i = 0; i < len; i++){
			
			var u = url + result[i].activityid;
			
			console.log("2rd url is " + u);
			
			$.get(u, null, function(res) {
				console.log("ready to get data");
				var leng = res.length;
				console.log("last length is " + leng);
				for (var j = 0; j < leng; j++) {
					inhtml += "<li data-icon='false'><a href='activity.html'>" + res[j].title + "</a></li>";
				}
				
				$("#activityContentList").html(inhtml);
				$("#activityContentList").listview("refresh");
				
				$(".activityButton:odd").addClass("ui-btn-active");
				$(".activityButton:even").removeClass("ui-btn-active");
				$(".activityButton").trigger("create");
				
				$(".activityContentList a").each(function(index){
					$(this).click(function(){
						
						
						
					});
				});
				
			}, "JSON");
		}
		
		
	}, "JSON");


}

function getActivityByTime(num){
	
	var date,
		id = Bistu.currentActivityId,
		currentDay = Bistu.currentActivityDay || new Date();
		
	if(num == -1){
		date = new Date(currentDay.getTime()-86400000);
	}
	else if(num == 1){
		date = new Date(currentDay.getTime()+86400000);
	}
	Bistu.currentActivityDay = date;
	
	console.log("current day is " + date);
	
	var queryDay = date.toJSON().slice(0,10);
	refreshTime(date);
	getActivityById(id,queryDay);
	
}

function refreshTime(day){
	
	var	date = day || new Date(),
		year = date.getFullYear(), 
		month = date.getMonth() + 1, 
		day = date.getDate(), 
		d = year + "年" + month + "月" + day + "日";
	
	$("#activityCourrentTime").text(d);
	$("#activityCourrentTime").trigger("create");
	
	$(".activityButton:odd").addClass("ui-btn-active");
	$(".activityButton:even").removeClass("ui-btn-active");
	$(".activityButton").trigger("create");
}





