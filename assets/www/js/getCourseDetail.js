(function() {

  var courseName = window.localStorage.getItem("courseDetailName") || "",
      queryId = window.localStorage.getItem("courseDetailQueryId") || "",
      courseInfo = window.localStorage.getItem("courseDetailInfo") || "",
      coursePeriod = window.localStorage.getItem("courseDetailPeriod") || "0",
      courseScore = window.localStorage.getItem("courseDetailScore") || "0",
      courseType = window.localStorage.getItem("courseDetailType") || "";

  window.localStorage.removeItem("courseDetailName");
  window.localStorage.removeItem("courseDetailQueryId");
  window.localStorage.removeItem("courseDetailInfo");
  window.localStorage.removeItem("courseDetailPeriod");
  window.localStorage.removeItem("courseDetailScore");
  window.localStorage.removeItem("courseDetailType");

  //set texts
    $("#detail_courseName").text(courseName);
    $("#detail_courseInfo").text(courseInfo);
    $("#courseDetailPeriod").text("学时:"+coursePeriod);
    $("#courseDetailClassScore").text("学分:"+courseScore);
    $("#courseDetailClassType").text(courseType);

    if(iBistuDB == undefined || iBistuDB == null){
        iBistuDB = window.openDatabase("iBistu", "0.1", "BistuDB", 100000);
    }
    else if(iBistuDB != undefined){
        iBistuDB.transaction(function(tx) {
    tx.executeSql("select * from coursedetail where courseListId=" + "'" + queryId + "'", [], function(tx, results) {
      var r = results.rows,
           len = r.length,
           innerhtm = "",
           beginList = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
      for (var i = 0; i < len; i++) {
        innerhtm += beginList + "<li><a href='#'>" + "教师:  " + r.item(i).courseTeacher + "</a></li>" +
                     "<li><a href='#'>" + r.item(i).courseTime + "</a></li>" +
                     "<li><a href='#'>" + "地点:  " + r.item(i).coursePlace + "</a></li>" + "</ul>";
      }

      $("#courseDetailListView").html(innerhtm);
      $("#courseDetailListView").trigger("create");

        }, function() {
          console.log("get from coursedetail error!")
        });
    }, errorCB, successCB);
    }

  $("#addMyFavor").click(function() {

      var favorContent = $("#courseDetailContent").html() + "";

      // TODO: an empty function. should i still write file if it exist!!!?
      function writeOrNot(){
      }

      /**
       * create a directory(favor) to store favor courses!
       * Bug: new Directory!!!
       *      I should detect the directory exist then decide to create or use it!
       */
      // Done: comment this 'new' expression.
      //var rootDir = new DirectoryEntry("iBistu",Bistu.rootDir + "/iBistu");

      Bistu.rootDirEntry.getDirectory("coursefavor",{create: true, exclusive: false},createFavorSuccess,function(){
          console.log("access favor failed!!!");
      });

      function createFavorSuccess(dirEntry){
          console.log("favor dir fullpath is:"+dirEntry.fullPath);
          dirEntry.getFile(queryId,{create: true, exclusive: false},putFavorCourse,function(){
              console.log("create file failed");
          });
      }

      function putFavorCourse(fileEntry){
          fileEntry.createWriter(function(writer){
            // write all the content into file.
              writer.write(favorContent);
          },queryFailed);
          $("#popupBasic").popup("open");
      }

      iBistuDB.transaction(function(tx){
          tx.executeSql('CREATE TABLE IF NOT EXISTS favorCourses (id, firstPart,secondPart)', [], function(tx,results){
              console.log("create favorCourses table success");
          },function(){
              console.log("favorCourses table already exists");
          });

          tx.executeSql('select id from favorCourses',[],function(tx,result){

              var r = result.rows,
                  l = r.length,
                  flag = false;

              for(var i = 0; i < l; i++){
                  if(r.item(i).id == queryId){
                      flag = true;
                  }
              }

              if(!flag){
                  tx.executeSql('INSERT INTO favorCourses (id,firstPart,secondPart) values ("' + queryId + '","' + courseName + '","' + "" + '")',[],querySuccess,function(err){
                      console.log("favorCourses insert error!");
                  });
              }

          },queryFailed);

      },errorCB,
      successCB);

      function querySuccess(tx,results){
          console.log("results.length is " + results.rows.length);
      }

      function queryFailed(){
          console.log("收藏失败");
      }
      // need convert alert to pop!!!
      // TODO: change display behavior.
      //alert("添加成功");
      $("#popupBasic").popup("open");
    });

})();

