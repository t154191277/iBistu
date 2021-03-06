(function() {

  var width = screen.width, typeId = window.localStorage.getItem("videoTypeId"),
  moduleId = 5, drives = "android" + width,
  url = "http://m.bistu.edu.cn/api/api.php?table=video&action=getvideo&drives=android480&typeid=" + typeId;
  // http://m.bistu.edu.cn/api/api.php?table=video&action=getvideo&drives=android480&typeid=

  $.get(url, null, function(res) {

    var len = res.length, list = "";
    for (var i = 0; i < len; i++) {
      list += "<li data-icon="+false+" title='" + res[i].source + "' name='" + res[i].intro +
          "'><a href='videoDetail.html' title='" + res[i].publish + "'>" +
        "<h3 class='vertical_m'>" + res[i].title + "</h3><img src='" + res[i].picpath + "'/><a/></li>";
    }

    $("#videoListContent").html(list);
    $("#videoListContent").listview('refresh');

    // set video type id for next page.
    $("#videoListContent li").each(function(index) {

      $(this).click(function() {
        console.log("index is " + index);
        var source = $(this).attr("title") || "",
          title = $("#videoListContent li:eq("+index+")").text() || "",
          intro = $(this).attr("name") || "",
          time = $("#videoListContent a:eq("+index+")").attr("title") || "",
          cover = $("#videoListContent li:eq("+index+") img").attr("src") || "";


        window.localStorage.removeItem("videoTime");
        window.localStorage.removeItem("videoIntro");
        window.localStorage.removeItem("videoTitle");
        window.localStorage.removeItem("videoSource");
        window.localStorage.removeItem("videoCover");

        window.localStorage.setItem("videoTime",time);
        window.localStorage.setItem("videoIntro",intro);
        window.localStorage.setItem("videoTitle", title)
        window.localStorage.setItem("videoSource", source);
        window.localStorage.setItem("videoCover",cover);
        console.log("To video source-->" + source);
      });

    });

  }, "JSON");

})();

