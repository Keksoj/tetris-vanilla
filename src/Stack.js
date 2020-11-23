import Cell from './Cell.js';

/** the pile of fixed cells
 * @property {[[String]]} rows describe each cell's color or emptyness
 * @property {[Cell]} cells the stack as drawable cells
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
        this.cells = [];
        // console.log(this.rows);
    }

    /** Clear up full rows, push down the stack, return the score bonus
     * @returns {Number} the number of cleared rows
     */
    async clearFullRows() {
        let rowsToClear = [];
        for (var y = 0; y < 20; y++) {
            if (!this.rows[y].includes('empty')) {
                rowsToClear.push(y);
            }
        }

        for (var i = 0; i < rowsToClear.length; i++) {
            var y = rowsToClear[i];
            while (y > 1) {
                for (var x = 0; x < 10; x++) {
                    this.rows[y][x] = this.rows[y - 1][x];
                }
                y--;
            }
            await this.sleep(100);
            
        }
        return rowsToClear.length;
    }

    async sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
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
    overflows() {
        console.log('checking if the stack overflows…');
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 10; x++) {
                if (this.rows[y][x] !== 'empty') {
                    console.log('…yep');
                    return true;
                }
            }
        }
        console.log('…nope');
        return false;
    }

    /** converts the nested array into an array of drawable cells */
    toCells() {
        this.cells = [];
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 10; x++) {
                if (this.rows[y][x] !== 'empty') {
                    this.cells.push(new Cell(x, y, this.rows[y][x]));
                }
            }
        }
    }

    /** draws the stack on the board
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        ctx.save();
        this.toCells();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].draw(ctx, cellSize);
        }
        ctx.restore();
    }
}
