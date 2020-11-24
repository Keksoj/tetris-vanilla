export default class KeyboardManager {
    constructor() {
        this.pressedKeys = [
            { key: 't', pressed: false, move: 'left' },
            { key: 's', pressed: false, move: 'down' },
            { key: 'r', pressed: false, move: 'right' },
            { key: 'd', pressed: false, move: 'turn' },
            { key: 'Spacebar', pressed: false, move: 'hardDrop' },
        ];
        this.buffer = [];
    }

    clearBuffer() {
        this.buffer = [];
    }

    getKeyPress(key) {
        for (var i = 0; i < this.pressedKeys.length; i++) {
            if (key === this.pressedKeys[i].key) {
                this.pressedKeys[i].pressed = true;
                console.debug('the keyboard manager finds', this.pressedKeys[i].key, 'is pressed');
            }
        }
    }
    getKeyRelease(key) {
        for (var i = 0; i < this.pressedKeys.length; i++) {
            if (key === this.pressedKeys[i].key) {
                this.pressedKeys[i].pressed = false;
                console.debug('the keyboard manager finds', this.pressedKeys[i].key, 'is released');
            }
        }
    }

    async fillBuffer() {
        for (var i = 0; i < this.pressedKeys.length; i++) {
            if (this.pressedKeys[i].pressed) {
                // await this.sleep(200);
                this.buffer.push(this.pressedKeys[i].move);

                console.log("the keyboard buffer:", this.buffer);
            }
        }
    }
    async sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    /** consumes the buffer and yield the next move in queue
     * @returns {String} move
     */
    consumeBuffer() {
        return this.buffer.pop();
    }
}
