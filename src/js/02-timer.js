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

    Notiflix.Notify.info('Countdown started!');

    const timerId = setInterval(() => {
        let countdown = new Date(inputFlatPickr.value) - new Date();
        let distance = convertMs(countdown);
        spanDays.textContent = distance.days;
        spanHours.textContent = distance.hours;
        spanMinutes.textContent = distance.minutes;
        spanSeconds.textContent = distance.seconds;

        if (countdown < 1000) {
            clearInterval(timerId);
            Notiflix.Notify.success('Countdown finished!')
        }

    }, 1000);
});
