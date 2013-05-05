


function playVideoNow(url) {
    window.plugins.videoPlayer.play(url);
}

window.playVideoNow = playVideoNow;

$(function() {
    
    var storage = window.localStorage;
    
    var time = storage.getItem("videoTime"),
        intro = storage.getItem("videoIntro"),
        title = storage.getItem("videoTitle"),
        source = storage.getItem("videoSource"),
        cover = storage.getItem("videoCover");

    source = "http://m.youku.com/smartphone/pvs?vid=" + source;
        
    var inhtm = '<a href="#" data-role="button" onclick="playVideoNow(\''+ source +'\')">播放</a>';
        
    $("img#videoCoverImage").attr("src",cover);
    $("#videoName").text(title);
    $("#videoContentTime").text(time);
    $("#videoContentIntro").text(intro);
// <a href="#"  data-role="button" onclick="playVideoNow('http://m.youku.com/smartphone/pvs?vid=XMTc2ODEwMDIw')">Play!!!</a>
    $("#playVideoContainer").html(inhtm).trigger("create" );
//  $("#playVideoId").attr("onclick")= "playVideoNow(" + source + ")";
        
});


