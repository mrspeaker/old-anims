const ctx = document.querySelector("#board").getContext("2d");
const {width, height} = ctx.canvas;

const CTX = width * 0.5;
const CTY = height * 0.5;

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

const EXPAND = (TIME, XCTR, YCTR) => {
  PLYGN(30, 0, TIME, XCTR, YCTR);
};


let off = 0;
let time = 0;
const DRAW = (dt) => {
  off += 0.001 * dt;
  time += dt * 0.1;

  PLYGN(5, off, 30, CTX, CTY);
  PLYGN(8, -off, 30, CTX, CTY);

  EXPAND(time, CTX, -CTY);
  EXPAND(time, CTX, CTY);
  EXPAND(time, CTX, height * 1.5);
  EXPAND(time, -CTX, CTY);
  EXPAND(time, width * 1.5, CTY);

  EXPAND(time - 1100, CTX, CTY);
  if (time > 1100) {
    time = 0;
  }
};

ctx.strokeStyle = "#ff0";

// Loopin'
let last;
const loopy = (t) => {
  requestAnimationFrame(loopy);
  if (!last) last = t;
  const dt = t - last;
  last = t;

  ctx.clearRect(0, 0, width, height);
  DRAW(dt);
};
requestAnimationFrame(loopy);
