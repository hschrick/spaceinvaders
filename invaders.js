//starts the battleship in the center of the canvas
var enemyorigin = 0;
var playerX = 220;
var playerY = 490;
var bulletY = 520;
var cannonX = 0;
var cannonY = 0;
var x = -10;
var y = 50;
var bullets = [];
var enemies = [];
var enemyBullets = [];
var score = 0;
var lifeDetector = 0;
var lives = 3;
var winCount = 0;
var pause = false;
var gameoverY = 600;




/* Game state variables */
var start = null;
var currentInput = {
  space: false,
  left: false,
  right: false,
  up: false,
  down: false
}
var priorInput = {
  space: false,
  left: false,
  right: false,
  up: false,
  down: false
}






/** @function handleKeydown
  * Event handler for keydown events
  * @param {KeyEvent} event - the keydown event
  */
function handleKeydown(event) {
  switch(event.key) {
    case ' ':
      currentInput.space = true;
      break;
    case 'ArrowUp':
    case 'w':
      currentInput.up = true;
      break;
    case 'ArrowDown':
    case 's':
      currentInput.down = true;
      break;
    case 'ArrowRight':
    case 'd':
      currentInput.right = true;
      break;
    case 'ArrowLeft':
    case 'a':
      currentInput.left = true;
      break;
      case 't':
        currentInput.t = true;
        break;
  }
}

// Attach keyup event handler to the window
window.addEventListener('keydown', handleKeydown);

/** @function handleKeyup
  * Event handler for keyup events
  * @param {KeyEvent} event - the keyup event
  */
function handleKeyup(event) {
  switch(event.key) {
    case ' ':
      currentInput.space = false;
      break;
    case 'ArrowUp':
    case 'w':
      currentInput.up = false;
      break;
    case 'ArrowDown':
    case 's':
      currentInput.down = false;
      break;
    case 'ArrowRight':
    case 'd':
        currentInput.right = false;
        break;
    case 'ArrowLeft':
    case 'a':
        currentInput.left = false;
        break;
        case 't':
            currentInput.t = false;
            reseter();
            break;
  }
}
// Attach keyup event handler to the window
window.addEventListener('keyup', handleKeyup);


/** @function reseter
  * resets game if loss or press  t
  *
  */
function reseter(){
  pause = false;
  y = 50;
  x = -10;
  playerX = 220;
  playerY = 490;
  score = 0;
  lives = 3;
  for(var i = 0; i < 14; i++){
    if(enemies[i] == -1){
      enemies[i] = 1;
    }
  }
  //Ship.show(ctx);
  //Ship.gun(ctx);
  loop();
}


/** @function winReseter
  * resets game and ui  after completing a round
  *
  */
function winReseter(){
  y = 50;
  x = -10;
  //playerX = 220;
  //playerY = 490;
  for(var i = 0; i < 14; i++){
    if(enemies[i] == -1){
      enemies[i] = 1;
    }
  }

  //Ship.show();
  //Ship.gun();
  loop();
}



/** @function loop
  * The main game loop
  * @param {DomHighResTimestamp} timestamp - the current system time,
  * in milliseconds, expressed as a double.
  */
function loop(timestamp) {
  if(!start) start = timestamp;
  var elapsedTime = timestamp - start;
  start = timestamp;
  //setup();
  update(elapsedTime);
  render(elapsedTime);
  pollInput();
  if(pause) {
    displayGameOver();
    return;
  }

  window.requestAnimationFrame(loop);
}


/** @function pollInput
  * Copies the current input into the previous input
  */
function pollInput() {
  priorInput = JSON.parse(JSON.stringify(currentInput));
}




/** @function update
  * Updates the game's state
  * @param {double} elapsedTime - the amount of time
  * elapsed between frames
  */
function update(elapsedTime) {
  // move the red square when the space bar is down
  if(currentInput.t && !priorInput.t){

    pause = false;
  }
  if(currentInput.space && !priorInput.space) {
      bullets.push(new Bullet(cannonX+11, cannonY, 2));
  }
  if (currentInput.right) {
    if(playerX <= 445){
      playerX += 0.1 * elapsedTime;
    }
  }
  if (currentInput.left) {
    if(playerX >= -10){
      playerX -= 0.1 * elapsedTime;
    }

  }
    //test
    enemyLogic();

  enemyBullets.forEach(function(enemyb, index){
  enemyb.update(elapsedTime);
  //check if enemy hits player
 if(enemyb.y >= canvas.height){
   enemyBullets.splice(index, 1);
 }

//enemyb.y >= playerY && enemyb.x >= playerX && enemyb.x >= playerX + 50
 for(var q = 0; q < 14; q++){
    if (enemyb.y >= playerY - 50 && enemyb.x >= playerX && enemyb.x <= playerX + 50) {
       enemyBullets.splice(index, 1);
       //updateLives(ctx);
        lifeDetector++;
    }
  }

});

  bullets.forEach(function(bullet, index){
   bullet.update(elapsedTime);

   if(bullet.y <= 0) bullets.splice(index, 1);

//enemy hitbox checker, may move this to bullet class later
for(var i = 0; i < 14; i++){
   if (bullet.y <= enemies[i].y + 20 && bullet.x >= enemies[i].x && bullet.x <= enemies[i].x + 20) {
     bullets.splice(index, 1);
     if(enemies[i] != -1){
       enemies.splice(i, 1,-1);
     }
     score++;
   }
}
 });

enemyAction();


   if(enemies[0] == -1 && enemies[1] == -1 && enemies[2] == -1 && enemies[3] == -1 && enemies[4] == -1 && enemies[5] == -1 && enemies[6] == -1 && enemies[7] == -1 && enemies[8] == -1 && enemies[9] == -1 && enemies[10] == -1 && enemies[11] == -1 && enemies[12] == -1 && enemies[13] == -1){
     winReseter();
    }


}//end update function



