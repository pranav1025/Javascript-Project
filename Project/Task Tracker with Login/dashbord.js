
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      updateTasks();
    };
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push(task);
    updateTasks();
    taskInput.value = "";
  }
}

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

renderTasks();
