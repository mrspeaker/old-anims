(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var ctx = document.querySelector("#board").getContext("2d");

var PLYGN = function PLYGN(N, ANGLE, R, XCTR, YCTR) {
  ctx.beginPath();
  for (var J = 0; J < N; J++) {
    var X = R * Math.cos(Math.PI * 2 * J / N + ANGLE) + XCTR;
    var Y = R * Math.sin(Math.PI * 2 * J / N + ANGLE) + YCTR;

    ctx[J === 0 ? "moveTo" : "lineTo"](X, Y);
  }
  ctx.closePath();
  ctx.stroke();
};

var off = 0;
var DRAW = function DRAW(dt) {
  off += 0.001 * dt;

  PLYGN(5, off, 30, 150, 50);
  PLYGN(8, -off, 30, 150, 50);
};

ctx.strokeStyle = "#ff0";

// Loopin'
var last = undefined;
var loopy = function loopy(t) {
  requestAnimationFrame(loopy);
  if (!last) last = t;
  var dt = last - t;
  last = t;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  DRAW(dt);
};
requestAnimationFrame(loopy);

},{}]},{},[1]);
