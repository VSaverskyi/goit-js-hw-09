const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  let position = 1;
  let numberValue = Number(delay.value);
  let intervalId = setInterval(() => {
    createPromise(position, numberValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => {
        if (position >= Number(amount.value)) {
          clearInterval(intervalId);
        }
        numberValue += Number(step.value);
        position += 1;
      });
  }, numberValue);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    }
    // Reject
    reject({ position, delay });
  });
}
