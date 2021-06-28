var lastRotation = 0;
var mouseDownRotation = 0;

var scaleFactor = 1;

function startRotating(x,y){
	var c = document.getElementById('fifthsoverlay');
	var rect = c.getBoundingClientRect();
	var ctx = c.getContext('2d');
	
	var lastClickDownX = x - rect.left;
	var lastClickDownY = y - rect.top;
	
	mouseDownRotation = getPointAngle(lastClickDownX,lastClickDownY);
	
}

function stopRotating(x,y){
	var c = document.getElementById('fifthsoverlay');
	var rect = c.getBoundingClientRect();
	
	lastRotation = lastRotation + ( getPointAngle(x-rect.left,y-rect.top)-mouseDownRotation );
}

function stopRotatingReset(){
	var c = document.getElementById('fifthsoverlay');
	var rect = c.getBoundingClientRect();
	var ctx = c.getContext('2d');
	
	ctx.clear(true);
	
	ctx.setTransform(scaleFactor,0,0,scaleFactor,0,0);
	
	drawImg();
	
	ctx.translate(c.width/scaleFactor/2,c.height/scaleFactor/2);
	ctx.rotate(lastRotation);
	ctx.translate(-c.width/scaleFactor/2,-c.height/scaleFactor/2);
	
	drawOverlay();
}

function rotateImage(x,y){
	var c = document.getElementById('fifthsoverlay');
	var rect = c.getBoundingClientRect();
	var ctx = c.getContext('2d');
	
	var currentRotation = lastRotation + ( getPointAngle(x-rect.left,y-rect.top)-mouseDownRotation );
	
	ctx.clear(true);
	
	ctx.setTransform(scaleFactor,0,0,scaleFactor,0,0);
	
	drawImg();
	
	ctx.translate(c.width/scaleFactor/2,c.height/scaleFactor/2);
	ctx.rotate(currentRotation);
	ctx.translate(-c.width/scaleFactor/2,-c.height/scaleFactor/2);
	
	drawOverlay();
}

function drawImg(){
	var c = document.getElementById('fifthsoverlay');
	var ctx = c.getContext('2d');
	
	var img = document.getElementById('fifthsimg');
	ctx.drawImage(img,0,0);
}

function drawOverlay(){
	var c = document.getElementById('fifthsoverlay');
	var ctx = c.getContext('2d');
	
	var img = document.getElementById('overlayimg');
	ctx.drawImage(img,0,0);
}

window.onload = function(){
	var c = document.getElementById('fifthsoverlay');
	var ctx = c.getContext('2d');
	var img1 = document.getElementById('fifthsimg');
	
	var win = document.documentElement;
	
	var maxSize = win.clientHeight;
	if(win.clientWidth<maxSize){
		maxSize = win.clientWidth;
	}
	
	c.height = maxSize;
	c.width = maxSize;
	
	scaleFactor = maxSize/img1.width;
	
	ctx.setTransform(scaleFactor,0,0,scaleFactor,0,0);
	
	drawImg();
	drawOverlay();
}


//Utils

CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};

function getPointAngle(x,y){
	var c = document.getElementById('fifthsoverlay');
	
	if(x==0 && y==0) return 0;
	else return Math.atan2(y-c.height/2,x-c.width/2);
}


//Handlers

var mouseDown=false;

function handleMouseDown(e){
	startRotating(e.clientX,e.clientY);
	mouseDown=true;
}

function handleMouseMove(e){
	if(mouseDown){
		rotateImage(e.clientX,e.clientY);
	}
}

function handleMouseUp(e){
	if(mouseDown){
		stopRotating(e.clientX,e.clientY);
	}
	mouseDown=false;
}

function handleMouseOut(e){
	if(mouseDown){
		stopRotatingReset();
	}
	mouseDown=false;
}

function handleTouchStart(e){
	var touchobj = e.changedTouches[0];
	var x = parseInt(touchobj.clientX);
	var y = parseInt(touchobj.clientY);
	startRotating(x,y);
	
	e.preventDefault();
}

function handleTouchMove(e){
	var touchobj = e.changedTouches[0];
	var x = parseInt(touchobj.clientX);
	var y = parseInt(touchobj.clientY);
	rotateImage(x,y);
	
	e.preventDefault();
}

function handleTouchEnd(e){
	var touchobj = e.changedTouches[0];
	var x = parseInt(touchobj.clientX);
	var y = parseInt(touchobj.clientY);
	stopRotating(x,y);
	e.preventDefault();
}

function handleTouchCancel(e){
	stopRotatingReset();
	e.preventDefault();
}