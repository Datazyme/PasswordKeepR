//target all the necessary HTML elements with unique identifiers
// const result = document.querySelector("#output");
// const passLength = document.querySelector("#length");
// const passLengthResult = document.querySelector("#length-result");
// const includeNumbers = document.querySelector("#numbers");
// const includeSymbols = document.querySelector("#special");
// const includeUppercase = document.querySelector("#uppercase")
// const includeLowercase = document.querySelector("#lowercase")
// const generateBtn = document.querySelector("#generate");
// const copyPass = document.querySelector("#copy");

// // Listen for password range change
// passLength.addEventListener("change", (event) => {
//   passLengthResult.innerText = event.target.value;
// });


let randomPassword = function generatePassword(upper, number, symbol, length) {
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


console.log(String.fromCharCode(Math.floor(Math.random() * 26) + 97));
console.log(String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase());
console.log(randomPassword(getRandomUpper(), null, null, 5));
