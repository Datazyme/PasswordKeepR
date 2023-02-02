// Client facing scripts here
const formTemplate = (index) => `
<span class="div${index}">
  <h3>Website </h3>
  <form onsubmit="submitForm(event, 'div${index}')">
    <input type="text" id="div${index}-input" placeholder="Website">
    <input type="submit" value="Submit" class="divsubmit">
  </form>
  <div id="div${index}-output" style="display: none"></div>
</span>
`;

const outputIds = ['div1', 'div2', 'div3'];

document.getElementById("New_Account").addEventListener("click", function(){
  let formsHTML = '';
  for (let i = 0; i < outputIds.length; i++) {
    formsHTML += formTemplate(i + 1);
  }

  const midSection = document.createElement("div");
  midSection.setAttribute("class", "mid_section");
  midSection.innerHTML = formsHTML + '<span class="div4"><button class="add">Add</button><button class="edit">Edit</button></span>';

  document.getElementById("New").appendChild(midSection);
});


// copy button listener

// const copyButton = document.getElementById("copy-button");
// const output = document.getElementById("output");

// copyButton.addEventListener("click", function() {
//   output.select();
//   const newLocal = document.execCommand("copy");
// });

