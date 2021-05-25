var PLAY = 1;
var END = 0;
var gameOver,restart;
var gameState = PLAY;
var score = 0;
var backgroundImage;

var bird;
var flappyBird; 
var greenPipesImage1; 
var redPipesImage1; 
var greenPipesImage2; 
var redPipesImage2;
var pipes = [];
var reload;

function preload (){
  flappyBird = loadImage ('flappy-bird.png');
  greenPipesImage1 = loadImage ("green-pipes-1.png");
  redPipesImage1 = loadImage ("red-pipes-1.png");
  greenPipesImage2 = loadImage ("green-pipes-2.png");
  redPipesImage2 = loadImage ("red-pipes-2.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  backgroundImage = loadImage ("background.png");
}

function setup() {

  createCanvas(1275, 680);

  gameOver = createSprite(600,340);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(600,450);
  restart.addImage(restartImg);
  
   gameOver.scale = 0.5;
   restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  
  bird = new Bird();
  pipes.push(new Pipe());

 
}

function draw() {
  background(backgroundImage);
  
  //background(255);
 
  if (gameState===PLAY){
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show(greenPipesImage1, redPipesImage1, greenPipesImage2, redPipesImage2);
      pipes[i].update();
      
      if (pipes[i].hits(bird)) {
        gameState = END;
      }
  
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    
    
    bird.update();
    bird.show(flappyBird);
  
    if (frameCount % 75 == 0) {
      pipes.push(new Pipe());
    }
  
  } else if ( gameState === END) {
    //reset();
    gameOver.visible = true;
    restart.visible = true;
    //reload = createSprite(this.width/2 - 100,this.height /2 + 100);
  
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function reset(){
  console.log("reset");
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  

  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}