let timer;
let isRunning = false;
let startTime;
let lapCount = 1;

function startStop() {
  const startStopButton = document.getElementById('startStop');
  if (isRunning) {
    clearInterval(timer);
    startStopButton.innerText = 'Start';
  } else {
    startTime = Date.now() - (lapCount > 1 ? lapCount - 1 : 0) * 1000;
    timer = setInterval(updateDisplay, 100);
    startStopButton.innerText = 'Stop';
  }
  isRunning = !isRunning;
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const display = document.getElementById('display');
  display.innerText = formatTime(elapsedTime);
}

function lap() {
  if (isRunning) {
    const laps = document.getElementById('laps');
    const lapTime = Date.now() - startTime;
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapCount}: ${formatTime(lapTime)}`;
    laps.appendChild(lapItem);
    lapCount++;
  }
}

function reset() {
  clearInterval(timer);
  const display = document.getElementById('display');
  display.innerText = '00:00:00.000';
  const laps = document.getElementById('laps');
  laps.innerHTML = '';
  isRunning = false;
  lapCount = 1;
}

function formatTime(timeInMilliseconds) {
  const milliseconds = timeInMilliseconds % 1000;
  const totalSeconds = Math.floor(timeInMilliseconds / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
  let str = String(number);
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
