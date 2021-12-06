let GameCar;
let car;

var cols = 6;
var rows = 4;
var colors = [];

function setup() {
  // var canvas = createCanvas(700, 600);
  var canvas = createCanvas(500, 400);
  canvas.parent('canvas');
  colors = make2Darray(cols, rows); 
  color2Darray();
  GameCar = new gameCar(410, 300);
  // GameCar = new gameCar(500, 500);
  // windowResized();
}

function preload(){
  car = loadImage ('/static/assets/images/car.png');
  star = loadImage ('/static/assets/images/star.png');
}

function draw() {
  clear();  
  draw2Darray();
  textSize(20);
  fill(51);
  text('END', 20, 20);
  fill(51);
  text('START', 410, 380);
  GameCar.keyPressed();
  GameCar.display();
}
class gameCar {
  constructor(width, height) {
    this.x = width;
    this.y = height;
    this.diameter = 20;
    this.speed = 1;
  }

  keyPressed() {
    if (keyIsDown(LEFT_ARROW)) {
      this.move(-2,0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.move(2,0);
    }
    if (keyIsDown(UP_ARROW)) {
      this.move(0,-2);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.move(0,2);
    }
  }

  move(x, y) {
    this.x += x;
    this.y += y;
    if(this.x < 0+(this.diameter/2)){
      this.x = 10;
    }
    if(this.y < 0+(this.diameter/2)){
      this.y = 10;
    }
    if(this.x > 480-(this.diameter/2)){
      this.x = 470;
    }
    if(this.y > 320-(this.diameter/2)){
      this.y = 310;
    }
  }
  display() {
    // fill("red");
    image(car, this.x, this.y, 60, 30);
    // ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function color2Darray() {
  // var avail_color = [0, 255];
  var map_color = [[0,3],[2,3],[4,0],[2,0]]
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      colors[i][j] = 255;
    }
  }
  for(var i = 0; i < map_color.length; i++) {
    colors[map_color[i][0]][map_color[i][1]] = 0;
  }
}

function draw2Darray() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let x = i * 80;
      let y = 30 + (j * 80);
      // var x = i * 80;
      // var y = j * 80;
      // c = random(colors);
      // fill(255);
      fill(colors[i][j]);
      stroke(0)
      rect(x, y, 80, 80);
      if(colors[i][j] == 0) {
        image(star, x+10, y+10, 60, 50);
      }
   }
  }
}







