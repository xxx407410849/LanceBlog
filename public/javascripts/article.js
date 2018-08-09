var $navList = $('.nav-list');
var $topShowFlag = false;
//------rightnavlist UI
$navList.animate({
	'opacity': '1'
}, 800);
setTimeout(function() {
	$('.welcome-ctn').velocity('transition.flipYIn', {
		duration: 350
	});
}, 800);
setTimeout(function() {
	$('.articlelist-ctn').slideDown(550);
	$('.articlelist-item').velocity("transition.slideLeftBigIn", { drag: true });
}, 1000);
setTimeout(function() {
	$('.icon-person-show').fadeIn(100);
}, 1400);
setTimeout(function() {
	$('.icon-ctn').velocity('transition.slideUpBigIn',{
		duration: 400
	});
	//这里延后文章内容加载
	$('.article-body').velocity('transition.slideUpBigIn',{
		duration: 400
	});
	//目录加载
	$('.catelog-ctn').velocity('transition.slideLeftBigIn',{
		duration: 600
	});
}, 1650);
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
//目录检测
var $articleElem = $('.article-body-text');
var $articleChildElem = $articleElem.children();
var hReg = /^h/i;
var $hCtn = [];
var $liCtn = [];
var $wayList = [];
var $setList = [];
//鉴定存在的最高级H,最低级H
//实际上推荐只使用H3 H4 H5
var $minH = "H6";
var $maxH = "H1";
for(var i = 0 ; i < $articleChildElem.length ; i++){
	if(hReg.test($articleChildElem[i].nodeName)){
		$hCtn.push($articleChildElem[i]);
		if($minH > $articleChildElem[i].nodeName){
			$minH = $articleChildElem[i].nodeName;
		}
		if($maxH < $articleChildElem[i].nodeName){
			$maxH = $articleChildElem[i].nodeName;
		}
	}
}
//目录排序,提取
//实际上用padding模拟排序,而不是真的有顺序
var minHNum = parseInt($minH.slice(1,2));
var maxHNum = parseInt($maxH.slice(1,2));
var $ulElem = $("<ul class='catalog'></ul>");
//点击事件绑定以及抽取标题文字
$hCtn.forEach(function(item){
	var $liElem = $("<li class='catalogitem'></li>")
	$liElem.addClass(item.nodeName + "item");
	$liElem.text(item.innerHTML);
	$liElem.on('click',function(e){
		var $elem = e.target;
		var $idx = $('.catalogitem').index(e.target);
		console.log($idx);
		var $elemTop = $hCtn[$idx].offsetTop;
		$('html,body').animate({
			scrollTop : $elemTop + "px"
		},500);
	});
	if(item.nodeName != $minH)$liElem.addClass('unset');
	//存储liElem
	$liCtn.push($liElem);
	$ulElem.append($liElem);
});
//插入至容器
$('.catelog-ctn').append($ulElem);
for(var i = maxHNum+1 ; --i ; i > minHNum){
	var ClassStr = ".H" + i + "item";
	$(ClassStr).css("margin-left",(i-minHNum)*6 + "px");
}

//catelog UI
$(window).scroll(function(e){
	var $scrollTop = $(window).scrollTop();
	var $elemTop = $('.catelog-ctn').offset().top;
	//当顶端接触锁定
	if(($scrollTop + 20) >= $elemTop){
		$('.catelog-ctn').css({
			"position": "fixed",
			"top": "20px"
		});
	}
	//解除锁定
	if(($scrollTop + 20) <= 225){
		$('.catelog-ctn').css({
			"position": "absolute",
			"top": "225px"
		});
	}
	//当标题接触浏览器顶端时标红对应条目
	//用索引值寻找对应元素
	//找到最接近顶端的同级元素
	//标红元素路径
	var $flagElem = void 0;
	var $ansElem = void 0;
	$wayList.length = 0;
	//记录最接近的元素
	$hCtn.forEach(function(item,idx){
		var $headElemTop = $(item).offset().top;
		if(($scrollTop + 10) >= $headElemTop){
		$flagElem = item;
		$ansElem = idx;
		}
		if(item.nodeName != $minH)$liCtn[idx].addClass('unset');
	});
	//寻找路径
	//确定更高级元素的最接近位置
	if($flagElem != null && $ansElem != null) {
		findListWay($hCtn,$flagElem,$ansElem);
	}
	//console.log($wayList);
	$('.catalogitem').removeClass('active');
	//标红路径
	for(var i = 0 ; i < $wayList.length ; i++){
		$wayList[i].addClass('active');
		//寻找展开队列,即路径下的所有元素的下一级
		var $idx = $('.catalogitem').index($wayList[i]);
		findSetWay($idx,$hCtn,$liCtn);
	}
});
//寻找的序列，最接近的元素，该元素索引值
function findListWay($hCtn,$flagElem,$ansElem){
	//加入自身
	$wayList.push($liCtn[$ansElem]);
	for(var i = $ansElem ; i > -1 ; i--){
		if($hCtn[i].nodeName < $flagElem.nodeName){
			findListWay($hCtn,$hCtn[i],i);
			return;
		}
	}
	return;
}
//寻找展开队列,即路径下的所有元素的下一级
function findSetWay(num,$hCtn,$liCtn){
	var $checkNum = $hCtn[num].nodeName.slice(1,2);
	//展开
	$liCtn[num].removeClass('unset');
	//按照规则，只有在未遇到H2判断时能遇到H1 H3且并非H1 H2 H3的情况，则迭代最接近层级
	var $lessHnum = 0;
	if($hCtn[num+1]!=null)$lessHnum = $hCtn[num+1].nodeName.slice(1,2);
	for(var i = num + 1 ; i < $hCtn.length ; i++){
		if($hCtn[i] == null) break;
		var $Hnum = $hCtn[i].nodeName.slice(1,2);
		if($lessHnum > $Hnum)$lessHnum = $Hnum;
		console.log($lessHnum);
		//只有在等于最接近层级的时候 默认为下属第一层
		if($Hnum > $checkNum && $lessHnum == $Hnum){
			$liCtn[i].removeClass('unset');
		}
	}
}