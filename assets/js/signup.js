/*
    Sign Up Process
    todo1: get element
    todo2: start get data from user
    todo3: check if email already exist
    todo4: save the data or reject it 
    todo5: use js lib to show success and redirect to home

*/

//1- get the elements
let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let alert = document.querySelector(".alert");
let userPassword = document.getElementById("password");
let btnSignUp = document.getElementById("btn_sign_up");
let lblError = document.querySelector(".error");
let validEmail = false;
let allUsers = [];
let emailExist = false;

//2- reg to check the email
const reg =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//3- start the process

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
 *  check if that email already exist
 * todo: do it after the add
 */
function checkEmailExist(email) {
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      emailExist = true;
      break;
    }
  }
  return emailExist;
}
/**
 * adding user in allUsers list in localStorage
 */
btnSignUp.addEventListener("click", function () {
  if (
    checkNotEmpty(userName) &&
    checkNotEmpty(userEmail) &&
    checkNotEmpty(userPassword) &&
    validEmail
  ) {
    if (!checkEmailExist(userEmail.value)) {
      let user = {
        name: userName.value,
        email: userEmail.value,
        password: password.value,
      };

      //save new user
      allUsers.push(user);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      // alert
      alertMessage("success");
    } else {
      // alert
      alertMessage("danger");
    }
  } else {
    //alert
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
if(emailExist === true){
    lblError.innerHTML += `
    <span class="text-danger"><strong> This Email Already exist</strong></span>
`;
} else {
    lblError.innerHTML += `
    <span class="text-${type}"><strong> ${
    type == "success" ? "sucess" : "invalid inputs"
  } </strong></span>
`;
}
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
  emailExist = false;

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
