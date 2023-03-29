var output = document.querySelector(".ul");

var loaderContainer = document.getElementById("loader-container");
loaderContainer.style.display = 'flex';
//the endpoint is the url of the app script having the data of the spreadsheet
const endpoint1 =
  "https://script.google.com/macros/s/AKfycbzqElWO2hTOS5PsbQd7UaIzaE6W5-FvHidopKTqsEoxG-d1I7zD0DLD5XzVEusrjV6mRQ/exec";

fetch(endpoint1) //
  .then((res) => res.json())
  .then((out) => {
    loaderContainer.style.display = 'none';
    make(out.data);
  });
function make(out) {
  out.forEach((row) => {
    const li = makeElement(output, "li", "", "li");
    const h2 = makeElement(li, "h2", row.heading, "heading");
    const p = makeElement(li, "p", row.des, "description");
    const img = makeImage(li, row.images);
  });
}
function makeElement(parent, tag, content, cName) {
  var element = document.createElement(tag);
  element.innerHTML = content;
  parent.appendChild(element);
  element.classList.add(cName);
  return element;
}
function makeImage(parent, src) {
  if (src.slice(8, 13) == "drive") {
    var str = src.split("/"); //to get the id of the image from google drive
    src = "https://drive.google.com/uc?export=view&id=" + str[5]; //to get the image from google drive
    var element = document.createElement("img");
    element.setAttribute("src", src);
    parent.appendChild(element);
    console.log("%cdeveloped by @gokul", "color: green; font-size: 20px");
    return element;
  } else {
    var element = document.createElement("img");
    element.setAttribute("src", src);
    parent.appendChild(element);
    return element;
  }
}
