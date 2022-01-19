class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    p1= createSprite(100,200);
    p1.addImage("player1",player_1);
    p1.scale=0.5;
    p2= createSprite(200,200);
    p2.addImage("player2",player_2);
    p2.scale=0.5;
    p3= createSprite(300,200);
    p3.addImage("player3",player_3);
    p3.scale=0.5;
    p4= createSprite(400,200);
    p4.addImage("player4",player_4);
    p4.scale=0.5;
    p5= createSprite(500,200);
    p5.addImage("player5",player_5);
    p5.scale=0.5;
    p6= createSprite(600,200);
    p6.addImage("player6",player_6);
    p6.scale=0.5;
    players = [p1, p2, p3, p4,p5,p6 ];
    wall1 = createSprite(displayWidth-300,displayHeight,20,300);
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(map, 0,0,displayWidth, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x  ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x =displayWidth-allPlayers[plr].xdistance;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          stroke(0)
          fill("black")
          ellipse(x,y,50,70)
          players[index - 1].shapeColor = "black";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.xdistance +=10
      player.update();
    }

    if(player.distance > 4500){
      gameState = 2;
      player.rank+=1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
