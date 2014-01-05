
(function(){

  Bistu.closeAble = false;

  var  typeId = window.localStorage.getItem("albumTypeId"),
    deviceType = "android480",
    action = "getalbum",
    url = "http://m.bistu.edu.cn/api/api.php?table=album"+"&drives="+deviceType+"&typeid="+typeId+"&action="+action;

  $.get(url,null,getSuccess,"JSON");
  function getSuccess(res){

    var len = res.length,
      innerhtm = '';

    for(var i = 0; i < len; i++){
      innerhtm += '<li><a href="' + res[i].picpath_big + '" rel="external"><img src="'+res[i].picpath+'" alt="'+res[i].title+'" /></a></li>';
    }

    $("#albumContent").html(innerhtm);
    $("#albumContent").trigger("create");

    $("#albumContent a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });

    // document.addEventListener("deviceready", function(){
      // var myPhotoSwipe = $(".gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
    // }, false);

  }
})();

