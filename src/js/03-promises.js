import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  let position = 0;
  let numberValue = Number(delay.value);
  let intervalId = setInterval(() => {
    position += 1;
    createPromise(position, numberValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    numberValue += Number(step.value);
    if (position === Number(amount.value)) {
      clearInterval(intervalId);
    }
  }, step.value);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);
  });
}
