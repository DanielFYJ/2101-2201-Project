let myCircle;
let gameState;
let gameMenu;
let gameScore;
let gamePlayer;



function setup() {
  // var canvas = createCanvas(700, 600);
  var canvas = createCanvas(700, 600);
  canvas.parent('canvas');
  gameState = new GameState();
  gameMenu = new GameMenu();
  gameScore = new GameScore();
  gamePlayer = new GamePlayer(100, 100);
  // windowResized();
}

function draw() {
  clear();
  background('red');
  //print(mouseX, mouseY);
  //In game Menu
  if (gameState.getGameState() == 0) {
    gameMenu.display();
  }

  if (gameState.getGameState() == 1) {
    gameScore.display();
    gameScore.setScore(gameScore.getScore() + 1);
    gamePlayer.keyPressed();
    gamePlayer.display();
  }

}

function mouseClicked() {

  if (gameState.getGameState() == 0 && gameMenu.getOption() == 0) {
    if (mouseX < 320 && mouseX > 50) {
      if (mouseY < 125 && mouseY > 50) {
        gameMenu.setOption(1);
      }
      if (mouseY < 275 && mouseY > 200) {
        gameMenu.setOption(2);
      }
      if (mouseY < 425 && mouseY > 350) {
        gameMenu.setOption(3);
      }
    }
  }

}

class GameState {
  //Checks game state to determine if in initialised to in game
  constructor() {
    this.gameState = 0;
  }

  setGameState(gameState) {
    this.gameState = gameState;
  }

  getGameState() {
    return this.gameState;
  }

}

class GameMenu {
  //Class to render Game Menu
  constructor() {
    this.gameMenu = 0;
  }

  getOption() {
    return this.gameMenu;
  }

  setOption(gameMenu) {
    this.gameMenu = gameMenu;
  }

  displayGameMenu() {
    //Create Start rect
    fill(0, 255, 0);
    rect(50, 50, 270, 75);
    //Defines text size
    textSize(20)
    //Fill here defines text color
    fill(255);
    //Display text and positions
    text('START', 110, 106);
  }


  // displayHelpManual() {
  //   background(255, 0, 255)
  //   textSize(20)
  //   text('BACKSPACE to return to MENU', 525, 30)
  //   textSize(30)
  //   text('1. Move your characeter using arrow keys.', 50, 150)
  //   text('2. Move your character using arrow keys', 50, 200)
  //   text('<- Avoid movement.', 80, 240)
  //   text('3. The game is over when your battery is zero.', 50, 290)
  //   if (keyIsDown(BACKSPACE)) {
  //     this.gameMenu = 0;
  //   }
  // }

  // displaySettings() {
  //   background(255, 0, 0)
  //   textSize(75)
  //   text('SETTINGS!', 25, height / 2)
  //   if (keyIsDown(BACKSPACE)) {
  //     this.gameMenu = 0;
  //   }
  // }

  display() {
    if (gameState.getGameState() == 0 && this.getOption() == 0) {
      this.displayGameMenu();
    } else if (this.getOption() == 1) {
      gameState.setGameState(1);
      /*background(0, 255, 0)
      fill(0)
      textSize(20)
      text('Right Click to return to MENU', 525, 30)*/
      if (keyIsDown(BACKSPACE)) {
        this.gameMenu = 0;
      }
    } 
  }

}

class Game {
  //Class to render Game
  constructor() {
    //this.gameMenu = 0;

  }


}

class GamePlayer {
  constructor(width, height) {
    this.x = width;
    this.y = height;
    this.diameter = 20;
    this.speed = 1;
  }

  keyPressed() {
    if (keyIsDown(LEFT_ARROW)) {
      this.move(-10,0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.move(10,0);
    }
    if (keyIsDown(UP_ARROW)) {
      this.move(0,-10);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.move(0,10);
    }

    if (keyIsDown(ESCAPE)) {
      gameState.setGameState(0);
      gameMenu.setOption(0);
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
    if(this.x > 800-(this.diameter/2)){
      this.x = 790;
    }
    if(this.y > 600-(this.diameter/2)){
      this.y = 590;
    }
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class GameScore {
  //Class to render Score
  constructor() {
    this.score = 0;
  }

  setScore(score) {
    this.score = score;
  }

  getScore() {
    return this.score;
  }

  display() {

    fill(255, 255, 255);
    //Set outline to black
    stroke(255);
    rect(50, 50, 350, 75);
    //Defines text size
    textSize(50)
    //Fill here defines text color
    fill(0);
    text('SCORE = ' + this.score, 110, 106);
  }
}

function windowResized() {
  var canvasDiv = document.getElementById('canvas');
  // var height = canvasDiv.offsetHeight;
  var width = canvasDiv.offsetWidth;
  resizeCanvas(width, 600);
}
