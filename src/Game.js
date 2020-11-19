import Tetromino from './Tetromino.js';
import Stack from './Stack.js';
import { PAUSE_MESSAGES, LEVEL_TO_TICK_TIME } from './constants.js';
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
 * @property {Boolean} isOver
 
 */
export default class Game {
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    constructor(ctx, cellSize) {
        this.score = 0;
        this.lines = 0;
        this.level = 0;
        this.ctx = ctx;
        this.ticktime = 887;
        this.cellSize = cellSize;

        this.stack = new Stack();

        var firstTetromino = new Tetromino();
        firstTetromino.putInGame();
        this.tetromino = firstTetromino;

        this.nextTetromino = new Tetromino();
        this.onPause = false;
        this.isOver = false;

        this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }

    pause() {
        if (!this.onPause) {
            clearInterval(this.ticker);
            var rand = Math.round(Math.random() * PAUSE_MESSAGES.length);
            var message = PAUSE_MESSAGES[rand];
            this.displayText(`PAUSE\n${message}`);
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

            // clear rows, up the score
            this.stack.writeCells(this.tetromino.cells);
            var rows = this.stack.clearFullRows();
            this.updateTheScore(rows);
            console.log('score:', this.score);

            // game over
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

    /**
     * @param {Number} rows Number of rows cleared at a time
     */
    updateTheScore(rows) {
        this.lines += rows;
        switch (rows) {
            case 1:
                this.score += 40 * (this.level + 1);
                break;
            case 2:
                this.score += 100 * (this.level + 1);
                break;
            case 3:
                this.score += 300 * (this.level + 1);
                break;
            case 4:
                this.score += 1200 * (this.level + 1);
                break;
        }
        this.level = Math.floor(this.lines / 10);
        this.ticktime = LEVEL_TO_TICK_TIME[this.level];

        clearInterval(this.ticker);
        this.ticker = window.setInterval(() => this.tick(), this.ticktime);

        console.log(
            'lines:',
            this.lines,
            '  level:',
            this.level,
            ' score:',
            this.score,
            `tick time:`,
            this.ticktime
        );
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
        this.isOver = true;
        console.log('game over!');
        clearInterval(this.ticker);
        var comment;
        if (this.score >= 80) {
            comment = 'Are you God?';
        } else if (this.score >= 60) {
            comment = 'Really good';
        } else if (this.score >= 40) {
            comment = 'Fair game';
        } else if (this.score >= 20) {
            comment = 'At least you tried';
        } else if (this.score >= 0) {
            comment = 'You are a noob';
        }
        var scoreWithComment = `GAME OVER\nYour score is ${this.score}.\n${comment}.`;
        this.displayText(scoreWithComment);

        // this.displayText(`Game Over.\n${scoreWithComment}\nPress Enter to restart`);
    }

    displayText(text) {
        console.log(text);
        this.ctx.save();
        this.ctx.restore();
    }

    restart() {
        this.isOver = false;
        this.score = 0;
        this.stack = new Stack();
        this.ticktime = 900;
        var firstTetromino = new Tetromino();
        firstTetromino.putInGame();
        this.tetromino = firstTetromino;
        this.nextTetromino = new Tetromino();
        this.onPause = false;
        this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }

    /** draw the game
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw() {
        this.ctx.save();

        // the score pannel
        this.ctx.fillStyle = '#444';
        this.ctx.fillRect(canvas.width - 6 * this.cellSize, 0, 6 * this.cellSize, canvas.height);
        this.nextTetromino.draw(this.ctx, this.cellSize);

        // fill the playing board
        this.ctx.fillStyle = '#145';
        this.ctx.fillRect(0, 0, 10 * this.cellSize, 20 * this.cellSize);

        // the stack
        this.stack.draw(this.ctx, this.cellSize);

        // the tetromino
        this.tetromino.draw(this.ctx, this.cellSize);
        this.ctx.restore();
    }
}

// I would be glad to replace the gameOver() boilerplate with this:
const SCORE_COMMENT = [
    { threshold: 80, comment: 'Are you God?' },
    { threshold: 60, comment: 'Really good' },
    { threshold: 40, comment: 'Fair game' },
    { threshold: 20, comment: 'At least you tried' },
    { threshold: 0, comment: 'You are a noob' },
];
