var bg, bgImage;

var frogPlayer, frogImage, frogHop, frogWalk;
var invisGround;

var bee, beeImage, beeGroup;

var flyGroup;
var fly, flyImage;

var bird1, bird1Image;
var bird2,bird2Image;

var cloud, cloud1, cloud2, cloud3, cloud4, cloud5, cloudGroup;

var heart1, heart2, heart3, heart4, heart5, heartImage;

var PLAY = 1, END = 0, gameState = PLAY;
var score = 0, life = 5;
var retry, restartImg, gameOver, gameOverImg, startImg, start;
//var heart = {heart1, heart2, heart3, heart4, heart5};

function preload(){
  bgImage = loadImage("bg2.JPG");

  frogStand = loadAnimation("frog/frog.png");
  frogWalk = loadAnimation("frog/frog1.png","frog/frog2.png","frog/frog3.png");
  frogHop = loadAnimation("frog/hop1.png","frog/hop2.png","frog/hop3.png");

  flyImage = loadAnimation("bugs/fly1.png","bugs/fly2.png");

  beeImage = loadAnimation("bugs/bee1.png","bugs/bee2.png");

  bird1Image = loadAnimation("birds/bird1.png","birds/bird2.png")
  bird2Image = loadAnimation("birds/2bird1.png","birds/2bird2.png","birds/2bird3.png")
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("over.png")
  cloud1 = loadImage("clouds/cloud1.png");
  cloud2 = loadImage("clouds/cloud2.png");
  cloud3 = loadImage("clouds/cloud3.png");
  cloud4 = loadImage("clouds/cloud4.png");
  cloud5 = loadImage("clouds/cloud5.png");

  bgMusic = loadSound("music/music.mp3");
  bgEffect = loadSound("music/bgEffect.mp3");
  bird1chirp = loadSound("music/bird1chirp.mp3");
  bird2cry = loadSound("music/bird2cry.mp3");

  flySound = loadSound("music/fly.mp3");
  beeSound = loadSound("music/bee.mp3")

  gameEnd = loadSound("music/congrats.mp3");
  heartSound = loadSound("music/heart.mp3");
  
  heartImage = loadImage("heart.png");

  frogJumpSound = loadSound("music/jump.mp3");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  bgMusic.play();
  bgEffect.play();
  bg = createSprite(displayWidth/2,displayHeight/2);
  bg.addImage(bgImage);
  bg.scale = 1;

  heart1 = createSprite(displayWidth/2 + 700,200);
  heart1.addImage(heartImage);
  heart1.scale = 0.2
 
  heart2 = createSprite(displayWidth/2 + 650,200);
  heart2.addImage(heartImage);
  heart2.scale = 0.2

  heart3 = createSprite(displayWidth/2 + 600,200);
  heart3.addImage(heartImage);
  heart3.scale = 0.2
  
  heart4 = createSprite(displayWidth/2 + 550,200);
  heart4.addImage(heartImage);
  heart4.scale = 0.2

  heart5 = createSprite(displayWidth/2 + 500,200);
  heart5.addImage(heartImage);
  heart5.scale = 0.2

  retry = createSprite(displayWidth/2,displayHeight/2);
  retry.addImage(restartImg);

  gameOver = createSprite(displayWidth/2,displayHeight/2 -120);
  gameOver.addImage(gameOverImg);

  frogPlayer = createSprite(220,600);
  frogPlayer.addAnimation("standing",frogStand);
  frogPlayer.addAnimation("walking",frogWalk);
  frogPlayer.addAnimation("hopping",frogHop);
  //frogPlayer.debug = true;
  frogPlayer.setCollider("circle",0,0,8);
  frogPlayer.scale = 6;

  invisGround = createSprite(displayWidth/2,displayHeight - 250,displayWidth,20);
  invisGround.visible = false;

  flyGroup = new Group();
  beeGroup = new Group();

  bird1Group = new Group();
  bird2Group = new Group();

  cloudGroup = new Group();
}

