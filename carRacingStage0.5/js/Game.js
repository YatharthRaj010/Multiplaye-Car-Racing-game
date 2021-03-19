class Game {
  constructor(){}

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
    car1=createSprite(100,200)
    car1.addImage(car1Image);
    car2=createSprite(300,200)
    car2.addImage(car2Image)
    car3=createSprite(500,200)
    car3.addImage(car3Image)
    car4=createSprite(700,200)
    car4.addImage(car4Image)

    cars=[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      var index=0;
      var x=185;
      var y

      background(ground);

      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);

      for (var plr in allPlayers ){
        
        x=x+230;
        y=displayHeight-allPlayers[plr].distance

        cars[index].x=x;
        cars[index].y=y;

        if(index+1 === player.index){
          cars[index].shapeColor="red"; 

          fill("red");
          ellipse(x,y,60,60)

          camera.position.x = displayWidth/2;
          camera.position.y = cars[index].y;
        }
        
        if(keyIsDown(UP_ARROW) && player.index !== null){
          player.distance +=10;
          player.update();
        }
        index=index+1;

        if(player.distance>4300){
          player.rank=player.rank+1;
          Player.updateCarsAtEnd(player.rank);
          gameState=2;
         
        }

       

       
        drawSprites();


      }
      

    }

    //if(allPlayers !== undefined){
      //var display_position = 130;
      //for(var plr in allPlayers){
        //if (plr === "player" + player.index)
          //fill("red")
        //else
          //fill("black");

       // display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      //}
    //}

  }
  end(){
    console.log("GAME ENDED");
    console.log(player.rank);
  }
}