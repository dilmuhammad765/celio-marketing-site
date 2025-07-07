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
// Interactive animated lead funnel balls
document.addEventListener("DOMContentLoaded", function() {
  // (Keep your stat animation code above)

  // Interactive Funnel Animation
  const inputBallsData = [
    {cx: 105, cy: 60, r: 8, fill: "#ff2fd1"},
    {cx: 155, cy: 60, r: 7, fill: "#00ffe7"},
    {cx: 130, cy: 47, r: 9, fill: "#00ffe7"}
  ];
  const inputBallsGroup = document.getElementById("inputBalls");
  if (inputBallsGroup) {
    inputBallsData.forEach((ball, i) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      Object.entries(ball).forEach(([k, v]) => circle.setAttribute(k, v));
      circle.setAttribute("style", "cursor:pointer;");
      circle.setAttribute("data-idx", i);
      circle.addEventListener("click", function() {
        dropBall(circle, i);
      });
      inputBallsGroup.appendChild(circle);
    });

    function dropBall(circle, idx) {
      if (circle.getAttribute("data-dropping")) return;
      circle.setAttribute("data-dropping", "1");
      // Animate down into funnel
      const startY = parseInt(circle.getAttribute("cy"));
      const endY = 150;
      const cx = parseInt(circle.getAttribute("cx"));
      let frame = 0, frames = 35;
      function animate() {
        frame++;
        let newY = startY + (endY - startY) * (frame / frames);
        circle.setAttribute("cy", newY);
        if (frame < frames) {
          requestAnimationFrame(animate);
        } else {
          // Shrink and fade
          let fadeFrame = 0, fadeFrames = 13;
          function fade() {
            fadeFrame++;
            circle.setAttribute("r", Math.max(0, circle.getAttribute("r") * (1 - fadeFrame / fadeFrames)));
            circle.setAttribute("opacity", 1 - fadeFrame / fadeFrames);
            if (fadeFrame < fadeFrames) {
              requestAnimationFrame(fade);
            } else {
              circle.remove();
              // Flash the output ball
              const output = document.getElementById("outputLead");
              if (output) {
                output.setAttribute("fill", "#ff2fd1");
                setTimeout(() => output.setAttribute("fill", "#00ffe7"), 350);
              }
            }
          }
          fade();
        }
      }
      animate();
    }
  }
});
