document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("taskInput").value;
  const description = document.getElementById("descInput").value;
  const dueDate = document.getElementById("dueDateInput").value;
  const priority = document.getElementById("priorityInput").value;

  try {
    const res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, dueDate, priority }),
    });
    const task = await res.json();
    // Agrega la tarea al DOM...
  } catch (err) {
    console.error("Error adding task:", err);
  }
});
