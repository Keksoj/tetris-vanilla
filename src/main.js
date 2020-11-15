import Game from "./Game.js";

/** The width of the canvas' building blocks */
var blockSize = 30;

const canvas = document.getElementById("canvas");
canvas.width = 10 * blockSize;
canvas.height = 17 * blockSize;
var ctx = canvas.getContext("2d");

var game = new Game(ctx, blockSize);

document.onkeydown = (event) => {
    switch (event.key) {
        case "ArrowLeft":
            game.takeDirection("left");
            break;
        case "ArrowUp":
            game.takeDirection("turn");
            break;
        case "ArrowRight":
            game.takeDirection("right");
            break;
        case "ArrowDown":
            game.takeDirection("down");
            break;
        case " ":
            game.pause();
            return;
        default:
            return;
    }
};
