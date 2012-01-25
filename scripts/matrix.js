//represents a mathematical matrix. takes a 2d array as input
function Matrix(ary) {
    this.mtx = ary;
    this.height = ary.length;
    this.width = ary[0].length;
}

//print the matrix to a string
Matrix.prototype.toString = function() {
    var s = [];
    for(var i=0; i<this.mtx.length; i++) {
        s.push(this.mtx[i].join(","));
    }
    return s.join("\n");
}


Matrix.prototype.transpose = function() {
    var transposed = [];
    for(var i=0; i< this.width; i++) {
        transposed[i] = [];
        for (var j=0; j<this.height; j++) {
            transposed[i][j] = this.mtx[j][i];
        }
    }
    return new Matrix(transposed);
}

Matrix.prototype.mult = function(other) {
    if(this.width != other.height) {
        throw "error: incompatible sizes";
    }
    
    var result = [];
    for(var i=0; i<this.height; i++) {
        result[i] = [];
        for(var j=0; j<other.width; j++) {
            var sum = 0;
            for(var k=0; k<this.width; k++) {
                sum += this.mtx[i][k] * other.mtx[k][j];
            }
            result[i][j] = sum;
        }
    }
    return new Matrix(result);
}


function Translate(x,y,z) {
    return new Matrix([
        [1,0,0,x],
        [0,1,0,y],
        [0,0,1,z],
        [0,0,0,1]
    ]);
}

function Rotation(th) {
    /*
    //z axis
    return new Matrix([
            [Math.cos(th),-Math.sin(th),0,1],
            [Math.sin(th),Math.cos(th),0,1],
            [0,0,1,1],
            [0,0,0,1]
    ]);
    */
    
    //y axis
    return new Matrix([
            [ Math.cos(th), 0, Math.sin(th), 0],
            [            0, 1,            0, 0],
            [-Math.sin(th), 0, Math.cos(th), 0],
            [            0, 0,            0, 1]
    ]);
}


function Group() {
    this.points = [];    
    this.rot = new Rotation(0);
    this.pivot = new Translate(0,0,200);
}

Group.prototype.draw = function(ctx) {
    for(var i=0; i<this.points.length; i++) {
        var pt3 = this.points[i];
        ctx.fillStyle = pt3.color;
        ctx.globalAlpha = pt3.opacity;
        if(!pt3.disableRot) {
            pt3 = new Translate(0,0,-this.pivot.mtx[2][3]).mult(pt3);
            pt3 = this.rot.mult(pt3);
            pt3 = new Translate(0,0,this.pivot.mtx[2][3]).mult(pt3);
        }
        drawPoint(ctx,pt3);
    }
}

Group.prototype.add = function ( pt) {
    this.points.push(pt);
}


function Point(x,y,z) {
    return new Matrix([[x],[y],[z],[1]]);
}

Matrix.prototype.color = "white";
Matrix.prototype.opacity = 1.0;


function drawPoint(ctx,pt) {
    pt = scene.persp.mult(pt);
    pt = viewTranslate.mult(pt);
    var x = pt.mtx[0][0];
    var y = pt.mtx[1][0];
    var z = pt.mtx[2][0];
    var w = pt.mtx[3][0];
    if(w<0.5) return;
    var size = 10.0/w;
    ctx.beginPath();
    ctx.arc(x/w,y/w,size,0,Math.PI*2,true);
    //ctx.fillRect(x/w-size,y/w-size,size*2,size*2);
    ctx.closePath();
    ctx.fill();
}


var d = 200;
var persp = new Matrix([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,0,0],
        [0,0,1.0/d,1]]);

var scene = {
	d: d,
	persp: persp,
};

console.log("scene.persp = " + scene.persp);
