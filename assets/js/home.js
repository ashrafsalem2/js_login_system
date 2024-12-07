// todo1: get data from get and query string from url
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const email = urlParams.get("email");

// let users = JSON.parse(localStorage.getItem('allUsers'));
// let name = "";
// for (var i = 0; i < users.length; i++) {
//   if (users[i].email === email) {
//     name = users[i].name;
//     break;
//   }
// }
//document.getElementById('user').innerHTML = name; // That's for a string

//todo2: get data from login_data localstorage item, or redirect to index in case of no data in login_data inside localStorage

if (localStorage.getItem("login_data") === null) {
  window.location.href="../index.html"
} else {
  document.getElementById("user").innerHTML = JSON.parse(
    localStorage.getItem("login_data")
  ).name;
}

//todo3: remove login_data from localstorage
document.querySelector(".logout").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("login_data");
  window.open("../index.html");
});
