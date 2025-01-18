// select text input box and button
let text = document.getElementById("text")

let button = document.getElementById("button")

// when button is clicked, text from input box is set to all lowercase letters, reversed and compared with the original string. If equal, an alert confirms the string is a palindrome. 
button.addEventListener("click", (e) => {
  let str = text.value.toLowerCase(); 
  let reversedStr = str.split("").reverse().join("");
  if (reversedStr === str) {
    alert("String is palindrome");
  } else {
    alert("String is not a palindrome");
  }
})
