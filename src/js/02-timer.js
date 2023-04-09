import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  start: document.querySelector('button'),
};

refs.start.setAttribute('disabled', '');

const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;

// -------------------------------

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    // console.log(new Date());

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure(
        'Please choose a date in the future(Будь ласка виберіть дату в майбутньому)'
      );
      // window.alert(
      //   'Please choose a date in the future(Будь ласка виберіть дату в майбутньому)'
      // );
    } else {
      refs.start.removeAttribute('disabled');
      refs.start.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
    }
  },
};

flatpickr(refs.input, options);

function changeTimerValue(selectedTime) {
  const timer = {
    start() {
      const startTime = selectedTime;
      timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        // console.log(deltaTime);
        if (deltaTime >= 0) {
          let timerData = convertMs(deltaTime);
          timerValue.days.textContent = timerData.days;
          timerValue.hours.textContent = timerData.hours;
          timerValue.minutes.textContent = timerData.minutes;
          timerValue.seconds.textContent = timerData.seconds;
        } else {
          clearInterval(timer);
        }
      }, 1000);
    },
  };
  timer.start();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
