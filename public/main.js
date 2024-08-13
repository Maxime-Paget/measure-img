// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.js', { scope: '/' });
// }

const carousel = document.querySelector('.carousel');

const slides = [];

document.querySelector('input')
    .addEventListener('input', async (ev) => {
        ev.preventDefault();
        const [file] = ev.target.files
        const div = document.createElement('div');
        div.id=`slide_${slides.length}`;
        // const img = document.createElement('img');
        div.setAttribute('src', URL.createObjectURL(file));
        div.classList.add('carousel__slide');
        div.style = `--slide-image: url(${URL.createObjectURL(file)});`;
        // img.src = URL.createObjectURL(file);
        // img.alt = file.name;
        // img.classList.add('carousel__slide');

        // div.insertAdjacentElement('beforeend', img);

        carousel.insertAdjacentElement('beforeend', div);
    })

// document.addEventListener('mousedown', (ev) => {
//     const { target } = ev; 
//     if (!target.classList.contains('carousel__slide')) {
//         let start = Date.now();
//         /**
//          * @type {HTMLHRElement?}
//          */
//         let line;
//         target.addEventListener('mousemove', (event) => {
//             console.log('coucou')
//             event.preventDefault()
//             line = document.createElement('hr');
//             line.style.width = '10px';
//             line.classList.add('line')
//             carousel.insertAdjacentElement('beforeend', line);
//         }, {
//             once: true
//         })
//         target.addEventListener('mouseup', () => {
//             // target.removeEventListener('mousemove');
//         })
//     }
// })