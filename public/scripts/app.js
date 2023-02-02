// Client facing scripts here

document.getElementById("New_Account").addEventListener("click", function(){
  var formElements = [    {      title: 'Website',      placeholder: 'Website'    },    {      title: 'Username',      placeholder: 'Username'    },    {      title: 'Password',      placeholder: 'Password'    }  ];

  var midSection = document.createElement("div");
  midSection.setAttribute("class", "mid_section");

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

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    form.appendChild(submit);

    div.appendChild(form);

    var output = document.createElement("div");
    output.setAttribute("id", `div${index + 1}-output`);
    output.setAttribute("style", "display: none");
    div.appendChild(output);

    midSection.appendChild(div);
  });

  document.body.appendChild(midSection);

  var select = document.createElement("select");
  select.setAttribute("id", "pulldown");

  var options = [    {      value: '',      text: 'Select a category'    },    {      value: 'social media',      text: 'Social Media'    },    {      value: 'gaming',      text: 'Gaming'    },    {      value: 'work',      text: 'Work'    },    {      value: 'entertainment',      text: 'Entertainment'    }  ];

  options.forEach(function(option) {
    var optionElement = document.createElement("option");
    optionElement.setAttribute("value", option.value);
    optionElement.innerHTML = option.text;
    select.appendChild(optionElement);
  });

  midSection.insertBefore(select, midSection.firstChild);
});




// copy button listener

// const copyButton = document.getElementById("copy-button");
// const output = document.getElementById("output");

// copyButton.addEventListener("click", function() {
//   output.select();
//   const newLocal = document.execCommand("copy");
// });

// for Jerome to add to database
const savedValue = localStorage.getItem("selectedValue");
if (savedValue) {
  select.value = savedValue;
}

// Save the selected value in local storage when it changes
select.addEventListener("change", function() {
  localStorage.setItem("selectedValue", select.value);
});