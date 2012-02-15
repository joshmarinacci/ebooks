function Dragger() {
	var self = this;
	this.target = null;
	this.engine = null;
	
	var down = false;
	var px = 0;
	var py = 0;
	this.tx = 0;
	this.ty = 0;
    this.onDrag = function(e){}
    var points = [];
	this.log = function(str) {
		console.log(str);
		var log = document.getElementById("log");
		log.innerHTML += (str+"<br/>");
	}
	
	this.start = function(x,y) {
		//self.log("start: " + x + " " + y);
		px = x;
		py = y;
		points = [];
	};
	
	this.drag = function(x,y) {
		var dx2 = x - px;
		var dy2 = y - py;
		self.tx += dx2;
		self.ty += dy2;
		px = x;
		py = y;
		self.onDrag({
			totalX:self.tx,
			totalY:self.ty,
			x:x,
			y:y
			});
		lastTime = new Date().getTime();
		points.push({
			x:x,
			y:y,
			time: new Date().getTime()
			});
	};
	
	this.end = function(x,y) {
		var currentTime = new Date().getTime();
		var t1 = points[points.length-1];
		var t2 = points[points.length-2];
		var diffTime = t1.time - t2.time;
		var dx = t1.x - t2.x;
		var dy = t1.y - t2.y;
		//self.log("diff time = " + diffTime + " " + dx + " " + dy);
		var vector = {x:dx,y:dy};
		if(this.engine) {
			engine.addAnim(new MomentumAnim(self,self.target,vector));
		} else {
			var mom = new MomentumAnim(self,self.target,vector);
			var callMom = function() {
				mom.update();
				if(!mom.dead) {
					console.log("calling timeout");
					requestAnimationFrame(callMom);
				}
			}
			callMom();
		}
		points = [];
	};
	
	this.register = function(engine,target,can) {
		self.engine = engine;
		self.target = target;
		if(engine) {
			engine.listen('MOUSE_PRESS',target,function(e) {
				down = true;
				self.start(e.x,e.y);
			});
			engine.listen('MOUSE_DRAG',target,function(e) {
				if(down) {
					self.drag(e.x,e.y);
				}
			});
			engine.listen('MOUSE_RELEASE',target,function(e) {
				down = false;
				self.end(e.x,e.y);
			});	
		} else {
			can.addEventListener('mousedown',function(e){
			    e.preventDefault();
			    self.start(e.clientX,e.clientY);
			 	down = true;
			});
			can.addEventListener('mousemove',function(e){
			    e.preventDefault();
			 	if(down) {
			 		self.drag(e.clientX,e.clientY);
				    //targetRotation = tx/60;
			 	}
			});
			can.addEventListener('mouseup',function(e){
			    event.preventDefault();
			 	down = false;
			 	self.end(e.clientX,e.clientY);
			});
		}
	
		can.addEventListener('touchstart', function(event) {
			event.preventDefault();
			var touch = event.touches[0];
			var x = touch.pageX;
			var y = touch.pageY;
			if(engine) {
			var node = engine.findNode(engine.root,x,y);
			if(node != target) return;
			}
			self.start(x,y);
		});
		can.addEventListener('touchmove', function(event) {
			event.preventDefault();
			var touch = event.touches[0];
			var x = touch.pageX;
			var y = touch.pageY;
			self.drag(x,y);
			lastTouch = touch;
		});
		can.addEventListener('touchend', function(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			self.end(touch.pageX,touch.pageY);
		});	
	};
}

function MomentumAnim(dragger,target,vector) {
	var self = this;
	this.target = target;
	this.vector = vector;
	this.dead = false;
	this.isStarted = function() { return true; }
	this.update = function(time) {
		//var x = self.target.getX()+vector.x;
		//var y = self.target.getY()+vector.y;
		dragger.tx += vector.x;
		dragger.ty += vector.y;
		//console.log("tx = " + dragger.tx + " " + dragger.ty);
		dragger.onDrag({
			totalX:dragger.tx,
			totalY:dragger.ty,
			x:self.x,
			y:self.y
			});
		
		//self.target.setX(self.target.getX()+vector.x);
		//self.target.setY(self.target.getY()+vector.y);
		vector.x *= 0.95;
		vector.y *= 0.95;
		if(Math.abs(vector.x) <1 && Math.abs(vector.y) < 1) {
			this.dead = true;
		}
	}
}

