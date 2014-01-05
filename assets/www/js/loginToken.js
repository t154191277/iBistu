
(function(){

  var loginFlag = window.localStorage.getItem("loginFlag"),
      loginName = window.localStorage.getItem("loginName"),
      type = '';
  console.log("loginToken is " + loginFlag);

  if(loginFlag != null && loginFlag != "undefined"){

    switch(loginFlag){
        case 0: type = "同学";break;
        case 1: type = "老师";break;
        case 2: type = "老师";break;
        default: type = " ";
    }

    $("#userName").text(loginName);
    $("#userType").text(type);

    $("#loginForm").removeClass("show").addClass("hidden");
    $("#logoutForm").removeClass("hidden").addClass("show");

    console.log("login class-->" + $("#loginForm").attr("class"));
    console.log("logout class-->" + $("#logoutForm").attr("class"));

  }
  else {
    $("#logoutForm").removeClass("show").addClass("hidden");
    $("#loginForm").removeClass("hidden").addClass("show");

    console.log("login 2 class-->" + $("#loginForm").attr("class"));
    console.log("logout 2 class-->" + $("#logoutForm").attr("class"));
  }

})();




























