

function playVideoNow(url) {
    window.plugins.videoPlayer.play(url);
}

(function() {
 	
	var time = window.localStorage.getItem("videoTime"),
		intro = window.localStorage.getItem("videoIntro"),
		title = window.localStorage.getItem("videoTitle"),
		source = window.localStorage.getItem("videoSource"),
		cover = window.localStorage.getItem("videoCover");;
 	
	if ( typeof navigator.device == "undefined") {
		document.addEventListener("deviceready", function() {
			console.log("The device is ready now!");
		}, false);
	} else {
		console.log("Device is ready");
	}
	
	console.log("time is " + time);
	console.log("source is " + source);
	
	var inhtm = '<a href="#" data-role="button" onclick="playVideoNow(\''+ source +'\')">播放</a>';
	
	console.log(inhtm);
	
	$("img#videoCoverImage").attr("src",cover);
	$("#videoName").text(title);
	$("#videoContentTime").text(time);
	$("#videoContentIntro").text(intro);
// <a href="#"  data-role="button" onclick="playVideoNow('http://m.youku.com/smartphone/pvs?vid=XMTc2ODEwMDIw')">Play!!!</a>	
	$("#playVideoContainer").html(inhtm).trigger("create" );
//	$("#playVideoId").attr("onclick")= "playVideoNow(" + source + ")";
	
}())();


