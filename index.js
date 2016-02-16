const ctx = document.querySelector("#board").getContext("2d");

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


let off = 0;
const DRAW = (dt) => {
  off += 0.001 * dt;

  PLYGN(5, off, 30, 150, 50);
  PLYGN(8, -off, 30, 150, 50);
};

ctx.strokeStyle = "#ff0";

// Loopin'
let last;
const loopy = (t) => {
  requestAnimationFrame(loopy);
  if (!last) last = t;
  const dt = last - t;
  last = t;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  DRAW(dt);
};
requestAnimationFrame(loopy);
