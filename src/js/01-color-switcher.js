const refs = {
  button: document.querySelectorAll('button'),
  bodyColor: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let timerId = null;
refs.stop.setAttribute('disabled', '');

refs.start.addEventListener('click', onStartBtn);
refs.stop.addEventListener('click', onStopBtn);

function onStartBtn(evt) {
  timerId = setInterval(() => {
    refs.start.setAttribute('disabled', '');
    refs.stop.removeAttribute('disabled');
    refs.bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  //   console.log(evt.currentTarget);
}

function onStopBtn(evt) {
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', '');
  clearInterval(timerId);
  //   console.log(evt.currentTarget);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
