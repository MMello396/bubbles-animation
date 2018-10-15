// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

var maxRadius = 40;

// Objects
function Particle(x, y, dx, dy, radius, fill){
  //setting object variables
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.fill = fill;

  //function to be ran every frame in animate function
  this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx = -this.dx;
    if(this.y + this.radius > innerWidth || this.y - this.radius < 0) this.dy = -this.dy;
    this.y += this.dy;
    this.x += this.dx;

    // interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if(this.radius < maxRadius){
        this.radius += 2;
      }
    } else if (this.radius > this.minRadius){
      this.radius -= 2;
    }

    this.draw();
  }

  this.draw = function() {
    c.beginPath();
    c.fillStyle = this.fill;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  }
}

// Implementation
let particles
function init() {
    particles = []

    for (var i = 0; i < 300; i++){
      var fill = colors[Math.floor(Math.random() * colors.length)];
      var radius = ((Math.random() * 5 + 1) * 2);
      var x = Math.random() * (innerWidth - (radius * 2)) + radius;
      var y = Math.random() * (innerHeight - (radius * 2)) + radius;
      var dx = (Math.random() - 0.5) * 4;
      var dy = (Math.random() - 0.5) * 4;
      // var dy = (Math.random() - 0.5) * 4;
      particles.push(new Particle(x,y,dx,dy,radius,fill));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(Particle => {
     Particle.update();
    });
}

init()
animate()
