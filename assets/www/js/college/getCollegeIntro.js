document.addEventListener("deviceready", function() {
    var introUrl = "etc/collegeIntro.json", realUrl = "http://m.bistu.edu.cn/api/api.php?table=collegeintro&action=detail&id=", introId = window.localStorage.getItem("collegeListIntroId"), ultraUrl = realUrl + introId;

    console.log("ultra url is " + ultraUrl);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            var intro = JSON.parse(xhr.responseText), item = intro[0];
            //console.log(intro.length + " length");
            // for(var i = 0, len = intro.length; i < len; i++){
            // if(intro[i].id == introId){
            // item = intro[i];
            // return;
            // }
            // }

            $("#collegeIntroName").html(item.introName);
            $("#collegeIntroLink").attr("href",'http://'+item.href);
            $("#collegeIntroLink").text(item.href);
            $("#collegeIntroContent").html(item.introCont);
        }
    }

    xhr.open("GET", ultraUrl, true);
    xhr.send(null);

    // $.ajax({
// 
        // type : "GET",
        // url : ultraUrl,
        // dataType : "json",
        // success : function(res) {
            // var intro = JSON.parse(res), item = intro[0];
            // console.log(intro.length + " length");
            // // for(var i = 0, len = intro.length; i < len; i++){
            // // if(intro[i].id == introId){
            // // item = intro[i];
            // // return;
            // // }
            // // }
// 
            // $("#collegeIntroName").text(item.introName);
            // $("#collegeIntroLink").attr("href") = item.href;
            // $("#collegeIntroLink").text(item.href);
            // $("#collegeIntroContent").text(item.introCont);
        // }
    // });
}, false);

