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
  let variationsCount = [number, symbol].length;
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
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function getRandomUpper() {
  //const upperCase = "!@#$%^&*(){}[]=<>/,.";
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
}


console.log(String.fromCharCode(Math.floor(Math.random() * 26) + 97));
console.log(String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase());
console.log(randomPassword(getRandomUpper(),getRandomNumber(), getRandomSymbol(), 5));

// //generate password options [password length, contains lowercase, contains uppercase, contains numbers, contains symbols.]
// //must take in from user checking off boxes

// let ranNum = function generateRandomString() {
//   return Math.random().toString(input).slice(2,8);
// };


// //option number one
// passwordRouter.post("/", (req, res) => {
//   const id = req.session.user_id;

//   if (req.body.length) {
//   const passwordGenerator = function () {

//     if (req.body.uppercase === 'true') {
//       uppercaseBoolean = true;
//     } else if (req.body.uppercase === 'false') {
//       uppercaseBoolean = false;
//     }

//     if (req.body.lowercase === 'true') {
//       lowercaseBoolean = true;
//     } else if (req.body.lowercase === 'false') {
//       lowercaseBoolean = false;
//     }

//     if (req.body.symbols === 'true') {
//       symbolsBoolean = true;
//     } else if (req.body.symbols=== 'false') {
//       symbolsBoolean = false;
//     }

//     if (req.body.numbers === 'true') {
//       numbersBoolean = true;
//     } else if (req.body.numbers === 'false') {
//       numbersBoolean = false;
//     }

//     return password = generator.generate({
//       length: req.body.length,
//       numbers: numbersBoolean,
//       uppercase: uppercaseBoolean,
//       lowercase: lowercaseBoolean,
//       symbols: symbolsBoolean
//     });
//   };

//   const thePassword = passwordGenerator();
//   console.log("thepassword? ", thePassword);
//   getOrgIdFromName(req.body.organisationName)
//     .then((val) => {
//       const orgId = val;
//       newPasswordToDatabase(id, orgId, req.body.category, req.body.url, thePassword);
//       res.send('This worked!');
//     });
//   } else {
//     getOrgIdFromName(req.body.organisationName)
//     .then((val) => {
//       const orgId = val;
//       newPasswordToDatabase(id, orgId, req.body.category, req.body.url, req.body.password);
//       res.send('This also worked! You can submit your own password');
//     });
//   }
// });

// var password=document.getElementById("password");

//  function genPassword() {
//     var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     var passwordLength = 12;
//     var password = "";
//  for (var i = 0; i <= passwordLength; i++) {
//    var randomNumber = Math.floor(Math.random() * chars.length);
//    password += chars.substring(randomNumber, randomNumber +1);
//   }
//         document.getElementById("password").value = password;
//  }

// function copyPassword() {
//   var copyText = document.getElementById("password");
//   copyText.select();
//   document.execCommand("copy");
// }

// generateBtn.addEventListener("click", () => {
//   const length = passLength.value;
//   const numbers = includeNumbers.checked;
//   const symbols = includeSymbols.checked;
//   result.value = generatePassword(numbers, symbols, length);
// });
// function generatePassword(number, symbol, length) {
//   let generatedPassword = "";
//   let variationsCount = [number, symbol].length;
//   for (let i = 0; i < length; i += variationsCount) {
//     if (number) {
//       generatedPassword += getRandomNumber();
//     }
//     if (symbol) {
//       generatedPassword += getRandomSymbol();
//     }
//     generatedPassword += getRandomLower();
//   }
//   const finalPassword = generatedPassword.slice(0, length);
//   return finalPassword;
// }
