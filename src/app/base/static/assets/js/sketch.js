let GameCar;
let car;
var cols = 6;
var rows = 4;
var colors = [];
var map_color = [[0,3],[2,3],[5,0],[2,0]];
var rectwstars = [[0,3],[2,3],[5,0],[2,0]];
// var stars_loc = [];
var star_obj = [];
var slice_index = "";
var cmd = "";
var first_cmd = "";
var delay = ms => new Promise(res => setTimeout(res, ms));

function setup() {
  // var canvas = createCanvas(700, 600);
  var canvas = createCanvas(500, 400);
  canvas.parent('canvas');
  colors = make2Darray(cols, rows); 
  color2Darray();
  for (var x = 0; x < rectwstars.length; x++) {
    star_obj[x] = new gameStar(10 + rectwstars[x][0] * 80, 40 + (rectwstars[x][1] * 80));
  }
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
  if (first_cmd == "") {
    first_cmd = retrieveQueue().charAt(0);
    // console.log(first_cmd.length);
    if (first_cmd == "N"){
      first_cmd = "";
    }
  }
  cmd = retrieveQueue();
  GameCar.keyPressed(cmd);
  GameCar.display();
  for (var x = 0; x < star_obj.length; x++) {
    star_obj[x].display();
  }
}

class gameStar {
  constructor(x, y, col, row) {
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
  }
  display() {
    // fill("red");
    image(star, this.x, this.y, 60, 50);
  }
}
class gameCar {
  constructor(width, height) {
    this.x = width;
    this.y = height;
    this.diameter = 20;
    this.speed = 1;
  }

  // keyPressed(cmd) {
  //   if (cmd == "A") {
  //     this.move(-2,0);
  //   }
  //   if (cmd == "S") {
  //     this.move(2,0);
  //   }
  //   if (cmd == "W") {
  //     this.move(0,-2);
  //   }
  //   if (cmd == "S") {
  //     this.move(0,2);
  //   }
  //   if (cmd == "R") {
  //   }
  //   if (cmd == "B") {
  //   }
    // if (cmd == "*") { 
      // if (star_obj.length != 0) {
      //   for (var x = 0; x < star_obj.length; x++) {
      //     if (dist(star_obj[x].x,star_obj[x].y, GameCar.x, GameCar.y) < 10) {
      //       star_obj.splice(0,1);  
      //     }
      //   }    
      // }
    // }
  // }

  async keyPressed(cmdz) {
  //   if (keyIsDown(LEFT_ARROW)) {
  //     this.move(-2,0);
  //   }
  //   if (keyIsDown(RIGHT_ARROW)) {
  //     this.move(2,0);
  //   }
  //   if (keyIsDown(UP_ARROW)) {
  //     this.move(0,-2);
  //   }
  //   if (keyIsDown(DOWN_ARROW)) {
  //     this.move(0,2);
  //   }
  // }
    for (const cmd of cmdz) {
      if (cmd == "W" && first_cmd == "W") {
        this.move(0,-80);
      } else if (cmd == "A" && first_cmd == "A") {
        this.move(-80,0);
      } else if (cmd == "S" && first_cmd == "S") {
        this.move(0,80);;
      } else if (cmd == "D" && first_cmd == "D") {
        this.move(80,0);
      } else if (cmd == "R" && first_cmd == "*") {
        // console.log(dist(GameCar.x, GameCar.y,star_obj[slice_index].x,star_obj[slice_index].y));
        if ((star_obj.length != 0) && (dist(GameCar.x, GameCar.y,star_obj[slice_index].x,star_obj[slice_index].y) < 85)) {
          star_obj.splice(slice_index,1);
          rectwstars.splice(slice_index,1);
          await delay(2000);
        }
        //add points function
      } else if (cmd == "B") {
        first_cmd = "B";
      } else if (cmd == "*") {
        for (var x = 0; x < rectwstars.length; x++) {
          if (dist(GameCar.x, GameCar.y, 10+rectwstars[x][0]*80, 40+rectwstars[x][1]*80) < 25) {
            slice_index = x;
            first_cmd = "*";
            break;
          }
        }
      } else if (first_cmd == "*" || first_cmd == "B" ) {
        switch(cmd) {
          case "W":
            first_cmd = "W";
            this.move(0,-80);        
            break;
          case "A":
            first_cmd = "A";
            this.move(-80,0);
            break;
          case "D":
            first_cmd = "D";
            this.move(80,0);       
            break;
          case "S":
            first_cmd = "S";
            this.move(0,80);
            break;
        }
      } else if (cmd == "R") {
        await delay(3000);
      } else {
        this.move(0,0);
      }
    }
    // else if (cmd[0] == "*") { 
    //   if (star_obj.length != 0) {
    //     for (var x = 0; x < star_obj.length; x++) {
    //       if (dist(star_obj[x].x,star_obj[x].y, GameCar.x, GameCar.y) < 10) {
    //         star_obj.splice(0,1);  
    //       }
    //     }    
    //   }
    // }

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
    // if ( (this.x > 10 && this.x < 70) && (this.y > 290 && this.y <= 340)) {
      // star_obj.splice(0,1);
    // if (star_obj.length != 0) {
    //   if (dist(star_obj[0].x,star_obj[0].y, GameCar.x, GameCar.y) < 10) {
    //     star_obj.splice(0,1);
    //   }
    // }      
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
    }
  }
}

function retrieveQueue() {
  var result = "";
  $.ajax({
    type: "GET",
    async: false,
    url: "/api/commands/deqeue",
    success: function (data) {
      result = data;
    }
  });
  return result;
}







