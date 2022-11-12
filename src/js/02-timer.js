import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.disabled = true;
let CURRENT_DATE = new Date();
let SELECTED_DATE;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < CURRENT_DATE) {
      btnStart.disabled = true;
      Notify.failure('Proszę wybrać datę z przyszłości');
    } else if (selectedDates[0] > CURRENT_DATE) {
        Notify.success('Wybrano poprawną datę')
        btnStart.disabled = false;
      SELECTED_DATE = selectedDates[0].getTime();
    }
    
    
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days =
    Math.floor(ms / day) < 10 ? addLeadingZero(Math.floor(ms / day)) : Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function startTimer() {
  btnStart.disabled = true;
  Notify.info('Rozpoczęto odliczanie')

  const timerId = setInterval(() => {
    let endTime = SELECTED_DATE - Date.now();
    const countdown = convertMs(endTime);
    if (endTime <= 0) {
      Notify.success('Odliczanie dobiegło końca!');
      clearInterval(timerId);
    } else {
      clockTimer(countdown);
    }
  }, 1000);
}

function clockTimer(countdown) {
  days.textContent = countdown.days;
  hours.textContent = countdown.hours;
  minutes.textContent = countdown.minutes;
  seconds.textContent = countdown.seconds;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const fp = flatpickr('input#datetime-picker', options);
btnStart.addEventListener('click', startTimer);