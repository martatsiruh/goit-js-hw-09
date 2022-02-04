import './sass/main.scss';
// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// all modules
import Notiflix from 'notiflix';
// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notiflix.Notify.init({
  width: "400px",
  cssAnimationStyle: 'from-right',
});

const inputRef = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
    
    //вибрана дата
    console.log(selectedDates[0]);
    console.log(new Date)
    if (selectedDates[0] < new Date()) {
      startButtonEl.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future')
    } else {
      startButtonEl.disabled = false;
      Notiflix.Notify.success('To start the timer press the start button');

      startButtonEl.addEventListener('click', onStartBtnClick);
    }
    
  }
};

startButtonEl.disabled = true;
const NOTIFICATION_DELAY = 1000;
let timerId = null;
function onStartBtnClick () {
    timerId = setInterval(() => {
      let timeTimer = flat.selectedDates[0] - new Date();
      const saveDate = convertMs(timeTimer);

      console.log(saveDate);

      if (timeTimer > 0) {
        contentTime(saveDate);
      } else {
        removeInterval(timerId);
      }
      //if (saveDate < NOTIFICATION_DELAY) {
        //removeInterval(timerId);
     // }
    }, NOTIFICATION_DELAY);
}

function contentTime({ days, hours, minutes, seconds }) {
  
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function removeInterval(id){
  clearInterval(id);
}

function addLeadingZero(value){
  return String(value).padStart(2, "0");
}

const flat = flatpickr(inputRef, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}