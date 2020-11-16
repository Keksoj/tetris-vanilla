import Tetromino from "./Tetromino.js";
import Cell from "./Cell.js";

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
        this.ticktime = 10000;
        this.cellSize = cellSize;
        this.tetromino = new Tetromino();
        // this.nextMoveTetromino = new Tetromino();
        this.stack = [new Cell(5, 5, "green")];
        this.timer = 0;
        window.setInterval(() => this.tick(), this.ticktime);
    }

    /** perform a tick down and all the logic */
    tick() {
        // this.takeDirection();
        // this.checkCollisions();
        // this.clearFullRows();
        // this.takeDirection("down");
        // this.draw();
    }

    /**
     * move the tetromino about
     * @param {String} direction
     */
    takeDirection(direction) {
        // this.tetromino.move = direction;
        // console.log(direction);


        this.tetromino.computeTheMove(direction);
        // console.log(this.tetromino.nextMoveSimulation);
        if (!this.collisionOccurs()) {
            console.log("the game detected no collision");
            this.tetromino.settleTheMove();
        }
        // if (this.collisionOccurs && this.tetromino.move === "down") {
        //     this.writeTetrominoOnTheStack();
        // }
        this.draw();
    }

    /** Check for collisions with walls, with the bottom, with the stack
     * @returns {Boolean}
     */
    collisionOccurs() {
        for (var i = 0; i < 4; i++) {
            // walls
            if (
                this.tetromino.simulationCoordinates[i].x < 0 ||
                this.tetromino.simulationCoordinates[i].x > 9
            ) {
                console.log("wall collision");
                return true;
            }
            // bottom
            if (this.tetromino.simulationCoordinates[i].y > 17) {
                console.log("bottom collision");
                return true;
            }
            // stack
            for (var j = 0; j < this.stack.length; j++) {
                if (
                    this.tetromino.simulationCoordinates[i].x == this.stack[j].x &&
                    this.tetromino.simulationCoordinates[i].y == this.stack[j].y
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
            this.stack.push(this.tetromino.cells[i]);
        }
        this.tetromino = new Tetromino();
    }

    /** draw the game
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw() {
        this.ctx.save();
        this.ctx.fillStyle = "#555";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.stack.length; i++) {
            this.stack[i].draw(this.ctx, this.cellSize);
        }
        this.tetromino.draw(this.ctx, this.cellSize);
        this.ctx.restore();
    }
}
