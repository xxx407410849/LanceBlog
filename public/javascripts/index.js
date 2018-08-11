$().ready(function(){
	var canvas = $('canvas');
	var icon = $('.top-icon');
	var nav = $('.navbar');
	setTimeout(function(){
		icon.velocity('transition.slideUpBigIn', { duration: 500 });
	},0);
	setTimeout(function(){
		canvas.velocity('transition.fadeIn', { duration: 500 });
	},700);
	setTimeout(function(){
		nav.velocity('transition.slideDownBigIn', { duration: 400 });
	},800);
})



$('.login-label').on('click', function(e) {
	e = window.event || event;
	let tar = e.target;
	tar.style.marginLeft = "-300px";
});
$('.modal-input').eq(0).click(function() {
	$('.login-label').eq(0).css('margin-left', '-300px');
	$('.lbs-username')[0].innerHTML = "请输入账号";
});
$('.modal-input').eq(1).click(function() {
	$('.login-label').eq(1).css('margin-left', '-300px');
	$('.lbs-password')[0].innerHTML = "请输入密码";
});
$('.modal-input').eq(0).on('focusout', function() {
	if($('.modal-input').eq(0).val() == '') {
		$('.login-label').eq(0).css('margin-left', '-205px');
		$('.login-label').eq(0).css("color", "#d93a49");
	}
});
$('.modal-input').eq(1).on('focusout', function() {
	if($('.modal-input').eq(1).val() == '') {
		$('.login-label').eq(1).css('margin-left', '-205px');
		$('.login-label').eq(1).css("color", "#d93a49");
	}
});
$('.modal-input').on('blur', function(e) {
	e = e || window.event;
	console.log(e.target.value);
	if(e.target.value != '') {
		var lbs = e.target.labels[0];
		lbs.style.color = "#b3b8bc";
	}

});
$('.login-close').on('click', function() {
	$('.modal-input').val("");
	$('.modal-input').removeAttr('style');
	$('.login-label').removeAttr('style');
});
$('.navbar-title').mouseenter(function() {
	setTimeout(function() {
		$('.span-change1').text("已经");
	}, 600);
	setTimeout(function() {
		$('.span-change2').text("累死");
	}, 700);
	setTimeout(function() {
		$('.span-change3').text("全栈");
	}, 800);
});

$('.navbar-title').mouseleave(function() {
	setTimeout(function() {
		$('.span-change1').text("还在");
	}, 600);
	setTimeout(function() {
		$('.span-change2').text("奋斗");
	}, 500);
	setTimeout(function() {
		$('.span-change3').text("前端");
	}, 400);
});

$('.icon-show').mouseenter(function() {
	$('.icon-show').css("animation-play-state", "paused");
	$('.icon-show').css("opacity", "0.8");
	$('.icon-container').removeClass("icon-fakecontainner");
});

$('.icon-show').mouseleave(function() {
	$('.icon-show').css('animation-play-state', "running");
	$('.icon-show').css("opacity", "0.5");
});

var flag = false; // open true 
var flag1 = 0; //open 1
$('body').on('click', function() {
	$('.choose-ul').css("visibility", "hidden");
	$('.choose-ul5').css("visibility", "hidden");
	$('.choose-ul6').css("visibility", "hidden");
	flag = false;
	$('.dropdown-menu').css("padding","0");
	$('.dropdown-menu').css("max-height","0");
	flag1 = 0

});

$('.icon-show').on('click', function(e) {
	e.stopPropagation();
	var w = parseInt($('.container').css("width"));
	console.log(w);
	if(!flag) {
		$('.choose-ul').css("visibility", "inherit");
		$('.choose-ul5').css("visibility", "inherit");
		$('.choose-ul6').css("visibility", "inherit");
		flag = true;
	} else {
		$('.choose-ul').css("visibility", "hidden");
		$('.choose-ul5').css("visibility", "hidden");
		$('.choose-ul6').css("visibility", "hidden");
		flag = false;
	}
	$('.choose-ul3').css("margin-left", w / 2 - 305 + "px");
	$('.choose-ul1').css("margin-left", w / 2 - 305 + "px");
	$('.choose-ul5').css("margin-left", w / 2 - 152 + "px");
	$('.choose-ul6').css("margin-left", w / 2 - 75 + "px");
});

$(window).resize(function() {
	$('.choose-ul').css("visibility", "hidden");
	$('.choose-ul5').css("visibility", "hidden");
	$('.choose-ul6').css("visibility", "hidden");
	flag = false;
});

$('.check-btn').on('click', function() {
	var dataL = {};
	if($('.ipt-password').val() != "" && $('.ipt-username').val() != "") {
		dataL.username = $('.ipt-username').val();
		dataL.password = $('.ipt-password').val();
	}
	$.ajax({
		type: "post",
		url: "/",
		async: true,
		dataType: 'JSON',
		data: dataL,
		success: function(data) {
			if(data == "0") {
				console.log($('.lbs-username'));
				$('.lbs-username')[0].innerHTML = "用户名不存在";
				$('.lbs-username').css("margin-left", '-325px');
				$('.lbs-username').css("color", "#d93a49");
			} else if(data == "1") {
				$('.lbs-password')[0].innerHTML = "密码错误";
				$('.lbs-password').css("margin-left", '-290px');
				$('.lbs-password').css("color", "#d93a49");
			} else {
				console.log("login");
				location.reload(true);
			}
		},
		error: function(error) {
			console.log("error");
		}
	});
});
$('.navbar-person').on('mouseenter', function(e) {
	e.stopPropagation();
	if(flag1 == 0){
	$('.dropdown-menu').css("padding","10px");
	$('.dropdown-menu').css("max-height","210px");
	flag1 = 1;
	}
});
$('.dropdown-menu').on('mouseleave',function(e) {
	$('.dropdown-menu').css("padding","0");
	$('.dropdown-menu').css("max-height","0");
	flag1 = 0;
})