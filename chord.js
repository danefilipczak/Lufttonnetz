function Chord(a, b, c, type){
	this.tri = {a, b, c};
	//this.sign = sign;
	this.r;
	this.l;
	this.abs; 
	this.here = false;

	this.highlight = false;

	this.center = this.getCenter();

}

Chord.prototype.getCenter = function(){
	var avgX = this.tri.a.x + this.tri.b.x + this.tri.c.x;
	avgX = avgX/3;
	var avgY = this.tri.a.y + this.tri.b.y + this.tri.c.y;
	avgY = avgY/3;
	return {x: avgX, y: avgY}
}

Chord.prototype.display = function(){
	if(this.here){
		p.fill(255);
		p.noStroke();
		p.stroke(255)
		p.triangle(this.tri.a.x, this.tri.a.y, this.tri.b.x, this.tri.b.y, this.tri.c.x, this.tri.c.y);
		p.noStroke();
	} else if (this.highlight){
		p.fill(255, 50);
		p.stroke(100)
		p.triangle(this.tri.a.x, this.tri.a.y, this.tri.b.x, this.tri.b.y, this.tri.c.x, this.tri.c.y);
		p.noStroke();
	} else if(over==this){
		//p.fill(255, 255, 0, 150);
		p.noFill();
		p.stroke(255);
		p.triangle(this.tri.a.x, this.tri.a.y, this.tri.b.x, this.tri.b.y, this.tri.c.x, this.tri.c.y);
		//over=null;
		p.noStroke();
	} else {
		p.fill(255, 100) 
	} 
	// p.fill(10)
	// p.ellipse(this.center.x, this.center.y, 10, 10);
	this.highlight=false;
	
}

Chord.prototype.collide = function(){
	var hit = p.collidePointTriangle(p.mouseX,p.mouseY,this.tri.a.x, this.tri.a.y, this.tri.b.x, this.tri.b.y, this.tri.c.x, this.tri.c.y);
	return hit;
}

// Chord.prototype.highlightP = function(){
// 	var p = this.getP();
// 	p.highlight=true;
// }

// Chord.prototype.getP=function(){
// 	var sign = this.abs.slice(this.abs.length-1, this.abs.length);
// 	var index = this.getIndex();
// 	if(sign == "+"){
// 		var p = index+26;
// 		if(p>chords.length-1){p-=25};//to wrap around the edges;
// 	} else if (sign == '-'){
// 		var p = index-26;
// 		if(p<0){p+=25};
// 	}


// 	return chords[p];
// }

Chord.prototype.getClosestP = function(){
	var ps = this.getAllPs();
	var closest;
	var shortestDist = 1000;
	//console.log(ps)
	for(var i = 0; i <ps.length;i++){
		//console.log(getDist(this.center, ps[i].center));
		var dist = getDist(this.center, ps[i].center);
		if(dist<shortestDist){
			closest = ps[i];
			shortestDist = dist;
		}
	}
	// ps.forEach(function(chord){
	// 	if(getDist(this.center, chord.center)<dist){
	// 		dist = getDist(this.center, chord.center);
	// 		closest = chord;
	// 	}
	// })
	//closest.highlight = true;
	return closest;

}


Chord.prototype.getClosestR = function(){
	var rs = this.getAllRs();
	var closest;
	var shortestDist = 1000;
	//console.log(ps)
	for(var i = 0; i <rs.length;i++){
		//console.log(getDist(this.center, ps[i].center));
		var dist = getDist(this.center, rs[i].center);
		if(dist<shortestDist){
			closest = rs[i];
			shortestDist = dist;
		}
	}
	// ps.forEach(function(chord){
	// 	if(getDist(this.center, chord.center)<dist){
	// 		dist = getDist(this.center, chord.center);
	// 		closest = chord;
	// 	}
	// })
	//closest.highlight = true;
	return closest;

}


