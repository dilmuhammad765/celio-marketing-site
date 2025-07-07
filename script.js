// Simple hero particle background animation
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = Array.from({length: 50}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 2 + 1,
  speedX: (Math.random() - 0.5) * 0.5,
  speedY: (Math.random() - 0.5) * 0.5
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00F0FF";
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
