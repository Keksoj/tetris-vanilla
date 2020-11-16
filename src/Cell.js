/**
 * The building component of the game
 * @property {Number} x
 * @property {Number} y
 * @property {String} color
 */
export default class Cell {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    /** export the cell coordinates for move simulation
     * @returns {x: Number, y: Number}
     */
    getCoordinates() {
        var coordinates = {};

        coordinates.x = this.x;
        coordinates.y = this.y;

        console.log("the cell coordinates:", coordinates);
        return coordinates;
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x * cellSize,
            this.y * cellSize,
            cellSize,
            cellSize
        );
        ctx.restore();
    }
}
