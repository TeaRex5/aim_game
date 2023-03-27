const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

// отменили переход по ссылке
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
       time =  parseInt(event.target.getAttribute('data-time'));
       screens[1].classList.add('up');
       startGame();
    }
});

// добавляем нажатия по кругу
board.addEventListener('click', event => {
    if (event.target.classList.contains ('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});



function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    }else {
        let current = --time;
    // добавили ноль чтобы смотрелось красиво
    if (current < 10) {
        current = `0${current}`;
    }
    setTime(current);
}
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    // удаляем время и надпись
    timeEl.parentNode.classList.add('hide');

    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`
}

// добавляем рандомные круги 

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    // создаем const для того, чтобы кружок был внутри поля
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor();


    board.append(circle);
}

// создаем функцию для случайной размерности круга

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
 }

 function getRandomColor () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
 }
