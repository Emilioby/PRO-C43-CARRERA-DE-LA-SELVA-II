class Game {
  constructor() {
   

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    animal1 = createSprite(width / 2 - 50, height - 100);
    animal1.addImage(" animal1",  animal1_img);
    animal1.scale = 0.07;

    animal2 = createSprite(width / 2 + 100, height - 100);
    animal2.addImage(" animal2",  animal2_img);
    animal2.scale = 0.07;

    animals = [ animal1,  animal2];

    // C38 TA
    bush = new Group();
   grass = new Group();

    // Agregando sprite de combustible al juego
    this.addSprites(bush, 4, bushImage, 0.02);

    // Agregando sprite de moneda al juego
    this.addSprites(grass, 18, grassImage, 0.09);
  }

  // C38 TA
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    
    this.leadeboardTitle.html("Tabla de puntuación");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    player.getanimalsAtEnd();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {

      image(track, 0, -height * 5, width, height * 6);
      this.showLeaderboard();

      //Índice de la matriz
      var index = 0;
      for (var plr in allPlayers) {
        //agrega 1 al índice por cada bucle
        index = index + 1;

        //utiliza datos de la base de datos para mostrar los autos en la dirección x e y 
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        animals[index - 1].position.x = x;
        animals[index - 1].position.y = y;

        // C38  SA
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleBush(index);
          this.handleGrass(index);
    camera.position.x =    animals[index - 1].position.x;
          camera.position.y =    animals[index - 1].position.y;
          // Cambiando la posición de la cámara en la dirección y
         }}
      
      
         const finshLine = height * 6 - 100;

         if (player.positionY > finshLine) {
           gameState = 2;
           this.update(gameState);
           // descomenta el correcto para aumentar la posición del jugador por 1 y actualiza la base de datos.
           
            player.rank += 1;
            player.updateanimalsAtEnd(player.rank);

          //  rank += 1;
          //  Player.updateanimalsAtEnd(rank);

          //  player.rank += 1;
          //  Player.updateanimalsAtEnd(player.rank);


           player.update();
           //this.showRank();
         } 
         if (keyIsDown(UP_ARROW)) {
          player.positionY += 10;
          player.update();
        }
         drawSprites();}}

  showLeaderboard() 
  {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    Esta etiqueta se utiliza para mostrar 4 espacios.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

      // manejando eventos keyboard
      


  handleBush(index) {
    // Agregando combustible
    animals[index - 1].overlap(bush, function(collector, collected) {
      player.bush = 185;
      //recolectado esta el sprite en el grupo de recolectable que activaron
      //el evento
      collected.remove();
    });
  }

  handleGrass(index) {
    animals[index - 1].overlap(grass, function(collector, collected) {
      //Descomenta la línea correcta de código para aumentar la puntuación por 21 puntos
      player.score += 21;
      // score += 21;
      // player.score + 21;
      // player += 21;
      player.update();
      collected.remove();
    });
  }
}
