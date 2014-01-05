
(function(){
  var _type = window.localStorage.getItem("categoryToNewsList") || "default";

  function getLatestNews(url){

      var newsList = "";

      $.ajax({

          type: "POST",
            url: url,
            data: "json",
            success:function(msg){

                var lists = {}
                    , len = 0;

                try {
                    lists = JSON.parse(msg).d;
                    len = lists.length;
                }
                catch(err){
                    console.log("Json parse lists error!");
                }

                console.log('length is :'+len);
                for(var i = 0; i < len; i++){
                    var t = lists[i].attributes.url.replace(/http:\/\/newsfeed.bistu.edu.cn/, "").replace(/.xml/,"");
                    newsList += '<li><a href="newsdetail.html" title="' + t + '"><h3>' + lists[i].attributes.n + '</h3><p>'+ lists[i].attributes.rt +'</p></a></li>';
                }
                $("#latestNews").html(newsList);
                $("#latestNews").listview('refresh');

                $("#latestNews a").each(function(index) {
                    $(this).click(function() {
                        var addon = $(this).attr("title");
                        console.log("addon is " + addon);
                        window.localStorage.setItem("newsListToDetail", addon);
                    });
                });
            }

      });

  }

  function checkNet(){
      var url = "";
      networkState = navigator.network.connection.type;

      if(networkState != "none"){
          url = "http://m.bistu.edu.cn/api/api.php?table=newslist&url=/xw/qb/";
      }
      else {
          url = "etc/news_xw_qb.json";
      }
      console.log(url);
      getLatestNews(url);

  }

  document.addEventListener("deviceready",checkNet,false);

})();






