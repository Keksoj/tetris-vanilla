import Tetromino from './Tetromino.js';
import Stack from './Stack.js';
import Cell from './Cell.js';

/**
 * The all-encompassing object to describe the game state
 * @property {Number} score
 * @property {Number} tickTime
 * @property {Number} cellSize
 * @property {Tetromino} tetromino
 * @property {Tetromino} nextTetromino
 * @property {Stack} stack
 * @property {Boolean} onPause
 * @property {}
 
 */
export default class Game {
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    constructor(ctx, cellSize) {
        this.score = 0;
        this.ctx = ctx;
        this.ticktime = 900;
        this.cellSize = cellSize;

        this.stack = new Stack();

        var firstTetromino = new Tetromino();
        firstTetromino.putInGame();
        this.tetromino = firstTetromino;

        this.nextTetromino = new Tetromino();
        this.onPause = false;

        this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }

    pause() {
        if (!this.onPause) {
            clearInterval(this.ticker);
            this.onPause = true;
        } else {
            this.ticker = window.setInterval(() => this.tick(), this.ticktime);
            this.onPause = false;
        }
    }

    /** perform a tick down and all the logic */
    tick() {
        // this.clearFullRows();
        this.move('down');
        this.draw(this.ctx, this.cellSize);
    }

    /**
     * move the tetromino about
     * @param {String} direction
     */
    move(direction) {
        this.tetromino.move(direction);
        if (this.collisionOccurs() && direction === 'down') {
            this.tetromino.reverseTheMove('down');
            this.stack.writeCells(this.tetromino.cells);
            this.score += this.stack.clearFullRows();
            console.log(this.score);
            if (this.stack.overflows()) {
                console.log('we try to stop the game');
                this.gameOver();
                return;
            }

            this.tetromino = this.nextTetromino;
            this.tetromino.putInGame();
            this.nextTetromino = new Tetromino();
            this.tetromino.draw(this.ctx, this.cellSize);
        } else if (this.collisionOccurs()) {
            this.tetromino.reverseTheMove(direction);
        }
        this.draw(this.ctx, this.cellSize);
    }

    /** Check for collisions with walls, with the bottom, with the stack
     * @returns {Boolean}
     */
    collisionOccurs() {
        for (var i = 0; i < 4; i++) {
            var xPos = this.tetromino.cells[i].x;
            var yPos = this.tetromino.cells[i].y;
            // walls
            if (xPos < 0 || xPos > 9) {
                console.log('wall collision');
                return true;
            }
            // bottom
            if (yPos > 19) {
                console.log('bottom collision');
                return true;
            }
            // stack
            if (yPos > 0) {
                if (this.stack.rows[yPos][xPos] !== 'empty') {
                    console.log('collision with the stack');
                    return true;
                }
            }
        }
        // console.log('no collision');
        return false;
    }

    gameOver() {
        console.log('game over!');
        clearInterval(this.ticker);
        this.ctx.save();
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(
            3.5 * this.cellSize,
            7.5 * this.cellSize,
            10 * this.cellSize,
            5 * this.cellSize
        );

        this.ctx.restore();
    }

    /** draw the game
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw() {
        this.ctx.save();

        // the score pannel
        this.ctx.fillStyle = '#444';
        this.ctx.fillRect(canvas.width - 300, 0, 300, canvas.height);
        this.nextTetromino.draw(this.ctx, this.cellSize);

        // fill the playing board
        this.ctx.fillStyle = '#145';
        this.ctx.fillRect(0, 0, canvas.width - 300, canvas.height);

        // the stack
        this.stack.draw(this.ctx, this.cellSize);

        // the tetromino
        this.tetromino.draw(this.ctx, this.cellSize);
        this.ctx.restore();
    }
}
