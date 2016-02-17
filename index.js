const ctx = document.querySelector("#board").getContext("2d");
const {width, height} = ctx.canvas;

const PLYGN = (N, ANGLE, R, XCTR, YCTR) => {
  ctx.beginPath();
  for (let J = 0; J < N; J++) {
    const X = R * Math.cos(Math.PI * 2 * J / N + ANGLE) + XCTR;
    const Y = R * Math.sin(Math.PI * 2 * J / N + ANGLE) + YCTR;

    ctx[J === 0 ? "moveTo" : "lineTo"](X, Y);
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
  time += dt;

  const CTX = width * 0.5;
  const CTY = height * 0.5;

  PLYGN(5, off, 30, CTX, CTY);
  PLYGN(8, -off, 30, CTX, CTY);

  EXPAND(time / 10, width * 0.5, -height * 0.5);
  EXPAND(time / 10, width * 0.5, height * 0.5);
  EXPAND(time / 10, width * 0.5, height * 1.5);

  EXPAND(time / 10, -width * 0.5, height * 0.5);
  EXPAND(time / 10, width * 1.5, height * 0.5);

  EXPAND((time - 11000) / 10, CTX, CTY)

  if (time > 11 * 1000) {
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
