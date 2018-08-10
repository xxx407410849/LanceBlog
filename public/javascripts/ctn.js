$().ready(function () {
    var $availWidth = window.screen.availWidth;
    if ($availWidth >= 1536) {
        $('html').css('zoom', $availWidth / 1536);
    }
    //定位nav-list 使其跟随y轴但不跟随x轴移动 由于margin auto 所以/2
    var $screenWidth = window.innerWidth;
    $('.nav-list').css('left', 195 - ($availWidth - $screenWidth) / 2 + "px");
});
//resize检测
$(window).resize(function () {
    var $nowScreenWidth = window.innerWidth;
    var $nowavailWidth = window.screen.availWidth;
    $('.nav-list').css('left', 195 - ($nowavailWidth - $nowScreenWidth) / 2 + "px");
});
var $navList = $('.nav-list');
var $topShowFlag = false;
//------rightnavlist UI
$navList.animate({
	'opacity': '1'
}, 100);
setTimeout(function() {
	$('.welcome-ctn').velocity('transition.flipYIn', {
		duration: 350
	});
}, 100);
setTimeout(function() {
	$('.articlelist-ctn').slideDown(550);
	$('.articlelist-item').velocity("transition.slideLeftBigIn", { drag: true });
}, 300);
setTimeout(function() {
	$('.icon-person-show').fadeIn(100);
}, 700);
setTimeout(function() {
	$('.icon-ctn').velocity('transition.slideUpBigIn',{
		duration: 400
	});
}, 950);
//topnavlist UI
$('.top-btn-toggle').on('click', function(e) {
	/*//注意，这种写法下不敏感非450px下的收缩操作,但对非450px下的展开操作敏感
	if($('.topnav').css('max-height') == "450px"){
		$('.topnav').animate({'maxHeight':'100px'},500);
	}else{
		$('.topnav').animate({'maxHeight':'450px'},500);
	}*/
	//注意，这种写法下对非动画完成的所有操作不敏感。不过会将事件加入队列(延后处理)
	if($topShowFlag) {
		$('.topnav').animate({
			'maxHeight': '100px'
		}, 500);
		$topShowFlag = false;
	} else {
		$('.topnav').animate({
			'maxHeight': '450px'
		}, 500);
		$topShowFlag = true;
	}
});