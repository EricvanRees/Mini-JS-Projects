// This is a personally annotated script, taken from the FreeCodeCamp JavaScript Algorithms and Data Structures page: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/.

// set variables for different page elements
const messageInput = document.getElementById('message-input');
const result = document.getElementById('result');
const checkMessageButton = document.getElementById('check-message-btn');

// variables for different regex and add them to an array
// helpRegex matches multiple literal strings using the "or" operator 
const helpRegex = /please help|assist me/i;
//  dollarRegex matches for both integers and multiple literal text strings. Alsochecks for whitespaces after numbers and words, and uses the "i" flag for matching both upper and lowercase letters.
const dollarRegex = /[0-9]\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
// the following three regex use character classes to match both numbers and letters in a word. At the beginning and the end there's a non-capturing group indicated with parentheses and ?: that checks for whitespaces
const freeRegex = /(?:\s|^)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// event listener for when button is clicked to submit message
// message is marked as spam if a pattern of any of the different regex is found in the message
checkMessageButton.addEventListener("click", () => {
  if(messageInput.value === "") {
    alert("Please enter a message.");
    return;
  } 
  // a ternary operator evaluates to a message to display if there's spam found or not
  result.textContent = isSpam(messageInput.value) ? "Oh no! This looks like a spam message." : "This message does not seem to contain any spam.";
  messageInput.value = "";
});

// some() function is used to evaluate if the message meets any of the different regex from the denyList array
// The some() method of Array instances tests whether at least one element in the array passes the test implemented by the provided function.
const isSpam = (msg) => denyList.some(regex => regex.test(msg));
