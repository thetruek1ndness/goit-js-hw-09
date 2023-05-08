import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timepickerInputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtnRef.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

startBtnRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const endDate = new Date(timepickerInputRef.value);
  const currentTime = new Date();
  if (endDate <= currentTime) {
    return;
  }

  startBtnRef.setAttribute('disabled', true)

  const intervalId = setInterval(() => {
    const timeLeft = endDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      updateTimer(0, 0, 0, 0);
      startBtnRef.removeAttribute('disabled');
      Notiflix.Notify.success('Time is up!');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}