Chord.prototype.getClosestL = function(){
	var ls = this.getAllLs();
	var closest;
	var shortestDist = 1000;
	//console.log(ps)
	for(var i = 0; i <ls.length;i++){
		//console.log(getDist(this.center, ps[i].center));
		var dist = getDist(this.center, ls[i].center);
		if(dist<shortestDist){
			closest = ls[i];
			shortestDist = dist;
		}
	}
	// ps.forEach(function(chord){
	// 	if(getDist(this.center, chord.center)<dist){
	// 		dist = getDist(this.center, chord.center);
	// 		closest = chord;
	// 	}
	// })
	//closest.highlight = true;
	return closest;

}

getDist = function(c1_, c2_){
	var c1 = c1_;
	var c2 = c2_;
	//console.log(c1.x, c2)
	var dx = Math.abs(c1.x - c2.x);
	var dy = Math.abs(c1.y - c2.y);
	return dx+dy;
}

Chord.prototype.getAllPs = function(){
	var sign = this.abs.slice(this.abs.length-1, this.abs.length);
	var numString = this.abs.slice(0, this.abs.length-1);
	var num = Number(numString);
	//num = num+(8*i);
	//num = num%12;
	if(sign == "+"){
		sign = "-"
	} else if (sign == "-"){
		sign = "+"
	};
	num = num.toString();
	num+=sign;

	var ps = [];
	chords.forEach(function(chord){
		if(chord.abs == num && chord!==this){
			ps.push(chord);
		}
	})
	return ps;

}


Chord.prototype.getAllRs = function(){
	var sign = this.abs.slice(this.abs.length-1, this.abs.length);
	var numString = this.abs.slice(0, this.abs.length-1);
	var num = Number(numString);
	
	
	if(sign == "+"){
		sign = "-"
		num+=9;
	} else if (sign == "-"){
		sign = "+"
		num+=3;
	};
	num = num%12;
	num = num.toString();
	num+=sign;

	var ps = [];
	chords.forEach(function(chord){
		if(chord.abs == num && chord!==this){
			ps.push(chord);
		}
	})
	return ps;

}

Chord.prototype.getAllLs = function(){
	var sign = this.abs.slice(this.abs.length-1, this.abs.length);
	var numString = this.abs.slice(0, this.abs.length-1);
	var num = Number(numString);
	
	
	if(sign == "+"){
		sign = "-"
		num+=4;
	} else if (sign == "-"){
		sign = "+"
		num+=8;
	};
	num = num%12;
	num = num.toString();
	num+=sign;

	var ps = [];
	chords.forEach(function(chord){
		if(chord.abs == num && chord!==this){
			ps.push(chord);
		}
	})
	return ps;

}

Chord.prototype.getClosestMatchingAnchor = function(){
	var matches = [];
	// anchors.forEach(function(ank){ //why doesn't this work? is this bound differently? 
	// 	if(ank.abs == this.abs){
	// 		console.log(this.abs)
	// 		matches.push(ank)
	// 	}
	// });
	for (var i=0;i<anchors.length;i++){
		if(anchors[i].abs == this.abs){
			matches.push(anchors[i]);
		}
	}
	//console.log(matches);
	var shortestDist = 1000;
	var closest;
	for(var i=0;i<matches.length;i++){
		var dist = cat.pos.distanceTo(matches[i].anchor);
		if(dist<shortestDist){
			shortestDist = dist;
			closest = matches[i];
		}
	}
	//console.log(getAnchorIndex(closest));
	return(getAnchorIndex(closest));

}

function getAnchorIndex(ank){
	var index;
	for (var i=0;i<anchors.length;i++){
		if(anchors[i].anchor.equals(ank.anchor)){
			index = i;
		}
	}
	return index;
}

Chord.prototype.getIndex = function(){
	for(var i=0;i<chords.length;i++){
		if(chords[i]==this){
			var index = i;
		}
	}
	return index;
}

function highlight(c){
	chords[c].highlight = true;
}