// Bullet class
function Bullet(x, y) {
  this.x = playerX + 38;
  this.y = playerY - 35;
  this.width = 5;
  this.height = 5;
}

Bullet.prototype.update = function(deltaT) {
  this.y -= deltaT * 0.5;
}

Bullet.prototype.render = function(context) {
  ctx.beginPath();
  ctx.fillStyle = 'pink';
  ctx.rect(this.x, this.y, 5, 5);
  ctx.fill();
}
