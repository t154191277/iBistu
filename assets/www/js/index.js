/*
 * This is the main JS.
 *
 * */

//$(document).on("mobileinit", function(){
document.addEventListener("deviceready", function() {

  //init settings
  $.mobile.defaultPageTransition = 'none';
  $.mobile.allowCrossDomainPages = true;
  $.support.cors = true;
  $.mobile.buttonMarkup.hoverDelay = true;
  
    var _NETWORK_STATUS = navigator.network.connection.type || null;
  //modules settings
  var module_url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&action=configs", 
      local_url = "etc/modules.json";
  function getModules() {
    var xhr = new XMLHttpRequest(),
        url = local_url;
    
    if(_NETWORK_STATUS !== null){
      if(_NETWORK_STATUS !== Connection.NONE && _NETWORK_STATUS !== Connection.UNKNOWN){
        url = module_url;
      }
      else {
        url = local_url;
      }
    }
    else {
        url = local_url;
      console.log("_NETWORK_STATUS is null");
    }
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          var res = JSON.parse(xhr.responseText), innerhtm = "";
          if (res === null || res === undefined)
            return;
          else {
          var len = res.length;

            for (var i = 0; i < len; i++) {
              if (res[i].valid != 1)
                continue;
              var m = res[i].module;
              innerhtm += '<div class="ui-block-c"><a href="' + m + '.html">' + '<img src="images/' + m + '.png"/></a>' + '<div>' + res[i].modulename + '</div></div>';
            }
            $("#indexPageGrid").html(innerhtm);
            $("#indexPageGrid").trigger("create");
          }
        } else {
          console.log("return status code is not 200 and 304!");
        }
      } 
    };
    
   xhr.timeout = 5000;
    xhr.ontimeout = function(){
        xhr.abort();
        console.log('load local url');
        getModules(local_url);
    };

    xhr.open("GET", url);
    xhr.send(null);
  }

  getModules(module_url);

});
