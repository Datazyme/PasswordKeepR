// Client facing scripts here
document.getElementById("New_Account").addEventListener("click", function(){
  var midSection = document.createElement("div");
  midSection.setAttribute("class", "mid_section");

  var div1 = document.createElement("span");
  div1.setAttribute("class", "div1");
  var h3 = document.createElement("h3");
  h3.innerHTML = "website name placeholder";
  div1.appendChild(h3);

  var div2 = document.createElement("span");
  div2.setAttribute("class", "div2");
  var h4 = document.createElement("h4");
  h4.innerHTML = "Username";
  div2.appendChild(h4);
  var input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("placeholder", "Textbox 2");
  div2.appendChild(input1);

  var div3 = document.createElement("span");
  div3.setAttribute("class", "div3");
  var h4 = document.createElement("h4");
  h4.innerHTML = "password";
  div3.appendChild(h4);
  var input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("placeholder", "Textbox 1");
  div3.appendChild(input2);

  var div4 = document.createElement("span");
  div4.setAttribute("class", "div4");
  var addBtn = document.createElement("button");
  addBtn.setAttribute("class", "add");
  addBtn.innerHTML = "Add";
  div4.appendChild(addBtn);
  var editBtn = document.createElement("button");
  editBtn.setAttribute("class", "edit");
  editBtn.innerHTML = "Edit";
  div4.appendChild(editBtn);

  midSection.appendChild(div1);
  midSection.appendChild(div2);
  midSection.appendChild(div3);
  midSection.appendChild(div4);

  document.getElementById("New").appendChild(midSection);
});

// copy button listener

const copyButton = document.getElementById("copy-button");
const output = document.getElementById("output");

copyButton.addEventListener("click", function() {
  output.select();
  document.execCommand("copy");
});