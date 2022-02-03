
// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// all modules
import Notiflix from 'notiflix';
// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    //кількість мілісекунд,шо пройшло з 1.01.1970 - до сьогодні
    const currentElectDateTime = Date.now();
    console.log(currentElectDateTime);
    //вибрана дата в мілісекундах
    const selectedDateTime = selectedDates[0].getTime();
    console.log(selectedDateTime)
    if (selectedDateTime < currentElectDateTime) {
      inputRef.style.borderColor = 'red';
      Notiflix.Notify.warning('Please choose a date in the future')
    } else {
      Notiflix.Notify.success('To start the timer press the start button');
      inputRef.style.borderColor = 'green';

    }
    
  }
};

//const fp = flatpickr("#datetime-picker", options);

startButtonEl.addEventListener('click', onClickStartBtn);

let is = false;
function onClickStartBtn() {
  if (is) {
    return;
  }
  //планування визову фунції
  let timerId = setInterval((selectedDateTime, currentElectDateTime) => {
    const timeTimer = selectedDateTime - currentElectDateTime;
    const saveDate = convertMs(timeTimer);
    contentTime(saveDate)
    console.log(saveDate);

    //daysEl.textContent = saveDate.days;
    //hoursEl.textContent = saveDate.hours;
    //minutesEl.textContent = saveDate.minutes;
    //secondsEl.textContent = saveDate.seconds;
    if (saveDate < 1000) {
          removeInterval(timerId);
        }

  }, 1000)
  console.log(timerId);
}

function contentTime({ days, hours, minutes, seconds }){
   
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

flatpickr(inputRef, options);

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

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