function draw() {
  background(255,255,255);
  console.log(frogPlayer.y);
  if(gameState === PLAY){
   gameOver.visible = false;
   retry.visible = false;
    if(keyDown("space")|| frogPlayer.y>=555){
      frogPlayer.velocityY = -7;
      frogPlayer.changeAnimation("hopping",frogHop);
      }
      frogPlayer.velocityY = frogPlayer.velocityY + 0.7;
    
      if(keyDown("right_arrow")){
        frogPlayer.x = frogPlayer.x + 7;
        frogPlayer.changeAnimation("walking",frogWalk);
      }
    
      if(keyDown("left_arrow")){
        frogPlayer.x = frogPlayer.x - 7;
      }
      //lets the frog return to original spot
      if (frogPlayer.x>displayWidth){
        frogPlayer.x = 250;
      }
    
      if(frogPlayer.x<0){
       frogPlayer.x = 250;
      }
    
      fly1();
      flyGroup.bounceOff(invisGround);
    
      if(frogPlayer.isTouching(flyGroup)){
        flyGroup.destroyEach();
        score = score + 1;
        flySound.play();
      }
    
      if(frogPlayer.isTouching(beeGroup)){
        beeGroup.destroyEach();
        score = score - 1;
        beeSound.play();

        if(score>=1){
         gameState = PLAY;
        }
        else{
          gameState = END;
        }
      }
  
      bee();
      beeGroup.bounceOff(invisGround);
      bird1();
      bird1Group.bounceOff(invisGround);
      bird2();
      bird2Group.bounceOff(invisGround);

      if(frogPlayer.isTouching(bird1Group)){
      var r = Math.round(random(1,5)); 
      switch (r){
        case 1: heart1.visible = false;
        break;
        case 2: heart2.visible = false;
        break;
        case 3: heart3.visible = false;
        break;
        case 4: heart4.visible = false;
        break;
        case 5: heart5.visible = false;
      }
      gameState = END;
      bird1chirp.play()
      }
      
      if(frogPlayer.isTouching(bird2Group)){

        var r = Math.round(random(1,5)); 
        switch (r){
          case 1: heart1.visible = false;
          break;
          case 2: heart2.visible = false;
          break;
          case 3: heart3.visible = false;
          break;
          case 4: heart4.visible = false;
          break;
          case 5: heart5.visible = false;
        }
      gameState = END;
      bird2cry.play()
      }

      clouds();
  }
  else if(gameState === END){
    gameOver.visible = true;
    retry.visible = true; 

    frogPlayer.changeAnimation("standing",frogStand);
    frogPlayer.velocityY = 0;

    beeGroup.setVelocityXEach(0);
    beeGroup.setVelocityYEach(0);

    flyGroup.setVelocityXEach(0);
    flyGroup.setVelocityYEach(0);

    bird1Group.destroyEach();
    bird2Group.destroyEach();

    beeGroup.setLifetimeEach(-1);
    flyGroup.setLifetimeEach(-1);
    bird1Group.setLifetimeEach(-1);
    bird2Group.setLifetimeEach(-1);
    if(mousePressedOver(retry)){
    restart()
    }
    
  }
  frogPlayer.collide(invisGround);
  drawSprites();

  textSize(50);
  text("Score:" + score,100,100);
  
  text("Lives:" + life,displayWidth - 300,100);
}

  function fly1(){
    if(frameCount % 80 ===0){
      fly = createSprite(Math.round(random(0,displayWidth - 70)),400);
      fly.addAnimation("flying",flyImage);
      fly.scale = 0.1;
      fly.velocityY = Math.round(random(1,8));
      fly.velocityX = Math.round(random(3,10));
      flyGroup.add(fly);
      flyGroup.lifetime = displayWidth/5;
    }
  }

  function bee(){
    if(frameCount%300 === 0){
      bee1 = createSprite(Math.round(random(0,displayWidth-70)),400);
      bee1.addAnimation("flying",beeImage);
      bee1.scale = 0.1;
      bee1.velocityY = Math.round(random(1,8));
      bee1.velocityX = Math.round(random(3,10));
      beeGroup.add(bee1);
      beeGroup.lifetime = displayWidth/5;
    }
  }

  function bird1(){
    if(frameCount%150 === 0){
      bird = createSprite(Math.round(random(0,displayWidth-70)),400);
      bird.addAnimation("flying",bird1Image);
      bird.scale = 0.1;
      bird.velocityY = Math.round(random(1,8));
      bird.velocityX = Math.round(random(-3,-10));
      bird1Group.add(bird);
      bird1Group.lifetime = displayWidth/5;
    }
  }
  
  function bird2(){
    if(frameCount%300 === 0){
      Bird = createSprite(Math.round(random(0,displayWidth-70)),400);
      Bird.addAnimation("flying",bird2Image);
      Bird.scale = 0.3;
      Bird.velocityY = Math.round(random(1,8));
      Bird.velocityX = Math.round(random(3,10));
      bird2Group.add(Bird);
      bird2Group.lifetime = displayWidth/5;
    }
  }  

 function clouds (){
   if(frameCount%120 === 0){
     position = Math.round(random(1,5));
     cloud = createSprite(displayWidth,100,40,20);
     cloud.y = Math.round(random(50,150)) ;
     cloud.velocityX = -3;

     r=Math.round(random(1,5));
     if (r == 1) {
       cloud.addImage(cloud1);
     } else if (r == 2) {
      cloud.addImage( cloud2);
     } else if (r == 3) {
      cloud.addImage(cloud3);
     }else if (r == 4) {
      cloud.addImage(cloud4);
     } else {
      cloud.addImage(cloud5);
     }

     cloud.lifetime = displayWidth/5;

     cloudGroup.add(cloud);
   }
 } 

 function lifeOver(){
   life = life - 1;
   if(life>=1){
     gameState = PLAY;
   }
   else{
   gameState = END;
   }
 }

 function restart(){
   gameState = PLAY;
   bird1Group.destroyEach();
   bird2Group.destroyEach();
   beeGroup.destroyEach();
   flyGroup.destroyEach();
   
   heart1.visible = true;
   heart2.visible = true;
   heart3.visible = true;
   heart4.visible = true;
   heart5.visible = true;

   frogPlayer.changeAnimation("stand",frogStand);
   score = 0;
   life = 5;
 }