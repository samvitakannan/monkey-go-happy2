var monkey;
var monkeyImage;
var banana;
var bananaImage;
var jungle;
var jungleImage;
var Invisibleground;
var stone;
var stoneImage;
var count=0;
var survivaltime=0;
var PLAY=1;
var END = 0;
var gameState=PLAY;


function setup() {
  createCanvas(400, 400);
  jungleImage=loadImage("jungle.jpg");
  monkeyImage=loadImage("monkey_01.png","monkey_02.png","monkey_03.png","monkey_04.png","monkey_05.png","monkey_06.png","monkey_07.png","monkey_08.png","monkey_09.png","monkey_10.png");
  
  bananaImage=loadImage("banana.png");
 stoneImage=loadImage("stone.png");
 
   stoneGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(220);
  
monkey = createSprite(45,384,40,40);
  monkey.addImage(monkeyImage);
monkey.scale=0.2;

  
  
  invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

  stroke("black");
  textSize(20);
  fill("black");
text("Score: "+ count, 40,50);
  
  
  if(gameState === PLAY){
if(keyDown("space") && monkey.isTouching(invisibleGround)){
      monkey.velocityY = -18 ;
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.9;
 
spawnRocks();
spawnBananas();
 
 createEdgeSprites();
 
 if (monkey.isTouching(bananaGroup)){
   count=count+1;
   survivaltime = survivaltime+1;
   bananaGroup.destroyEach();
 }
 
 if (monkey.isTouching(rockGroup)){
      rockGroup.destroyEach();
    gameState= END;
 
 }else if(gameState === END) {
    survivaltime=0;
    count=0;
    text("GAME OVER", 0, 15);
   restart();
}}
 monkey.collide(ground);
  
  
  drawSprites();
   stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ count, 500,50);        
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(World.frameCount/60); 
  text("Survival Time: "+ survivaltime, 30,70);
}

function spawnRocks() {
  if(World.frameCount % 80 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -11;
    
    obstacle.addImage("stone.png");
       obstacle.setCollider("circle",0,0,30);

    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    stoneGroup.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400,160,40,40);
    
    banana.addImage("banana.png");
    banana.scale = 0.12;
    banana.velocityX = -11;
    banana.setCollider("circle",0,0,30); 

    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //add each bananas to the group
    bananaGroup.add(banana);
  }
}
 function restart(){
    if (gameState===END){
    (keyDown("r"));
    survivaltime=0;
    count=0;
    }
monkey.setCollider("circle",0,0,30);

}