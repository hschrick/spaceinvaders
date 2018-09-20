// Bullet class
function enemyBullet(x, y) {
  this.x = x;
  this.y = y;
  this.width = 5;
  this.height = 5;
}

enemyBullet.prototype.update = function(deltaT) {


  this.y += deltaT * 0.5;

}

enemyBullet.prototype.render = function(context) {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.rect(this.x, this.y, 3, 15);
  ctx.fill();
}
