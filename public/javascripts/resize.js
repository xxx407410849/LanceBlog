$().ready(function () {
    var $availWidth = window.screen.availWidth;
    if ($availWidth >= 1536) {
        $('html').css('zoom', $availWidth / 1536);
    }
    //定位nav-list 使其跟随y轴但不跟随x轴移动 由于margin auto 所以/2
    var $screenWidth = window.innerWidth;
    $('.nav-list').css('right', 250 - ($availWidth - $screenWidth) / 2 + "px");
	//定位catelog-ctn
	$('.catelog-ctn').css('left',100 - ($availWidth - $screenWidth) / 2 + "px");
});
//resize检测
$(window).resize(function () {
    var $nowScreenWidth = window.innerWidth;
    var $nowavailWidth = window.screen.availWidth;
    $('.nav-list').css('right', 250 - ($nowavailWidth - $nowScreenWidth) / 2 + "px");
	$('.catelog-ctn').css('left',100 - ($nowavailWidth - $nowScreenWidth) / 2 + "px");
});
