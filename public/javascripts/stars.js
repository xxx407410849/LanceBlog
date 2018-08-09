var Star = function() {
	var me = this;
	var config = {
		num: 200,
		tnum: 0
	};
	var width;
	var height;
	var canvas;
	var stars = [];
	var speed;
	var engine;
	var tick;
	var tick2;
	var x;
	var y;
	var R;
	var r;
	var rot;
	var tStar = [];
	var color = ["#B0C4DE", "#7FFF00", "#FF4500", "#20B2AA", "#EE82EE", "#6495ED"];
	var SetOption = function() {
		canvas = document.getElementsByTagName('canvas')[0];
		engine = canvas.getContext('2d');
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
	}
	var Resize = function(){
		
	}
	var DrawStar = function() {
		for(var j = 0; j < stars.length; j++) {
			engine.beginPath();
			for(var i = 0; i < 5; i++) {
				engine.lineTo(Math.cos((18 + i * 72 - stars[j].rot) / 180 * Math.PI) * stars[j].R + stars[j].x, -Math.sin((18 + i * 72 - stars[j].rot) / 180 * Math.PI) * stars[j].R + stars[j].y);
				engine.lineTo(Math.cos((54 + i * 72 - stars[j].rot) / 180 * Math.PI) * stars[j].r + stars[j].x, -Math.sin((54 + i * 72 - stars[j].rot) / 180 * Math.PI) * stars[j].r + stars[j].y);
			}
			engine.closePath();
			engine.lineWidth = 3;
			engine.fillStyle = "#fb5";
			engine.strokeStyle = "#fb5";
			engine.lineJoin = "round";
			engine.globalAlpha = stars[j].o;
			engine.fill();
			engine.stroke();
		}
	};
	var AddStar = function() {
		for(var i = 0; i < config.num; i++) {
			var aStar = {
				x: Math.random() * width + 20,
				y: Math.random() * height + 20,
				r: 5,
				o: Math.random() * 0.2 + 0.6,
				R: Math.random() * 5 + 8,
				rot: Math.random() * 360,
				speed: Math.random() * 3,
				ospeed: Math.random() * 0.1,
				flag: Math.random() * 6,
				//				check: 0,
				//				dspeed: 4,
				//				rspeed: 0.55,
				//				dospeed: 0.1,
				//				deg: Math.random() * 0.5 + 0.3,
				//				color: Math.random() * 5,
				//				dropflag: Math.random() * 2
			};
			stars.push(aStar);
		}
	};
	var renderStar = function() {
		for(var i = 0; i < config.num; i++) {
			var flag = stars[i].flag;
			if(stars[i].o <= 0.1) {
				stars[i].o = stars[i].o + stars[i].ospeed;
			} else if(stars[i].o > 0.1 && stars[i].o < 0.6) {
				if(flag >= 2) stars[i].o = stars[i].o + stars[i].ospeed;
				else stars[i].o = stars[i].o - stars[i].ospeed;
			} else if(stars[i].o >= 0.9) {
				stars[i].o = stars[i].o - stars[i].ospeed;
			} else if(stars[i].o >= 0.6 && stars[i].o < 0.9) {
				if(flag >= 2) stars[i].o = stars[i].o - stars[i].ospeed;
				else stars[i].o = stars[i].o + stars[i].ospeed;
			} else stars[i].o = stars[i].o - stars[i].ospeed;
			stars[i].rot = stars[i].rot + stars[i].speed;
			stars[i].flag = Math.random() * 6;
			stars[i].ospeed = Math.random() * 0.08;
		};
		engine.clearRect(0, 0, width, height);
		DrawStar();
	};
	var throwStar = function(num) {
		setTimeout(function() {
			tStar[num].rot = tStar[num].rot + 2;
			if(tStar[num].flag > 1) tStar[num].x = tStar[num].x - tStar[num].speed* Math.sin(Math.PI * tStar[num].deg);
			else tStar[num].x = tStar[num].x + tStar[num].speed
			tStar[num].y = tStar[num].y + tStar[num].speed;
			//tStar[num].R = tStar[num].R + tStar[num].rspeed;
			//tStar[num].o = tStar[num].o + tStar[num].ospeed;
			//if(tStar[num].o == 1) tStar[num].o = 0.1;
			if(tStar[num].R <= 14.5){
				tStar[num].R = tStar[num].R + tStar[num].rspeed;
				tStar[num].r = tStar[num].r + tStar[num].Rspeed;
			}
			DrawThrowStar(num);
			if(tStar[num].x <= 0 || tStar[num].y >= height  || tStar[num].x >= width )
				return;
			throwStar(num);
		}, 3);
	};
	//9帧清屏
	var initThrowStar = function() {
		for(var i = 0; i < config.tnum; i++) {
			AtStar = {
				x: Math.random() * (width * 0.6) + width * 0.2,
				y: Math.random() * 10 + 5,
				r: 5,
				o: 0.3,
				R: 5,
				rot: Math.random() * 360,
				speed: 2,
				ospeed: 0.1,
				rspeed: 0.05,
				Rspeed: 0.03,
				deg: Math.random() * 0.2 + 0.1,
				flag: Math.random() * 2,
				color: Math.random() * 5
			};
			tStar.push(AtStar);
		}
	};
	var DrawThrowStar = function(num) {
		engine.beginPath();
		for(var i = 0; i < 5; i++) {
			engine.lineTo(Math.cos((18 + i * 72 - tStar[num].rot) / 180 * Math.PI) * tStar[num].R + tStar[num].x, -Math.sin((18 + i * 72 - tStar[num].rot) / 180 * Math.PI) * tStar[num].R + tStar[num].y);
			engine.lineTo(Math.cos((54 + i * 72 - tStar[num].rot) / 180 * Math.PI) * tStar[num].r + tStar[num].x, -Math.sin((54 + i * 72 - tStar[num].rot) / 180 * Math.PI) * tStar[num].r + tStar[num].y);
		}
		engine.closePath();
		engine.lineWidth = 3;
		engine.fillStyle = color[Math.round(tStar[num].color)];
		engine.strokeStyle = color[Math.round(tStar[num].color)];
		engine.lineJoin = "round";
		engine.globalAlpha = tStar[num].o;
		engine.fill();
		engine.stroke();
	}
	this.run = function() {
		SetOption();
		AddStar();
		DrawStar();
		tick2 = setInterval(renderStar, 66);
		/*initThrowStar();
		tick2 = setInterval(renderStar, 150);
		var i = 0;
		var time = Math.round(Math.random()*1000 + 2000);
		tick = setInterval(function() {	
			throwStar(i);
			if(i <= tStar.length) i++;
			else {
				i = 0;
				initThrowStar();
			}
		}, time);*/
	}
	this.stop = function() {
		clearInterval(tick);
		clearInterval(tick2);
		engine.clearRect(0, 0, width, height);
		stars.splice(0,stars.length);
		tStar.splice(0,tStar.length);
	}
};
var run = new Star();
run.run();
$(window).resize(function(){
	run.stop();
	run.run();
});
