// Client facing scripts here
// refactor it to jquery
document.getElementById("New_Account").addEventListener("click", function() {
  let formElements = [    {      title: 'Website',      placeholder: 'Website'    },    {      title: 'Username',      placeholder: 'Username'    },    {      title: 'Password',      placeholder: 'Password'    }  ];

  let midSection = document.createElement("div");
  midSection.setAttribute("class", "mid_section");

  let select = document.createElement("select");
  select.setAttribute("id", "pulldown");
  let options = `
    <option value="">Select a category</option>
    <option value="social media">Social Media</option>
    <option value="gaming">Gaming</option>
    <option value="work">Work</option>
    <option value="entertainment">Entertainment</option>
  `;
  select.innerHTML = options;
  midSection.appendChild(select);

  formElements.forEach(function(formElement, index) {
    let div = document.createElement("span");
    div.setAttribute("class", `div${index + 1}`);

    let h4 = document.createElement("h4");
    h4.innerHTML = formElement.title;
    div.appendChild(h4);

    let form = document.createElement("form");
    form.setAttribute("onsubmit", `submitForm(event, 'div${index + 1}')`);

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `div${index + 1}-input`);
    input.setAttribute("placeholder", formElement.placeholder);
    form.appendChild(input);

    div.appendChild(form);

    let output = document.createElement("div");
    output.setAttribute("id", `div${index + 1}-output`);
    output.setAttribute("style", "display: none");
    div.appendChild(output);
    midSection.appendChild(div);
  });

  let buttons = `
    <span class="div4">
      <button class="add">Add</button>
      <button class="edit">Edit</button>
    </span>
  `;
  midSection.insertAdjacentHTML("beforeend", buttons);

  document.body.appendChild(midSection);
});


// copy button listener
let clipboard = new ClipboardJS('#copy-button');

clipboard.on('success', function(e) {
  console.log(e);
});

clipboard.on('error', function(e) {
  console.log(e);
});

// for Jerome to add to database
const savedValue = localStorage.getItem("selectedValue");
if (savedValue) {
  select.value = savedValue;
}

function submitForm(event, div) {
  event.preventDefault();
  const input = document.querySelector(`#${div} form .div-input`);
  const output = document.querySelector(`#${div}-output`);
  output.innerHTML = input.value;
  input.style.display = 'none';
  output.style.display = 'block';
}

document.querySelector(".add").addEventListener("click", function() {
  console.log("test");
});

//target all the necessary HTML elements with unique identifiers
const result = document.querySelector("#output");
const passLength = document.querySelector("#length");
const passLengthResult = document.querySelector("#length-result");
const includeNumbers = document.querySelector("#numbers");
const includeSymbols = document.querySelector("#symbols");
const includeUppercase = document.querySelector("#upper-case");
const includeLowercase = document.querySelector("#lower-case");
const generateBtn = document.querySelector("#generate");
// const copyPass = document.querySelector("#copy");

// Listen for checkbox ticked and length
includeNumbers.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

includeSymbols.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

includeUppercase.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

includeLowercase.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

// Set default password length 20 max on load
document.addEventListener("DOMContentLoaded", () => {
  passLength.value = 20;
  passLengthResult.innerText = 20;
  let onLoadLength = passLength.value;
  let onLoadNumbers = includeNumbers.checked;
  let onLoadSymbols = includeSymbols.checked;
  let onLoadUpperCase = includeUppercase.checked;
  let onLoadLowerCase = includeLowercase.checked;
  result.value = randomPassword(onLoadLowerCase, onLoadUpperCase, onLoadNumbers, onLoadSymbols, onLoadLength);
});
// Listen for password range change
passLength.addEventListener("change", (event) => {
  passLengthResult.innerText = event.target.value;
  console.log(passLengthResult.innerText);
});

generateBtn.addEventListener("click", () => {
  const length = passLengthResult.innerText;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;
  const upperCase = includeUppercase.checked;
  //const lowerCase = includeLowercase.checked;
  result.value = randomPassword(length, numbers, symbols, upperCase);
});

let randomPassword = function generatePassword(length, number, symbol, upper) {
  let newPassword = "";
  let variationsCount = [upper, number, symbol].length;
  for (let i = 0; i < length; i += variationsCount) {
    if (number) {
      newPassword += getRandomNumber();
    } else {
      newPassword += getRandomLower();
    }
    if (symbol) {
      newPassword += getRandomSymbol();
    } else {
      newPassword += getRandomLower();
    }
    if (upper) {
      newPassword += getRandomUpper();
    } else {
      newPassword += getRandomLower();
    }
    newPassword += getRandomLower();
  }
  const finalPassword = newPassword.slice(0, length);
  return finalPassword;
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
}

$(document).ready(function() {

  //helper function that returns the data in html format




  //calls function
  loadEntry();

  //GET request: pull data from api/passwords route
  // $.get('/api/passwords')
  //   .done(function(response) {
  //     //loops through JSON object from api/passwords route and append every entry to the password table
  //     for (const password of response.passwords) {
  //       $('.passwords-container').prepend(getPasswords(password))
  //     }
  //   });


  // POST request:
  $("#new-password-form").on('submit', handleSubmit);


  $("#password-delete").submit(function(event) {
    event.preventDefault()
    const password_id = $(event.originalEvent.submitter).parent().siblings('.password_id').text();
    $.post('/api/passwords/delete', { password_id })
      .then(() => {
        loadEntry();
      })
  });

  $("#password-edit").submit(function(event) {
    event.preventDefault();
    // const childrenSelector = $(event.originalEvent.submitter).parent().parent();
    let childrenSelector = (selector) => {
      return $(event.originalEvent.submitter).parent().parent().children(`${selector}`).text();
    };
    const data = {
      id: childrenSelector('.password_id'),
      website: childrenSelector('.password_website'),
      username: childrenSelector('.password_username'),
      password: childrenSelector('.password_password'),
      hint: childrenSelector('.password_hint'),
      category: childrenSelector('.password_category'),
      require_master: childrenSelector('.password_require_master')
    };
    // console.log($(event.originalEvent.submitter).parent().parent())
    $(event.originalEvent.submitter).parent().parent().replaceWith(editPasswords(data));
  });

  $("#password-edit-submit").submit(function(event) {
    event.preventDefault()

    let siblingsSelector = (selector) => {
      return $(event.originalEvent.submitter).parent().siblings(`${selector}`).children().val();
    };

    const data = {
      id: $(event.originalEvent.submitter).parent().siblings('.password_id').text(),
      website: siblingsSelector('.edit-password_website'),
      username: siblingsSelector('.edit-password_username'),
      password: siblingsSelector('.edit-password_password'),
      hint: siblingsSelector('.edit-password_hint'),
      category: siblingsSelector('.edit-password_category'),
      require_master_password: siblingsSelector('.edit-password_require_master')
    };
    $.post('/api/passwords/edit', data)
      .then(() => {
        loadEntry();
      })
  });
});



