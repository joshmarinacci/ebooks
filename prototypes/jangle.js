

function Jangle() {
    this.vars = {novar:0};
    this.startX = 0;
    this.startValue = 0;
    var self = this;
    this.drawfun = null;
    this.code = null;
    this.down = false;
    this.ai = -1;
    this.clear = function(ctx) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0,0,300,100);
    }

    this.invokeFunction = function() {
        var ctx = self.canvas.getContext('2d');
        self.clear(ctx);
        var values = [ctx];
        for(var id in self.vars) {
            values.push(self.vars[id]);
        }
        self.drawfun.apply(this,values);
    }
    this.setup = function() {
        self.invokeFunction();
        //console.log("arg length = " + self.drawfun.length);
        //console.log('constructor = ' + self.drawfun.name);
        var src = self.drawfun.toString().split("\n");
        var val = "";
        for(var i=0; i<src.length; i++) {
            if(i==0) continue;
            if(i == src.length-1) continue;
            val += src[i];
            val += "\n";
        }
        
        for(var id in self.vars) {
            val = val.replace(new RegExp(id),"<b id='"+id+"'>"+self.vars[id]+"</b>");
        }
        self.code.innerHTML = val;
        $("#popup").hide();
        
        for(var id in self.vars) {
            var varx = document.getElementById(""+id);
            varx.addEventListener('mousedown',function(e){
                var id = $(this).attr("id");
                //console.log("mousedown on " + id );
                e.preventDefault();
                self.startX = e.clientX;
                self.startValue = self.vars[id];
                self.down = true;
                self.addListeners();
                self.activeID = id;
                $("#popup").show();
                $("#popup").css("top",(e.clientY-80)+"px");
                $("#popup").css("left",(e.clientX-30)+"px");
                //console.log("set startx to : " + self.startX + " " + self.startValue  + " for var " + id);
            },true);
            varx.addEventListener('touchstart', function(e) {
                var id = $(this).attr("id");
                e.preventDefault();
                var touch = e.touches[0];
                var x = touch.pageX;
                var y = touch.pageY;
                self.startX = x;
                self.startValue = self.vars[id];
                self.down = true;
                self.addListeners();
                self.activeID = id;
                $("#popup").show();
                $("#popup").css("top",(y-80)+"px");
                $("#popup").css("left",(x-30)+"px");
                $("#popup").text(""+self.startValue);
            });
        }
    };
    
    this.doc_mouse_move = function(e){
        if(self.down) {
            e.preventDefault();
            if(e.which == 1) {
                var newvalue = (e.clientX-self.startX) + self.startValue;
                self.vars[self.activeID] = newvalue;
                var elem = document.getElementById(self.activeID);
                elem.innerHTML = newvalue;
                self.invokeFunction();
                $("#popup").css("left",(e.clientX-30)+"px");
                $("#popup").text(""+newvalue);
            }
        }
    }; 
    this.doc_touch_move = function(e){
        var touch = e.touches[0];
        var x = touch.pageX;
        $("#popup").text("touchmove "+ x);
        if(self.down) {
            e.preventDefault();
            var newvalue = (x-self.startX) + self.startValue;
            self.vars[self.activeID] = newvalue;
            var elem = document.getElementById(self.activeID);
            elem.innerHTML = newvalue;
            self.invokeFunction();
            $("#popup").css("left",(x-30)+"px");
            $("#popup").text(""+newvalue);
        }
    }; 
    
    this.doc_mouse_up = function(e){
        if(self.down) {
            e.preventDefault();
            self.down = false;
            self.removeListeners();
            $("#popup").hide();
        }
    };
    this.doc_touch_end = function(e) {
        var touch = e.changedTouches[0];
        e.preventDefault();
        self.down = false;
        self.removeListeners();
        $("#popup").hide();
        var x = touch.pageX;
    }
    
    this.addListeners = function() {
        document.addEventListener('mousemove',self.doc_mouse_move);
        document.addEventListener('touchmove',self.doc_touch_move);
        document.addEventListener('touchend',self.doc_touch_end);
        document.addEventListener('mouseup',self.doc_mouse_up);
    }
    
    this.removeListeners = function() {
        document.removeEventListener('mousemove',self.doc_mouse_move);
        document.addEventListener('touchmove',self.doc_touch_move);
        document.addEventListener('touchend',self.doc_touch_end);
        document.removeEventListener('mouseup',self.doc_mouse_up);
    }
    
}

