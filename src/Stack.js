import Cell from './Tetromino.js';

/** the pile of fixed cells
 * @property {[[String]]} rows describe each cell's color or emptyness
 */
export default class Stack {
    constructor() {
        this.rows = [];
        for (var i = 0; i < 20; i++) {
            this.rows.push([
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
            ]);
        }
        // console.log(this.rows);
    }

    /** Clear up full rows, push down the stack, return the score bonus
     * @returns {Number} the number of cleared rows
     */
    clearFullRows() {
        let fullRows = [];
        for (var y = 0; y < 20; y++) {
            if (!this.rows[y].includes('empty')) {
                fullRows.push(y);
            }
        }
        console.log('full rows:', fullRows);

        for (var i = 0; i < fullRows.length; i++) {
            console.log('cleaning row ', fullRows[i]);
            this.rows.splice(fullRows[i]);
            this.rows.unshift([
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
                'empty',
            ]);
        }
        console.log('after cleaning full rows', this.rows);
        return fullRows.length;
    }

    /** Write the tetromino colors onto the stack
     * @param {[Cell]}
     */
    writeCells(cells) {
        console.log('cells to write on the stack:', cells);
        for (var i = 0; i < 4; i++) {
            this.rows[cells[i].y][cells[i].x] = cells[i].color;
        }
    }

    /** check if the stack is too high, for game over
     * @returns {Boolean} game is over
     */
    hasOverflow() {
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 10; x++) {
                if (this.rows[y][x] !== 'empty') {
                    return true;
                }
            }
        }
        return false;
    }

    /** draws the stack on the board
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 10; x++) {
                ctx.save();
                ctx.fillStyle = this.rows[y][x];
                // console.log(this.rows[y][x]);
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.restore();
            }
        }
    }
}
