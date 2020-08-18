var follower1;
var borders;

function setup() {
  createCanvas(500, 500);
  stroke(500);
  follower1 = new follower();
  borders =  new Array();
  for(var k = 0; k < 8; k++) {
   borders.push(new border(Math.floor(Math.random() * 401),Math.floor(Math.random() * 401) ,Math.floor(Math.random() * 401) ,Math.floor(Math.random() * 401))) ; 
  }
}

function draw() {
  background(0);
  borders.forEach((border) => { border.draw() });
  follower1.draw(borders);
}