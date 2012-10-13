
(function(){
   
   var introUrl = "etc/collegeIntro.json",
       introId = window.localStorage.getItem("collegeListIntroId");
   
   $.ajax({
       
       type:"POST",
       url: introUrl,
       data: "json",
       success: function(res){
           var intro = JSON.parse(res),
               item = {};
           
           for(var i = 0, len = intro.length; i < len; i++){
               if(intro[i].id == introId){
                   item = intro[i];
                   return;
               }
           }
           
           $("#collegeIntroName").text(item.introName);
           $("#collegeIntroLink").attr("href") = item.href;
           $("#collegeIntroLink").text(item.href);
           $("#collegeIntroContent").text(item.introCont);
       }
       
   });
   
   
    
}());


