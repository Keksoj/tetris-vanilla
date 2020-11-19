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
        let rowsToClear = [];
        for (var y = 0; y < 20; y++) {
            if (!this.rows[y].includes('empty')) {
                rowsToClear.push(y);
            }
        }

        for (var i = 0; i < rowsToClear.length; i++) {
            var y = rowsToClear[i];
            while (y > 1) {
                // if we don't perform this extra loop and do simply
                // this.rows[y] = this.rows[y - 1]
                // then the top rows will end up having the same… property? Writing a color on
                // one will mean writing it on all the above rows. Good luck debugging that.
                // If, like me, you like consistency, go learn Rust.
                for (var x = 0; x < 10; x++) {
                    this.rows[y][x] = this.rows[y - 1][x];
                }
                y--;
            }
        }
        
        console.log('after cleaning full rows there are ', this.rows.length, 'of them');
        return rowsToClear.length;
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

    /** draws the stack on the board
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} cellSize
     */
    draw(ctx, cellSize) {
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 10; x++) {
                if (this.rows[y][x] !== 'empty') {
                    ctx.save();
                    ctx.fillStyle = this.rows[y][x];
                    // console.log(this.rows[y][x]);
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    ctx.restore();
                }
            }
        }
    }
}