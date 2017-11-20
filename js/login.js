var loginClose = $('.win-login .window a.w-close'),		//登录窗口关闭
	regClose = $('.win-reg .window a.w-close'),			//注册窗口关闭
	loginWindow = $('.win-login'),						//登录窗口
	regWindow = $('.win-reg'),							//注册窗口
	win_regbtn = $('#win_reg'),							//登录窗口[立即注册]
	win_loginbtn = $('#win_login'),						//注册窗口[立即登录]
	
	top_line_loginbtn = $('#top_line_loginbtn'),		//top_line上的登录按钮
	top_line_regbtn = $('#top_line_regbtn');			//top_line上的注册按钮
	
loginClose.on('click',function () {
	loginWindow.removeClass('is-visible');
});
regClose.on('click',function () {
	regWindow.removeClass('is-visible');
});
win_regbtn.on('click',function () {
	loginWindow.removeClass('is-visible')
	;regWindow.addClass('is-visible');
});
win_loginbtn.on('click',function () {
	regWindow.removeClass('is-visible')
	;loginWindow.addClass('is-visible');
});

top_line_loginbtn.click(function () {
	loginWindow.addClass('is-visible')
});
top_line_regbtn.click(function () {
	regWindow.addClass('is-visible')
});