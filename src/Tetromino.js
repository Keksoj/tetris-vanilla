/**
 * A group a four blocks to move around
 * @typedef {object} Tetromino
 * @property {Number} spin
 * @property {String} none
 * @property {[{x: number, y: number}]} blocks
 * @property {[String]} name
 * @property {[String]} color
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
            { x: 3, y: -1 },
            { x: 4, y: -1 },
            { x: 5, y: -1 },
            { x: 4, y: -2 },
        ],
        // I
        [
            { x: 4, y: -4 },
            { x: 4, y: -3 },
            { x: 4, y: -2 },
            { x: 4, y: -1 },
        ],
        // S
        [
            { x: 5, y: -2 },
            { x: 4, y: -2 },
            { x: 4, y: -1 },
            { x: 3, y: -1 },
        ],
        // Z
        [
            { x: 3, y: -2 },
            { x: 4, y: -2 },
            { x: 4, y: -1 },
            { x: 5, y: -1 },
        ],
        // O
        [
            { x: 4, y: -2 },
            { x: 5, y: -2 },
            { x: 4, y: -1 },
            { x: 5, y: -1 },
        ],
        // L
        [
            { x: 4, y: -3 },
            { x: 4, y: -2 },
            { x: 4, y: -1 },
            { x: 5, y: -1 },
        ],
        // J
        [
            { x: 5, y: -3 },
            { x: 5, y: -2 },
            { x: 5, y: -1 },
            { x: 6, y: -1 },
        ],
    ];

    /**
     * all names for tetrominoes, same order
     * @type {[String]} name
     */
    allNames = ["T", "I", "S", "Z", "O", "L", "J"];

    /** all colors that go with each tetromino
     * @type {[String]} color
     */
    allColors = [
        "orange",
        "red",
        "green",
        "lightblue",
        "blue",
        "purple",
        "white",
    ];

    constructor() {
        var randomPicker = Math.round(
            Math.random() * (this.blockCoordinates.length - 1)
        );

        this.spin = 0;
        this.move = "none";
        this.name = this.allNames[randomPicker];
        this.color = this.allColors[randomPicker];
        this.blocks = this.blockCoordinates[randomPicker];

        this.nextMoveSimulation = [
            { x: 2, y: -2 },
            { x: 3, y: -1 },
            { x: 4, y: 1 },
            { x: 5, y: 2 },
        ];
    }

    /** take direction to move the tetromino
     */
    computeTheMove() {
        this.nextMoveSimulation = this.blocks;
        switch (this.move) {
            case "left":
                this.pushLeft();
                break;
            case "right":
                this.pushRight();
                break;
            case "down":
                this.pushDown();
                break;
            case "turn":
                this.turn();
                break;
            default:
                break;
        }
    }
    settleTheMove() {
        this.blocks = this.nextMoveSimulation;
    }

    /** Push to the bottom */
    pushDown() {
        for (var i = 0; i < 4; i++) {
            this.nextMoveSimulation[i].y += 1;
        }
    }
    /** Push to the left */
    pushLeft() {
        for (var i = 0; i < 4; i++) {
            this.nextMoveSimulation[i].x -= 1;
        }
    }
    /** Push to the right */
    pushRight() {
        for (var i = 0; i < 4; i++) {
            this.nextMoveSimulation[i].x += 1;
        }
    }
    /** turn the tetromino (affects the spin property too) */
    turn() {
        switch (this.spin) {
            case 0:
                switch (this.name) {
                    case "T":
                        this.blocks[0].x += 1;
                        this.blocks[1].y -= 1;
                        break;
                    case "I":
                    case "S":
                    case "Z":
                    case "L":
                    case "J":
                }
                self.spin += 1;
                break;
            case 1:
        }
    }

    /** draw the tetromino on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} blockSize
     */
    draw(ctx, blockSize) {
        ctx.save();
        ctx.fillStyle = this.color;
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
