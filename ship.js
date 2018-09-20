function Ship(){
  //this.x = width/2;

}
//var ship = canvas.getContext('2d');

//canvas.globalCompositOperation = 'destination-over';

Ship.show = function(){
  //builds base of ship
  ctx.beginPath();
  //ship.moveTo(x + 25, y - 15);
  ctx.lineTo(playerX + 25, playerY - 35);
  ctx.lineTo(playerX + 50, playerY - 35);
  ctx.lineTo(playerX + 50, playerY - 15);
  ctx.lineTo(playerX + 25, playerY - 15);
  ctx.closePath();
  //ship.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fillStyle = "violet";
  ctx.fill();

  //builds cannon
  ctx.beginPath();
  ctx.moveTo(playerX + 35,playerY - 35);
  ctx.lineTo(playerX + 35,playerY - 40);
  ctx.lineTo(playerX + 40,playerY - 40);
  ctx.lineTo(playerX + 40,playerY - 35);
  ctx.lineTo(playerX + 37,playerY - 35);
  ctx.closePath();
  ctx.fillStyle = "violet";
  ctx.fill();

  ctx.beginPath();
  ctx.rect(playerX + 35, bulletY,10,10);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

Ship.gun = function(){
  
}
