// Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#singupForm").addEventListener("submit", function(event) {
  validateForm(event);
});
document.querySelector("#password").addEventListener("click", showPasswordRule);
document.querySelector("#password").addEventListener("change", validatePassword);
document.querySelector("#retypePassword").addEventListener("change", validateRetypedPassword);

displayStates();  // list all the US states when the page loads

// Functions

// Displaying US States when the page loads
async function displayStates() {
  let url = "https://csumb.space/api/allStatesAPI.php";
  let response = await fetch(url);
  let data = await response.json();
  let stateList = document.querySelector("#state");
  for (let i of data) {
    stateList.innerHTML += `<option>${i.state}</option>`;
  }
}

// Displaying city from Web API after entering a zip code
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
  if (!data) {
    document.querySelector("#zipError").innerHTML = " Zip code not found";
    document.querySelector("#zipError").style.color = "red";
  }
  else {
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
  }
}

// Displaying counties from Web API based on the two-letter abbreviation of a state
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

// Validating username
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

// Validating form data
async function validateForm(e) {
  e.preventDefault();  // stop form submition first
  let isValid = true;

  // Validating username
  if (!(await checkUsername())) {
    isValid = false;
  }

  // Validating password
  if (!validatePassword()) {
    isValid = false;
  }
  if (!validateRetypedPassword()) {
    isValid = false;
  }

  // Only submit if valid
  if (isValid) {
    document.querySelector("#singupForm").submit();
  }
}

// Show password rule
async function showPasswordRule() {
  document.querySelector("#passwordRule").innerHTML = ` Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, with no whitespace. `;
  document.querySelector("#passwordRule").style.color = "green";
}

// Validating password at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, with no whitespace
function validatePassword() {
  document.querySelector("#passwordRule").innerHTML = "";
  let password = document.querySelector("#password").value;
  let regex = /^(?=.*[A-Z])(?=.*[a-z])(?!.*\s)(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
  if (!regex.test(password)) {
    document.querySelector("#passwordRule").innerHTML = "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, with no whitespace.";
    document.querySelector("#passwordRule").style.color = "red";
    return false;
  }
  return true;
}

// Validating retyped password
function validateRetypedPassword() {
  document.querySelector("#invalidRetypedPassword").innerHTML = "";
  let password = document.querySelector("#password").value;
  let retypePassword = document.querySelector("#retypePassword").value;
  if (password != retypePassword) {
    document.querySelector("#invalidRetypedPassword").innerHTML = "Passwords do not match.";
    document.querySelector("#invalidRetypedPassword").style.color = "red";
    return false;
  }
  return true;
}