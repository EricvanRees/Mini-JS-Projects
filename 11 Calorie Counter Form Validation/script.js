// reference to form element and others:
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput= document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

// the value of isError is updated if the user provides an invalid input
let isError = false;

// Values from an HTML input field are received as strings in JavaScript. 
// You'll need to convert these strings into numbers before performing any calculations.
function cleanInputString(str) {
  // "global" flag tells the pattern to continue looking after it has found a match
  // regex searches for plusses, minus symbols and spaces, to be replaced with an empty string:    
  const regex = /[\+-\s]/g;
  return str.replace(regex, '');
};

/* Note to the function return below: the match method returns null when no match is found. In this case, the isInvalidInput function should return null when the input is a valid number without any scientific notation.

null in JavaScript is a special primitive that represents the intentional absence of a value. In a boolean context, null is considered falsy which evaluates to false in a conditional statement. */

// second function with regex to filter exponential input with "e"
function isInvalidInput(str) {
  // the "i" flag makes your pattern case-insensitive:
  // The + modifier in a regex allows you to match a pattern that occurs one or more times:
  const regex = /\d+e\d+/i;
  return str.match(regex);
};

// addEntry fun tion allows users to add entries to the calorie counter
function addEntry() {
  let targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  // You will want to number the entries a user adds. To get all of the number inputs, you can use the querySelectorAll() method.
  // Each entry will have a text input for the entry's name, and a number input for the calories. 
  // To get a count of the number of entries, you can query by text inputs.
  // Pass the string input[type="text"] to the querySelectorAll() method.
  // This will return a NodeList of all the text inputs in the form. You can then access the length property of the NodeList to get the number of entries.

  // the first entry should have a count of 1, not 0:
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  // Now you need to build your dynamic HTML string to add to the webpage:
  const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">`;
  // The insertAdjacentHtml method takes two arguments. The first argument is a string that specifies the position of the inserted element. The second argument is a string containing the HTML to be inserted:
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
};

function calculateCalories(e) {
  /* The submit event is triggered when the form is submitted. The default action of the submit event is to reload the page. You need to prevent this default action using the preventDefault() method of your e parameter: */
  e.preventDefault();
  isError = false;
  // The function needs to get the values from the entries the user has added:
  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");
  /* Now that you have your lists of elements, you can pass them to your getCaloriesFromInputs function to extract the calorie total: */
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  // an if statement to your calculateCalories function checks the truthiness of the global error flag, and if it is truthy then use return to end the function execution:
  if (isError) {
    return;
  }
  // the consumedCalories variable is the sum of breakfastCalories, lunchCalories, dinnerCalories, and snacksCalories:
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = (budgetCalories - consumedCalories) + exerciseCalories;
  /* You need to know if the user is in a caloric surplus or deficit. A caloric surplus is when you consume more calories than you burn, and a caloric deficit is when you burn more calories than you consume. Burning as many calories as you consume is called maintenance, and can be thought of as a surplus or deficit of 0, depending on your goals. */
  let surplusOrDeficit = remainingCalories < 0? "Surplus" : "Deficit";
  // HTML string that will be displayed in the output element:
  // Math.abs() is a built-in JavaScript method that will return the absolute value of a number (no minus sign):
  output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>`;
  // Finally, you need to make the #output element visible so the user can see your text:
  output.classList.remove('hide');
  calorieCounter.addEventListener('submit', calculateCalories);
}
// function that will get the calorie counts from the user's entries:
function getCaloriesFromInputs(list) {
  // using "let" enables it to be reassigned later:
  let calories = 0;
  for (const item of list) {
    // calls cleaInputString and isInvalidIput functions from above with regex:
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);
    /* the isInvalidInput function returns String.match, which is an array of matches or null if no matches are found. Check if invalidInputMatch is truthy: */
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      // if the user enters an invalid input, you want to alert them and then return null to indicate that the function has failed.
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}
// final feature to add is the ability for a user to clear the form:
function clearForm() {
  // convert a NodeList of li elements to an array of li elements:
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));
  // iterate through the inputContainers array:
  for (const container of inputContainers) {
    container.innerHTML = '';
  }
// clear the budgetNumberInput:
  budgetNumberInput.value = '';
  /* The difference between innerText and innerHTML is that innerText will not render HTML elements, but will display the tags and content as raw text. */
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);