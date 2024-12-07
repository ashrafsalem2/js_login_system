const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get("email");

let users = JSON.parse(localStorage.getItem('allUsers'));
let name = "";
for (var i = 0; i < users.length; i++) {
  if (users[i].email === email) {
    name = users[i].name;
    break;
  }
}

document.getElementById('user').innerHTML = name; // That's for a string