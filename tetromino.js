function tickDown(tetromino) {
    for (i = 0; i < 4; i++) {
        tetromino.blocks[i].y -= 1;
    }
}
function pushLeft(tetromino) {
    for (i = 0; i < 4; i++) {
        tetromino.blocks[i].x -= 1;
    }
}
function pushRight(tetromino) {
    for (i = 0; i < 4; i++) {
        tetromino.blocks[i].x += 1;
    }
}

/**
 * A group a four blocks to move around
 * @typedef {object} Tetromino
 * @property {Number} spin
 * @property {[{x: number, y: number}]} blocks
 * 
 */
class Tetromino {
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

    tickDown() {
        for (var i = 0; i < 4; i++) {
            this.blocks[i].y -= 1;
        }
    }
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
    /** draw the tetromino on the canvas */
    draw(ctx, blockSize) {
        ctx.save();
        ctx.fillStyle = "#ff0000";
        for (var i = 0; i < 4; i++) {
            ctx.fillRect(
                this.blocks[i].x * 30,
                this.blocks[i].y * 30,
                blockSize,
                blockSize
            );
        }
        ctx.restore();
    }
}

class truc extends Tetromino {
    constructor() {
        super("t");
    }
}

const sayhi = () => {
    console.log("hi");
};
export { sayhi, Tetromino };
