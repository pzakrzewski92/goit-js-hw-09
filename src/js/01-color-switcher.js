import { Notify } from 'notiflix/build/notiflix-notify-aio';

const bodyColor = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

const randomBodyColor = {
  DELAY: 1000,

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },

  interval() {
    timerId = setInterval(() => {
      bodyColor.style.backgroundColor = this.getRandomHexColor();
    }, this.DELAY);
  },
  start() {
    btnStart.addEventListener('click', () => {
      Notify.success('Rozpoczęto zmianę kolorów');
      bodyColor.style.backgroundColor = this.getRandomHexColor();
      this.interval();
      btnStart.disabled = true;
      btnStop.disabled = false;
    });
    btnStop.addEventListener('click', this.stop);
  },

  stop() {
    Notify.failure('Zatrzymano zmianę koloru');
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
  },
};

randomBodyColor.start();
