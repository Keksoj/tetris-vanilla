import Game from './Game.js';

/** The width of the canvas' building cells */
var cellSize = 32;

const canvas = document.getElementById('canvas');
canvas.width = 16 * cellSize;
canvas.height = 18 * cellSize;
var ctx = canvas.getContext('2d');

var game = new Game(ctx, cellSize);
// game.tick();

document.onkeypress = (event) => {
    // console.log(event.key);
    switch (event.key) {
        case 't':
            game.move('left');
            break;
        case 'd':
            game.move('turn');
            break;
        case 'r':
            game.move('right');
            break;
        case 's':
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

document.addEventListener('keydown', function (event) {
    console.log(event.key);
    game.addPushedKey(event.key);
});
document.addEventListener('keyup', function (event) {
    console.log(game.arrowUpIsDown);
    game.keyIsReleased(event.key);
});

var lastTime = 0;

function update(time)
{
    game.update(time, time - lastTime);
    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);