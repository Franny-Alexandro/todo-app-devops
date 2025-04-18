const api = "http://localhost:3000/tasks";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const fetchTasks = async () => {
  const res = await fetch(api);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => renderTask(task));
};

const renderTask = (task) => {
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";
  li.innerHTML = `
    <span>${task.title}</span>
    <div>
      <button onclick="toggleTask(${task.id}, ${task.completed})">✔️</button>
      <button onclick="deleteTask(${task.id})">🗑️</button>
    </div>
  `;
  taskList.appendChild(li);
};

const addTask = async (e) => {
  e.preventDefault();
  const title = taskInput.value;
  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  taskInput.value = "";
  fetchTasks();
};

const toggleTask = async (id, completed) => {
  await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: completed ? 0 : 1 })
  });
  fetchTasks();
};

const deleteTask = async (id) => {
  await fetch(`${api}/${id}`, { method: "DELETE" });
  fetchTasks();
};

taskForm.addEventListener("submit", addTask);
fetchTasks();
