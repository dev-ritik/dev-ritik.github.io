var context;
var array = [];
var update=window.setInterval(updateGameArea,20);
var reset=setInterval(startGame,1000);
//update timer every second//update timer every second

function startGame() {

  for(var i=0;i<15;i++){
    array.push(new component( generateRandom(0,3), "white", window.innerWidth/2, window.innerHeight/2));
  }
    
}

(function(){
  console.log("here");
  window.onfocus=function(){
  console.log("here1"+reset+update);
    if(!reset)
    reset=window.setInterval(startGame,1000);
    if(!update)
    update=window.setInterval(updateGameArea,20);
  };
  window.onblur=function(){
  console.log("here2"+reset+update);
    if(reset){
      window.clearInterval(reset);
      reset=null;
    }
    if(update){
      window.clearInterval(update);
      update=null;
    }
  };//stop heartbeat
})();

function myGameArea1(){
  var canvas = document.getElementById('canvas');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
    if (canvas.getContext) {
      context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

  return context;
}

function component(radius, color, x, y) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.speedX = (generateRandom(-2,2)); //represents movements in x direction per game update
  this.speedY = (generateRandom(-2,2));
  this.color=color;
  this.rate=Math.random()/150+0.02;

  this.update = function() {
    ctx = context;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.fillStyle=this.color;
    ctx.fill();
  }

  this.newPos = function(){//change speed to be updated in next game update
    this.x+=this.speedX;
    this.y+=this.speedY;
  }

}

function clear(){
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function updateGameArea() {
  clear();
  var work;
  for(var i=0;i<array.length;i++){
    work=array[i];
    work.newPos();
    work.update();
    work.radius=work.radius+work.rate;
    if (work.x<=0||work.x>=window.innerWidth){
      array.splice(i,1);
      i--;
    }else if (work.y<=0||work.y>=window.innerHeight){
      array.splice(i,1);
      i--;
    }
  }
}

function generateRandom(min, max) {
  var num = (Math.random() * (max - min + 1)) + min;
  return (num <= 0.4 && num >= -0.5) ? generateRandom(min, max) : num;
}
