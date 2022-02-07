import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notiflix.Notify.init({
  useIcon: false,
  cssAnimationStyle: 'from-right',
});

const formPromises = document.querySelector('.form');
//const amount = document.querySelector('[name = amount]');
const firstDelaySteps = document.querySelector('[name = delay]');
const delaySteps = document.querySelector('[name = step]');
const amountSteps = document.querySelector('[name = amount]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });

}

function onSubmitForm(event) {
  event.preventDefault();

  const delay = Number(firstDelaySteps.value);
      console.log(delay)
  const step = Number(delaySteps.value);
      console.log(step)
  const amount = Number(amountSteps.value);
      console.log(amount);
  
  for (let i = 1; i <= amount; i += 1) {
    const newDelay = delay + step * (i - 1);
    console.log({ i, newDelay });
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}



formPromises.addEventListener('submit', onSubmitForm);

