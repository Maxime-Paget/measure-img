if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: '/' });
}

const carousel = document.querySelector('.carousel');

const slides = [];

document.querySelector('input')
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
        const slide = document.createElement('canvas', {
            is: 'image-slide'
        });

        slide.setAttribute('src', URL.createObjectURL(file));
        slide.setAttribute('slideid', slides.length);

        carousel.insertAdjacentElement('beforeend', slide);

        slides.push(slide);
    })