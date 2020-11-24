import Cell from './Cell.js';

/**
 * A group a four cells to move around
 * @typedef {object} Tetromino
 * @property {String} name
 * @property {[Number]} binaryValues
 * @property {String} color
 * @property {Number} xPosition
 * @property {Number} yPosition
 * @property {[Cell]} cells
 */
export default class Tetromino {
    /** all necessary data to build a tetromino
     * @type {[{name: String, binaryValues: [Number], color: String}]}
     */
    tetrominoes = [
        {
            name: 'T',
            // 0 1 0
            // 1 1 1
            // 0 0 0
            binaryValues: [0, 1, 0, 1, 1, 1, 0, 0, 0],
            color: 'orange',
        },
        {
            name: 'I',
            // 0 0 0 0
            // 0 0 0 0
            // 1 1 1 1
            // 0 0 0 0
            binaryValues: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            color: '#FF5861',
        },
        {
            name: 'S',
            // 0 1 1
            // 1 1 0
            // 0 0 0
            binaryValues: [0, 1, 1, 1, 1, 0, 0, 0, 0],
            color: '#30A93E',
        },
        {
            name: 'Z',
            // 0 0 0
            // 1 1 0
            // 0 1 1
            binaryValues: [0, 0, 0, 1, 1, 0, 0, 1, 1],
            color: 'lightblue',
        },
        {
            name: 'O',
            // 0 0 0 0
            // 0 1 1 0
            // 0 1 1 0
            // 0 0 0 0
            binaryValues: [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            color: '#0033FF',
        },
        {
            name: 'L',
            // 0 0 1
            // 1 1 1
            // 0 0 0
            binaryValues: [0, 0, 1, 1, 1, 1, 0, 0, 0],
            color: '#902090',
        },
        {
            name: 'J',
            // 1 0 0
            // 1 1 1
            // 0 0 0
            binaryValues: [1, 0, 0, 1, 1, 1, 0, 0, 0],
            color: '#A0B8BB',
        },
    ];

    constructor() {
        var randomPicker = Math.floor(Math.random() * 7);
        // var randomPicker = 1;

        this.name = this.tetrominoes[randomPicker].name;
        this.binaryValues = this.tetrominoes[randomPicker].binaryValues;
        this.color = this.tetrominoes[randomPicker].color;

        // this puts the tetromino on the side for display
        this.xPosition = 11;
        this.yPosition = 3;

        this.cells = [];
    }

    /** Place the tetromino on the top middle of the board */
    putInGame() {
        this.xPosition = 3;
        this.yPosition = 1;
    }

    /** take direction to move the tetromino
     * @param {String} either "up", "down", "left", "right", "turn"
     */
    move(direction) {
        // believe it or not this works better than a switch statement
        if (direction === 'down') {
            this.moveDown();
        } else if (direction === 'left') {
            this.moveLeft();
        } else if (direction === 'right') {
            this.moveRight();
        } else if (direction === 'turn') {
            this.turn();
            // console.log(this.binaryValues);
        }
        this.toCells();
    }

    /** undo the move
     * @param {String} either "up", "down", "left", "right", "turn"
     */
    reverseTheMove(direction) {
        if (direction === 'down') {
            this.moveUp();
        } else if (direction === 'left') {
            this.moveRight();
        } else if (direction === 'right') {
            this.moveLeft();
        } else if (direction === 'turn') {
            this.turn();
            this.turn();
            this.turn();
            // console.log(this.binaryValues);
        }
        this.toCells();
    }

    moveUp() {
        this.yPosition -= 1;
    }
    moveDown() {
        this.yPosition += 1;
    }
    moveLeft() {
        this.xPosition -= 1;
    }
    moveRight() {
        this.xPosition += 1;
    }

    /** turn the tetromino */
    turn() {
        const swap = (array, i, j, k, l) => {
            let firstCellValue = array[i];
            array[i] = array[j];
            array[j] = array[k];
            array[k] = array[l];
            array[l] = firstCellValue;
        };
        // 3 x 3
        if (this.binaryValues.length === 9) {
            swap(this.binaryValues, 0, 6, 8, 2);
            swap(this.binaryValues, 1, 3, 7, 5);
        } else if (this.name === 'I') {
            // Turning the I-shape tetromino within the 4 x 4 grid feels unnatural.
            // We have to hardcode the legacy behaviour that switches between
            // 0 0 1 0
            // 0 0 1 0
            // 0 0 1 0
            // 0 0 1 0
            // and
            // 0 0 0 0
            // 0 0 0 0
            // 1 1 1 1
            // 0 0 0 0
            if (this.binaryValues[2] === 1) {
                this.binaryValues = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0];
            } else {
                this.binaryValues = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0];
            }
        } else if (this.name === '0') {
            return;
        }
    }

    /**
     * converts the grid of zeros and ones into an array of drawable Cells
     */
    toCells() {
        // console.log('toCells() called');
        this.cells = [];
        const squareWidth = Math.sqrt(this.binaryValues.length);
        for (var i = 0; i < this.binaryValues.length; i++) {
            if (this.binaryValues[i] === 1) {
                const xAddition = Math.floor(i / squareWidth);
                const yAddition = i % squareWidth;
                this.cells.push(
                    new Cell(this.xPosition + yAddition, this.yPosition + xAddition, this.color)
                );
            }
        }
    }

    /** draw the tetromino on the board
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        ctx.fillStyle = this.color;
        this.toCells();
        for (var i = 0; i < 4; i++) {
            this.cells[i].draw(ctx, cellSize);
        }

        ctx.restore();
    }
}
