import Tetromino from "./Tetromino.js";

/**
 * The all-encompassing object to describe the game state
 * @property {Number} score
 * @property {Number} tickTime
 * @property {Number} timer
 * @property {Number} blockSize
 * @property {Tetromino} tetromino
 * @property {[{x: Number, y: Number, color: String}]} stack
 */
export default class Game {
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} blockSize
     */
    constructor(ctx, blockSize) {
        this.score = 0;
        this.ctx = ctx;
        this.ticktime = 900;
        this.blockSize = blockSize;
        this.tetromino = new Tetromino();
        this.stack = [];
        this.timer = 0;
        window.setInterval(() => this.tick(), this.ticktime);
    }

    /** perform a tick down and all the logic */
    tick() {
        // this.takeDirection();
        // this.checkCollisions();
        // this.clearFullRows();
        this.takeDirection("down");
        // this.draw();
    }

    takeDirection(direction) {
        this.tetromino.move = direction;
        console.log(direction);
        this.tetromino.computeTheMove();
        console.log(this.tetromino.nextMoveSimulation);
        if (!this.collisionOccurs()) {
            this.tetromino.settleTheMove();
        }
        this.draw();
    }

    /** Check for collisions with walls, with the bottom, with the stack
     * @returns {Boolean}
     */
    collisionOccurs() {
        for (var i = 0; i < 4; i++) {
            // walls
            if (
                this.tetromino.blocks[i].x < 0 ||
                this.tetromino.blocks[i].x > 9
            ) {
                console.log("wall collision");
                return true;
            }
            // bottom
            if (this.tetromino.blocks[i].y > 17) {
                console.log("bottom collision");
                return true;
            }
            // stack
            for (var j = 0; j < this.stack.length; j++) {
                if (
                    this.tetromino.blocks[i].x == this.stack[j].x &&
                    this.tetromino.blocks[i].y == this.stack[j].y
                ) {
                    console.log("collision with the stack");
                    return true;
                }
            }
        }
        return false;
    }

    /** Writes the tetromino coordinates and color on the stack */
    writeTetrominoOnTheStack() {
        for (var i = 0; i < 4; i++) {
            this.stack.push({
                x: this.tetromino.blocks[i].x,
                y: this.tetromino.blocks[i].y,
                color: this.tetromino.color,
            });
        }
        game.tetromino = new Tetromino();
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
