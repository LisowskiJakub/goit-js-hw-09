import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const inputFlatPickr = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const addLeadingZero = (number) => {
    return number.toString().padStart(2, '0');
}
const countDown = () => {
    let unixTime = endDate - startDate;
    startDate = new Date();
    if (unixTime < 0) {
        clearInterval(timerId);
        return Notiflix.Notify.info('Koniec!!!');
    }
    days.textContent = addLeadingZero(Math.floor(unixTime / (24 * 60 * 60 * 1000)));
    hours.textContent = addLeadingZero(Math.floor((unixTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    minutes.textContent = addLeadingZero(Math.floor((unixTime % (1000 * 60 * 60)) / (1000 * 60)));
    seconds.textContent = addLeadingZero(Math.floor((unixTime % (1000 * 60)) / (1000)));
}
let endDate;
let timerId = null;
flatpickr(inputFlatPickr, { enableTime: true, time_24hr: true })
startBtn.disabled = true;

inputFlatPickr.addEventListener('input', () => {
    if (inputFlatPickr.value === '') {
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
})
startBtn.addEventListener('click', () => {
    startDate = new Date();
    endDate = new Date(inputFlatPickr.value);
    if (endDate.getTime() <= startDate.getTime()) {
        Notiflix.Notify.warning('Wybierz datę z przyszłości');
        return;
    }
    Notiflix.Notify.success('Rozpoczęto odliczanie');
    timerId = setInterval(countDown, 1000);
});

    // Old leading zero function
    // const addLeadingZero = (number) => {
    //     if (number.toString().length === 1) {
    //         return ('0' + number)
    //     }
    //     return number;
    // }