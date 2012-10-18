
function updateBuildingTable() {

    var url = "http://m.bistu.edu.cn/api/api.php?table=building";
    var type = "building";
    if(!Bistu.update.building)
        getFromServer(type, url);

}

function updateCourseDetailTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=coursedetail";
    var type = "courseDetail";
    if(!Bistu.update.coursedetail) getFromServer(type, url);
}

function updateCourseListTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=courselist";
    var type = "courseList";
    if(!Bistu.update.courselist) getFromServer(type, url);

}

function updateClassroomTable() {

    var url = "http://m.bistu.edu.cn/api/api.php?table=classroom";
    var type = "classroom";
    if(!Bistu.update.classroom) getFromServer(type, url);

}

function updateCollegeTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=college";
    var type = "college";
    if(!Bistu.update.college) getFromServer(type, url);

}

function updateCourseTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=course";
    var type = "course";
    if(!Bistu.update.course) getFromServer(type, url);

}

function updateMajorTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=major";
    var type = "major";
    if(!Bistu.update.major) getFromServer(type, url);
}

function updateClasstimeTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=classtime";
    var type = "classtime";

    if(!Bistu.update.classtime) getFromServer(type, url);
}

function getFromServer(type, url) {
    if(url == "" || url == null) {
        return null;
    }

    console.log("type=" + type + "-->url=" + url);

    var xhr = new XMLHttpRequest();
    var resp = null;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                try {
                    resp = eval('(' + xhr.responseText + ')');
                    console.log("responseText's Type = " + type + " and length = " + resp.length);
                    switch(type) {
                        case "college":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('DROP TABLE IF EXISTS college');
                                    tx.executeSql('create table if not exists college (id INTEGER PRIMARY KEY,collegeName,collegeCode)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into college (collegeName,collegeCode)' + ' values ("' + resp[i].collegeName + '","' + resp[i].collegeCOde + '")');
                                    }
                                }, errorCB, function(){
                                    Bistu.update.college = true;
                                });
                            })();
                            break;
                        case "major":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists major');
                                    tx.executeSql('create table if not exists major (id INTEGER PRIMARY KEY, majorName,majorCode,collegeId)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql("insert into major (id,majorName,majorCode,collegeId) values ('" + resp[i].id + "','" + resp[i].majorName + "','" + resp[i].majorCode + "','" + resp[i].collegeId + "')");
                                    }
                                }, errorCB, function(){
                                    Bistu.update.major = true;
                                });
                            })();
                            break;
                        case "building":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists building');
                                    tx.executeSql('create table if not exists building (id, buildingCode,buildingName)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into building (id,buildingCode,buildingName) values ("' + resp[i].id + '","' + resp[i].buildingCode + '","' + resp[i].buildingName + '")');
                                    }
                                }, errorCB, function(){
                                    Bistu.update.building = true;
                                });
                            })();
                            break;
                        case "courseDetail":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql("drop table if exists coursedetail");
                                    tx.executeSql("create table if not exists coursedetail (id INTEGER PRIMARY KEY,courseListId,courseTeacher,coursePlace,courseTime)");
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into coursedetail (courseListId,courseTeacher,coursePlace,courseTime) values ("' + resp[i].courseListId + '","' + resp[i].courseTeacher + '","' + resp[i].coursePlace + '","' + resp[i].courseTime + '")');
                                    }
                                }, errorCB, function(){
                                    Bistu.update.coursedetail = true;
                                });
                            })();
                            break;
                        case "courseList":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists courseList');
                                    tx.executeSql('create table if not exists courseList (id INTEGER PRIMARY KEY,courseCode,courseName,majorId)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql("insert into courseList (id,courseCode,courseName,majorId) values ('" + resp[i].id + "','" + resp[i].courseCode + "','" + resp[i].courseName + "','" + resp[i].majorId + "')");
                                    }
                                }, errorCB, function(){
                                    Bistu.update.courselist = true;
                                });
                            })();
                            break;
                        case "course":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists course');
                                    tx.executeSql('create table if not exists course (courseName,courseEngName,courseCode,courseInfo,courseXs,courseXf,courseXz,courseLb)');
                                    console.log("Start to insert-->" + type + "  length = " + resp.length);
                                    var courseInfos = "";
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        courseInfos = resp[i].courseInfo.replace(/\n[\s| ]*\r/g, "");
                                        // courseInfos = '';
                                        tx.executeSql("insert into course (courseName,courseEngName,courseCode,courseInfo,courseXs,courseXf,courseXz,courseLb) values ('" + resp[i].courseName + "','" + "','" + resp[i].courseCode + "','" + courseInfos + "','" + resp[i].courseXs + "','" + resp[i].courseXf + "','" + resp[i].courseXz + "','" + resp[i].courseLb + "')");
                                    }

                                }, function(err) {
                                    console.log("Code is "+err.code);
                                    console.log("Msg is " + err.message);
                                }, function(){
                                    console.log("insert into course success!!!");
                                    Bistu.update.course = true;
                                });
                            })();
                            break;
                        case "classtime":
                            (function() {

                                iBistuDB.transaction(function(tx) {

                                    tx.executeSql('drop table if exists classtime');
                                    tx.executeSql('create table if not exists classtime (id INTEGER PRIMARY KEY, classroomId,date,courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)');
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql("insert into classtime (classroomId,date,courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11) values ('" + resp[i].classroomId + "','" + resp[i].date + "','" + resp[i].courseId1 + "','" + resp[i].courseId2 + "','" + resp[i].courseId3 + "','" + resp[i].courseId4 + "','" + resp[i].courseId5 + "','" + resp[i].courseId6 + "','" + resp[i].courseId7 + "','" + resp[i].courseId8 + "','" + resp[i].courseId9 + "','" + resp[i].courseId10 + "','" + resp[i].courseId11 + "')");
                                    }
                                }, errorCB, function(){
                                    Bistu.update.classtime = true;
                                });
                            })();
                            break;
                        case "classroom":
                            (function() {

                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists classroom');
                                    tx.executeSql('create table if not exists classroom (id, roomName,roomCode,buildingId)')
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into classroom (id,roomName,roomCode,buildingId) values ("' + resp[i].id + '","' + resp[i].roomName + '","' + resp[i].roomCode + '","' + resp[i].buildingId + '")');
                                    }
                                }, errorCB, function(){
                                    Bistu.update.classroom = true;
                                });
                            })();
                            break;
                        default:
                            (function() {
                                console.log("Update error!");
                            })();
                    }

                }
                catch(e) {
                    console.log("insert into Table error-->" + type + "-- Type-->" + e.fileName);
                }
                
                window.localStorage.setItem("updateState",JSON.stringify(Bistu.update));
                
            }
            else {
                console.log("Get data from server error code = " + xhr.status);
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);    
}

document.addEventListener("deviceready",function(){
    
    try{
        if(!Bistu.NETWORK_STATUS) Bistu.NETWORK_STATUS = 'none';
    }
    catch(e){
        console.log("Bistu.NETWORK_STATUS cannot read!");
    }
    
    if(Bistu.NETWORK_STATUS !== 'none'){
        updateBuildingTable();
        updateCourseDetailTable();
        updateCourseListTable();
        updateClassroomTable();
        updateCollegeTable();
        updateCourseTable();
        updateMajorTable();
        updateClasstimeTable();
    }else {
        console.log("network is none,please open your network!");
    }
    
},false);

















