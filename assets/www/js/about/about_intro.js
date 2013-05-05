/***
 * Get content for intros.
 * 
 * **/


$(function(){
    
    //  http://m.bistu.edu.cn/api/api.php?table=intro&id=46
    
    var url  = "http://m.bistu.edu.cn/api/api.php?table=intro&id=1";
    
    $.get(url, function(data){
        console.log("get intro");
        updateContent(data);
    });
    
    function updateContent(data){
        console.log(url);
        var vson = null
            , res = '';
        
        try {
            if(data) vson = JSON.parse(data);
        }
        catch(err){
            console.log(err);
        }
        
        if(vson) res = vson[0].introCont;
        
        $("#introContent").html(res);
    }
    
});







