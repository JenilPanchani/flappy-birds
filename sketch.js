var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver = false;
var restart = false;
var score = 0;

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
}

function setup() {
  createCanvas(1275, 680);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(255,255,51);


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
    
    score = score + Math.round(getFrameRate()/60);
    bird.update();
    bird.show(flappyBird);
  
    if (frameCount % 75 == 0) {
      pipes.push(new Pipe());
    }
  
  } else if ( gameState === END) {
    //reset();
   reload = createSprite(this.width/2 - 100,this.height /2 + 100);
    textSize(32);
    fill(255, 0, 0);
    text('Game Over !!!', this.width/2 - 100, this.height/2);
  }

}

function reset(){
  gameState=PLAY;
  score=0;
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}