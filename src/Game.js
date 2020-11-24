import Tetromino from './Tetromino.js';
import Stack from './Stack.js';
import KeyboardManager from './KeyboardManager.js';
import { PAUSE_MESSAGES, LEVEL_TO_TICK_TIME, SCORE_COMMENT } from './constants.js';
import Cell from './Cell.js';

/**
 * The all-encompassing object to describe the game state
 * @property {Number} score
 * @property {Number} lines
 * @property {Number} level
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
        this.keyboardManager = new KeyboardManager();

        this.stack = new Stack();

        var firstTetromino = new Tetromino();
        firstTetromino.putInGame();
        this.tetromino = firstTetromino;

        this.nextTetromino = new Tetromino();
        this.onPause = false;
        this.isOver = false;
        this.startAsyncTicker();
    }

    async OnUpdate(time, deltaTime) {
        // console.log({time: time, deltaTime: deltaTime})
        await this.keyboardManager.fillBuffer();
        this.move(this.keyboardManager.consumeBuffer());
    }

    async startAsyncTicker() {
        this.ticker = await window.setInterval(() => this.tick(), this.ticktime);
    }

    /** perform a tick down and all the logic */
    tick() {
        this.move('down');
    }

    async pause() {
        if (!this.isOver) {
            if (!this.onPause) {
                clearInterval(this.ticker);
                var message = PAUSE_MESSAGES[Math.round(Math.random() * PAUSE_MESSAGES.length)];
                this.displayMessage('PAUSE', message, '', '(press P to unpause)');
                this.onPause = true;
            } else {
                this.draw();
                this.ticker = window.setInterval(() => this.tick(), this.ticktime);
                this.onPause = false;
            }
        }
    }

    /**
     * move the tetromino about
     * @param {String} direction
     */
    move(direction) {
        if (!this.isOver && !this.onPause) {
            this.tetromino.move(direction);
            if (this.collisionOccurs() && direction === 'down') {
                this.tetromino.reverseTheMove('down');
                this.lockTetromino();
            } else if (this.collisionOccurs()) {
                this.tetromino.reverseTheMove(direction);
            } else {
                this.draw(this.ctx, this.cellSize);
            }
        }
    }

    async sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    /** Drops the tetromino all the way down */
    async hardDrop() {
        if (!this.onPause && !this.isOver) {
            var hitBottom = false;
            while (!hitBottom) {
                this.tetromino.move('down');
                this.draw(this.ctx, this.cellSize);
                if (this.collisionOccurs()) {
                    this.tetromino.reverseTheMove('down');
                    hitBottom = true;
                }
                await this.sleep(10);
                this.draw(this.ctx, this.cellSize);
            }
            this.lockTetromino();
        }
    }

    /** Lock the tetromino, clear rows, update the score */
    async lockTetromino() {
        this.stack.writeCells(this.tetromino.cells);
        var rows = await this.stack.clearFullRows();
        this.updateTheScore(rows);

        if (this.stack.overflows()) {
            this.gameOver();
            return;
        } else {
            this.newTetromino();
            this.draw();
        }
    }

    newTetromino() {
        this.keyboardManager.clearBuffer();
        this.tetromino = this.nextTetromino;
        this.tetromino.putInGame();
        this.nextTetromino = new Tetromino();
        this.draw();
    }

    /** updates score and tickTime
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
        for (var i = 0; i < SCORE_COMMENT.length; i++) {
            if (this.score >= SCORE_COMMENT[i].threshold) {
                comment = SCORE_COMMENT[i].comment;
                break;
            }
        }
        this.displayMessage(
            'GAME OVER',
            `score = ${this.score}.`,
            comment,
            'Press ENTER to restart'
        );
    }

    /** displays pause or game over message
     * @param {String} mainMessage
     * @param {String} comment
     * @param {String} secondcomment
     * @param {String} typeInstruction
     */
    displayMessage(mainMessage, comment, secondcomment, typeInstruction) {
        console.log(mainMessage, comment, typeInstruction);
        this.ctx.save();
        this.ctx.fillStyle = 'darkslateblue';
        this.ctx.fillRect(
            this.cellSize * 0.5,
            this.cellSize * 5.5,
            this.cellSize * 15,
            this.cellSize * 7
        );
        this.ctx.font = '30px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(mainMessage, canvas.width / 2, canvas.height / 2 - 40);
        this.ctx.font = '15px monospace';
        this.ctx.fillText(comment, canvas.width / 2, canvas.height / 2);
        this.ctx.fillText(secondcomment, canvas.width / 2, canvas.height / 2 + 30);
        this.ctx.font = '13px monospace';
        this.ctx.fillText(typeInstruction, canvas.width / 2, canvas.height / 2 + 60);
        this.ctx.restore();
    }

    restart() {
        if (this.isOver) {
            this.isOver = false;
            this.score = 0;
            this.level = 0;
            this.lines = 0;
            this.stack = new Stack();
            this.ticktime = 887;
            var firstTetromino = new Tetromino();
            firstTetromino.putInGame();
            this.tetromino = firstTetromino;
            this.nextTetromino = new Tetromino();
            this.onPause = false;
            this.ticker = window.setInterval(() => this.tick(), this.ticktime);
            this.draw();
        }
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
        this.ctx.font = '18px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';

        this.ctx.fillText(`Level ${this.level}`, 13 * this.cellSize, 12 * this.cellSize);
        this.ctx.font = '30px monospace';
        this.ctx.fillText(`${this.score}`, 13 * this.cellSize, 14 * this.cellSize);
        this.ctx.font = '10px monospace';
        this.ctx.fillText(`Press [SPACE] for harddrop`, 13 * this.cellSize, 16 * this.cellSize);
        this.ctx.fillText(`Press P for pause`, 13 * this.cellSize, 17 * this.cellSize);

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
