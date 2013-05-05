/***
 * Get content for intros.
 * 
 * **/


$(function(){
    
    //  http://m.bistu.edu.cn/api/api.php?table=intro&id=3 college
    
    var url  = "http://m.bistu.edu.cn/api/api.php?table=intro&id=3";
    
    $.get(url, function(data){
        updateContent(data);
    });
    
    function updateContent(data){
        var vson = null
            , res = '';
        
        try {
            if(data) vson = JSON.parse(data);
        }
        catch(err){
            console.log(err);
        }
        if(vson) res = vson[0].introCont;
        
        $("#collegeContent").html(res);
    }
    
});







