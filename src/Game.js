import Tetromino from "./Tetromino.js";

/**
 * The all-encompassing object to describe the game state
 * @property {Number} score
 * @property {Number} tickTime
 * @property {Number} timer
 * @property {Number} blockSize
 */
export default class Game {
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    constructor(ctx, blockSize) {
        this.score = 0;
        this.ctx = ctx;
        this.ticktime = 500;
        this.blockSize = blockSize;
        this.tetromino = new Tetromino();
        this.timer = 0;
        window.setInterval(() => this.tick(), this.ticktime);
    }

    /** perform a tick down and all the logic */
    tick() {
        // this.checkCollisions();
        // this.clearFullRows();
        this.tetromino.pushDown();
        this.draw();
    }

    /** draw the game
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} blockSize
     */
    draw() {
        this.ctx.save();
        this.ctx.fillStyle = "#555";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.tetromino.draw(this.ctx, this.blockSize);
        this.ctx.restore();
    }
}
