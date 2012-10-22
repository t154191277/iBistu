
(function(){
    
    
    console.log("start activities!");
    
    function startActivity(){
        
        var nowDate = new Date(),
            basicUri = "http://m.bistu.edu.cn/api/api.php?table=activitytime&action=list",
            nowYear = nowDate.getFullYear(),
            nowMonth = nowDate.getMonth()+1,
            nowDay = nowDate.getDate(),
            dayStr = nowYear + "-" + nowMonth + "-" + nowDay; 
        
        $("#todayActivities").text(dayStr + " 全部活动");
        //true url is: basicUri + "&day=" + dayStr;
        $.ajax({
           type: "GET",
           url: basicUri,
           dataType: "json",
           success: function(res){
               
               var r = res,
                   len = r.length;
               
               console.log(len + ":activity length");
                   
               if(0 === len){
                   $("#activitiesList").append("<li>当天没有此分类的活动。</li>");
               }
               else {
                   for(var i = 0; i < len; i++){
                       var address = "";
                       if(r[i].addressroom == "校外") address = r[i].address;
                       else address = r[i].addressroom;
                       
                       $("#activitiesList").append('<li><a href="activity.html" title='+ r[i].id +'>' +
                       '<h3 class="ui-li-heading">' + r[i].title + '</h3>' +
                       '<p class="ui-li-desc">' + r[i].startime + '-' + r[i].endtime + '</p>' +
                       '<p class="ui-li-aside" style="width:20%;">' + address + '</p>' +
                        '</a></li>');
                   }
               }
               
               $("#activitiesList").listview('refresh');
               
               $("#activitiesList a").each(function(index) {
                    $(this).click(function() {
                           var $t_id = $(this).attr('title');
                           window.localStorage.setItem('activityId',$t_id);
                           
                       });
               });
               
           }
        });
            
    }
    
  document.addEventListener("deviceready",startActivity,false);
    
})();



















