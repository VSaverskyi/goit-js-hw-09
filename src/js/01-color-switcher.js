const refs = {
  bodyEl: document.querySelector('body'),
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
};

const changeColorObj = {
  intervalId: null,
  start() {
    this.intervalId = setInterval(intervalChangeBodyColor, 1000);
    refs.startBtnEl.disabled = true;
    refs.stopBtnEl.disabled = false;
  },
  stop() {
    clearInterval(this.intervalId);
    refs.startBtnEl.disabled = false;
    refs.stopBtnEl.disabled = true;
  },
};

refs.startBtnEl.addEventListener('click', () => {
  changeColorObj.start();
});
refs.stopBtnEl.addEventListener('click', () => {
  changeColorObj.stop();
});

function intervalChangeBodyColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
