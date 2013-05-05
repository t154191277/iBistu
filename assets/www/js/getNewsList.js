/**
 * Get news list
 *
 *  */
(function() {

	var newsList,
	    url = "http://m.bistu.edu.cn/api/api.php?table=newslist&url=/xw/zhxw";

	function replaceURL(oriUrl) {
		var matchUrl = oriUrl.replace('http://newsfeed.bistu.edu.cn', '');
		matchUrl = matchUrl.replace('.xml', '');
		return matchUrl;
	}

	/**
	 * Get from news list
	 *  */
	function getNewsListFromServer() {
		var xhr = new XMLHttpRequest(), list = "";
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var response = eval('(' + xhr.responseText + ')'), len = response.d.length;
					for (var i = 0; i < len; i++) {
						var ra = response.d[i].attributes, addon = replaceURL(ra.url);
						list += "<li><a href='newsdetail.html' title='" + addon + "'><h3>" + ra.n + "</h3><p>" + ra.rt + "</p></a></li>";
					}
					
					$("#newsListContent").html(list);
					$("#newsListContent").listview('refresh');
					
					$("#newsListContent a").each(function(index) {
						$(this).click(function() {
							var addon = $(this).attr("title");
							window.localStorage.setItem("newsListToDetail", addon);
						});
					});
				}
				
			}
		}
		xhr.open("GET", url, true);
		xhr.send(null);
	}

	getNewsListFromServer();

})();

