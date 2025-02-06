let theDay = document.querySelector('.day')
let theTime = document.querySelector('.time')

// Get the current date and time
let today = new Date();
console.log(today);

// Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
let day = today.getDay();

// Array of day names
let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Display the current day
let currDay = daylist[day];

const node = document.createElement("span");
const textnode = document.createTextNode(currDay);
node.appendChild(textnode);
theDay.appendChild(node);

// Get the current hour, minute, and second
let hour = today.getHours();
let minute = today.getMinutes();
let second = today.getSeconds();

// Determine if it's AM or PM
let prepand = (hour >= 12) ? " PM " : " AM ";

// Convert 24-hour format to 12-hour format
hour = (hour >= 12) ? hour - 12 : hour;

// Check for special cases when hour is 0
if (hour === 0 && prepand === ' PM ') {
    if (minute === 0 && second === 0) {
        hour = 12;
        prepand = ' Noon';
    } else {
        hour = 12;
        prepand = ' PM';
    }
}

// Check for special cases when hour is 0
if (hour === 0 && prepand === ' AM ') {
    if (minute === 0 && second === 0) {
        hour = 12;
        prepand = ' Midnight';
    } else {
        hour = 12;
        prepand = ' AM';
    }
}

// Display the current time
let nodeTime = document.createElement("span");
let currTime = "The current time is " + hour + prepand + " : " + minute + " : " + second
let textnodeTime = document.createTextNode(currTime);
nodeTime.appendChild(textnodeTime);
theTime.appendChild(nodeTime);