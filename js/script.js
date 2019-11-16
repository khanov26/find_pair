const container = document.querySelector('.container');
const button = document.querySelector('button');
const fieldSize = document.querySelector('#field-size');
const difficultyLevel = document.querySelector('#difficulty-level');

let openedCard = null;

//card opening
container.addEventListener('click', event => {
    let card = event.target.closest('.card');
    if (!card) {
        return;
    }

    card.classList.add('card-opened');

    if (openedCard === null) {
        // opening first card of a pair
        openedCard = card;
    } else if (card.firstElementChild.src !== openedCard.firstElementChild.src) {
        // not match
        container.classList.add('container-block');
        setTimeout(() => {
            card.classList.remove('card-opened');
            openedCard.classList.remove('card-opened');
            openedCard = null;
            container.classList.remove('container-block');
        }, 500);
    } else {
        // match
        openedCard = null;
    }
});

// OK button click (game start)
button.addEventListener('click', () => {
    init();

    container.classList.remove('container-small', 'container-medium', 'container-large');
    let sizeClass = '';
    switch (+fieldSize.value) {
        case 4:
            sizeClass = 'container-small';
            break;
        case 6:
            sizeClass = 'container-medium';
            break;
        case 8:
            sizeClass = 'container-large';
            break;
    }
    container.classList.add(sizeClass);

    let images = getImages(difficultyLevel.value, +fieldSize.value);

    for (let i = 0; i < fieldSize.value**2; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        let img = document.createElement('img');
        img.src = `images/${images[i]}.jpg`;
        card.appendChild(img);
        container.appendChild(card);
    }
});

function getImages(difficultyLevel, fieldSize) {
    let categories = ['abstract', 'city', 'people', 'transport', 'animals', 'food', 'nature', 'business', 'nightlife',
        'sports', 'cats', 'fashion', 'technics'];
    shuffle(categories);

    const imagesNumber = fieldSize ** 2;
    let images = [];

    if (difficultyLevel === 'easy') {
        // minimum images from one category
        let imageIndexInCategory = 1;
        while (images.length < imagesNumber) {
            for (let i = 0; i < categories.length; i++) {
                images.push(`${categories[i]}/${imageIndexInCategory}`);
                images.push(`${categories[i]}/${imageIndexInCategory}`);
                if (images.length === imagesNumber) {
                    break;
                }
            }
            imageIndexInCategory++;
        }
    } else {
        // maximum images from one category
        for (let i = 0; i < categories.length; i++) {
            for (let imageIndexInCategory = 1; imageIndexInCategory <= 10; imageIndexInCategory++) {
                images.push(`${categories[i]}/${imageIndexInCategory}`);
                images.push(`${categories[i]}/${imageIndexInCategory}`);
                if (images.length === imagesNumber) {
                    i = categories.length;
                    break;
                }
            }
        }
    }

    shuffle(images);

    return images;
}

function init() {
    openedCard = null;
    container.innerHTML = '';
    container.classList.remove('container-block');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
