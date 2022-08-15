
import Notiflix from 'notiflix';
const firstDelayInput = document.querySelector('input[name="delay"]');
const stepDelayInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const createBtn = document.querySelector('button[type="submit"]');


function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
};



createBtn.addEventListener('click', e => {
  console.log("dziala")
  e.preventDefault();
  const firstDelay = Number(firstDelayInput.value);
  const stepDelay = Number(stepDelayInput.value);
  const amount = Number(amountInput.value);
  console.log (`${firstDelay}  ${amount}`)
  for (let i = 1; i <= amount; i++) {
    console.log(i);
    let stepTime = firstDelay + stepDelay * (i - 1);
    createPromise(i, stepTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position} in ${delay} ms`
        );
      });
  }
});
