

var path = [];
var adding = false;
var now;
var pad = true;

var abses = [];

function parseAbses(){
	for(var i =0;i<6;i++){
		pattern.forEach(function(abs){
			var sign = abs.slice(abs.length-1, abs.length);
			var numString = abs.slice(0, abs.length-1);
			var num = Number(numString);
			num = num+(8*i);
			num = num%12;
			num = num.toString();
			num+=sign;
			abses.push(num);
		})
	}
	//str = str.slice(0, -1);
}

var pattern = [
 "0+",
 "4-",
 "7+",
 "11-",
 "2+",
 "6-",
 "9+",
 "1-",
 "4+",
 "8-",
 "11+",
 "3-",
 "6+",
 "10-",
 "1+",
 "5-",
 "8+",
 "0-",
 "3+",
 "7-",
 "10+",
 "2-",
 "5+",
 "9-"

];

var active=[]//active chords are the current one and the target. these are the only ones that are rendered. 

// function fakeAbses(){
// 	abses = [];
// 	anchors.forEach(function(ank){
// 		abses.push("a#+")
// 	})
// }

var floader = new THREE.FontLoader();
var font;

function showAbs(arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i].abs){
			console.log(i);
		}
	}
}


window.onload = function(){
	parseAbses();

	makeObs();
	//fakeAbses();

	indexObs();
	//makeAllText();
	floader.load( 'assets/helvetiker_regular.typeface.json', function ( f ){
		font = f;
		focus(0);
	});

	cat = new Cat();		

	cat.mesh.add(camera);

	keyboard = new THREEx.KeyboardState();


	render();//start the render loop
		//var f = createCanvas(windowWidth/2, windowHeight/2);


}




function go(){
	stopPad(synth1);
	cat.go = true;
	if(path[0]){
		focus(path[0].getClosestMatchingAnchor());
		//focus(path[0].getIndex());
	}
	document.getElementById("traj").innerHTML = "";
	updateTriad();

	document.getElementById("path").innerHTML="";


	
}

function nextTarget(){ //the cat calls this when it gets close enough 
	
	if(path.length>1&&cat.go){
		path.splice(0, 1);
		focus(path[0].getClosestMatchingAnchor());
		//focus(path[0].getIndex());
	} else {
		cat.go = false;
		document.getElementById("traj").innerHTML = "Where to?"
	}
	console.log(path.length);

	updateTriad();
}


function focus(anchor){
	stopPad(synth1);
	//cat.arrived = false;
	cat.target = anchors[anchor];
	var text = makeText(anchors[anchor]);
	active.push(text);
	if(active.length>2){
		var old = active[0];
		active.splice(0, 1);
		scene.remove(old);
		delete old;
	}
	active[0].material.color.set("white");
	if(active[1]){active[1].material.color.set("black")};
	updateTriad();
	if(pad){startPad(synth1)};
}



function makeText(ob){
		var geometry = new THREE.TextGeometry( parseChordText(ob.abs), {
		font: font,
		size: 0.5,
		height: 0.1,
		curveSegments: 3,
		// bevelEnabled: true,
		// bevelThickness: 1,
		// bevelSize: 1,
		// bevelSegments: 5
		} );
		var mat = new THREE.MeshPhongMaterial( { color: "black", shading: THREE.FlatShading } );
		var mesh = new THREE.Mesh(geometry, mat);
		mesh.position.set(ob.anchor.x, ob.anchor.y, ob.anchor.z);

		mesh.lookAt(ob.point);
		mesh.translateX(-0.5);
		mesh.translateY(-0.5);
		//mesh.position.z+=1;
		scene.add(mesh);
		return mesh;
}


function parseChordText(abs){
	var sign = abs.slice(abs.length-1, abs.length);
	var numString = abs.slice(0, abs.length-1);
	var num = Number(numString);	
	var notes = ["C", "C#", "D", "D#", "E", "F", "F#","G", "G#", "A", "A#", "B"];
	var letter = notes[num];
	letter+=sign;
	return letter;
	// switch(numString){
	// 	case "0":
	// 		letter = "C";
	// 		break;
	// 	case "1":
	// 		letter = "C";
	// 		break;
	// 	case "2":
	// 		letter = "C";
	// 		break;
	// 	case "3":
	// 		letter = "C";
	// 		break;
	// 	case "4":
	// 		letter = "C";
	// 		break;
	// 	case "5":
	// 		letter = "C";
	// 		break;
	// 	case "6":
	// 		letter = "C";
	// 		break;
	// 	case "7":
	// 		letter = "C";
	// 		break;
	// 	case "8":
	// 		letter = "C";
	// 		break;
	// 	case "9":
	// 		letter = "C";
	// 		break;
	// 	case "10":
	// 		letter = "C";
	// 		break;
	// 	case "11":
	// 		letter = "C";
	// 		break;
	// }
}



var keyboard;
var cat;


var anchors = [];
var group = new THREE.Group();
var scene = new THREE.Scene();
var triangles = [];
scene.background = new THREE.Color( 'white' );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.TorusGeometry( 5, 2, 6, 12 );
var material = new THREE.MeshPhongMaterial( { color: 'white' } );
var torus = new THREE.Mesh( geometry, material );
scene.add( torus );
torus.material.transparent = true;
torus.material.opacity = 0.9;
var wireframe = new THREE.WireframeGeometry( geometry );

var ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambient );


var lineMaterial = new THREE.LineBasicMaterial( {
	color: 'black',
	linewidth: 0.001,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
} );
var line = new THREE.LineSegments( wireframe, lineMaterial );
//line.material.depthTest = false;
//line.material.opacity = 1;
//line.material.transparent = true;


