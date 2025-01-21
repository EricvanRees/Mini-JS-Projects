let counter = document.getElementById("counter");
let count = 0;

function increase() {
  count++;
  document.getElementById("counter").innerHTML = count;
  if (count > 0) {
    counter.style.color = 'blue';
  } else if (count === 0) {
    counter.style.color = 'black';
  }
}

function decrease() {
  count--;
  document.getElementById("counter").innerHTML = count;
  if (count < 0) {
    counter.style.color = 'red';
  } else if (count === 0) {
    counter.style.color = 'black';
  }
}

function reset() {
  count = 0;
  document.getElementById("counter").innerHTML = count;
  counter.style.color = 'black';
} 
  