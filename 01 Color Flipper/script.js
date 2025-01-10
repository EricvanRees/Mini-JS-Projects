// grab individual buttons as variables
let buttonGreen = document.querySelector('.green');
let buttonRed = document.querySelector('.red');
let buttonBlue = document.querySelector('.blue');
let buttonRandom = document.querySelector('.random');

// set colors array for random function below
let colors = ['black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple','fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'cyan'];

// add click event to individual buttons and set new background color 
buttonGreen.addEventListener('click', function() {
  document.body.style.backgroundColor = 'green';
});

buttonRed.addEventListener('click', function() {
  document.body.style.backgroundColor = 'red';
});

buttonBlue.addEventListener('click', function() {
  document.body.style.backgroundColor = 'blue';
});

// create random value to use with colors array and set random background color
buttonRandom.addEventListener('click', function() {
  let randomVal = Math.floor(Math.random() * (colors.length));
  document.body.style.backgroundColor = colors[randomVal];
})
