/**
 * A group a four blocks to move around
 * @typedef {object} Tetromino
 * @property {Number} spin
 * @property {[{x: number, y: number}]} blocks
 *
 */
export default class Tetromino {
    /**
     * all possible coordinates for Tetrominoes
     * @type {[{x: number, y: number}]} coordinates
     */
    blockCoordinates = [
        // T
        [
            { x: 4, y: 17 },
            { x: 5, y: 17 },
            { x: 6, y: 17 },
            { x: 5, y: 18 },
        ],
        // L
        [
            { x: 5, y: 19 },
            { x: 5, y: 18 },
            { x: 5, y: 17 },
            { x: 6, y: 17 },
        ],
    ];

    constructor() {
        var type = Math.round(
            Math.random() * (this.blockCoordinates.length - 1)
        );

        this.spin = 0;
        this.blocks = this.blockCoordinates[type];
    }
    /** Push to the bottom */
    pushDown() {
        for (var i = 0; i < 4; i++) {
            this.blocks[i].y -= 1;
        }
    }
    /** Push to the left */
    pushLeft() {
        for (var i = 0; i < 4; i++) {
            this.blocks[i].x -= 1;
        }
    }
    /** Push to the right */
    pushRight() {
        for (var i = 0; i < 4; i++) {
            this.blocks[i].x += 1;
        }
    }

    /** draw the tetromino on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} blockSize
     */
    draw(ctx, blockSize) {
        ctx.save();
        ctx.fillStyle = "#ff0000";
        for (var i = 0; i < 4; i++) {
            ctx.fillRect(
                this.blocks[i].x * blockSize,
                this.blocks[i].y * blockSize,
                blockSize,
                blockSize
            );
        }

        ctx.restore();
    }
}
