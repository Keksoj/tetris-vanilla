import Game from "./Game.js";

/** The width of the canvas' building cells */
var cellSize = 30;

const canvas = document.getElementById("canvas");
canvas.width = 10 * cellSize;
canvas.height = 17 * cellSize;
var ctx = canvas.getContext("2d");

var game = new Game(ctx, cellSize);
// console.log(game);

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
