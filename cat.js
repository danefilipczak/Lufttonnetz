// warm little pond 
// fishing line 
// dead girl 
// endosymbiont 
// waltz 
// warsarreau 
// bachus 
// toxic bloom 
// toxic bloom II: blooming
// eurlogy for the great barrier reef
// tonnetz walk 
// twisted children 
// frog song 
// girl song 
// mosealaeum 


// an extremely sprawling + genrequeer collection of many moods, instrumentations, spanning ~3 years. mostly new, some old things that weren't released. There's probably something in here that appeals to you but you might have to dig for it. this is my 'see-ya' to producing music, at least for a while, while I'm focusing on other things. <3 Dane 


var arrivedThresh = 0.001;



function Cat(){
	//this.scene = scene;
	this.pos = new THREE.Vector3(5, -20, 15 );
	this.vel = new THREE.Vector3( 0, 0, 0 );
	this.acc = new THREE.Vector3();
	//this.target = new THREE.Vector3();
	this.target = anchors[0];
	this.maxSpeed = 0.07;
	this.maxForce = 0.1;
	this.arrivalThresh = 2;
	this.heading = new THREE.Vector3() //where I'm looking atm 
	this.easing = 0.025;
	//his.easing = 0.25;
	this.overeasing = 0.1;
	this.arrived = false;
	this.go = true;



	this.mat = new THREE.MeshPhongMaterial( {color: 'none'} );
	//this.geom = new THREE.ConeGeometry( 0.1, 1, 32 );
	this.geom = new THREE.BoxGeometry( 0.3, 0.3, 2 );
	this.mesh = new THREE.Mesh( this.geom, this.mat );
	scene.add( this.mesh )
	group.add( this.mesh )
	this.mesh.visible = false;
	//this.pos.set(100, 100, 100)


	//this.mesh.lookAt( anchors[40].point )
  
}

Cat.prototype.behaviors = function(){
	// var seek = this.seek(this.target);
	// this.applyForce(seek);
	if(!override){

		var arrive = this.arrive(this.target.anchor);
		this.applyForce(arrive);
	
		//this.desiredLookAt = this.target.point;
		var difference = new THREE.Vector3();
		difference.subVectors(this.target.point, this.heading)
		difference.multiplyScalar(this.easing)
		this.heading.add(difference);
		this.mesh.lookAt(this.heading);
	} else {
		this.desiredLookAt = this.target.point;
		var difference = new THREE.Vector3();
		difference.subVectors(this.target.point, this.heading)
		difference.multiplyScalar(this.overeasing)
		this.heading.add(difference);
		this.mesh.lookAt(this.heading);
	}

	 // float dx = targetX - x;
 	//  x += dx * easing;
}

Cat.prototype.applyForce = function(f){
	this.acc.add(f);
}


Cat.prototype.arrive = function(target){
	var desired = new THREE.Vector3();
	desired.subVectors( target, this.pos )
	
	var d = desired.length();

	var speed = this.maxSpeed;
	if(d<this.arrivalThresh){
		//speed = map(d, 0, 2, 0, this.maxSpeed);
		speed = convertRange( d, [0, this.arrivalThresh], [0, this.maxSpeed]);
	}

	//console.log(d);
	if(d<arrivedThresh&&this.go){
		nextTarget();
	}

	desired.setLength( speed );
	//console.log(desired);

	var steer = new THREE.Vector3();
	steer.subVectors(desired, this.vel);
	steer.clampLength(0, this.maxForce);
	//console.log(steer);
	return steer;
}

Cat.prototype.seek = function(target){
	var desired = new THREE.Vector3();
	desired.subVectors( target, this.pos )
	//console.log(desired);
	desired.setLength( this.maxSpeed );
	//console.log(desired);

	var steer = new THREE.Vector3();
	steer.subVectors(desired, this.vel);
	steer.clampLength(0, this.maxForce);
	console.log(steer);
	return steer;
}


Cat.prototype.findClosest = function(){
	var closest;
	var bestD = 100;
	for(var i = 0;i<anchors.length;i++){
		var dist = this.pos.distanceTo(anchors[i].anchor);
		if(dist<bestD){
			bestD = dist;
			closest = anchors[i];
		} 
	}


	return closest;
}

Cat.prototype.proximity = function(){
	var closest;
	var bestD = 100;
	for(var i = 0;i<anchors.length;i++){
		var dist = this.pos.distanceTo(anchors[i].anchor);
		if(dist<bestD){
			bestD = dist;
			closest = anchors[i];
		} 
	}


	return closest;
}

Cat.prototype.update = function(){
	this.pos.add(this.vel);

	this.vel.add(this.acc);

	this.mesh.position.set( this.pos.x, this.pos.y, this.pos.z );

	this.acc.set( 0, 0, 0 )

}

Cat.prototype.orient = function( ob ){ //tail is a vector on a face, tip is out along the normal

	this.mesh.position.set( ob.anchor.x, ob.anchor.y, ob.anchor.z )
	this.mesh.lookAt( ob.point )

}


function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
