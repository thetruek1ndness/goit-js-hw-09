const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

let intervalId = 0;
stopBtnRef.setAttribute('disabled', true);

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);


function onStartBtnClick() {
  stopBtnRef.removeAttribute('disabled');
  startBtnRef.setAttribute('disabled', true);
  intervalId = setInterval(bodyColorChange, 1000);
}

function bodyColorChange(){
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStopBtnClick(){
  if(intervalId === 0){
    return;
  }
  startBtnRef.removeAttribute('disabled');
  clearInterval(intervalId);
  stopBtnRef.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}