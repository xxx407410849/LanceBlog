$().ready(function() {
	//-------config------
	var $articleList = $('.text-body-item');
	var $webHeight = document.documentElement.clientHeight;
	var $leftPic = $('.left-container');
	$('.text-container').css('min-height', $webHeight + 10);
	$('.text-body-item').css('opacity', 0);
	$('.text-container').css('visibility', 'inherit');
	/*$($('.text-item-post')[0]).css("background-image",'url(../img/图片6.png)');
	$($('.text-item-post')[1]).css("background-image",'url(../img/图片7.png)');
	$($('.text-item-post')[2]).css("background-image",'url(../img/图片1.png)');
	$($('.text-item-post')[3]).css("background-image",'url(../img/图片2.png)');
	$($('.text-item-post')[4]).css("background-image",'url(../img/图片5.png)');
	$($('.text-item-post')[5]).css("background-image",'url(../img/图片3.png)');*/
	var $articleShowBtn = $('.article-show-btn');
	var $navList = $('.nav-list');
	var $availWidth = window.screen.availWidth;
	if ($availWidth >= 1536) {
		$('html').css('zoom', $availWidth / 1536);
	}
	var $screenWidth = window.innerWidth;
	$('.nav-list').css('left', 195 - ($availWidth - $screenWidth) / 2 + "px");
	//---------UI---------

	//-----text-body-item UI
	for(var i = 0; i < $articleList.length; i++) {
		//console.log($articleList);
		//var $articleElem = $articleList[i];
		(function(num) {
			setTimeout(function() {
				//console.log(num);
				//把第一个展开

				var $articleElem = $articleList[num];
				var $eTextElem = $articleElem.nextElementSibling;
				if(num === 0) $($eTextElem).css('max-height', '200px');
				$($eTextElem).css('opacity', '0');
				$($eTextElem).animate({
					opacity: '1'
				}, 500);
				$($articleElem).animate({
					opacity: '0.9'
				}, 500);
				$($articleElem).on('mouseenter', function(e) {
					var $eElem = $(this.firstElementChild);
					//console.log($(this.firstElementChild));
					$eElem.css('opacity', '0.9');
				});
				$($articleElem).on('mouseleave', function(e) {
					var $eElem = $(this.firstElementChild);
					$eElem.css('opacity', '0.6');
				});
				$($articleElem).on("click", function(e) {
					var $eElem = $(this)[0].nextElementSibling;
					if($($eElem).css('max-height') == "0px") {
						$($eElem).animate({
							maxHeight: "200px"
						}, 800);
						//						var $scollTop = parseInt(document.body.scrollTop);
						//						console.log($scollTop);
						//						$('html,body').animate({
						//							scrollTop: $scollTop + 200 +"px"
						//						},800);
					} else {
						$($eElem).animate({
							maxHeight: "0px"
						}, 600);
					}
				});
			}, num * 200 + 800);
		}(i));
	}
	//-----text-show-body UI
	$articleShowBtn.on("mouseenter", function(e) {
		$(this).css('outline-style', 'inset');
		$(this).animate({
			outlineWidth: "3px"
		}, 100, "linear");
	});
	$articleShowBtn.on("mouseleave", function(e) {
		$(this).css('outline-style', 'dashed');
		$(this).animate({
			outlineWidth: "2px"
		}, 100, "linear");
	});
	$articleShowBtn.on("click", function(e) {});

	//------rightnavlist UI
	$navList.animate({
		'opacity': '1'
	}, 0);
	setTimeout(function(){
		$('.welcome-ctn').fadeIn(300);
	},100);
	setTimeout(function(){
		$('.articlelist-ctn').slideDown(600);
	},400);
	setTimeout(function(){
		$('.icon-person-show').fadeIn(100);
	},800);
	setTimeout(function(){
		$('.text-container').animate({
			'opacity': '1'
		},200);
	},600);
	setTimeout(function(){
		$('.icon-ctn').fadeIn(300)
	},1000);
});
//resize检测
$(window).resize(function () {
    var $nowScreenWidth = window.innerWidth;
    var $nowavailWidth = window.screen.availWidth;
    $('.nav-list').css('left', 195 - ($nowavailWidth - $nowScreenWidth) / 2 + "px");
});
//topnavlist UI
var $topShowFlag = false;
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
