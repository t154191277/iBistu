(function(){
	
	var activityId = window.localStorage.getItem("activityId"),
		url = "http://m.bistu.edu.cn/api/api.php?table=activitytime&action=detail&id=" + activityId;
	
	console.log("activityId is " + activityId);
	
	$.get(url,
		  null,
		  function(result){
		  	
		  	$("#activityContent_title").html("&nbsp;&nbsp;"+result[0].title);
		  	$("#activityContent_tel").html(result[0].tel+"<br/>");
		  	$("#activityContent_website").html(result[0].website+"<br/>");
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
	
	$("#addMyFavorActivity").click(function() {
    
    var head = $("#activityContent").html() + "";
    
    /**
     * create a directory(favor) to store favor courses!  
     */
    var rootDir = new DirectoryEntry("iBistu",Bistu.rootDir + "/iBistu");
    		rootDir.getDirectory("activity",{create: true, exclusive: false},createActivitySuccess,function(err){
        console.log("create activity failed!!!-->" + err.code);
    });
    
    function createActivitySuccess(dirEntry){
        console.log("activity dir fullpath is:"+dirEntry.fullPath);
        dirEntry.getFile(activityId,{create: true, exclusive: false},putActivity,function(err){
            console.log("create file failed-->"+err.code);
        });
    }
    
    function putActivity(fileEntry){
        fileEntry.createWriter(function(writer){
            writer.write(head);
        },queryFailed);
        console.log("Ready to write");
        console.log("file's full path is " + fileEntry.fullPath);
    }
    
    iBistuDB.transaction(function(tx){
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS activityFavor (id,content)', [], function(tx,results){
            console.log("create activityFavor table success");
        },function(){
            console.log("activityFavor table already exists");
        });
        
        tx.executeSql('select id from activityFavor',[],function(tx,result){
            
            var r = result.rows,
                l = r.length,
                flag = false;
            
            console.log("activityFavor length --> " + l);
            
            for(var i = 0; i < l; i++){
                if(r.item(i).id == activityId){
                    flag = true;
                }
            }
            
            if(!flag){
                tx.executeSql('INSERT INTO activityFavor (id,content) values ("' + activityId + '","'+url+'")',[],querySuccess,function(err){
                    console.log("activityFavor insert error!");
                });
            }
            
        },queryFailed);
        
        
    },errorCB,
    successCB);

	function querySuccess(tx,results){
        console.log("results.length is " + results.rows.length);
    }
    
    function queryFailed(){
        		console.log("收藏失败");
    		}
	   alert("添加成功");
	});
	
})();
