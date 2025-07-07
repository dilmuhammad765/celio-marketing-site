document.addEventListener("DOMContentLoaded", function() {
  // Number animation for stats and metrics
  function animateNumber(el, to, suffix = '', duration = 1300) {
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

  // Interactive animated funnel balls
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
      circle.style.cursor = "pointer";
      circle.setAttribute("data-idx", i);
      circle.addEventListener("click", () => dropBall(circle));
      inputBallsGroup.appendChild(circle);
    });

    function dropBall(circle) {
      if (circle.getAttribute("data-dropping")) return;
      circle.setAttribute("data-dropping", "1");
      const startY = parseFloat(circle.getAttribute("cy"));
      const endY = 210; // Funnel output Y
      const startX = parseFloat(circle.getAttribute("cx"));
      const endX = 130; // Funnel center X
      const startR = parseFloat(circle.getAttribute("r"));
      let frame = 0, frames = 35;

      function animate() {
        frame++;
        let t = frame / frames;
        circle.setAttribute("cy", startY + (endY - startY) * easeOutCubic(t));
        circle.setAttribute("cx", startX + (endX - startX) * t);
        if (frame < frames) {
          requestAnimationFrame(animate);
        } else {
          shrinkAndReset(circle, startX, startY, startR);
          flashOutputLead();
        }
      }
      requestAnimationFrame(animate);
    }

    function shrinkAndReset(circle, origX, origY, origR) {
      let frame = 0, frames = 13;
      function fade() {
        frame++;
        let t = frame / frames;
        circle.setAttribute("r", Math.max(0, origR * (1 - t)));
        circle.setAttribute("opacity", 1 - t);
        if (frame < frames) {
          requestAnimationFrame(fade);
        } else {
          // Reset ball position & opacity
          circle.setAttribute("cx", origX);
          circle.setAttribute("cy", origY);
          circle.setAttribute("r", origR);
          circle.setAttribute("opacity", 1);
          circle.removeAttribute("data-dropping");
        }
      }
      requestAnimationFrame(fade);
    }

    function flashOutputLead() {
      const output = document.getElementById("outputLead");
      if (output) {
        output.setAttribute("fill", "#ff2fd1");
        setTimeout(() => output.setAttribute("fill", "#00ffe7"), 350);
      }
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
  }
});
