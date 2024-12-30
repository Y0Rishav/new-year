// Year transition effect
const oldYear = document.querySelector('.old-year');
const newYear = document.querySelector('.new-year');

setTimeout(() => {
  oldYear.style.opacity = '0';
  oldYear.style.transform = 'translateY(50px)';
  newYear.style.opacity = '1';
  newYear.style.transform = 'translateY(0)';
}, 2000);

// Fireworks animation
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

function createFirework(x, y) {
  const colors = ['#ff004f', '#ffcc00', '#00ffcc', '#ff6600', '#66ccff'];
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    particles.push(
      new Particle(
        x,
        y,
        colors[Math.floor(Math.random() * colors.length)],
        { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }
      )
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

canvas.addEventListener('click', (event) => {
  createFirework(event.clientX, event.clientY);
});

setInterval(() => {
  createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
}, 1000);

animate();
