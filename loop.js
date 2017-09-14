var override = false;

function loop(){
	
	//cube.rotation.x += 0.1;
	// // cube.rotation.y += 0.1;
	// line.rotation.z+= 0.001;
	// line.rotation.y+=0.001;

	// torus.rotation.z+= 0.001;
	// torus.rotation.y+=0.001;
	// group.rotation.z+= 0.001;
	
	// group.rotation.y+=0.001;
	override = false;
	if(keyboard.pressed('up')){
		override = true;
		cat.target = cat.proximity();
		//console.log('upppp');
		//cat.pos.addVectors(cat.pos, new THREE.Vector3(0, 0.05, 0));
		//cat.pos.y+=0.05;
		cat.mesh.translateY(0.01)
		cat.pos.set(cat.mesh.position.x, cat.mesh.position.y, cat.mesh.position.z)
		// var vec = new THREE.Vector3();
		// vec.copy(cat.target.anchor);
		// vec.normalize();
		// cat.pos.projectOnPlane(vec);
		//cat.target = cat.proximity();
	} 
	if (keyboard.pressed('down')){

		override = true;
		cat.target = cat.proximity();
		//console.log('upppp');
		//cat.pos.addVectors(cat.pos, new THREE.Vector3(0, 0.05, 0));
		//cat.pos.y+=0.05;
		cat.mesh.translateY(-0.01)
		cat.pos.set(cat.mesh.position.x, cat.mesh.position.y, cat.mesh.position.z)

	} 
	if (keyboard.pressed('left')){
			override = true;
		cat.target = cat.proximity();
		//console.log('upppp');
		//cat.pos.addVectors(cat.pos, new THREE.Vector3(0, 0.05, 0));
		//cat.pos.y+=0.05;
		cat.mesh.translateX(-0.01)
		cat.pos.set(cat.mesh.position.x, cat.mesh.position.y, cat.mesh.position.z)


	} 
	if (keyboard.pressed('right')){
				override = true;
		cat.target = cat.proximity();
		//console.log('upppp');
		//cat.pos.addVectors(cat.pos, new THREE.Vector3(0, 0.05, 0));
		//cat.pos.y+=0.05;
		cat.mesh.translateX(0.01)
		cat.pos.set(cat.mesh.position.x, cat.mesh.position.y, cat.mesh.position.z)


	}

	if(!keyboard.pressed('down')&&!keyboard.pressed('up')&&!keyboard.pressed('left')&&!keyboard.pressed('right')){
		//
		
		
	}
	//cat.target = cat.findClosest();
	cat.behaviors();	
	cat.update();
}










//Felt I should clarify because it made me uneasy and reflective using it, and the phrase can mean a lot of things: when I say I love you I don't mean it in a possesive, restrictive way like I want to own you or make you be my boyfriend; what I mean is that I feel tons of joy in sympathy with your success and identify with you, and want your life to be content and fluid as much as I want my own to be. I'm rooting for you and hope you continue to change in a thousand ways that neither of us can anticipate! I think I did 'love' you in the basic, possesive, teenagery way at one point but now what remains of the nicotine-ish feeling is an appriciation of how beautiful you are (which I'm not ashamed of at all!) I hope I know you the rest of my life because of how much you've enriched it so far. It's really weird being queer and navigating relationships with boys, so to combat the inherent oddity I feel I should be as clear as I can. Sometimes I feel like being queer is really shitty because it limits the ways in which I can interact with boys and restricts the subtleties of the feelings I'm free to express because of the social expectation of monogomous relationships that we're supposed to fit into. I love you to the cambrian and back and I don't want anything from you other than to see your laps round the sun be as interesting and worthwhile as possible, and let me know if I can help that in any way. I hope that makes sense cause words are really inadequate for these ideas. It's probably melodramatic because we see each other basically never, and I'm really sorry for that but that's just how the trajectories are curving at this point, but I'm very proud of you and appreciate you so much independently of the teenagery stuff and want you to know that!     




