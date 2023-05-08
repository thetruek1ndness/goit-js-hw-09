import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(event){
  event.preventDefault();

  const delay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value);
  let currentDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Promise ${position} resolved after ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Promise ${position} rejected after ${delay}ms`);
      });
    currentDelay += step;
  }
}

