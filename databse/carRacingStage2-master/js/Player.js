class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank=null;
    this.xdistance=0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }
getDistance(){
  var playerDistanceRef=database.ref("players/player"+this.index)
  playerDistanceRef.on("value",data=>{
    var data = data.val()
    this.distance=data.distance
    this.xdistance=data.xdistance;
  })
}
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      xdistance:this.xdistance
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
getCarsAtEnd(){
  database.ref('CarsAtEnd').on("value",(data)=>{
    this.rank=data.val();
  })
}

static updateCarsAtEnd(rank){
database.ref('/').update({
  CarsAtEnd:rank
})
}
}
