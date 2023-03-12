import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const inputFlatPickr = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
const addLeadingZero = (number) => {
    return number.toString().padStart(2, '0');
}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};


const convertMs = (ms) => {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

flatpickr(inputFlatPickr, options)
startBtn.disabled = true;


startBtn.addEventListener('click', () => {
    startDate = new Date();
    endDate = new Date(inputFlatPickr.value);
    let distanceMs = endDate.getTime() - startDate.getTime();
    if (!distanceMs > 0) {
        Notiflix.Notify.warning('Please choose a date in the future');
        return;
    }
    Notiflix.Notify.success('Countdown started');
    // Notiflix.Notify.init('Countdown started!')
    timerId = setInterval(() => {
        startDate = new Date();
        distanceMs = endDate.getTime() - startDate.getTime();
        let distance = convertMs(distanceMs);
        spanDays.textContent = distance.days;
        spanHours.textContent = distance.hours;
        spanMinutes.textContent = distance.minutes;
        spanSeconds.textContent = distance.seconds;

        if (distanceMs < 1000) {
            clearInterval(timerId);
            Notiflix.Notify.success('Countdown finished!')
        }

    }, 1000);
});
























    // Old leading zero function
    // const addLeadingZero = (number) => {
    //     if (number.toString().length === 1) {
    //         return ('0' + number)
    //     }
    //     return number;
    // }
    // const countDown = () => {
    //     let unixTime = endDate - startDate;
    //     startDate = new Date();
    //     if (unixTime < 0) {
    //         clearInterval(timerId);
    //         return Notiflix.Notify.info('Koniec!!!');
    //     }
    //     days.textContent = addLeadingZero(Math.floor(unixTime / (24 * 60 * 60 * 1000)));
    //     hours.textContent = addLeadingZero(Math.floor((unixTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    //     minutes.textContent = addLeadingZero(Math.floor((unixTime % (1000 * 60 * 60)) / (1000 * 60)));
    //     seconds.textContent = addLeadingZero(Math.floor((unixTime % (1000 * 60)) / (1000)));
    // }