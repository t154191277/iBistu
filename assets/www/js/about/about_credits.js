/***
 * Get content for intros.
 * 
 * **/


$(function(){
    
    //  http://m.bistu.edu.cn/api/api.php?table=intro&id=46
    
    var url  = "http://m.bistu.edu.cn/api/api.php?table=intro&id=46";
    
    // $.ajax({
        // type: "GET",
        // url: url,
        // success: updateContent,
        // dataType: "json"
    // });
    
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
        
        $("#creditContent").html(res);
    }
    
});







