


var verb = new Tone.Freeverb().toMaster();
verb.dampening.value = 500;
var crusher = new Tone.BitCrusher(5).toMaster();

var synth1 = new Tone.PolySynth(6, Tone.Synth, {
			"oscillator" : {
				"type" : "square",
				"partials" : [1, 2, 3, 4],
				
			},

			"envelope" : {
				"attack" : 4,
				"decay" : 0,
				"sustain" : 1,
				"release" : 9,
			}
		}).connect(verb);
		// GUI //
		//var keyboard = Interface.Keyboard();
		// keyboard.keyDown = function (note) {
		//     synth.triggerAttack(note);
		// };
		// keyboard.keyUp = function (note) {
		//     synth.triggerRelease(note);
		// };
synth1.volume.value=-10;
var triad = ["C4", "E4"]
var loop1 = new Tone.Loop(function(time){
	synth.triggerAttackRelease(Tone.Frequency(triad[0], "midi"), "2m", time);
	synth.triggerAttackRelease(Tone.Frequency(triad[1], "midi"), "2m", time);
	synth.triggerAttackRelease(Tone.Frequency(triad[2], "midi"), "2m", time);

}, "1m");
loop1.probability=0.618;

function startPad(synth){
	synth.triggerAttack(Tone.Frequency(triad[0], "midi"));
	synth.triggerAttack(Tone.Frequency(triad[1], "midi"));
	synth.triggerAttack(Tone.Frequency(triad[2], "midi"));
}

function stopPad(synth){
	synth.triggerRelease(Tone.Frequency(triad[0], "midi"));
	synth.triggerRelease(Tone.Frequency(triad[1], "midi"));
	synth.triggerRelease(Tone.Frequency(triad[2], "midi"));
}



var synth2 = new Tone.MonoSynth({
			"portamento" : 0.01,
			"oscillator" : {
				"type" : "square"
			},
			"envelope" : {
				"attack" : 0.005,
				"decay" : 0.2,
				"sustain" : 0.4,
				"release" : 1.4,
			},
			"filterEnvelope" : {
				"attack" : 0.005,
				"decay" : 0.1,
				"sustain" : 0.05,
				"release" : 0.8,
				"baseFrequency" : 300,
				"octaves" : 4
			}
		}).connect(crusher);




var loop2 = new Tone.Loop(function(time){
	synth2.triggerAttackRelease(Tone.Frequency(triad[0], "midi"), "16n", time+0.5, 0.2);
	synth2.triggerAttackRelease(Tone.Frequency(triad[1], "midi"), "16n", time+0.74, 0.1);
	synth2.triggerAttackRelease(Tone.Frequency(triad[2], "midi"), "16n", time, 0.3);

}, "8t");
loop2.probability=0.9;


var synth3 = new Tone.MonoSynth({
			"portamento" : 0.02,
			"oscillator" : {
				"type" : "square"
			},
			"envelope" : {
				"attack" : 0.005,
				"decay" : 0.2,
				"sustain" : 0.4,
				"release" : 1.4,
			},
			"filterEnvelope" : {
				"attack" : 0.005,
				"decay" : 0.1,
				"sustain" : 0.05,
				"release" : 0.8,
				"baseFrequency" : 300,
				"octaves" : 4
			}
		}).connect(crusher);




var loop3 = new Tone.Loop(function(time){
	synth3.triggerAttackRelease(Tone.Frequency(triad[1], "midi"), "16n", time+0.5, 0.2);
	synth3.triggerAttackRelease(Tone.Frequency(triad[2], "midi"), "16n", time+0.74, 0.1);
	synth3.triggerAttackRelease(Tone.Frequency(triad[0], "midi"), "16n", time, 0.3);

}, "8n");

loop3.probability=0.9;


// var seq2 = new Tone.Sequence(function(time, note){
// 	synth2.triggerAttackRelease(Tone.Frequency(note, "midi"), "8n", time);
// //straight quater notes
// }, [triad[0], triad[1], triad[2]]);

var bass = new Tone.MonoSynth({
			"portamento" : 0.01,
			"oscillator" : {
				"type" : "square"
			},
			"envelope" : {
				"attack" : 0.005,
				"decay" : 0.2,
				"sustain" : 0.4,
				"release" : 1.4,
			},
			"filterEnvelope" : {
				"attack" : 0.05,
				"decay" : 0.1,
				"sustain" : 0.05,
				"release" : 0.8,
				"baseFrequency" : 300,
				"octaves" : 4
			}
		}).connect(verb);

var bassLoop = new Tone.Loop(function(time){
	bass.triggerAttackRelease(Tone.Frequency(triad[0]-36, "midi"), "8n", time+0.5, 0.2);
	//bass.triggerAttackRelease(Tone.Frequency(triad[0]-24, "midi"), "16n", time+0.74, 0.1);
	//synth2.triggerAttackRelease(Tone.Frequency(triad[2], "midi"), "16n", time, 0.3);

}, "2n");
bassLoop.start();

//looping.start();

Tone.Transport.start();

setVolume( -20, [synth2, synth3]);
// var part2 = new Tone.Part(function(time, value){
// 	//the value is an object which contains both the note and the velocity
// 	synth2.triggerAttackRelease(value.note, "8n", time, value.velocity);
// }, [{"time" : 0, "note" : triad[0], "velocity": 0.3}, 
// 	 {"time" : "0:1", "note" : triad[1], "velocity": 0.4},
// 	 {"time" : "0:3", "note" : triad[2], "velocity": 0.8}
// ]);
// part2.loop = true;


function updateTriad(){
	triad = [];
	var abs = path[0].abs;
	var sign = abs.slice(abs.length-1, abs.length);
	var pc = abs.slice(0, abs.length-1);
	pc = Number(pc);
	//pc+=60;
	triad.push(pc);

	

	if(sign == "+"){
		var third = pc+4;
		var third = third%12;
		triad.push(third);
	} else if (sign == "-"){
		var third = pc+3;
		var third = third%12;
		triad.push(third);
	}

	var fifth = pc+7;
	fifth = fifth%12;
	triad.push(fifth);

	// //put it in the median octave
	// triad.forEach(function(note){
	// 	note+=60;
	// })
	for(var i = 0; i<triad.length;i++){
		triad[i]+=60;
	}

}