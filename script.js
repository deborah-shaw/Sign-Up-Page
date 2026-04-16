//Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#singupForm").addEventListener("submit", function(event) {
  validateForm(event);
});
document.querySelector("#singupForm").addEventListener("submit", function(event) {
  validateForm1(event);
});
document.querySelector("#password").addEventListener("click", suggestPassword);
document.querySelector("#password").addEventListener("change", validatePassword);
document.querySelector("#retypePassword").addEventListener("change", validateRetypedPassword);

displayStates();  //list all the US states when the page loads

//Functions

//Displaying US States when the page loads
async function displayStates() {
  let url = "https://csumb.space/api/allStatesAPI.php";
  let response = await fetch(url);
  let data = await response.json();
  let stateList = document.querySelector("#state");
  for (let i of data) {
    stateList.innerHTML += `<option>${i.state}</option>`;
  }
}

//Displaying city from Web API after entering a zip code
async function displayCity() {
  //alert(document.querySelector("#zip").value);
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

//Displaying counties from Web API based on the two-letter abbreviation of a state
async function displayCounties() {
  let state = document.querySelector("#state").value;    //get the state from the dropdown menu
  let url = "https://csumb.space/api/allStatesAPI.php";    //find the state abbreviation ${i.usps}
  let response = await fetch(url);
  let data = await response.json();
  for (let i of data) {
    if (i.state == state) {
      url = `https://csumb.space/api/countyListAPI.php?state=${i.usps}`;  //use abbreviation to find counties
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

//Validating username
async function checkUsername() {
  let username = document.querySelector("#username").value;
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
  }
}

//Validating form data
async function validateForm(e) {
  let isValid = true;

  //Validating username is required and must be available
  let username = document.querySelector("#username").value;
  if (username.length == 0) {
    document.querySelector("#usernameError").innerHTML = " Username Required!";
    document.querySelector("#usernameError").style.color = "red";
    isValid = false;
  }
  // else {
  //   isValid = false;  //testing
  //   let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  //   let responseV = await fetch(url);
  //   let dataV = await responseV.json();
  //   if (!dataV.available) {
  //     document.querySelector("#usernameError").innerHTML = " Username is taken, please choose another username.";
  //     document.querySelector("#usernameError").style.color = "red";
  //     isValid = false;
  //   }
  // }

  //Validating password at least 6 characters and need to match retype password
  let password = document.querySelector("#password").value;
  let retypePassword = document.querySelector("#retypePassword").value;
  if (password.length < 6) {
    document.querySelector("#invalidPassword").innerHTML = "Password must be at least 6 characters.";
    document.querySelector("#invalidPassword").style.color = "red";
    isValid = false;
  }
  if (password != retypePassword) {
    document.querySelector("#invalidRetypedPassword").innerHTML = "Passwords do not match.";
    document.querySelector("#invalidRetypedPassword").style.color = "red";
    isValid = false;
  }
  if (!isValid) {
    e.preventDefault();
  }
}


//Validating form data 1
async function validateForm1(e) {
  let isValid = true;

  //Validating the username is available
  let username = document.querySelector("#username").value;
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let responseV = await fetch(url);
  let dataV = await responseV.json();
  if (!dataV.available) {
    document.querySelector("#usernameError").innerHTML = "Username is taken, please choose another username.";
    document.querySelector("#usernameError").style.color = "red";
    isValid = false;
  }
  if (!isValid) {
    e.preventDefault();
  }
}


//Suggesting a password
async function suggestPassword() {
  let url = "https://csumb.space/api/suggestedPassword.php?length=8";
  let response = await fetch(url);
  let data = await response.json();
  let password = data.password;
  document.querySelector("#suggestedPassword").innerHTML = ` Suggested Password: ${password} `;
  document.querySelector("#suggestedPassword").style.color = "green";
}

//Validating password
function validatePassword() {
  document.querySelector("#invalidPassword").innerHTML = "";
  let password = document.querySelector("#password").value;
  if (password.length < 6) {
    document.querySelector("#invalidPassword").innerHTML = "Password must be at least 6 characters.";
    document.querySelector("#invalidPassword").style.color = "red";
  }
}

//Validating retyped password
function validateRetypedPassword() {
  document.querySelector("#invalidRetypedPassword").innerHTML = "";
  let password = document.querySelector("#password").value;
  let retypePassword = document.querySelector("#retypePassword").value;
  if (password != retypePassword) {
    document.querySelector("#invalidRetypedPassword").innerHTML = "Passwords do not match.";
    document.querySelector("#invalidRetypedPassword").style.color = "red";
  }
}