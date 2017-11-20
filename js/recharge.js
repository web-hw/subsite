var
	//---- 支付宝 ----
	alipay_otherMoney = $('.c-alipay .other-money'),	// [其他金额]输入框
	alipay_otherSign = $('.c-alipay .other-sign'),		// [其他金额]
	alipay_cMoney = $('.c-alipay .cMoney'),				// 选择金额
	alipay_target = $('.c-alipay .target'),				// 充值目标
	alipay_game = $('.c-alipay .game'),					// 选择游戏 按钮
	alipay_servers = $('.c-alipay .servers'),			// 选择区服 按钮
	alipay_gClose = $('.c-alipay .gClose'),				// 选择游戏关闭btn
	alipay_sClose = $('.c-alipay .sClose'),				// 选择区服关闭btn
	alipay_gList = $('.c-alipay .gList'),				// 选择游戏列表
	alipay_sList = $('.c-alipay .sList'),				// 选择区服列表
	
	//---- 微信 ----
	wChat_otherMoney = $('.c-wChat .other-money'),		// [其他金额]输入框
	wChat_otherSign = $('.c-wChat .other-sign'),		// [其他金额]
	wChat_cMoney = $('.c-wChat .cMoney'),				// 选择金额
	wChat_target = $('.c-wChat .target'),				// 充值目标
	wChat_game = $('.c-wChat .game'),					// 选择游戏 按钮
	wChat_servers = $('.c-wChat .servers'),				// 选择区服 按钮
	wChat_gClose = $('.c-wChat .gClose'),				// 选择游戏关闭btn
	wChat_sClose = $('.c-wChat .sClose'),				// 选择区服关闭btn
	wChat_gList = $('.c-wChat .gList'),					// 选择游戏列表
	wChat_sList = $('.c-wChat .sList'),					// 选择区服列表

	//---- 登录 注册 ----
	loginBtn = $('#loginBtn'),							//登录
	regBtn = $('#regBtn');								//注册

//------------- 支付宝支付 -------------
//[其他金额]click
alipay_otherMoney.on('click',function () {
	$(this).addClass('on').parent().parent().find('.cMoney').removeClass('current');
	alipay_otherSign.addClass('current');
});
//可选择的充值金额点击click
alipay_cMoney.on('click',function () {
	$(this).addClass('current').siblings().removeClass('current');
	alipay_otherMoney.removeClass('on');
	alipay_otherSign.removeClass('current');
	alert($(this).attr('data-money'));
});
//充值目标click
alipay_target.on('click',function(){
	$(this).addClass('current').siblings().removeClass('current');
});
//选择游戏
alipay_game.on('mouseover',function () {
	alipay_gList.fadeIn(200);
	alipay_sList.fadeOut(200);
});
alipay_gList.on('mouseleave',function () {
	$(this).fadeOut(200);
});
//选择区服
alipay_servers.on('mouseover',function () {
	alipay_sList.fadeIn(200);
	alipay_gList.fadeOut(200);
});
alipay_sList.on('mouseleave',function () {
	$(this).fadeOut(200);
});
//关闭
alipay_gClose.on('click',function(){
	alipay_gList.fadeOut(200);
});
alipay_sClose.on('click',function(){
	alipay_sList.fadeOut(200);
});
//------------- 微信支付 -------------
//[其他金额]click
wChat_otherMoney.on('click',function () {
	$(this).addClass('on').parent().parent().find('.cMoney').removeClass('current');
	wChat_otherSign.addClass('current');
});
//可选择的充值金额点击click
wChat_cMoney.on('click',function () {
	$(this).addClass('current').siblings().removeClass('current');
	wChat_otherMoney.removeClass('on');
	wChat_otherSign.removeClass('current');
	alert($(this).attr('data-money'));
});
//充值目标click
wChat_target.on('click',function(){
	$(this).addClass('current').siblings().removeClass('current');
});
//选择游戏
wChat_game.on('mouseover',function () {
	wChat_gList.fadeIn(200);
	wChat_sList.fadeOut(200);
});
wChat_gList.on('mouseleave',function () {
	$(this).fadeOut(200);
});
//选择区服
wChat_servers.on('mouseover',function () {
	wChat_sList.fadeIn(200);
	wChat_gList.fadeOut(200);
});
wChat_sList.on('mouseleave',function () {
	$(this).fadeOut(200);
});
//关闭
wChat_gClose.on('click',function(){
	wChat_gList.fadeOut(200);
});
wChat_sClose.on('click',function(){
	wChat_sList.fadeOut(200);
});

//登录btn
loginBtn.on('click',function () {
	loginWindow.addClass('is-visible');
});
//注册btn
regBtn.on('click',function () {
	regWindow.addClass('is-visible');
});