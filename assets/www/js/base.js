/**
 * base.js
 * 
 * 2012.11.11 @ista.allen@gmail.com
 * happy for 11.11
 *  */

var Bistu = {},
iBistuDB = null;

function initApp(){
    
    Bistu = {
      rootName:"iBistu",
      //default rootDir.If create rootDir fail,else use the create rootDir.
      rootDir:"/mnt/sdcard/iBistu",
      rootDirEntry:null,
      iBistuDB: null,
      NETWORK_STATUS: null,
      shouldUpdate: false,
      update: {// debug module. should set all false when release.
        college: false,
        building: false,
        coursedetail: false,
        courselist: false,
        classroom: false,
        course: false,
        major: false,
        classtime: false,
        collegeintro: false  
      },
      DATABSE_EXIST: false,
      saveAsFile:function(dirname,filename,content){
          
          var initFileId = window.localStorage.getItem("initFileId") || 0,
              realFileId = getId(initFileId)();
          window.localStorage.setItem("initFileId",realFileId);
          
          if(null == dirname) dirname = "";
          if(null == filename) filename = "file" + realFileId;
          // var dir = new DirectoryEntry(dirname,Bistu.rootDir + dirname);
          Bistu.rootDirEntry.getDirectory(dirname,{create: true, exclusive: false},function(dirEntry){
              dirEntry.getFile(filename,{create: true, exclusive: false},function(fileEntry){
                  
                  fileEntry.createWriter(function(writer){
                      writer.onwriteend = function(evt){
                          console.log("write file end!!!");
                      }
                      
                      writer.write(content);
                  }, fail);
                  
                  // fileEntry.file(function(f){
    //                   
                  // },function(err){
                      // console.log("get file error: " + err.code);
                  // });
              });
          },function(err){
              console.log("saveAsFile# error-->" + err.code);
          });
          
          function fail(){
              console.log("create writer error!");
          }
          
          function getId(initId){
              return function(){
                  var fid = initId || 0;
                  return ++fid;
              }
          }
      }
        
    }
    
    
    /**
     * init root dir for App
     * root directory should like this: "/mnt/sdcard/iBistu" or "/sdcard/iBistu" at Android platform.
     *  */
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
        //requestFileSystem success.
        // Bistu.rootDir = fs.root.fullPath;
        fs.root.getDirectory("iBistu",{create: true, exclusive: false},function(dir){
            
            //get dir(iBistu) success
            Bistu.rootDir = fs.root.fullPath + "/iBistu";
            Bistu.rootDirEntry = dir;
            
        },function(err){
            //get dir(iBistu) fail
            console.log("directory iBistu can't create-->" + err.code);
        });
    },function(code){
        //requestFileSystem fail.
        console.log("get local file system error!");
    });
    
    /*
     * Bistu object properties.
     *  */
    Bistu.NETWORK_STATUS = navigator.network.connection.type || null;
    console.log("network_status is " + Bistu.NETWORK_STATUS);
    
    var updateStateStr = window.localStorage.getItem("updateState");
    
    if(updateStateStr !== "" && updateStateStr !== undefined && updateStateStr !== null){
        Bistu.update = JSON.parse(updateStateStr);
    }
    
    if(Bistu.update === null){
        Bistu.update = {
            college: false,
            building: false,
            coursedetail: false,
            courselist: false,
            classroom: false,
            course: false,
            major: false,
            classtime: false,
            collegeintro: false  
        };
    }
    
    window.localStorage.setItem("updateState",JSON.stringify(Bistu.update));
    console.log("update--->" + JSON.stringify(Bistu.update));
    
    /***************************************************************************
     * 创建数据库，
     ***************************************************************************/
    iBistuDB = window.openDatabase("iBistu", "0.1", "BistuDB", 100000);

    if(iBistuDB != undefined && iBistuDB != null) {
        window.localStorage.setItem("databaseExist", "true");
    }
    else {
        window.localStorage.setItem("databaseExit", "false");
    }
    
    if(Bistu.DATABSE_EXIST === false || Bistu.DATABSE_EXIST === null) {
        iBistuDB.transaction(populateDB, errorCB, successCB);
    }
    
    function populateDB(db) {

        db.executeSql('CREATE TABLE IF NOT EXISTS building (id INTEGER PRIMARY KEY, buildingCode,buildingName)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS classroom (id INTEGER PRIMARY KEY, roomName,roomCode,buildingId)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS college (id INTEGER PRIMARY KEY,collegeName,collegeCode)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY, courseName,courseEngName,courseCode,courseInfo,courseXs,courseXf,courseXz,courseLb)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS coursedetail (id INTEGER PRIMARY KEY,courseListId,courseTeacher,coursePlace,courseTime)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS courseList (id INTEGER PRIMARY KEY,courseCode,courseName,majorId)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS major (id INTEGER PRIMARY KEY, majorName,majorCode,collegeId)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS favorCourses (id INTEGER PRIMARY KEY, firstPart,secondPart)', [], createTableOrNot);
        db.executeSql('CREATE TABLE IF NOT EXISTS classtime (id INTEGER PRIMARY KEY, classroomId,date,courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)', [], createTableOrNot);
    
    }
    
    function createTableOrNot(){
        
    }
    
    Bistu.iBistuDB = iBistuDB;
}

// 当执行SQL失败后调用此方法
function errorCB(error) {
    console.log("executeSql error");
}

// 当执行SQL成功后调用此方法
function successCB() {
    console.log("executeSql success");
    Bistu.DATABSE_EXIST = true;
}

document.addEventListener("deviceready",initApp,false);


