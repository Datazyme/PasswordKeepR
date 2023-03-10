// Client facing scripts here
// refactor it to jquery
document.getElementById("New_Account").addEventListener("click", function () {


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

  formElements.forEach(function (formElement, index) {
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

  document.body.appendChild(midSection);
});

// copy button listener
let clipboard = new ClipboardJS("#copy-button");

clipboard.on("success", function (e) {
  console.log(e);
});

clipboard.on("error", function (e) {
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
  input.style.display = "none";
  output.style.display = "block";
}

document.querySelector(".passwords-container").addEventListener("click", function () {
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
includeNumbers.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

includeSymbols.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

includeUppercase.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

includeLowercase.addEventListener("change", function () {
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
  result.value = randomPassword(
    onLoadLowerCase,
    onLoadUpperCase,
    onLoadNumbers,
    onLoadSymbols,
    onLoadLength
  );
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

//all function definitions are in public/script/helper.js. this makes the document.ready as clean as possible to only contain jquery codes.
$(document).ready(function () {
  //calls function to GET all passwords asynchronously
  loadAllPasswords();

  //handles the POST request when a new website username and password is submitted and callback the postNewPassword function
  $("#new-password-form").on("submit", postNewPassword);

  //handles the POST request to delete the selected username and password from the database
  $("#password-delete").on("submit", deleteCurrentItem);

  //handles the POST request to edit the selected username and password
  $("#password-edit").on("submit", editCurrentItem);

  //handles the POST request to submit changes with the edit
  $("#password-edit-submit").on("submit", submitEditChanges);
});
