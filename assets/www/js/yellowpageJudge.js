
(function(){
	
	'use strict';
	
	var judgeBtn = document.getElementById('judgePermission'),
		flag     = window.localStorage.getItem('loginFlag');
	
	console.log('login flag is ' + flag);
	
	if(flag === null || flag === undefined){
		judgeBtn.setAttribute('href', 'login.html');
	}
	else if(0 === Number(flag)){  /* three equals, so the string is not equal number!!! */
		console.log('start in flag 0');
		//<a href="foo.html" data-rel="dialog">Open dialog</a>
		judgeBtn.setAttribute(    'href', './dialog/yellowpage.html');
		judgeBtn.setAttribute('data-rel', 'dialog');
		console.log('JudgeButton href is ' + judgeBtn.getAttribute('href'));
	}
	else{
		judgeBtn.setAttribute('href', 'yellowpageDeepin.html');
	}
	console.log('After JudgeButton href is ' + judgeBtn.getAttribute('href'));
	
}());

