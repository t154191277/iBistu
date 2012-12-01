/**
 * Last modify
 * Allen
 * 2012/12/1
 */

function getMajorList(tx) {

    var majorQuery = Number(window.localStorage.getItem("majorQueryId"));
    var collegeName = window.localStorage.getItem("collegeQueryMajor");
    console.log("MajorID = " + majorQuery);
    tx.executeSql("select * from major where collegeId = " + "'" + majorQuery + "'", [], function(tx, results) {
        var row = results.rows;
        var len = row.length;
        console.log("length = " + len);
        var innerHTML = "";

        for(var i = 0; i < len; i++) {
            innerHTML += '<li><a href="courselist.html" id="' + row.item(i).id + '">' + row.item(i).majorName + '</a></li>';
        }
        $("#collegeNameInMajor").text(collegeName);
        $("#majorList").html(innerHTML);
        $("#majorList").listview('refresh');
        
        updateCourseListTable();
        
        $("#majorList a").each(function(index) {
            $(this).click(function() {
                var queryID = $(this).attr("id");
                console.log("majorid-->" + queryID)
                var majorName = $(this).text();
                window.localStorage.setItem("courseListQueryId", queryID);
                window.localStorage.setItem("majorQueryCourse",majorName);
            });
        });

    }, getError);
    
    function getError(){
    	
        var xhr = new XMLHttpRequest(),
            jUrl = "etc/majorlist.json"; 
        xhr.onreadystatechange = function(){
        	    if(xhr.readyState === 4 && xhr.status === 200){
        	    	    
        	    	    var res = JSON.parse(xhr.responseText);
        	    	    if(res === undefined || res === null) return;
        	    	    
        	    	    //var row = results.rows;
		        var len = res.length;
		        console.log("error && then length = " + len);
		        var innerHTML = "";
		
		        for(var i = 0; i < len; i++) {
		        	    if(res[i].collegeId === majorQuery)
		                innerHTML += '<li><a href="courselist.html" id="' + res[i].id + '">' + res[i].majorName + '</a></li>';
		        }
		        
		        $("#collegeNameInMajor").text(collegeName);
		        $("#majorList").html(innerHTML);
		        $("#majorList").listview('refresh');
		        
		        updateCourseListTable();
		        
		        $("#majorList a").each(function(index) {
		            $(this).click(function() {
		                var queryID = $(this).attr("id");
		                console.log("majorid-->" + queryID)
		                var majorName = $(this).text();
		                window.localStorage.setItem("courseListQueryId", queryID);
		                window.localStorage.setItem("majorQueryCourse",majorName);
		            });
		        });
        	    }
        }
        xhr.open("GET",jUrl);
        xhr.send(null);
        
        
        
        
    }

}

(function() {

    if(iBistuDB != null) {
        iBistuDB.transaction(getMajorList, errorCB, successCB);
    }

})();

