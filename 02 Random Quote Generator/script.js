// create variable to select span element 
const span = document.querySelector('span');

// set variable for quote array and button element
let quotes = ["Maybe life is random, but I doubt it.", 
            "I believe life is an intelligent thing: that things aren't random.",
            "Natural selection is anything but random.",
            "If something is true, no amount of wishful thinking will change it.",
            "Although many of us fear death, I think there is something illogical about it."];

let btn = document.querySelector('button');
// create a copy of quote array so it can be modified
let copyQuotes = [...quotes];

// this function runs when the button is clicked and displays a new quote
// the function never runs out of quotes as each displayed quote is added to the end of the array
const chooseNextQuote = function () { 
  // set empty span text 
    span.textContent = '';      
  // select first quote from array
    let quote = copyQuotes[0];
  // set first quote to span
    span.textContent = quote;
  // remove first element from array and give it a variable name
    let firstVal = copyQuotes.shift();
  // add first element to the end of the array so the array never finishes
    copyQuotes.push(firstVal);
}
    
// event listener for button 
btn.addEventListener('click', chooseNextQuote);
