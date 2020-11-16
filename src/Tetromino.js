import Cell from "./Cell.js";

/**
 * A group a four cells to move around
 * @typedef {object} Tetromino
 * @property {Number} spin
 * @property {String} none
 * @property {[Cell]} cells
 *
 * @property {[String]} name
 * @property {[String]} color
 *
 */
export default class Tetromino {
    /** all necessary data to build a tetromino
     * @type {[{name: String, cells: [{x: number, y: number}], color: String}]}
     */
    tetrominoes = [
        {
            name: "T",
            cells: [
                { x: 3, y: -1 },
                { x: 4, y: -1 },
                { x: 5, y: -1 },
                { x: 4, y: -2 },
            ],
            color: "orange",
        },
        {
            name: "I",
            cells: [
                { x: 4, y: -4 },
                { x: 4, y: -3 },
                { x: 4, y: -2 },
                { x: 4, y: -1 },
            ],
            color: "red",
        },
        {
            name: "S",
            cells: [
                { x: 5, y: -2 },
                { x: 4, y: -2 },
                { x: 4, y: -1 },
                { x: 3, y: -1 },
            ],
            color: "green",
        },
        {
            name: "Z",
            cells: [
                { x: 3, y: -2 },
                { x: 4, y: -2 },
                { x: 4, y: -1 },
                { x: 5, y: -1 },
            ],
            color: "lightblue",
        },
        {
            name: "O",
            cells: [
                { x: 4, y: -2 },
                { x: 5, y: -2 },
                { x: 4, y: -1 },
                { x: 5, y: -1 },
            ],
            color: "blue",
        },
        {
            name: "L",
            cells: [
                { x: 4, y: -3 },
                { x: 4, y: -2 },
                { x: 4, y: -1 },
                { x: 5, y: -1 },
            ],
            color: "purple",
        },
        {
            name: "J",
            cells: [
                { x: 5, y: -3 },
                { x: 5, y: -2 },
                { x: 5, y: -1 },
                { x: 6, y: -1 },
            ],
            color: "white",
        },
    ];

    constructor() {
        var randomPicker = Math.round(Math.random() * 6);

        this.name = this.tetrominoes[randomPicker].name;

        this.cells = [];
        for (var i = 0; i < 4; i++) {
            var cell = new Cell(
                this.tetrominoes[randomPicker].cells[i].x,
                this.tetrominoes[randomPicker].cells[i].y,
                this.tetrominoes[randomPicker].color
            );
            this.cells.push(cell);
        }

        this.simulationCoordinates = [];

        this.spin = 0;
        this.move = "none";
        // this.nextMoveSimulation = [];
    }

    /** take direction to move the tetromino
     *
     */
    computeTheMove(direction) {
        this.simulationCoordinates = [];
        console.log(
            "simulation coordinates before creation:",
            this.simulationCoordinates
        );
        for (var i = 0; i < 4; i++) {
            var cellCoordinates = this.cells[i].getCoordinates();
            this.simulationCoordinates.push(cellCoordinates);
        }

        if (direction === "down") {
            for (var i = 0; i < 4; i++) {
                this.simulationCoordinates[i].y += 1;
            }
        }

        if (direction === "left") {
            for (var i = 0; i < 4; i++) {
                this.simulationCoordinates[i].x -= 1;
            }
        }

        if (direction === "right") {
            for (var i = 0; i < 4; i++) {
                this.simulationCoordinates[i].x += 1;
            }
        }

        // console.log("the original coordinates were:", this.cells);
        // console.log("the new ones are:", this.simulationCoordinates);

    }

    settleTheMove() {
        for (var i = 0; i < 4; i++) {
            this.cells[i].x = this.simulationCoordinates[i].x;
            this.cells[i].y = this.simulationCoordinates[i].y;
        }
    }

    /** turn the tetromino (affects the spin property too) */
    turn() {
        switch (this.spin) {
            case 0:
                switch (this.name) {
                    case "T":
                        this.cells[0].x += 1;
                        this.cells[1].y -= 1;
                        break;
                    case "I":
                        break;
                    case "S":
                        break;
                    case "Z":
                        break;
                    case "L":
                        break;
                    case "J":
                        break;
                }
                self.spin += 1;
                break;
            case 1:
                break;
        }
    }

    /** draw the tetromino on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        ctx.fillStyle = this.color;
        for (var i = 0; i < 4; i++) {
            this.cells[i].draw(ctx, cellSize);
        }

        ctx.restore();
    }
}
