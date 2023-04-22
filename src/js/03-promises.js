import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(event) {
  event.preventDefault();

  let amount = form.amount.value;
  let delay = form.delay.value;
  delay = Number(delay);
  let step = form.step.value;
  step = Number(step);

  for (i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(value => Notiflix.Notify.success(value))
      .catch(err => Notiflix.Notify.failure(err));
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
