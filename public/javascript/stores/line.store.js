const lines = []
export const linesStore = {
    get lines () {
        return lines;
    },

    add () {

    }
};

/**
 * @typedef {Object} Coordinates
 * @property {number} x
 * @property {number} y
 */

export class Line {
    /** @type {Coordinates} */ #start;
    /** @type {Coordinates} */ #end = {};

    /**
     * @param {Coordinates} start 
     */
    constructor (start) {
        if (isNaN(parseInt(start.x)) || isNaN(parseInt(start.y))) {
            throw new Error('Must have valid start coordinates')
        }
        this.#start = start;
    }

    /**
     * @param {'start' | 'end'} from resizing from start or end of the line
     * @param {Coordinates} coordinates new coordinates
     */
    resize (from, coordinates) {
        if (from === "end") {
            this.#end = coordinates
        } else {
            this.#start = coordinates;
        }
    }

    get coordinates() {
        return {
            start: {
                ...this.#start
            },
            end: {
                ...this.#end
            }
        }
    }

    get width() {
        // APPLY pythagore
        // X = ENDX - STARTX
        // Y = ENDY - STARTY
        // HYPOTHENUSE^2 = X^2 + Y^2
    }
}