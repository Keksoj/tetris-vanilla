import Game from './Game.js';

/** The width of the canvas' building cells */
var cellSize = 32;

const canvas = document.getElementById('canvas');
canvas.width = 16 * cellSize;
canvas.height = 18 * cellSize;
var ctx = canvas.getContext('2d');

var game = new Game(ctx, cellSize);
// game.tick();

document.onkeydown = (event) => {
    console.log(event);
    switch (event.key) {
        case 'ArrowLeft':
            game.move('left');
            break;
        case 'ArrowUp':
            game.move('turn');
            break;
        case 'ArrowRight':
            game.move('right');
            break;
        case 'ArrowDown':
            game.move('down');
            break;
        case 'p':
            game.pause();
            break;
        case ' ':
            game.hardDrop();
            return;
        case 'Enter':
            game.restart();
            break;
        default:
            return;
    }
};