/** @function render
  * Renders the game into the canvas
  * @param {double} elapsedTime - the amount of time
  * elapsed between frames
  */
function render(elapsedTime) {
  //bullet.clearRect(0, 0, canvas.width,canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);//ship
  background.rect(10,10,canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fill(background);
  Ship.show();
  Ship.gun();

  for(var i = 0; i < 14; i++){
    if(enemies[i] != -1){
    enemies[i].show(ctx);
    }
  }



  bullets.forEach(function(bullet){

    bullet.render(ctx);

  });

  enemyBullets.forEach(function(enemyb){
    enemyb.render(ctx);
  });

  //if a hit was detected on the player we lower lives by one.
  if(lifeDetector > 0){
    lives--;
    lifeDetector = 0;
    if(lives == 0){
      lives = 3;
      gameOver();
    }
  }
    else if (enemies[13].y >= 500) {
      lives = 3;
      gameOver();
  }
  updateScore(ctx);
  updateLives(ctx);
  gameOverDisplay(ctx);
  gameoverY = 600;
}

function gameOver(){
  gameoverY = 220;
  gameOverDisplay(ctx);
  pause = true;

}

/** @function enemyAction
  * decides where enemies are and updates location
  *
  */
function enemyAction(){
  //this creates/moves enemies still alive
  if(enemies[0] != -1) enemies[0] = new enemy(x * 40 + 45, y);
  if(enemies[1] != -1) enemies[1] = new enemy(x * 40 + 105, y);
  if(enemies[2] != -1) enemies[2] = new enemy(x * 40 + 165, y);
  if(enemies[3] != -1) enemies[3] = new enemy(x * 40 + 225, y);
  if(enemies[4] != -1) enemies[4] = new enemy(x * 40 + 285, y);
  if(enemies[5] != -1) enemies[5] = new enemy(x * 40 + 345, y);
  if(enemies[6] != -1) enemies[6] = new enemy(x * 40 + 405, y);

  if(enemies[7] != -1) enemies[7] = new enemy(x * 40 + 45, y + 50);
  if(enemies[8] != -1) enemies[8] = new enemy(x * 40 + 105, y + 50);
  if(enemies[9] != -1) enemies[9] = new enemy(x * 40 + 165, y + 50);
  if(enemies[10] != -1) enemies[10] = new enemy(x * 40 + 225, y + 50);
  if(enemies[11] != -1) enemies[11] = new enemy(x * 40 + 285, y + 50);
  if(enemies[12] != -1) enemies[12] = new enemy(x * 40 + 345, y + 50);
  if(enemies[13] != -1) enemies[13] = new enemy(x * 40 + 405, y + 50);
    x += .01;

  //if the enemies hit the wall
    if(enemies[6].x >= 500 | enemies[5].x >= 500 | enemies[4].x >= 500 | enemies[3].x >= 500 | enemies[2].x >= 500 | enemies[1].x >= 500 | enemies[0].x >= 500 | enemies[13].x >= 500 | enemies[12].x >= 500 | enemies[11].x >= 500 | enemies[10].x >= 500 | enemies[9].x >= 500 | enemies[8].x >= 500 | enemies[7].x >= 500){
    x = -10;
    y += 50;
  }
}



function checkWinCount(){
  for(var i = 0; i < 14; i++){
   enemies[i] = new enemy(i * 60 + 45, 50);
 }
}

/** @function updateScore
  * updates score count
  * @param {var} ctx uses canvas context
  */
function updateScore(ctx){
   ctx.fillStyle = "#00FF00";
   ctx.fillText("score: " + score, 20, 500,);
   ctx.font = "30px Arial";
  // ctx.fillText(score, 200, 600);
}

/** @function updateLives
  * updates  lives count
  * @param {var} ctx uses canvas context
  */
function updateLives(ctx){
   ctx.fillStyle = "#00FF00";
   ctx.fillText("lives: " + lives, 220, 500,);
   ctx.font = "30px Arial";
  // ctx.fillText(score, 200, 600);
}

/** @function gameOverDisplay
  * displays game over
  * @param {var} ctx uses canvas context
  */
function gameOverDisplay(ctx){
   ctx.fillStyle = "#00FF00";
   ctx.fillText("Game Over: press t to restart", 50, gameoverY);
   ctx.font = "30px Arial";
  // ctx.fillText(score, 200, 600);
}

/** @function enemyLogic
  * displays game over
  * 
  */
function enemyLogic(){
  //picks an enemy and a time for that enemy to shoot based on random selection
  var randomBullet =  Math.floor(Math.random() * 14);
  var randomTime = Math.floor(Math.random() * 50);
   for(var e = 0; e < 14; e++){
     if(randomTime == 5){
       if(randomBullet <= 7){
         enemyBullets.push(new enemyBullet(enemies[randomBullet].x,y));
       }
       if(randomBullet >= 7){
         enemyBullets.push(new enemyBullet(enemies[randomBullet].x,y + 50));
       }
     }
   }
}

//Build game board with canvas
var canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 520;
var ctx = canvas.getContext('2d');
var background = new Path2D();
var bullet = new Path2D();
/*DEB CODE*/
var enemyb = new Path2D();
background.rect(10,10,500,520);
canvas.fillStyle = "black";
ctx.fill(background);
ctx.stroke(background);







// Start the game loop
window.requestAnimationFrame(loop);
