
let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = localStorage.getItem("currentUser");


function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (users[user] && users[user].password === pass) {
    localStorage.setItem("currentUser", user);
    window.location.href = "todo.html";
  } else {
    document.getElementById("msg").textContent = "Invalid login.";
  }
}


function signup() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (users[user]) {
    document.getElementById("msg").textContent = "User already exists.";
  } else {
    users[user] = { password: pass, tasks: [] };
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("msg").textContent = "Signed up! You can now log in.";
  }
}


if (window.location.pathname.includes("todo.html")) {
  if (!currentUser) {
    window.location.href = "index.html";
  }

  document.getElementById("userDisplay").textContent = currentUser;

  function renderTasks() {
    users = JSON.parse(localStorage.getItem("users"));
    const tasks = users[currentUser].tasks;
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task;
      li.onclick = () => removeTask(index);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task === "") return;

    users[currentUser].tasks.push(task);
    localStorage.setItem("users", JSON.stringify(users));
    taskInput.value = "";
    renderTasks();
  }

  function removeTask(index) {
    users[currentUser].tasks.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderTasks();
  }

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  }

  window.addTask = addTask;
  window.removeTask = removeTask;
  window.logout = logout;
  renderTasks();
}
