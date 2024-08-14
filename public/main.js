if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: '/' });
}

const carousel = document.querySelector('.carousel');

const slides = [];

document.querySelector('input')
    .addEventListener('input', async (ev) => {
        ev.preventDefault();
        const [file] = ev.target.files

        const slide = document.createElement('image-slide');

        slide.setAttribute('src', URL.createObjectURL(file));
        slide.setAttribute('slideid', slides.length);

        carousel.insertAdjacentElement('beforeend', slide);
    })