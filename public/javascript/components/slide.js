window.customElements.define('image-slide', class Slide extends HTMLElement {
    /** @type {string} */ src;
    /** @type {number} */ slideId;
    /** @type {boolean} */ canDraw = false;

    /** @type {boolean} */ isDrawing = false;
    static observedAttributes = ["src", "id"]

    constructor() {
        super();
        this.src = this.getAttribute('src')?.trim();
        this.slideId = parseInt(this.getAttribute('slideId'));
    }

    
    connectedCallback() {
        this.style = `--slide-image: url(${this.src});`
        this.classList.add('carousel__slide');
        
        let pressTimer;
        
        this.addEventListener('mouseup', (ev) => {
            clearTimeout(pressTimer);
            // Clear timeout
            this.canDraw = false;
            this.isDrawing = false;
            console.log('stop press')
        })
        this.addEventListener('mousedown', (ev) => {
            this.canDraw = true;
        })
        
        this.addEventListener('mousemove', () => {
            if (this.canDraw) {
                console.log('drawing')
            }
        })

        this.addEventListener('mouseleave', () => {
            clearTimeout(pressTimer);

            this.canDraw = false;
            this.isDrawing = false;
        })

    }


    /**
     * 
     * @param {Event} _ev 
     */
    drawLine(_ev) {
        
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

})