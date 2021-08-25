var bird,bird_fly,bird_up;
var bground,bgcolor; 
var pole1,pole_up;
var pole2,pole_down;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisiblel,invisiblel2;
var game,g_over;
var score=0;
var hitsound,bgsound;


function preload(){
  bird_fly = loadAnimation("f1.png","f2.png","f3.png");
  bgcolor = loadImage("back.jpg");
  pole_up = loadImage("poleup.png");
  pole_down = loadImage("poledown.png");
  g_over = loadImage("game.png");
  hitsound = loadSound("sfx_hit.wav");
  bgsound = loadSound("mario_theme.mp3");

}

function setup() {
 createCanvas(600,400);
  
 upG = new Group();
 downG = new Group(); 
  
  
 
  
 bird = createSprite(70,200); 
 bird.addAnimation("birdanimation",bird_fly); 
 bird.scale = 0.3;
 bird.setCollider("circle",-80,-40,80);
    
 invisiblel = createSprite(200,330,600,1);
 invisiblel.visible = false;
  
  invisiblel2 = createSprite(210,0,600,1);
 invisiblel2.visible = false;
  

  
  
 bground = createSprite(200,200);
 bground.addImage(bgcolor);
 bground.scale = 3;

  
  //to make bird above background & poles;
 bird.depth = bground.depth;
 bird.depth+=1;
  
  score = 0;
  
  
 
  
}
function draw() {
  background("#71C3CF");
  textSize(50);
  fill("black")
  text("Score: "+ score,300,50);
  
  
  if (gameState === PLAY){
      
    spawntoppoles();
    
    
    bground.velocityX = -4;
    
  if(keyDown("space")){
    bird.velocityY = -7;
  }  
  if(bground.x<30){
    bground.x = bground.width/2;
    }
    

    camera.position.x = canvas.width/3;
    camera.position.y = bird.y - 50;
    
  bird.velocityY = bird.velocityY+1; 
    
  
  }
  if(bird.isTouching(invisiblel)||bird.isTouching(upG)||bird.isTouching(downG)){
    gameState = END;
    hitsound.play( );
  }

  
  if(gameState === END){
    upG.setVelocityXEach(0);
    downG.setVelocityXEach(0);
    upG.setLifetimeEach(-1);
    downG.setLifetimeEach(-1);
    bground.velocityX = 0;
    bird.lifetime = 0;
    game = createSprite(200,200)
    game.addImage("over", g_over);
    if(keyDown===119||keyDown===87){
      gameState=PLAY
    }
    
  }
  
  bird.collide(invisiblel);
  bird.collide(invisiblel2);
  drawSprites();
 
}
function spawntoppoles(){
  if(frameCount%200===0){
    pole1 = createSprite(300,5);
    pole1.scale = 1.4; 
    pole1.setCollider("rectangle",-20,-30,65,125)
    pole2 = createSprite(280,350);
    pole2.scale = 1.4;
    pole2.setCollider("rectangle",0,0,65,120)
    pole1.y = Math.round(random(40,110));
    pole2.y = Math.round(random(310,360));
    pole1.velocityX = -4;  
    pole2.velocityX = -4;  
    pole1.addImage(pole_up);
    pole2.addImage(pole_down);
    bird.depth = pole1.depth;
    bird.depth+=1;
    bird.depth = pole2.depth;
    bird.depth+=1;
    upG.add(pole1);
    downG.add(pole2);
    upG.setLifetimeEach(400);
    downG.setLifetimeEach(400);
  }
}
