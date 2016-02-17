const ctx = document.querySelector("#board").getContext("2d");
const {width, height} = ctx.canvas;
const CTX = width * 0.5;
const CTY = height * 0.5;
ctx.strokeStyle = "#fff";

const PLYGN = (N, ANGLE, R, XCTR, YCTR) => {
  ctx.beginPath();
  for (let J = 0; J < N; J++) {
    const X = R * Math.cos(Math.PI * 2 * J / N + ANGLE) + XCTR;
    const Y = R * Math.sin(Math.PI * 2 * J / N + ANGLE) + YCTR;

    ctx[J ? "lineTo" : "moveTo"](X, Y);
  }
  ctx.closePath();
  ctx.stroke();
};

const CIRCLE = (R, XCTR, YCTR) => PLYGN(60, R, R, XCTR, YCTR);

let time = 0;
const length = 1180;
const DRAW = (dt) => {
  time += dt * 0.1;
  const t = time % length;

  CIRCLE(t, CTX, CTY);

  CIRCLE(t, -CTX, CTY);
  CIRCLE(t, CTX, -CTY);
  CIRCLE(t, CTX + width, CTY);
  CIRCLE(t, CTX, CTY + height);

  CIRCLE(t, -CTX, -CTY);
  CIRCLE(t, CTX + width, -CTY);
  CIRCLE(t, -CTX, CTY + height);
  CIRCLE(t, CTX + width, CTY + height);

  // Final circle
  CIRCLE(t - length, CTX, CTY);

  // The polygons
  PLYGN(5, time / 100, 30, CTX, CTY);
  PLYGN(8, -time / 100, 30, CTX, CTY);
};

// Loopin'
let last;
const loopy = t => {
  requestAnimationFrame(loopy);
  if (!last) last = t;
  const dt = t - last;
  last = t;

  ctx.globalAlpha = 0.9;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;
  DRAW(dt);
};
requestAnimationFrame(loopy);
