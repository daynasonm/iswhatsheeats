// yawye.js

// one animation loop for each track
document.querySelectorAll('.track').forEach(track => {
  const speed = Number(track.dataset.speed) || 60; // seconds per turn
  const start = Number(track.dataset.angle) || 0;  // starting angle in degrees
  const degPerMs = 360 / (speed * 1000);

  function step(time) {
    const angle = start + time * degPerMs;
    track.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
});
