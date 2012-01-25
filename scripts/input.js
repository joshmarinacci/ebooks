function addDragListener(target,func) {
	var md = false;
	canvas.addEventListener("mousedown",function(e){
		md = true;
	});
	canvas.addEventListener("mouseup",function(e){
		md = false;
	});
	canvas.addEventListener("mousemove", function(e) {
		if(md) {
			func({x:e.offsetX});
			//dx = -e.offsetX/7;
		}
	});
	canvas.addEventListener('touchmove', function(event) {
	    event.preventDefault();
	    var touch = event.touches[0];
	    func({x:touch.pageX});
	    //dx = -touch.pageX/7.0;
	});
}

