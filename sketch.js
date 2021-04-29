var message = "this is a massage"
var PLAY = 1;
var END = 0;
var gameState = PLAY



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage
var obstacle1Image, obstacle2Image, obstacle3Image, obstacle4Image, obstacle5Image, obstacle6Image


var score;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")

  jumpSound = loadSound("jump.mp3")
  endSound = loadSound("die.mp3")
  checkpointSound = loadSound("checkPoint.mp3")
}

function setup() {


  createCanvas(600, 200)

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  //game over syntax
  gameover = createSprite(300, 100)
  gameover.addImage("gameover", gameoverimg)
  gameover.scale = 1
  restart = createSprite(300, 140)
  restart.addImage("restart", restartimg)
  restart.scale = 0.5
  //creating invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  //generate random numbers
  var rand = Math.round(random(1, 100))
  //console.log(rand)
  score = 0
}

function draw() {
  console.log(message)
  //set background color
  background("white")
  //trex.debug = true
  trex.setCollider("circle", 0, 0, 40)
  //console.log(trex.y)
  text("score:" + score, 500, 50)

  if (gameState === PLAY) {
    gameover.visible = false
    restart.visible = false
    ground.velocityX = -12 //-(12+score/10000000);
    score = score + Math.round(frameCount / 60)
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -10;
      jumpSound.play()
    }
    if (score > 0 && score % 100000 === 0) {
      checkpointSound.play()
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds()
    spawnObstacles()
    /*if(obstaclesGroup.isTouching(trex)){
    //trex.velocityY = -12;
    //jumpSound.play();
     gameState = END;
     dieSound.play()*/
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END
      endSound.play()
    }




  } else if (gameState === END) {
    ground.velocityX = 0
    trex.changeAnimation("collided", trex_collided)
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.velocityY = 0
    trex.velocityX = 0
    gameover.visible = true
    restart.visible = true
  }






  //if(obstaclesGroup.x = trex.x +4 && trex.y >= 160){
  //trex.velocityY = -10
  //}




  // jump when the space key is pressed





  //stop trex from falling down
  trex.collide(invisibleGround);
  //trex.collide(obstaclesGroup);
  if (mousePressedOver(restart) && gameState === END) {
    reset()

  }
  //Spawn Clouds

  drawSprites();
}

function reset() {
  score = 0
  gameState = PLAY
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running")
}
//function to spawn the clouds
function spawnClouds() {
  // write your code here 

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, random(1, 100), 10, 10)
    cloud.addImage(cloudImage)
    cloud.scale = random(0.1, 2)
    cloud.velocityX = -3
    cloud.depth = 0
    cloud.lifetime = -1
    cloudsGroup.add(cloud)
  }


}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40)
    obstacle.velocityX = -12 //-(12+score/100)
    obstacle.scale = 0.5
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
    obstaclesGroup.add(obstacle)
  }










}