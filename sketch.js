var PLAY=1;
var END=0;
var gameState=PLAY
var trex ,trex_running;
var ground,groundImage;
var invisibleGround;
var obi1,obi2,obi3,obi4,obi5,obi6
var obiGroup
var cloudsGroup

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
groundImage=loadImage("ground2.png")
cloudImage=loadImage("cloud.png")
obi1=loadImage("obstacle1.png")
obi2=loadImage("obstacle2.png")
obi3=loadImage("obstacle3.png")
obi4=loadImage("obstacle4.png")
obi5=loadImage("obstacle5.png")
obi6=loadImage("obstacle6.png")

}

function setup(){
  createCanvas(600,200)
  console.log("hello aadi" +10011100)
  //create a trex sprite
 trex=createSprite(50,180,20,50);
 trex.addAnimation("running",trex_running);
 trex.scale=0.5
 trex.x=50
 score=0

 ground=createSprite(200,180,400,200);
 ground.addImage("ground",groundImage);
// ground.x=ground.width/2


 invisibleGround=createSprite(200,190,400,10)
 invisibleGround.visible=false
 var r=Math.round(random(10,60))
 console.log(r)
}

function draw(){
  background("white");
text("score: "+score,500,50)


if (gameState===PLAY){
  score=score+Math.round(frameCount/60)
  ground.velocityX=-2;

  if(ground.x<0){
    ground.x=ground.width/2
  }
  //trex jumps command
  if (keyDown("space") && trex.y>100){
    trex.velocityY=-10
  }

  //gravity
  trex.velocityY=trex.velocityY+0.8;
spawnClouds()
spawnObstacles()
if (obiGroup.isTouching(trex)){
  gameState=END
  } 
}
else if(gameState===END){
ground.velocityX=0;
obiGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach(0);
trex.velocityX=0;

}

console.log(frameCount)
trex.collide(invisibleGround);
drawSprites()
}

function spawnClouds(){
  if(frameCount%60===0){  
cloud=createSprite(600,100,40,10)
cloud.y=Math.round(random(10,60))
cloud.addImage(cloudImage)
cloud.lifetime=210
cloud.velocityX=-3
cloud.depth=trex.depth
trex.depth=trex.depth+1
cloudsGroup.add(cloud)
}
}

function spawnObstacles(){
if (frameCount%60===0){
var obs=createSprite(600,165,10,40)
obs.velocityX=-2
var r=Math.round(random(1,6))
switch(r){
  case 1:obs.addImage(obi1);
  break;
  case 2:obs.addImage(obi2);
  break;
  case 3:obs.addImage(obi3);
  break;
  case 4:obs.addImage(obi4);
  break;
  case 5:obs.addImage(obi5);
  break;
  case 6:obs.addImage(obi6);
  break;
}
obs.scale=0.5
obs.lifetime=300
obiGroup.add(obs)
}

}