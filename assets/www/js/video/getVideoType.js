(function() {

	var width = screen.width, moduleId = 5, drives = "android" + width, xhr = new XMLHttpRequest(), url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=5&drives=" + drives;
	// http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=5&drives=android480

	Bistu.closeAble = false;

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var result = xhr.responseText,
					results = null,
					typename, id, len = 0, list = "";
                
                if(result !== null && result !== undefined){
                	results = JSON.parse(result);
                	len = results.length;
                }
                
				for (var i = 0; i < len; i++) {

					list += "<li data-icon=\"false\" title='" + results[i].id + "'><a href='videoList.html'>" + "<img src='" + results[i].coverpath + "'/><h3 class='vertical_m'>" + results[i].typename + "</h3><a/></li>";

				}

				$("#videoTypeContent").html(list);
				$("#videoTypeContent").listview('refresh');

				// set album type id for next page.
				$("#videoTypeContent li").each(function(index) {
					var typeid = $(this).attr("title");
					$(this).click(function() {
						
						xhr.abort();
						
						window.localStorage.removeItem("videoTypeId");
						window.localStorage.setItem("videoTypeId", typeid);
						console.log("To video typeId-->" + typeid);
					});
				});
			}
		}
	}
	
	xhr.open("GET", url);
    xhr.send(null);
	// $.get(url, null, function(results) {
		// var typename, id, len = results.length, list = "";
// 
		// for (var i = 0; i < len; i++) {
// 
			// list += "<li data-icon=\"false\" title='" + results[i].id + "'><a href='videoList.html'>" + "<img src='" + results[i].coverpath + "'/><h3 class='vertical_m'>" + results[i].typename + "</h3><a/></li>";
// 
		// }
// 
		// $("#videoTypeContent").html(list);
		// $("#videoTypeContent").listview('refresh');
// 
		// // set album type id for next page.
		// $("#videoTypeContent li").each(function(index) {
			// var typeid = $(this).attr("title");
			// $(this).click(function() {
				// window.localStorage.removeItem("videoTypeId");
				// window.localStorage.setItem("videoTypeId", typeid);
				// console.log("To video typeId-->" + typeid);
			// });
		// });
	// }, "JSON");

})();

