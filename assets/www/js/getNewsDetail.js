(function() {

    var NEWS_BASIC_URL = "http://m.bistu.edu.cn/api/api.php?table=news&url=", 
        CATEGORY_URL = window.localStorage.getItem("newsListToDetail"), 
        ULTURL = NEWS_BASIC_URL + CATEGORY_URL;

    function getNewsDetailFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    var response = eval('(' + xhr.responseText + ')'),pro = response.property;

                    $("#newsDetail_header").html(pro.doctitle);
                    $("#newsDetail_time").text(pro.crtime);
                    $("#newsDetail_content").html(pro.dochtmlcon);
                    $("#newsListContent").listview('refresh');

                }
            }
        }
        xhr.open("GET", ULTURL);
        xhr.send(null);
    }
    
    getNewsDetailFromServer();

})();

