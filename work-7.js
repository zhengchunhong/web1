var box = document.getElementById("box");
var oNavlist = document.getElementById("nav").children;
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var index = 1;
var timer;
var isMoving = false;
var rollSpeed = 1
function Scroll(container, object) {
	if (document.getElementById(container) != null) {
		var contObj = document.getElementById(container);
		var obj = document.getElementById(object);
		contObj.style.visibility = "visible";
		contObj.rollSpeed = rollSpeed;
		widthContainer = contObj.offsetWidth;
		obj.style.left = parseInt(widthContainer) + "px";
		widthObject = obj.offsetWidth;
		interval = setInterval("aScroll('" + container + "','" + object
			+ "'," + widthContainer + ")", 20);
	}
}

function aScroll(container, object, widthContainer) {
	var contObj = document.getElementById(container);
	var obj = document.getElementById(object);
	widthObject = obj.offsetWidth;
	if (parseInt(obj.style.left) > (widthObject * (-1))) {
		obj.style.left = parseInt(obj.style.left) - contObj.rollSpeed + "px";
	} else {
		obj.style.left = parseInt(widthContainer) + "px";
	}
}
box.onmouseover = function(){
	animate(left,{opacity:50})
	animate(right,{opacity:50})
	clearInterval(timer);
}
box.onmouseout = function(){
	animate(left,{opacity:0})
	animate(right,{opacity:0})
	timer = setInterval(next, 3000);
}
right.onclick = next;
left.onclick = prev;
for(var i=0; i<oNavlist.length; i++){
	oNavlist[i].index = i;
	oNavlist[i].onclick = function(){
		index = this.index+1;
		navMove();
		animate(slider,{left:-1200*index});
	}
}
function next(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index++;
	navMove();
	animate(slider,{left:-1200*index},function(){
		if(index==6){
			slider.style.left = '-1200px';
			index = 1;
		}
		isMoving = false;
	});
}
function prev(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index--;
	navMove();
	animate(slider,{left:-1200*index},function(){
		if(index==0){
			slider.style.left = '-6000px';
			index = 5;
		}
		isMoving = false;
	});
}
function navMove(){
	for( var i=0; i<oNavlist.length; i++ ){
		oNavlist[i].className = "";
	}
	if(index >5 ){
		oNavlist[0].className = "active";
	}else if(index<=0){
		oNavlist[4].className = "active";
	}else {
		oNavlist[index-1].className = "active";
	}
}
timer = setInterval(next, 3000);
