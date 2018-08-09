var regemail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
var regqq = /[1-9]([0-9]{5,11})/;
var regphone = /0?(13|14|15|18)[0-9]{9}/;
var regusername = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,14}/;
var regpassword = /[a-zA-Z0-9^%&';=?$x22]{8,}/;
var lock1 = 0;
var lock2 = 0;
var lock3 = 0;
var lock4 = 1;
$('#username').blur(function(e) {
	e = e || window.event;
	var lbs = e.target.labels[0];

	if(!regusername.test(e.target.value) && e.target.value != '') {
		lbs.style.color = "#AC2925"
		lbs.innerHTML = "用户名非法，请由数字和英文组成至少6位";
		lbs.style.marginLeft = "-295px";
		lock1 = 0;
	} else {
		lbs.style.color = "#F0FFFF";
		lbs.innerHTML = "用户名";
		lbs.style.marginLeft = "-50px";
		lock1 = 1;
	}
	if(e.target.value == '') {
		lbs.style.color = "#AC2925";
		lbs.style.marginLeft = "30px";
		lock1 = 0;
	}
	if(lock1 == 1) {
		var dataU = {};
		dataU.username = $('#username').val();
		dataU.check = "1";
		$.ajax({
			type: "post",
			url: "/reg",
			async: true,
			data: dataU,
			dataType: 'JSON',
			success: function(message) {
				if(message == 0) {
					lbs.innerHTML = '用户名重复';
					lbs.style.color = "#AC2925";
					lbs.style.marginLeft = '-70px';
					lock1 = 0;
				}else {
					lbs.innerHTML = '用户名可用';
					lbs.style.marginLeft = '-70px'
				}
			},
			error: function(textStatus){
				console.log('error' + textStatus);
			}
		});
	}
});

$('#email').blur(function() {
	console.log($(this)[0]);
	if(!regemail.test($(this).val()) && $(this).val() != '') {
		$(this)[0].labels[0].style.color = "#AC2925";
		$(this)[0].labels[0].innerHTML = "邮箱非法，请重新输入";
		$(this)[0].labels[0].style.marginLeft = "-160px";
		lock4 = 0;
	} else {
		$(this)[0].labels[0].style.color = "#F0FFFF";
		$(this)[0].labels[0].innerHTML = "邮箱";
		$(this)[0].labels[0].style.marginLeft = "-40px";
		lock4 = 1;
	}
	if($(this).val() == '') {
		$(this)[0].labels[0].style.color = "#AC2925";
		$(this)[0].labels[0].style.marginLeft = "30px";
		lock4 = 1;
	}
});

$('#password').blur(function() {
	if(($(this).val() === $('#reapt-pw').val()) && $(this).val() != ''){
		$('#reapt-pw')[0].labels[0].style.color = "#F0FFFF";
		$('#reapt-pw')[0].labels[0].innerHTML = "确认密码";
		$('#reapt-pw')[0].labels[0].style.marginLeft = "-50px";
		lock3 = 1;
	}
	if(!regpassword.test($(this).val()) && $(this).val() != '') {
		$(this)[0].labels[0].style.color = "#AC2925";
		$(this)[0].labels[0].innerHTML = "密码由特殊字符与英文数字组成，至少8位";
		$(this)[0].labels[0].style.marginLeft = "-295px";
		lock2 = 0;
	} else {
		$(this)[0].labels[0].style.color = "#F0FFFF";
		$(this)[0].labels[0].innerHTML = "密码";
		$(this)[0].labels[0].style.marginLeft = "-40px";
		lock2 = 1;
	}
	if($(this).val() == '') {
		$(this)[0].labels[0].style.color = "#AC2925";
		$(this)[0].labels[0].style.marginLeft = "30px";
		lock2 = 0;
	}
});

$('#reapt-pw').blur(function() {
	if(!($(this).val() === $('#password').val()) && $(this).val() != '') {
		$(this)[0].labels[0].style.color = "#AC2925";
		$(this)[0].labels[0].innerHTML = "两次密码不一致";
		$(this)[0].labels[0].style.marginLeft = "-120px";
		lock3 = 0;
	} else {
		$(this)[0].labels[0].style.color = "#F0FFFF";
		$(this)[0].labels[0].innerHTML = "重复密码";
		$(this)[0].labels[0].style.marginLeft = "-60px";
		lock3 = 1;
	}
	if($(this).val() == '') {
		$(this)[0].labels[0].style.color = "#AC2925";
		$(this)[0].labels[0].style.marginLeft = "30px";
		lock3 = 0;
	}
});

$('.ipt-reg').click(function(e){
	e = e || window.event;
	var lbs = e.target.labels[0];
	console.log(lbs.style.marginLeft);
	if(lbs.style.marginLeft == "30px" || lbs.style.marginLeft == ""){
		if(lbs.innerHTML.length == 3)lbs.style.marginLeft = "-50px";
		else if(lbs.innerHTML.length == 2)lbs.style.marginLeft = "-35px";
		else lbs.style.marginLeft = "-60px"
	}
	lbs.style.color = "#1B6D85";
});

$('.ipt-reg').on('blur',function(){
	if(lock1 == 1 && lock2 == 1 && lock3 == 1 && lock4 == 1){
		$('.reg-btn').css("background-color","#C1E2B3");
		$('.reg-btn').prop("type","submit");
	}else{
		$('.reg-btn').css("background-color","#EE9572");
		$('.reg-btn').prop("type","button");
	}
})
