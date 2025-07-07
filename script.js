// Animating numbers in stats and metrics
document.addEventListener("DOMContentLoaded", function() {
  function animateNumber(el, to, suffix = '', duration = 1300) {
    let start = 0;
    let frame = 0;
    let steps = Math.ceil(duration / 24);
    let inc = to / steps;
    function update() {
      frame++;
      let val = Math.round(inc * frame);
      if (val >= to) {
        el.textContent = to + suffix;
      } else {
        el.textContent = val + suffix;
        requestAnimationFrame(update);
      }
    }
    update();
  }
  document.querySelectorAll('.stat-num, .metric-value[data-to]').forEach(el => {
    let to = parseInt(el.dataset.to, 10);
    let suffix = el.textContent.trim().endsWith('%') ? '%' : '';
    animateNumber(el, to, suffix, 1200 + Math.random() * 500);
  });
});