const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const intervalCbFunc = () => {
    body.style.backgroundColor = getRandomHexColor();
}
let timerId = null;
startBtn.disabled = false;
stopBtn.disabled = true;


startBtn.addEventListener('click', () => {
    timerId = setInterval(intervalCbFunc, 1000)
    startBtn.disabled = true;
    stopBtn.disabled = false;
});
stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

