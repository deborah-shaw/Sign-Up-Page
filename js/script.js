// List all the US states when the page loads
displayStates();

// Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("change", validatePassword);
document.querySelector("#passwordMatch").addEventListener("change", confirmPassword);
document.querySelector("#password").addEventListener("input", updatePasswordUI);
document.querySelectorAll(".togglePassword").forEach(icon => {
  icon.addEventListener("click", togglePassword);
});
document.querySelector("#signupForm").addEventListener("submit", validateForm);

// Display US States when the page loads
async function displayStates() {
  let url = "https://csumb.space/api/allStatesAPI.php";
  let response = await fetch(url);
  let data = await response.json();
  let stateList = document.querySelector("#state");
  for (let i of data) {
    stateList.innerHTML += `<option>${i.state}</option>`;
  }
}

// Display city from Web API after entering a zip code
async function displayCity() {
  // alert(document.querySelector("#zip").value);
  document.querySelector("#zipError").innerHTML = "";
  document.querySelector("#city").innerHTML = "";
  document.querySelector("#latitude").innerHTML = "";
  document.querySelector("#longitude").innerHTML = "";
  let zipCode = document.querySelector("#zip").value;
  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
  let response = await fetch(url);
  let data = await response.json();
  //console.log(data);
  if (!data || !data.city) {
    document.querySelector("#zipError").innerHTML = " Zip code not found";
    document.querySelector("#zipError").style.color = "red";
  }
  else {
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
  }
}

// Display counties from Web API based on the two-letter abbreviation of a state
async function displayCounties() {
  let state = document.querySelector("#state").value;    // get the state from the dropdown menu
  let url = "https://csumb.space/api/allStatesAPI.php";    // find the state abbreviation ${i.usps}
  let response = await fetch(url);
  let data = await response.json();
  for (let i of data) {
    if (i.state == state) {
      url = `https://csumb.space/api/countyListAPI.php?state=${i.usps}`;  // use abbreviation to find counties
      response = await fetch(url);
      data = await response.json();
      //console.log(data)
      let countyList = document.querySelector("#county");
      countyList.innerHTML = "<option> Select County </option>";  //clear county list
      for (let i of data) {
        countyList.innerHTML += `<option>${i.county}</option>`;
      }
    }
  }
}

// Validate username
async function checkUsername() {
  let username = document.querySelector("#username").value;
  if (username.length == 0) {
    document.querySelector("#usernameError").innerHTML = " Username is Required!";
    document.querySelector("#usernameError").style.color = "red";
    return false;
  }
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  if (data.available) {
    document.querySelector("#usernameError").innerHTML = "Username is available!";
    document.querySelector("#usernameError").style.color = "green";
  }
  else {
    document.querySelector("#usernameError").innerHTML = "Username is taken, please choose another username.";
    document.querySelector("#usernameError").style.color = "red";
    return false;
  }
  return true;
}

// Validate password at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, with no whitespace
function validatePassword() {
  document.querySelector("#passwordRule").innerHTML = "";
  let password = document.querySelector("#password").value;
  let regex = /^(?=.*[A-Z])(?=.*[a-z])(?!.*\s)(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
  if (!regex.test(password)) {
    document.querySelector("#passwordRule").innerHTML = "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, with no whitespace.";
    document.querySelector("#passwordRule").style.color = "red";
    return false;
  }
  confirmPassword();  // password confirmation matches original password
  return true;
}

// Confirm password
function confirmPassword() {
  document.querySelector("#invalidPasswordMatch").innerHTML = "";
  let password = document.querySelector("#password").value;
  let passwordMatch = document.querySelector("#passwordMatch").value;
  if (password != passwordMatch) {
    document.querySelector("#invalidPasswordMatch").innerHTML = "Passwords do not match.";
    document.querySelector("#invalidPasswordMatch").style.color = "red";
    return false;
  }
  return true;
}

// Update Password Checklist
function updatePasswordUI() {
  let password = document.querySelector("#password").value;
  let rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()]/.test(password),
    nospace: !/\s/.test(password)
  };
  let score = 0;
  for (let rule in rules){
    let element = document.querySelector("#" + rule);
    if (rules[rule]) {
      element.innerHTML = "✔ " + element.textContent.substring(2);
      element.style.color = "green";
      score++;
    }
    else {
      element.innerHTML = "❌ " + element.textContent.substring(2);
      element.style.color = "red";
    }
  }
  updateStrengthBar(score);
}

// Update Password Strength Bar
function updateStrengthBar(score) {
  let bar = document.querySelector("#strengthBar");
  let percent = (score / 6) * 100;
  bar.style.width = percent + "%";
  if (score <= 2) {
    bar.style.backgroundColor = "red";
  }
  else if (score <= 4) {
    bar.style.backgroundColor = "orange";
  }
  else {
    bar.style.backgroundColor = "green";
  }
}

// Toggle password visibility
function togglePassword() {
  let inputId = this.getAttribute("data-target");
  let input = document.querySelector("#" + inputId);
  if (input.type === "password") {
    input.type = "text";
	this.textContent = "🔒";
  }
  else {
    input.type = "password";
	this.textContent = "👁";
  }
}

// Validate form data
async function validateForm(e) {
  e.preventDefault();  // stop form submition first
  let isValid = true;

  // Validate username
  if (!(await checkUsername())) {
    isValid = false;
  }

  // Validate password
  if (!validatePassword()) {
    isValid = false;
  }
  if (!confirmPassword()) {
    isValid = false;
  }

  // Only submit if valid
  if (isValid) {
    document.querySelector("#signupForm").submit();
  }
}
