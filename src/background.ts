let context: CanvasRenderingContext2D;
let array: Component[] = [];
let update: number = null;
let reset: number = null;
let canvas: HTMLCanvasElement;

class Component {
  public radius: number;
  x: number;
  y: number;
  rate: number;
  private speedX: number;
  private speedY: number;

  constructor(radius: number, x: number, y: number) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.setSpeed();
    this.rate = Math.random() / 150 + 0.02;
  }

  public setSpeed(): void {
    this.speedX = generateRandom(-3, 3); // represents movements in x direction per game update
    this.speedY = generateRandom(-3, 3);
    if (Math.abs(this.speedX) + Math.abs(this.speedY) < 2) {
      this.setSpeed();
    }
  }

  public update(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  public newPos(): void {
    // change speed to be updated in next game update
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function startAnim(): void {
  for (let i = 0; i < 5; i++) {
    array.push(new Component(generateRandom(0.5, 4), window.innerWidth / 2, window.innerHeight / 2));
  }
}

window.addEventListener('DOMContentLoaded', (evt) => {
  makeCanvas();
  window.focus();
});

window.onfocus = function (): void {
  if (!reset) {
    reset = window.setInterval(startAnim, 280);
  }
  if (!update) {
    update = window.setInterval(updateCanvas, 20);
  }
};

window.onblur = function (): void {
  if (reset) {
    window.clearInterval(reset);
    reset = null;
  }
  if (update) {
    window.clearInterval(update);
    update = null;
  }
};

window.onresize = function (event: UIEvent): void {
  refreshCanvas();
};

function refreshCanvas(): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function makeCanvas(): CanvasRenderingContext2D {
  startAnim();
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  console.log(canvas);
  refreshCanvas();

  if (canvas.getContext) {
    context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }

  return context;
}

function clear(): void {
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function updateCanvas(): void {
  clear();
  let work: Component;
  for (let i = 0; i < array.length; i++) {
    work = array[i];
    work.newPos();
    work.update(context);
    work.radius = work.radius + work.rate;
    if (work.x <= 0 || work.x >= window.innerWidth) {
      array.splice(i, 1);
      i--;
    } else if (work.y <= 0 || work.y >= window.innerHeight) {
      array.splice(i, 1);
      i--;
    }
  }
}

function generateRandom(min: number, max: number): number {
  return (Math.random() * (max - min)) + min;
}
