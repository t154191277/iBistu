/**
 * message.html
 * By: Allen Heavey
 * Time: 2012/11/27
 * */

(function(){
	
	'use strict';
	
	var message_url = "http://m.bistu.edu.cn/api/api.php?table=msg_university",
		xhr = new XMLHttpRequest(),
		listMsg = "";
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				var result = xhr.responseText,
					res = null;
				
				if(result !== null && result !== undefined){
					res = JSON.parse(result);
				}
				
				var len = res.length;
				console.log(len);
				if(len !== 0){
					for(var i = 0; i < len; i++){
						listMsg += '<li><a href="#"><h3>'+res[i].megText+'</h3><p>' + res[i].sourceId + '</p></a></li>';
					}
				}
				
				$("#messageListView").html(listMsg);
				$("#messageListView").listview('refresh');
			}
		}
	}
	
	xhr.open("GET",message_url);
	xhr.send(null);
	
	$(".buttons").each(function(){
		$(this).click(function(){
			xhr.abort();
		});
	});
	
	
})();









