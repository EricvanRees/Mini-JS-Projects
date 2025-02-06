
let btn = document.querySelector(".btn");
let imageDiv = document.querySelector('.img');

btn.addEventListener("click", function() {
  // insert new element instead of refreshing the index.html page
    imageDiv.innerHTML = 
        `<object
          data="https://picsum.photos/500/250"
          width="500"
          height="250"
          style="overflow: hidden"
        ></object>`
});