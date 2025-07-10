function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");


  if (username === "admin" && password === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashbord.html";
  } else {
    error.textContent = "Invalid credentials!";
  }
}
