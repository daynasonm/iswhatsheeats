// yawye.js  – expanded orbits across (almost) the whole screen

const field   = document.querySelector(".orbit-field");
const planets = Array.from(document.querySelectorAll(".planet"));

let state    = [];
let lastTime = 0;

function setup() {
  if (!field) return;

  const rect  = field.getBoundingClientRect();
  const halfW = rect.width / 2;
  const halfH = rect.height / 2;

  // Keep a little padding so circles don’t hit the very edges
  const marginX = rect.width  * 0.10;   // 10% horizontal padding
  const marginY = rect.height * 0.12;   // 12% vertical padding

  // Maximum radii we’ll allow any orbit to have
  const maxRX = halfW - marginX;        // big horizontal reach
  const maxRY = halfH - marginY;        // big vertical reach

  planets.forEach((planet, i) => {
    let s = state[i] || {};

    // data-radius is a *fraction* of the max radius (0.1–1.2 ish)
    let frac = parseFloat(planet.dataset.radius);
    if (Number.isNaN(frac)) frac = 0.6;
    frac = Math.max(0.1, Math.min(frac, 1.2));

    // give this planet its ellipse
    s.rx = frac * maxRX;
    s.ry = frac * maxRY;

    // only initialise angle/speed once
    if (s.angle == null) {
      const startDeg = parseFloat(planet.dataset.angle) || 0;
      const speedDeg = parseFloat(planet.dataset.speed) || 4.5; // deg / sec

      s.angle = (startDeg * Math.PI) / 180;
      s.speed = (speedDeg * Math.PI) / 180;      // rad / sec

      // tiny random offset so they don’t march in a line
      s.angle += Math.random() * 0.4;
    }

    state[i] = s;
  });
}

function step(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const dt = (timestamp - lastTime) / 1000;  // seconds since last frame
  lastTime = timestamp;

  const rect = field.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  planets.forEach((planet, i) => {
    const s = state[i];
    if (!s) return;

    // advance angle
    s.angle += s.speed * dt;

    // ellipse position relative to centre
    const x = cx + s.rx * Math.cos(s.angle);
    const y = cy + s.ry * Math.sin(s.angle);

    // absolutely position each planet inside the orbit-field
    planet.style.left = `${x}px`;
    planet.style.top  = `${y}px`;

    // keep the planet itself centred on that point
    planet.style.transform = "translate(-50%, -50%)";
  });

  requestAnimationFrame(step);
}

window.addEventListener("resize", setup);

setup();
requestAnimationFrame(step);
