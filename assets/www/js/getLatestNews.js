
(function(){
	var list = $("#latestNews");
	
	
	
	function getDataOffline(){
	    
	    var newsList = "";
	    
	    $.ajax({
	        
	        type:"POST",
            url:"etc/news_xw_qb.json",
            data:"json",
            success:function(msg){
                var lists = JSON.parse(msg).d,
                    len = lists.length;
                
                for(var i = 0; i < len; i++){
                    
                    var t = resp[i].attributes.url.replace(/http:\/\/newsfeed.bistu.edu.cn/, "");
                    
                    newsList += '<li data-role="list-divider"><a href="newsList.html" title="' + t + '">' + lists[i].attributes.n + '</a></li>';
                }
                list.html(newsList);
                
                $("#latestNews a").each(function(index) {
                    $(this).click(function() {
                        var addon = $(this).attr("title");
                        console.log("addon is " + addon);
                        window.localStorage.setItem("categoryToNewsList", addon);
                    });
                });
            }
	    
	    });
	    
	}
	
	function checkNet(){
	    networkState = navigator.network.connection.type;
	    
	    if(networkState != "none"){
	        
	    }
	    else {
	        
	    }
	    
	    getDataOffline();
	    
	}
	
	document.addEventListener("deviceready",checkNet,false);
	
})();






