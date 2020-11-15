import Game from "./Game.js";

/** The width of the canvas' building blocks */
var blockSize = 30;

const canvas = document.getElementById("canvas");
canvas.width = 10 * blockSize;
canvas.height = 17 * blockSize;
var ctx = canvas.getContext("2d");

new Game(ctx, blockSize);