scene.add( line );



var helper = new THREE.FaceNormalsHelper( torus, 1, 'black', 5 );
// scene.add( helper );
// group.add( helper )

// var normals = new THREE.Geometry();
// normals.fromBufferGeometry(helper.geometry);



camera.position.z = 0.2;
//camera.rotation.z=90;
camera.rotation.x=88.5;
camera.position.y=-2;
camera.position.z=3;
camera.position.x=1

var light = new THREE.SpotLight( 0xffffff );
light.position.set( 100, 1000, 100 );

// default false
scene.add( light );
scene.add(group)

// a kinda weird function that makes "planets"
// for(var i=0; i<torus.geometry.faces.length; i++){
// 	//console.log(torus.geometry.faces[i].normal);
// 	var vector = torus.geometry.faces[i].normal;
// 	var material = new THREE.MeshPhongMaterial( { color: 'red' } );
// 	var geo = new THREE.CylinderGeometry(2, 2, vector.length(), 4, 4);
// 	var mesh = new THREE.Mesh(geo, material);
// 	var axis = new THREE.Vector3(0, 1, 0);
	
// 	mesh.quaternion.setFromUnitVectors(axis, vector.clone().normalize());

// 	mesh.position.copy(vector.clone().multiplyScalar(15));
// 	scene.add(mesh);
// 	group.add(mesh);

// }			


function makeObs(){

	for(var i=0; i<helper.geometry.attributes.position.array.length; i+=6){
	var vert1 = new THREE.Vector3(helper.geometry.attributes.position.array[i],
		helper.geometry.attributes.position.array[i+1],
		helper.geometry.attributes.position.array[i+2]);
	var vert2 = new THREE.Vector3(helper.geometry.attributes.position.array[i+3],
		helper.geometry.attributes.position.array[i+4],
		helper.geometry.attributes.position.array[i+5]);
	var ob = { anchor: vert1, point: vert2};

	anchors.push(ob);
	}

}

function indexObs(){


	for(var i=0;i<anchors.length;i++){
		if(abses[i]){
			anchors[i].abs = abses[i];
		}
	}
	
}





function makeAllText(){
	floader.load( 'assets/helvetiker_regular.typeface.json', function ( font ) {
		anchors.forEach(function(ob){
			if(ob.abs){
				var geometry = new THREE.TextGeometry( ob.abs, {
					font: font,
					size: 0.7,
					height: 0.1,
					curveSegments: 3,
					// bevelEnabled: true,
					// bevelThickness: 1,
					// bevelSize: 1,
					// bevelSegments: 5
				} );
				var mat = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } );
				var mesh = new THREE.Mesh(geometry, mat);
				mesh.position.set(ob.anchor.x, ob.anchor.y, ob.anchor.z);
				mesh.lookAt(ob.point);
				//mesh.position.z+=1;
				scene.add(mesh);
				console.log('hey')
			}
		});

	} );

}

















var imagePrefix = "assets/skyboxbackup/skybox_";
var directions  = ["px", "nx", "py", "ny", "pz", "nz"];
var imageSuffix = ".jpg";
var sides = 100;
var skyGeometry = new THREE.BoxGeometry( sides, sides, sides );	
var loader = new THREE.TextureLoader();

var materialArray = [];
for (var i = 0; i < 6; i++)
	materialArray.push( new THREE.MeshBasicMaterial({
		map: loader.load( imagePrefix + directions[i] + imageSuffix ),
		side: THREE.BackSide
	}));
var skyMaterial = new THREE.MultiMaterial( materialArray );
// var skyMaterial = new THREE.MeshPhongMaterial( {color:'black'} );
// skyMaterial.side = THREE.BackSide;
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );




//////////////////////////////////////////////////

//scene.background = 
//var loader = new THREE.OBJLoader();

// // load a resource
// loader.load(
// 	// resource URL
// 	'assets/tonnetz.obj',
// 	// Function when resource is loaded
// 	function ( object ) {
// 		//console.log(object.children[0].geometry);
// 		var buffgeometry = object.children[0].geometry;
// 		var geometry = new THREE.Geometry();
// 		geometry.fromBufferGeometry(buffgeometry);
// 		//geometry.computeCentroids();
// 		// geometry.computeFaceNormals();
// 		// geometry.computeVertexNormals();
// 		//console.log(geometry.faces[0]);
// 		//console.log(geometry.vertices);
// 		//scene.add( object );
// 		//scene.add(object.children[0])
// 		for(var i =0;i<geometry.faces.length;i++){
// 			var triangle = new THREE.Triangle( 
// 				geometry.vertices[geometry.faces[i].a], 
// 				geometry.vertices[geometry.faces[i].b], 
// 				geometry.vertices[geometry.faces[i].c]);
// 			triangles.push(triangle);
// 		}



// 		for(var i = 0;i<triangles.length;i++){
// 			var geom = new THREE.Geometry();

// 			console.log(geom.vertices)
// 			geom.vertices.push(triangles[i].a);
// 			geom.vertices.push(triangles[i].b);
// 			geom.vertices.push(triangles[i].c);

// 			geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
// 			//geom.computeFaceNormals();
// 			//geom.computeCentroids();
// 			// geom.computeFaceNormals();
// 			// geom.computeVertexNormals();


// 			var mesh= new THREE.Mesh( geom, new THREE.MeshPhongMaterial() );
// 			scene.add(mesh);

// 		}

// 		console.log(triangles[0]);
// 		var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// 		torus = new THREE.Mesh( geometry, material );

// 		scene.add(torus);
// 	}
// );