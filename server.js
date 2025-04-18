const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express(); // ← Debe ir antes de usar `app.use`
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Ya no necesitas body-parser en versiones modernas de Express

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/TodoApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Esquema y modelo de tareas
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  completed: { type: Boolean, default: false },
});


const Task = mongoose.model("Task", taskSchema, "apptodos");

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, "public")));

// Rutas CRUD
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("Tasks found:", tasks); // 👈 Debug
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err); // 👈 Debug
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task({ title: req.body.title });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error saving task", error: err });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
});

// Para SPA: redirigir cualquier ruta al index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
