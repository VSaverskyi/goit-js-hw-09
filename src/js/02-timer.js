import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start'),
  daysValue: document.querySelector('span[data-days'),
  hoursValue: document.querySelector('span[data-hours'),
  minutesValue: document.querySelector('span[data-minutes'),
  secondsValue: document.querySelector('span[data-seconds'),
  timerEl: document.querySelector('.timer'),
  valueEls: document.querySelectorAll('.value'),
  labelEls: document.querySelectorAll('.label'),
  fieldEls: document.querySelectorAll('.field'),
};

let selectedTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      refs.startBtn.disabled = true;
      return alert('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    selectedTime = selectedDates[0];
  },
};
refs.startBtn.disabled = true;
flatpickr(refs.datetimePicker, options);

const timer = {
  intervalId: null,
  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const getDeltaTime = convertMs(selectedTime - currentTime);
      const { days, hours, minutes, seconds } = getDeltaTime;
      refs.daysValue.textContent = days;
      refs.hoursValue.textContent = hours;
      refs.minutesValue.textContent = minutes;
      refs.secondsValue.textContent = seconds;
      if (
        days === '00' &&
        hours === '00' &&
        minutes === '00' &&
        seconds === '00'
      ) {
        this.stop();
        console.log('putin is died. Glory to Ukraine!');
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },
};

addTimerStyles();
refs.startBtn.addEventListener('click', () => {
  timer.start();
});

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

function addLeadingZero(value) {
  if (String(value).length < 3) {
    return String(value).padStart(2, '0');
  }
  if (String(value).length === 3) {
    return String(value).padStart(3, '0');
  }
}

function addTimerStyles() {
  const { timerEl, fieldEls, labelEls, valueEls } = refs;
  timerEl.style.display = 'flex';
  timerEl.style.gap = '20px';
  fieldEls.forEach(el => {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.gap = '5px';
    el.style.alignItems = 'center';
  });
  labelEls.forEach(el => {
    el.style.textTransform = 'uppercase';
    el.style.fontSize = '14px';
    el.style.fontWeight = '500';
    el.style.lineHeight = '1.25';
  });
  valueEls.forEach(el => {
    el.style.fontSize = '36px';
    el.style.fontWeight = '500';
    el.style.lineHeight = '1.25';
  });
}
