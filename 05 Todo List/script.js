// set variable names for button, input field and (empty) list
const btn = document.getElementById('btn')
let text = document.getElementById('text')
let list = document.getElementById('list')

// this event listener waits for the user to click the button and adds the text from the input field as a list item, along with a delete button. When clicked, the item is deleted from the list.
btn.addEventListener('click', (e) => {
  // create new list element
  let li = document.createElement('li');
  // set ID attribute for each new list element
  li.setAttribute('ID', 'taskdesc');
  // set input field data to new list item
  li.innerHTML = text.value + '&nbsp&nbsp&nbsp'; 
  // create new delete button to add to new list item
  let btn = document.createElement('button');
  btn.innerHTML = 'Delete';
  // add button to list item
  li.appendChild(btn);
  // set a maximum length to the list of tasks
  if (list.childNodes.length < 5) {
    list.appendChild(li);
  }
  // remove task button and parent node (= task description)
  let buttons = document.querySelectorAll('#taskdesc');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      buttons[i].remove();
    });
  }
})  