(function() {
    
    function getCollegeList(){
        
        var file_college_url = "etc/college.json", list = "";
        console.log("ready for ajax");
        $.ajax({

            type : "POST",
            url : file_college_url,
            data : "json",
            success : function(res) {

                var lists;
                
                console.log("success for ajax");

                if( typeof res === 'object') {
                    lists = res;
                    console.log("it's an object");
                }
                else {
                    console.log("it's a string");
                    lists = JSON.parse(res);
                }

                var len = lists.length;

                console.log("length is " + len);

                for(var i = 0; i < len; i++) {
                    list += '<li><a href="collegeIntroDetail.html" title="' + lists[i].id + '">' + lists[i].collegeName + '</a></li>';
                }

                $("#collegeIntroList").html(list);
                $("#collegeIntroList").listview('refresh');

                $("#collegeIntroList a").each(function(index) {
                    $(this).click(function() {
                        var addon = $(this).attr("title");
                        console.log("addon is " + addon);
                        window.localStorage.setItem("collegeListIntroId", addon);
                    });
                });
            }
        }); 

    }
    
    document.addEventListener("deviceready",getCollegeList,false);
    
})();

