const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const background = document.querySelector('body');
let timerId;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function timer() {
    timerId =setInterval(() => {
        console.log("hej");
        background.style.backgroundColor = getRandomHexColor();
    }, 1000)
}
startBtn.addEventListener('click', () => {
    timer(getRandomHexColor);
})

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
})

