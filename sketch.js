
var sharp = "\u266F";
var flat = "\u266D";

var pitches = [
  [
    ["A" + sharp, 10],
    ['F', 5],
    ['C', 0],
    ['G', 7],
    ['D', 2],
    ['A', 9]
  ],
  [
    ['F' + sharp, 6],
    ['C' + sharp, 1],
    ['G' + sharp, 8],
    ['D' + sharp, 3], 
    ['A' + sharp, 10], 
    ['F', 5]
  ],
  [
    ['D', 2],
    ['A', 9],
    ['E', 4],
    ['B', 11],
    ['F' + sharp, 6],
    ['C' + sharp, 1]
  ],
  [
    ['B' + flat, 10],
    ['F', 5],
    ['C', 0],
    ['G', 7],
    ['D', 2],
    ['A', 9]
  ],
  [
    ['G' + flat, 6],
    ['D' + flat, 1],
    ['A' + flat, 8],
    ['E' + flat, 3],
    ['B' + flat, 10],
    ['F', 5]
  ],
  [
    ['D', 2],
    ['A', 9],
    ['E', 4],
    ['B', 11],
    ['G' + flat, 6],
    ['D' + flat, 1]
  ]
]


chords = [];
notes = [];
var over;
//var pitches;

var sketch = function (p) {
  // var gray = 0; 
  var c;
  var tonnH;
  //var h= 0;

  // var font;

  p.mousePressed = function(){
    // //console.log(over.abs);
    // path.push(over);
    // cat.go=true;
    if(over){
      cat.go = true;
      path = [];
      path.push(over);
      focus(over.getClosestMatchingAnchor())
    }
  }
  p.setup = function () {
    c = p.createCanvas(window.innerWidth-(window.innerWidth*0.618), window.innerHeight);
    c.position(window.innerWidth*0.618, 0)
    p.frameRate(6)
    //c.zIndex(1)
    p.textFont("monospace")
    p.textSize(15)
    // var chord = new Chord({x:0, y:100}, {x:0, y:0}, {x:100, y:0})
    // chords.push(chord);
    //pitches.reverse();
    //console.log(pitches)
    pitches.forEach(function(arr){
      arr.reverse();
    });
    pitches = [].concat.apply([], pitches);
    makeTonnetz();
    makeMajors();
    makeMinors();
    now = chords[12];
    path.push(chords[12]);
    //focus(0);


  };
  p.windowResized = function(){
    c.position(window.innerWidth*0.618, 0);
    p.resizeCanvas(window.innerWidth-(window.innerWidth*0.618), window.innerHeight);
    makeTonnetz();
    makeMajors();
    makeMinors();


    renderer.setSize( window.innerWidth, window.innerHeight );        
    //renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
  }

  p.draw = function () {
    p.clear();
    p.background(255, 100)
    p.noStroke();
    p.fill(255, 255, 0);
    
    // p.text("C\u266F", 0, 200, 100, 100)
    // p.text("C\u266D", 20, 200, 100, 100)
    //var hit = p.collidePointTriangle(p.mouseX,p.mouseY, 0,0,1,100,100,0)
    //console.log("colliding? " + hit)
      
    

    chords.forEach(function(chord){
      chord.display();
      chord.here = false;
      //chord.hightlight=false;
      if(chord.collide()){over=chord;
        //console.log(chord.abs)
        //console.log('collide')
      };
    })
   
    //console.log(p.mouseY)
path[0].here = true;
    for(var i=0;i<path.length;i++){
      path[i].highlight=true;
      //path[0].here = false;
      path[i].display();
    }
    
    notes.forEach(function(note){
      note.display();

    })
   
    //over=null;

    if(p.mouseY>window.innerHeight*0.382){
      //console.log('hey')
      over=null;
    }

    //console.log(path)
    // makeTonnetz = function(){
    //   var rise = 7;
    //   var run = 10;
    //   //just major chords;
    //   var row = 0;
    //   var column = 0;
    //   for(var i = 0;i<15;i++){
    //     var chord = new Chord()
    //     column++;
    //     column = column%5;
    //   }
    // }


    

  };

  // p.mousePressed = function () {
  //   gray = (gray + 16) % 256;
  // };
};


  makeTonnetz = function(){
    notes = [];
      var offset = 15;
      var tonnW = p.width-(offset*2);
      var tonnH = p.height*0.382-(offset*2);
      var rise = tonnH/5;
      var run = tonnW/5;

      var row=0;
      var column=0;
      for(var i = 0; i<36;i++){
        var note = new Note(row*run+offset, column*rise+offset, pitches[i]);
        //note.arr = pitches[i];
        notes.push(note);
        row++;
        //row = row%6;
        if(row==6){
          row = 0;
          column++;
          //column=column%6;
        }
      }
    }

    makeMajors = function(){
      chords=[];
      var row=0;
      var column=0;

      for(var i=0;i<25;i++){
        var tr = (row*6)+column+1;
        var chord = new Chord({x:notes[tr+5].x, y:notes[tr+5].y}, 
          {x:notes[tr].x, y:notes[tr].y}, 
          {x:notes[tr+6].x, y:notes[tr+6].y})
        chord.type='+';
        chord.abs = notes[tr+6].abs+chord.type;

        chords.push(chord);
        row++;
        //row = row%6;
        if(row==5){
          row = 0;
          column++;
          //column=column%6;
        }
      }
    }


makeMinors = function(){

  var row=0;
  var column=0;

  for(var i=0;i<25;i++){
    var tl = (row*6)+column;
    var chord = new Chord({x:notes[tl].x, y:notes[tl].y}, 
      {x:notes[tl+1].x, y:notes[tl+1].y}, 
      {x:notes[tl+6].x, y:notes[tl+6].y})
    chord.type = '-';
    chord.abs = notes[tl+1].abs+chord.type;

    chords.push(chord);
    row++;
    //row = row%6;
    if(row==5){
      row = 0;
      column++;
      //column=column%6;
    }
  }
}







p = new p5(sketch);