import Tetromino from './Tetromino.js';
import Cell from './Cell.js';

/**
 * The all-encompassing object to describe the game state
 * @property {Number} score
 * @property {Number} tickTime
 * @property {Number} timer
 * @property {Number} cellSize
 * @property {Tetromino} tetromino
 * @property {[Cell]} stack all cells are pushed here in order of arrival
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
        this.tetromino = new Tetromino();
        // this.nextMoveTetromino = new Tetromino();
        this.stack = [];
        this.timer = 0;
        window.setInterval(() => this.tick(), this.ticktime);
    }

    /** perform a tick down and all the logic */
    tick() {
        // this.clearFullRows();
        this.move('down');
    }

    /**
     * move the tetromino about
     * @param {String} direction
     */
    move(direction) {
        this.tetromino.move(direction);

        if (this.collisionOccurs() && direction === 'down') {
            this.tetromino.reverseTheMove(direction);
            this.writeTetrominoOnTheStack();
            this.tetromino = new Tetromino();
        } else if (this.collisionOccurs()) {
            this.tetromino.reverseTheMove(direction);
        }
        this.draw();
    }

    /** Check for collisions with walls, with the bottom, with the stack
     * @returns {Boolean}
     */
    collisionOccurs() {
        for (var i = 0; i < 4; i++) {
            // walls
            if (this.tetromino.cells[i].x < 0 || this.tetromino.cells[i].x > 9) {
                console.log('wall collision');
                return true;
            }
            // bottom
            if (this.tetromino.cells[i].y > 16) {
                console.log('bottom collision');
                return true;
            }
            // stack
            for (var j = 0; j < this.stack.length; j++) {
                if (
                    this.tetromino.cells[i].x == this.stack[j].x &&
                    this.tetromino.cells[i].y == this.stack[j].y
                ) {
                    console.log('collision with the stack');
                    return true;
                }
            }
        }
        console.log('no collision');
        return false;
    }

    /** Writes the tetromino coordinates and color on the stack */
    writeTetrominoOnTheStack() {
        console.log("that one won't go anywhere");
        for (var i = 0; i < 4; i++) {
            this.stack.push(this.tetromino.cells[i]);
        }
    }

    /** draw the game
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw() {
        this.ctx.save();
        this.ctx.fillStyle = '#555';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.stack.length; i++) {
            this.stack[i].draw(this.ctx, this.cellSize);
        }
        this.tetromino.draw(this.ctx, this.cellSize);
        this.ctx.restore();
    }
}
