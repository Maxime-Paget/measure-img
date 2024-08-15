// import { Line } from "../stores/line.store";

import { Line } from "../stores/line.store.js";

class Slide extends HTMLCanvasElement {
    /** @type {string} */ src;
    /** @type {number} */ slideid;

    static observedAttributes = ["src", "slideid"]

    constructor() {
        super();
        this.src = this.getAttribute('src')?.trim();
        this.slideid = this.getAttribute('slideid'); 
        /** @type {boolean} */ this.isPressed = false;
    }
    
    connectedCallback() {
        this.style = `--slide-image: url(${this.src});`
        this.classList.add('carousel__slide');

        /** @type {Line?} */
        let line;

        this.addEventListener('mouseup', (ev) => {
            this.isPressed = false;
        })

        this.addEventListener('mouseleave', (ev) => {
            this.isPressed = false;
        })

        this.addEventListener('mousedown', (ev) => {
            ev.preventDefault()
            this.width = this.clientWidth || 652;
            this.height = this.clientHeight || 352;
            this.isPressed = true;
            const startX=ev.offsetX
            const startY=ev.offsetY
            line = new Line({ x: startX, y: startY });
        })
        
        let x = 15;
        this.addEventListener('mousemove', (e) => {
            e.preventDefault()
            if (this.isPressed) {
                const mouseX = e.offsetX
                const mouseY = e.offsetY
                line.resize('end', { x: mouseX, y: mouseY });
                const ctx =  this.getContext('2d');
                ctx.clearRect(0, 0, this.width, this.height)
                this.drawLine(line, ctx);
            }
        })
    }


    /**
     * 
     * @param {Line} line
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawLine(line, ctx) {
        ctx.beginPath();
        // ctx.lineWidth = 5
        ctx.moveTo(line.coordinates.start.x, line.coordinates.start.y);
        ctx.lineTo(line.coordinates.end.x, line.coordinates.end.y);
        ctx.stroke();
    }

    /**
     * 
     * @param {string} name 
     * @param {*} oldValue
     * @param {*} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }

}

window.customElements.define('image-slide', Slide, {
    extends: 'canvas'
})