function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector("[data-start]");
const stopBtnEl = document.querySelector("[data-stop]");


startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

const NOTIFICATION_DELAY = 1500;
let timerId = null;


function onStartBtnClick() {
    activeButtonClick('click');
    timerId = setInterval(() => {
        console.log(timerId);
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, NOTIFICATION_DELAY);
    stopBtnEl.style.borderColor = 'red';
    startBtnEl.style.borderColor = '';
}

function onStopBtnClick() {
    disActiveButtonClick('click');
    clearInterval(timerId);
    console.log(timerId);
    startBtnEl.style.borderColor = 'green';
    stopBtnEl.style.borderColor = '';
}

function activeButtonClick(e) {
    if (e) {
        //startBtnEl.disabled = true;
        //stopBtnEl.disabled = false;
        startBtnEl.setAttribute('disabled', true);
        stopBtnEl.removeAttribute('disabled');
    } /*else {
        //startBtnEl.disabled = false;
        //stopBtnEl.disabled = true;
        stopBtnEl.setAttribute('disabled', true);
        startBtnEl.removeAttribute('disabled');
    }*/
}

function disActiveButtonClick(e) {
    if (e) {
        stopBtnEl.setAttribute('disabled', true);
        startBtnEl.removeAttribute('disabled');
    }
}