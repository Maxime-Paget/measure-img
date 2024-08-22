if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: '/' });
}

const carousel = document.querySelector('.carousel');

const slides = [];

/**
 * Create an image-slide element from an input file
 * @param {*} file 
 * @returns 
 */
function createSlideFromFile(file) {
    const slide = document.createElement('canvas', {
        is: 'image-slide'
    });

    slide.setAttribute('src', URL.createObjectURL(file));
    slide.setAttribute('slideid', slides.length);

    return slide
}

function refreshCarouselNav () {
    const nav = document.querySelector('.carousel-nav');
    nav.innerHTML = '';
    for (const slide of slides) {
        const a = document.createElement('a');
        a.href = `#${slide.id}`;
        const li = document.createElement('li');
        li.classList.add('carousel-nav__item', slide.id);
        li.insertAdjacentElement('beforeend', a);
        nav.insertAdjacentElement('beforeend', li);
    }
}

document.querySelector('#addImg')
    .addEventListener('input', async (ev) => {
        ev.preventDefault();
        const [file] = ev.target.files
        
        if (!file) return;

        // CUSTOM ELEMENT
        // const slide = document.createElement('image-slide');

        // slide.setAttribute('src', URL.createObjectURL(file));
        // slide.setAttribute('slideid', slides.length);

        // carousel.insertAdjacentElement('beforeend', slide);

        // CUSTOM ELEMENT INHERITS CANVAS
        
        const slide = createSlideFromFile(file);

        carousel.insertAdjacentElement('beforeend', slide);

        slides.push(slide);

        refreshCarouselNav();

        console.log(document.querySelector(`li.${slide.id}>a`)[0])
        window.location.href = `#${slide.id}`;
    })

document.querySelector('#addScale')
    .addEventListener('input', async (ev) => {
        ev.preventDefault();
        const [file] = ev.target.files
        
        if (!file) return;
        
        const slide = createSlideFromFile(file);

        slide.setAttribute('scale', '');

        document.querySelector('.scale-container').insertAdjacentElement('beforeend', slide);

        document.querySelector("[for=addScale]").hidden = true;
    })