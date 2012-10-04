/**
 * rewrite base.js
 * 
 * 
 *  */

var Bistu = {
  
  rootName:"iBistu",
  //default rootDir.If create rootDir fail,else use the create rootDir.
  rootDir:"/mnt/sdcard/iBistu",
  rootDirEntry:null,
  saveAsFile:function(dirname,filename,content){
      if(null == dirname) dirname == "";
      if(null == filename) filename == "file" + Math.random(1000);
      // var dir = new DirectoryEntry(dirname,Bistu.rootDir + dirname);
      Bistu.rootDirEntry.getDirectory(dirname,{create: true, exclusive: false},function(dirEntry){
          dirEntry.getFile(filename,{create: true, exclusive: false},function(fileEntry){
              
          });
      },function(err){
          console.log("saveAsFile# error-->" + err.code);
      })
      
  }
    
};

function initApp(){
    
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
            console.log("directory iBistu has create-->" + Bistu.rootDir);
            
            //Just for test. should delete when test success.
            console.log("dir == " + dir);
        },function(err){
            
            //get dir(iBistu) fail
            console.log("directory iBistu can't create-->" + err.code);
        });
    },function(code){
        //requestFileSystem fail.
        console.log("get local file system error!");
    });
    
    
    
    
    
    
    
    
    
    
}





















