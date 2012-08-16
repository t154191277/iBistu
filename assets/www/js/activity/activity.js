(function(){
	
	/**
	 * activityContent_title 
	 * activityContent_time
	 * activityContent_tel
	 * activityContent_website
	 * activityContent_info
	 * 
	 * */
	
	/*
	 * title
	 * intro
	 * tel
	 * website
	 * times
	 * 		startime
	 * 		endtime
	 * 		address
	 * */
	
	var id = window.localStorage.getItem("activityId"),
		url = "http://m.bistu.edu.cn/api/api.php?table=activitytime&action=detail&id=" + id;
	
	console.log("id is " + id);
	
	$.get(url,
		  null,
		  function(result){
		  	
		  	$("#activityContent_title").text(result[0].title);
		  	$("#activityContent_tel").text(result[0].tel);
		  	$("#activityContent_website").text(result[0].website);
			$("#activityContent_info").text(result[0].intro);
					  	
		  	var item = result[0].times;
		  		len = item.length,
		  		innerhtm = "",
		  		beginList = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		  	console.log("times length is " + len);
		  	
		  	for(var i = 0; i < len; i++){
		  		innerhtm += beginList + "<li><a href='#'>" + "起始时间:" + item[i].startime + "</a></li>" +
				             "<li><a href='#'>" + "结束时间:" + item[i].endtime + "</a></li>" +
				             "<li><a href='#'>" + "地点:  " + item[i].address + "</a></li>" + "</ul>";
		  	}
		  	
		  	$("#activityListView").html(innerhtm);
		  	$("#activityListView").trigger("create");
		  	
		  },
		  "JSON");
	
	
	
	
	
	
	
	
	
})();
