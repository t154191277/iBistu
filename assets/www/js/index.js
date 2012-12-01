/*
 * This is the main JS.
 *
 * */

$(document).bind("mobileinit", function() {
	
	//init settings
    $.mobile.defaultPageTransition = 'none';
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    $.mobile.buttonMarkup.hoverDelay = true;
    
    
    //modules settings
    var module_url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&action=configs",
        local_url = "etc/modules.json";
    function getModules(url){
    	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function(){
	    	    if(xhr.readyState === 4){
	    	    	    if(xhr.status === 200 || xhr.status === 304){
	    	    	    	    var res = JSON.parse(xhr.responseText),
	    	    	    	        innerhtm = "";
	    	    	    	    
	    	    	    	    if(res === null || res === undefined) return;
	    	    	    	    else {
	    	    	    	    	    var len = res.length;
	    	    	    	    	    
	    	    	    	    	    for(var i = 0; i < len; i++){
	    	    	    	    	    	    if(res[i].valid != 1) continue;
	    	    	    	    	    	    var m = res[i].module;
	    	    	    	    	    	    innerhtm += '<div class="ui-block-c"><a href="'+ m +'.html">' +
	    	    	    	    	    	    '<img src="images/'+m+'.png"/></a>' + '<div>' + res[i].modulename + '</div></div>';   	    	    	    	    	    
	    	    	    	    	    }
	    	    	    	    	    $("#indexPageGrid").html(innerhtm);
	    	    	    	    	    $("#indexPageGrid").trigger("create");
	    	    	    	    } 	    
	    	    	    }
	    	    	    else {
	    	    	    	    if(url == module_url)
	    	    	    	        getModules(local_url);
	    	    	    	    else return;
	    	    	    }	
	    	    }
	    	    else {
	    	    	    if(url == module_url)
	    	    	        getModules(local_url);
	    	    	    else return;
	    	    }
	    	
	    }
	    
	    xhr.open("GET",url);
	    xhr.send(null);
    }
    
    getModules(module_url);

    
});


