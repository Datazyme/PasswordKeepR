// Client facing scripts here
document.getElementById("New_Account").addEventListener("click", function(){
  var formElements = [    {      title: 'Website',      placeholder: 'Website'    },    {      title: 'Username',      placeholder: 'Username'    },    {      title: 'Password',      placeholder: 'Password'    }  ];

  var midSection = document.createElement("div");
  midSection.setAttribute("class", "mid_section");

  var select = document.createElement("select");
  select.setAttribute("id", "pulldown");
  var options = `
    <option value="">Select a category</option>
    <option value="social media">Social Media</option>
    <option value="gaming">Gaming</option>
    <option value="work">Work</option>
    <option value="entertainment">Entertainment</option>
  `;
  select.innerHTML = options;
  midSection.appendChild(select);

  formElements.forEach(function(formElement, index) {
    var div = document.createElement("span");
    div.setAttribute("class", `div${index + 1}`);

    var h4 = document.createElement("h4");
    h4.innerHTML = formElement.title;
    div.appendChild(h4);

    var form = document.createElement("form");
    form.setAttribute("onsubmit", `submitForm(event, 'div${index + 1}')`);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `div${index + 1}-input`);
    input.setAttribute("placeholder", formElement.placeholder);
    form.appendChild(input);

    div.appendChild(form);

    var output = document.createElement("div");
    output.setAttribute("id", `div${index + 1}-output`);
    output.setAttribute("style", "display: none");
    div.appendChild(output);
    midSection.appendChild(div);
  });

  var buttons = `
    <span class="div4">
      <button class="add">Add</button>
      <button class="edit">Edit</button>
    </span>
  `;
  midSection.insertAdjacentHTML("beforeend", buttons);

  document.body.appendChild(midSection);
});





// copy button listener
var clipboard = new ClipboardJS('#copy-button');

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});

sf
// for Jerome to add to database
const savedValue = localStorage.getItem("selectedValue");
if (savedValue) {
  select.value = savedValue;
}

// Save the selected value in local storage when it changes
select.addEventListener("change", function() {
  localStorage.setItem("selectedValue", select.value);
});



function submitForm(event, div) {
  event.preventDefault();
  const input = document.querySelector(`#${div} form .div-input`);
  const output = document.querySelector(`#${div}-output`);
  output.innerHTML = input.value;
  input.style.display = 'none';
  output.style.display = 'block';
}

document.querySelector("add").addEventListener("click", function() {
  console.log("hello")

});

// slider
const slider = document.querySelector("#slider");
const output = document.querySelector("#length-output");

slider.addEventListener("input", function() {
  output.innerHTML = slider.value;
});
