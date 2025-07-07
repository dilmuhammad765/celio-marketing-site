// Animate metrics
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.metric-num').forEach(function(el) {
    let to = parseInt(el.dataset.to, 10);
    let n = 0, step = Math.max(1, Math.floor(to/60));
    let interval = setInterval(() => {
      n += step;
      if(n >= to) { el.textContent = to; clearInterval(interval); }
      else { el.textContent = n; }
    }, 20);
  });
  // Logo hover animation
  const logo = document.getElementById('celio-logo');
  if(logo){
    logo.addEventListener('mouseover', () => logo.style.transform = 'rotate(-9deg) scale(1.13)');
    logo.addEventListener('mouseleave', () => logo.style.transform = '');
  }
});