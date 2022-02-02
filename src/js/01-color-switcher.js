import '../css/common.css';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector("[data-start]");
console.log(startBtnEl);
const stopBtnEl = document.querySelector("[data-stop]");
console.log(stopBtnEl);

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

let timerId = null;


function onStartBtnClick() {
    activeButtonClick();
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    //console.log(timerId)
    
}

function onStopBtnClick() {
    activeButtonClick();
    clearInterval(timerId);
    //console.log(timerId);
}

function activeButtonClick(event) {
    if (!event){
    startBtnEl.setAttribute('disabled', true);
    stopBtnEl.removeAttribute('disabled');
    } else {
        stopBtnEl.setAttribute('disabled', true);
        startBtnEl.removeAttribute('disabled');
    }
}
/**
function disActiveButtonClick(event) {
    if (!event) {
        stopBtnEl.setAttribute('disabled', true);
        startBtnEl.removeAttribute('disabled');
    }
}*/