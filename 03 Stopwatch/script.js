// set variables for different page elements (buttons and span elements)
const start = document.querySelector('.start')
const stop = document.querySelector('.stop')
const reset = document.querySelector('.reset')
let secondsDisplay = document.querySelector('.seconds')
let minutesDisplay = document.querySelector('.minutes')

// set the default values of the minutes and seconds display elements
secondsDisplay.textContent = "00"
minutesDisplay.textContent = "00"

// set default value for seconds and define intervalID for reset and stop functions
let seconds = 0
let intervalId

// set event listeners for three different buttons
start.addEventListener('click', startClock);
stop.addEventListener('click', stopClock);
reset.addEventListener('click', resetClock);

// function to run when intervalID is not zero: updateSeconds
function startClock() {
  if (!intervalId) {
    intervalId =  setInterval(updateSeconds, 1000)
  }
}

// this function counts and displays the minutes and seconds based on the setInterval of 1000 ms defined above
function updateSeconds() {
  seconds += 1;
  if (seconds < 10) {
    secondsDisplay.textContent = "0" + seconds;
  } else if (seconds >= 10 && seconds <= 59) {
    secondsDisplay.textContent = seconds;
  } else if (seconds >= 60 && seconds < 600) {
    if (seconds % 60 < 10) {
      minutesDisplay.textContent = "0" + Math.floor(seconds / 60);
      secondsDisplay.textContent = "0" + Math.floor(seconds % 60);
    } else {
      minutesDisplay.textContent = "0" + Math.floor(seconds / 60);
      secondsDisplay.textContent = Math.floor(seconds % 60);
    }
  } else if (seconds >= 600) {    
    if (seconds % 60 < 10) {
      minutesDisplay.textContent = Math.floor(seconds / 60);
      secondsDisplay.textContent = "0" + Math.floor(seconds % 60);
    } else {
      minutesDisplay.textContent = Math.floor(seconds / 60);
      secondsDisplay.textContent = Math.floor(seconds % 60);
    }    
  }
}

// stops the clock after last iteration when clicked
function stopClock() {
  clearInterval(intervalId);
  intervalId = null;
}

// sets minutes and seconds to zero
function resetClock() {
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
  seconds = 0
}