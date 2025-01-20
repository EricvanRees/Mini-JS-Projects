const paragraph = document.getElementById("text");
document.getElementById('text').innerText = "Background Color: ";

// target divs in header to change color options
let simple = document.getElementById("simple");
let hex = document.getElementById("hex");

// change styles on both link items in header
simple.addEventListener("click", toggleFunction);
hex.addEventListener("click", toggleFunction);
  
  
function toggleFunction(){
  if (simple.classList.contains('active')) {
    simple.classList.remove('active');
    hex.classList.add('active');
  } else {
    simple.classList.add('active');
    hex.classList.remove('active');
  }  
};

// select the correct color option function based on selected link element in header
function createColor() {
  if (simple.classList.contains('active')) {
    createSimpleColor();
  } else {
    createHexColor();
  }
}

// function for creating simple background color based on named colors
function createSimpleColor() {
  let mySimple = '';
  let simpleColors = ['red', 'blue', 'green', 'violet', 'purple', 'pink', 'grey', 'fuchsia', 'yellow', 'teal', 'maroon', 'white', 'orange', 'lime', 'olive', 'navy', 'antiquewhite', 'blueviolet'];
  for (let i = 0; i < simpleColors.length; i++) {
  let myColor = Math.floor(Math.random() * simpleColors.length);
  mySimple = simpleColors[myColor];
  }
  document.body.style.backgroundColor = mySimple;
  paragraph.innerText = "Background Color: " + mySimple;
}

// function for creating a random hex value based on a string containing all possible letters and numbers for creating hex values
function createHexColor() {
  let myHex = '#';
  for (let i = 0; i < 6; i++) {   
    let hexVals = '0123456789ABCDEF';
    let myColor = Math.floor(Math.random() * hexVals.length);
    myHex += hexVals[myColor];
    
  }  
    document.body.style.backgroundColor = myHex;
    paragraph.innerText = "Background Color: " + myHex;
}


