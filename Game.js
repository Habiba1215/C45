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
  
      cheetah1 = createSprite(100,displayHeight -200)
      cheetah1.addAnimation("cheetahImg",cheetahImg)
      cheetah1.scale=0.5;
      cheetah2 = createSprite(200,displayHeight-150)
      cheetah2.addAnimation("cheetahImg",cheetahImg)
      cheetah2.scale = 0.5
      cheetah = [cheetah1,cheetah2]
    }
    play(){
      form.hide()
      Player.getPlayerInfo()
      if(allPlayers !== undefined){
        var x ;
        //var y = displayHeight - 250 ;
        var index = 0
        for (var plr in allPlayers){
          image(bg,-displayWidth*4,0,displayWidth*5,displayHeight)
          index = index+1
          x = allPlayers[plr].distance
          //y = displayHeight + 100
          cheetah [index-1].x = x
          //cheetah [index-1].y = y

          if (index === player.index){
            camera.position.x = x
            camera.position.y = displayHeight/2
            fill("red")
            ellipse(x , (cheetah[index-1].y),60,60)
          
          }
        }
        if (keyIsDown(RIGHT_ARROW)&& player.index !== null){
          player.distance += 50
          player.update()
        }
      }
      drawSprites();
    }
}  