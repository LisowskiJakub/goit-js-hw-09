import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selected = selectedDates[0].getTime();
        if (selected < options.defaultDate.getTime()) {
            alert('Please choose a date in the future');
        } else {
            startBtn.disabled = false;
            return selectedDate = selectedDates[0];
        }
    },
};
const picker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = false;
const convertMs = ms => {
    // Number of milliseconds per unit of time//
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;    const day = hour * 24;

    // Remaining days//
    const days = Math.floor(ms / day);
    // Remaining hours//
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes//
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds//
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

flatpickr(picker, options);

function addLeadingZero(value) {
  if (value < 10) {
    return value = "0"+value;
  } else {
    return value;
  }
}

let days = document.querySelector('[data-days]');
let hours = document.querySelector('[data-hours]');
let minutes = document.querySelector('[data-minutes]');
let seconds = document.querySelector('[data-seconds]');

const getDifference = () => {
  const todayTime = new Date().getTime();
  const difference = selectedDate.getTime() - todayTime;
  if (difference < 1000) {
    clearInterval(timerId);
  }
  const resultDays = convertMs(difference).days;
  days.textContent = addLeadingZero(resultDays);

  const resultHours = convertMs(difference).hours;
  hours.textContent = addLeadingZero(resultHours);

  const resultMinutes = convertMs(difference).minutes;
  minutes.textContent = addLeadingZero(resultMinutes);

  const resultSeconds = convertMs(difference).seconds;
  seconds.textContent = addLeadingZero(resultSeconds);
};

let timerId = null;
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  getDifference();
  timerId = setInterval(() => {
    getDifference();
  }, 1000);
});

