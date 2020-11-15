import { sayhi, Tetromino } from "./tetromino.js";

/**
 * @typedef {object} Tetromino
 * @property {Number} spin
 * @property {[{x: number, y: number}]} blocks
 */

var blockSize = 30;
var timer;

const canvas = document.getElementById("canvas");
canvas.width = 10 * blockSize;
canvas.height = 17 * blockSize;
var ctx = canvas.getContext("2d");

sayhi();

/**
 * The all-encompassing object to describe the game state
 * @property {Number} score
 * @property {Tetromino} [tetromino]
 */
const game = {
    score: 0,
    tetromino: null,
};

start();

function start() {
    game.score = 5;
    game.tetromino = new Tetromino();
    console.log(game);
    game.tetromino;
}
