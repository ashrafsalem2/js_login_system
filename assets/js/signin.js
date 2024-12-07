/*
    Login process
    todo1: get the email and password
    todo2: check if email is syntically correct
    todo3: search in localStorage if user available
    todo4: redirect to home in correct login
    todo5: error message to the user in case of invalid login
*/

// elements
let userEmail = document.getElementById("email");
let alert = document.querySelector(".alert");
let userPassword = document.getElementById("password");
let btnLogin = document.getElementById("btn_login");
let lblError = document.querySelector(".error");
let loginForm = document.getElementById("input_form");
let allUsers = [];

//2- reg to check the email
const reg =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * get all users from local storage
 */
if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

/**
 * check for correct email syntex
 */
userEmail.addEventListener("input", function () {
  validateInput(userEmail, reg, alert);
});

/**
 * login process
 */

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  if(checkNotEmpty(userEmail) && checkNotEmpty(userPassword)){
    var emailExist = false;
    var name = "";
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === userEmail.value && allUsers[i].password === userPassword.value) {
        emailExist = true;
        let login_data = {
          name: allUsers[i].name,
          email: userEmail.value
        };
        
        // save login
        localStorage.setItem('login_data', JSON.stringify(login_data));
        break;
      }
    }
    console.log(loginForm);
    if (emailExist) {
        loginForm.submit();
    } else {
        alertMessage("danger");
    }
  } else {
    alertMessage("danger");
  }

});

/**
 * display alert
 */
function alertMessage(type) {
  lblError.classList.remove("d-none");
  type == "success"
    ? lblError.classList.add("alert", "alert-success")
    : lblError.classList.add("alert", "alert-danger");

  lblError.innerHTML += `
    <span class="text-${type}"><strong> ${
    type == "success" ? "sucess" : "invalid inputs"
  } </strong></span>
  `;

  userEmail.value = "";
  userPassword.value = "";

  setTimeout(function () {
    lblError.innerHTML = "";
    lblError.classList.remove("alert", "alert-success");
    lblError.classList.remove("alert", "alert-danger");
    lblError.classList.add("d-none");
    userEmail.classList.remove("is-invalid");
    userEmail.classList.remove("is-valid");
    alert.classList.replace("d-block", "d-none");
  }, 2000);
}

/**
 * check for empty function
 */
function checkNotEmpty(input) {
  return input.value !== "" ? true : false;
}
/**
 * vlaidate input
 */
function validateInput(input, reg, alert) {
  // if name is not correct, adding is-invalid class to input
  if (!reg.test(input.value)) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    // change background color
    input.classList.add("form_control_danger");
    input.classList.remove("form_control_success");
    // appear the alert dialog
    alert.classList.replace("d-none", "d-block");
    validEmail = false;
  } else {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    // change background color
    input.classList.replace("form_control_danger", "form_control_success");
    // appear the alert dialog
    alert.classList.replace("d-block", "d-none");
    validEmail = true;
  }
}
