var canvas, backgroundImage;
var xdistance=0;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players, p1, p2, p3, p4,p5,p6;

var track, car1_img, car2_img, car3_img, car4_img;
var wall1
function preload(){
 
  ground = loadImage("images/ground.png");
  map= loadImage("images/back.png");
  player_1=loadImage("images/surviver1.png");
  player_2=loadImage("images/surviver 2.png");
  player_3=loadImage("images/surviver 3.png");
  player_4=loadImage("images/surviver 4.png");
  player_5=loadImage("images/surviver 5.png");
  player_6=loadImage("images/surviver6.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
