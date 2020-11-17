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
        // var randomPicker = Math.round(Math.random() * 6);
        var randomPicker = 1;

        this.name = this.tetrominoes[randomPicker].name;

        this.cells = [];
        for (var i = 0; i < 4; i++) {
            this.cells.push(
                new Cell(
                    this.tetrominoes[randomPicker].cells[i].x,
                    this.tetrominoes[randomPicker].cells[i].y,
                    this.tetrominoes[randomPicker].color
                )
            );
        }

        this.moveSimulation = {
            cells: [],
            spin: 0,
        };

        this.spin = 0;
        this.move = "none";
        // this.nextMoveSimulation = [];
    }

    /** take direction to move the tetromino
     *
     */
    computeTheMove(direction) {
        // this.simulationCoordinates = [];
        this.moveSimulation.cells = [];
        // copy the cells into the simulation
        for (var i = 0; i < 4; i++) {
            this.moveSimulation.cells.push(this.cells[i]);
            this.moveSimulation.spin = 0 + this.spin;
        }
        console.log(this.moveSimulation);

        // believe it or not this works better than a switch statement
        if (direction === "down") {
            for (var i = 0; i < 4; i++) {
                this.moveSimulation.cells[i].y += 1;
            }
        }
        if (direction === "left") {
            for (var i = 0; i < 4; i++) {
                this.moveSimulation.cells[i].x -= 1;
            }
        }
        if (direction === "right") {
            for (var i = 0; i < 4; i++) {
                this.moveSimulation.cells[i].x += 1;
            }
        }
        if (direction === "turn") this.turn();
    }

    settleTheMove() {
        for (var i = 0; i < 4; i++) {
            this.cells[i].x = this.moveSimulation.cells[i].x;
            this.cells[i].y = this.moveSimulation.cells[i].y;
            this.spin = this.moveSimulation.spin;
        }
    }

    /** turn the tetromino (affects the spin property too) */
    turn() {
        console.log("you spin me right round", this.spin, "times");
        switch (this.moveSimulation.spin) {
            case 0:
                switch (this.name) {
                    case "T":
                        this.moveSimulation.cells[0].x += 1;
                        this.moveSimulation.cells[0].y -= 1;
                        this.moveSimulation.spin += 1;
                        break;
                    case "I":
                        this.moveSimulation.cells[0].x -= 2;
                        this.moveSimulation.cells[0].y += 2;
                        this.moveSimulation.cells[1].x -= 1;
                        this.moveSimulation.cells[1].y += 1;
                        this.moveSimulation.cells[3].x += 1;
                        this.moveSimulation.cells[3].y -= 1;
                        this.moveSimulation.spin += 1;
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
                break;
            case 1:
                switch (this.name) {
                    case "T":
                        this.moveSimulation.cells[3].x -= 1;
                        this.moveSimulation.cells[3].y += 1;
                        this.moveSimulation.spin += 1;
                        break;
                    case "I":
                        this.moveSimulation.cells[0].x += 2;
                        this.moveSimulation.cells[0].y -= 2;
                        this.moveSimulation.cells[1].x += 1;
                        this.moveSimulation.cells[1].y -= 1;
                        this.moveSimulation.cells[3].x -= 1;
                        this.moveSimulation.cells[3].y += 1;
                        this.moveSimulation.spin -= 1;
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

                break;
            case 2:
                switch (this.name) {
                    case "T":
                        this.moveSimulation.cells[2].x -= 1;
                        this.moveSimulation.cells[2].y -= 1;
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
                this.moveSimulation.spin += 1;

                break;
            case 3:
                switch (this.name) {
                    case "T":
                        this.moveSimulation.cells[0].x -= 1;
                        this.moveSimulation.cells[0].y += 1;
                        this.moveSimulation.cells[3].x += 1;
                        this.moveSimulation.cells[3].y -= 1;
                        this.moveSimulation.cells[2].x += 1;
                        this.moveSimulation.cells[2].y += 1;
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
                this.moveSimulation.spin -= 3;

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
