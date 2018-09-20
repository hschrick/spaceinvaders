var starterwidth = 50;
//enemy class
function enemy(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;



  }

  enemy.prototype.show = function(context){
    var randomColor =  Math.floor(Math.random() * 100);
    ctx.beginPath();
    if(randomColor == 0){
      ctx.fillStyle = 'yellow';
    }
    if(randomColor == 1){
      ctx.fillStyle = 'red';
    }
    if(randomColor == 2){
      ctx.fillStyle = 'blue';
    }
    if(randomColor == 3){
      ctx.fillStyle = 'green';
    }
    if(randomColor == 4){
      ctx.fillStyle = 'orange';
    }
    ctx.rect(this.x,this.y,20,20);
    ctx.fill();
    ctx.closePath();
  }


  enemy.prototype.update = function(elapsedTime){
  alert("hello");
      //x += .1;

    //this.x = starterwidth;
    //this.y = 50;
  }

/*
enemy.show = function(context) {
  ctx.beginPath();
  ctx.fillStyle = 'yellow';
  ctx.rect(this.x,50,50,50);
  ctx.fill();
  ctx.closePath();
}
*/
