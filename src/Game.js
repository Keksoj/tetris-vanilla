import Tetromino from './Tetromino.js';
import Cell from './Cell.js';

/**
 * The all-encompassing object to describe the game state
 * @property {Number} score
 * @property {Number} tickTime
 * @property {Number} timer
 * @property {Number} cellSize
 * @property {Tetromino} tetromino
 
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

        this.stack = [];
        for (var i = 0; i < 17; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push('empty');
            }
            this.stack.push(row);
        }

        var firstTetromino = new Tetromino();
        firstTetromino.putInGame();
        this.tetromino = firstTetromino;
        this.nextTetromino = new Tetromino();
        this.timer = 0;
        window.setInterval(() => this.tick(), this.ticktime);
    }

    /** perform a tick down and all the logic */
    tick() {
        // this.clearFullRows();
        // this.move('down');
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
            this.tetromino = this.nextTetromino;
            this.tetromino.putInGame();
            this.nextTetromino = new Tetromino();
            this.nextTetromino.draw(this.ctx, this.cellSize);
            this.draw(this.ctx, this.cellSize);
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
            var xPos = this.tetromino.cells[i].x;
            var yPos = this.tetromino.cells[i].y;
            // walls
            if (xPos < 0 || xPos > 9) {
                console.log('wall collision');
                return true;
            }
            // bottom
            if (yPos > 16) {
                console.log('bottom collision');
                return true;
            }
            // stack
            if (this.stack[yPos][xPos] !== 'empty') {
                console.log('collision with the stack');
                return true;
            }
        }
        // console.log('no collision');
        return false;
    }

    /** Pushes the tetromino on the stack */
    writeTetrominoOnTheStack() {
        console.log("that one won't go anywhere:", this.tetromino.name);
        for (var i = 0; i < 4; i++) {
            var cell = this.tetromino.cells[i];

            this.stack[cell.y][cell.x] = cell.color;
        }
        console.log(this.stack);
        // this.clearFullRows();
    }

    clearFullRows() {
        let fullRows = [];
        for (var y = 0; y < 17; y++) {
            // console.log('Rows ', fullRows, ' are full');
        }

        for (var i; i < fullRows.length; i++) {}
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
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, canvas.width - 300, canvas.height);

        // the stack
        for (var y = 0; y < 17; y++) {
            for (var x = 0; x < 10; x++) {
                this.ctx.save();
                this.ctx.fillStyle = this.stack[y][x];
                // console.log(this.stack[i][j]);
                this.ctx.fillRect(
                    x * this.cellSize,
                    y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
                this.ctx.restore();
            }
        }

        // the tetromino
        this.tetromino.draw(this.ctx, this.cellSize);
        this.ctx.restore();
    }
}
