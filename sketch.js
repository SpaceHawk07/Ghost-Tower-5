var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var block, blockGroup

var gameState = "PLAY";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");




}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
}




function draw() {
  if (gameState === "PLAY") {

    spawnDoors();
    drawSprites();

    if (tower.y > 400) {
      tower.y = 300;
    }
    if (keyDown("space")) {
      ghost.velocityY = -15;

    }
    ghost.velocityY = ghost.velocityY + 0.8;

    if (keyDown("right")) {
      ghost.x = ghost.x + 3
    }

    if (keyDown("left")) {
      ghost.x = ghost.x - 3
    }

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (blockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.lifetime=0;
      gameState = "END";
    
    }
  }

  if (gameState === "END") {
   background("black");
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER", 200, 300);
  }










}


function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(Math.round(random(120, 400)), 50);
    door.addImage(doorImg);
    door.velocityY = 1;
    doorGroup.add(door);
    door.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    block = createSprite(200, 115);
    //block.width=climber.width;
    block.height = 2;
    block.x = door.x;
    block.velocityY = 1;
    block.lifetime = 800;
    blockGroup.add(block);
    block.debug = true;

    climber = createSprite(200, 110);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climberGroup.add(climber);



  }


}