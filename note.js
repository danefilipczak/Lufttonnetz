function Note(x, y, arr){
	this.x = x;
	this.y = y;
	this.arr = arr;
	this.name = this.arr[0];
	this.abs = this.arr[1];
}

Note.prototype.display=function(){
	p.rectMode(p.CENTER);
	p.fill(70);
	//p.rect(this.x, this.y, 10, 10);
	p.text(this.name, this.x, this.y, 10, 20)
	p.rectMode(p.CORNERS)
}