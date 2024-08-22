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
        this.id = `slide_${this.slideid}`
        this.fullscreen = false;
    }
    
    connectedCallback() {
        this.style = `--slide-image: url(${this.src});`;
        this.classList.add('carousel__slide');

        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.classList.add('fullscreen-btn');
        this.insertAdjacentElement('afterend', fullscreenBtn);

        this.parentElement.onfullscreenchange = () => {
            this.fullscreen = !this.fullscreen;
        }

        fullscreenBtn.addEventListener('click', () => {
            this.fullscreen
                ? document.exitFullscreen()
                : this.parentElement.requestFullscreen();
        })

        /** @type {Line?} */
        let line;

        // this.addEventListener('mouseup', (ev) => {
        //     this.isPressed = false;
        // })

        this.addEventListener('mouseleave', (ev) => {
            this.isPressed = false;
        })

        this.addEventListener('mousedown', (ev) => {
            ev.preventDefault()
            this.isPressed = !this.isPressed;
            if(!this.isPressed) return;

            this.width = this.clientWidth || 652;
            this.height = this.clientHeight || 352;
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
        if (name === 'slideid') {
            this.id = `slide_${this.slideid}`
        }
    }

}

window.customElements.define('image-slide', Slide, {
    extends: 'canvas'
})