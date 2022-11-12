import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', submitHandler);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function submitHandler(e) {
  e.preventDefault();
  let waitDelay = Number(inputDelay.value);
  let waitStep = Number(inputStep.value);
  let amount = Number(inputAmount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, waitDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    waitDelay += waitStep;
  }
}