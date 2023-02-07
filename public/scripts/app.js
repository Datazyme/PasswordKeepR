// Client facing scripts here
// refactor it to jquery
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
  console.log("test")
});

//target all the necessary HTML elements with unique identifiers
const result = document.querySelector("#output");
const passLength = document.querySelector("#length");
const passLengthResult = document.querySelector("#length-result");
const includeNumbers = document.querySelector("#numbers");
const includeSymbols = document.querySelector("#symbols");
const includeUppercase = document.querySelector("#upper-case")
const includeLowercase = document.querySelector("#lower-case")
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
  console.log(passLengthResult.innerText)
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
  //const length = 5;
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
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
};




$(document).ready(function(){
// step 1 target
// step 2 add event listener
// step 3 effect
  $(".test-password").submit(function(event){
    event.preventDefault()
    const input = $(".text-box").val()
    $.ajax({
      method: "POST",
      url: "/api/passwords",
      data: input
    })
  })
})

// jerome's code
$(document).ready(function(){

  //helper function that returns the data in html format
  const getPasswords = (object) => {
    const password = `
    <tr>
      <td class="password_id" style="display:none;">${object.id}</td>
      <td class="password_website">${object.website}</td>
      <td class="password_username">${object.username}</td>
      <td class="password_password">${object.password}</td>
      <td class="password_hint">${object.hint === null ? '' : object.hint}</td>
      <td class="password_category">${object.category}</td>
      <td class="password_require_master">${object.require_master_password}</td>
      <td><input type="submit" value="Edit" form="password-edit" id="edit-button"></td>
      <td><input type="submit" value="Delete" form="password-delete" id="delete-button"></td>
    </tr>
    `;
    return password;
  };

  const editPasswords = (object) => {
    const edit_box = `
    <tr>
      <td class="password_id" style="display:none;">${object.id}</td>
      <td class="edit-password_website"><input type="text" placeholder="http://" value="${object.website}"></td>
      <td class="edit-password_username"><input type="text" value="${object.username}"></td>
      <td class="edit-password_password"><input type="text" value="${object.password}"></td>
      <td class="edit-password_hint"><input type="text" value="${object.hint}"></td>
      <td class="edit-password_category">
        <select id="category-pulldown" value="${object.category}">
        <option value="Social Media">Social Media</option>
        <option value="Gaming">Gaming</option>
        <option value="Work">Work</option>
        <option value="Entertainment">Entertainment</option>
        </select>
      </td>
      <td class="edit-password_require_master">
        <select id="master-password-pulldown" value="${object.require_master}">
        <option value=false>False</option>
        <option value=true>True</option>
        </select>
      </td>
      <td><input type="submit" value="Done" form="password-edit-submit" id="submit-edit-button"></td>
      <td><input type="submit" value="Delete" form="password-delete" id="delete-button"></td>
    </tr>
    `;
    return edit_box;
  };


  //GET request: pull data from api/passwords route
  $.get('/api/passwords')
    .done(function(response) {
      //loops through JSON object from api/passwords route and append every entry to the password table
      for (const password of response.passwords) {
        $('.passwords-container').prepend(getPasswords(password))
      }
    });


    // POST request:
    $("#new-password-form").submit(function(event){
      event.preventDefault()
      const user_id = 1;
      const organization_id = 1;
      const role_id = 3;
      const is_user_created = true;
      const category = $(".new-category").val();
      const website = $(".new-website").val();
      const username = $(".new-username").val();
      const password = $(".new-password").val();
      const hint = $(".new-hint").val();
      const require_master_password = $(".new-require-master").val();
      console.log('submit')
      $.post('/api/passwords',
      {
        user_id,
        organization_id,
        role_id,
        is_user_created,
        website,
        username,
        password,
        hint,
        category,
        require_master_password
      })
        });


        $("#password-delete").submit(function(event){
          // event.preventDefault()
          const password_id = $(event.originalEvent.submitter).parent().siblings('.password_id').text();
          $.post('/api/passwords/delete', { password_id })
        });

        $("#password-edit").submit(function(event){
          event.preventDefault()
          // const childrenSelector = $(event.originalEvent.submitter).parent().parent();
          var childrenSelector = (selector) => {
            return $(event.originalEvent.submitter).parent().parent().children(`${selector}`).text();
          }
          const data = {
            id: childrenSelector('.password_id'),
            website: childrenSelector('.password_website'),
            username: childrenSelector('.password_username'),
            password: childrenSelector('.password_password'),
            hint: childrenSelector('.password_hint'),
            category: childrenSelector('.password_category'),
            require_master: childrenSelector('.password_require_master')
          }
          // console.log($(event.originalEvent.submitter).parent().parent())
          $(event.originalEvent.submitter).parent().parent().replaceWith(editPasswords(data))
        });

        $("#password-edit-submit").submit(function(event) {
          // event.preventDefault()

          var siblingsSelector = (selector) => {
            return $(event.originalEvent.submitter).parent().siblings(`${selector}`).children().val();
          }

          const data = {
            id: $(event.originalEvent.submitter).parent().siblings('.password_id').text(),
            website: siblingsSelector('.edit-password_website'),
            username: siblingsSelector('.edit-password_username'),
            password: siblingsSelector('.edit-password_password'),
            hint: siblingsSelector('.edit-password_hint'),
            category: siblingsSelector('.edit-password_category'),
            require_master_password: siblingsSelector('.edit-password_require_master')
          }

          $.post('/api/passwords/edit', data)
        });


      });

