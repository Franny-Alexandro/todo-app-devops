const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO tasks (title, completed) VALUES (?, 0)", [title], function (err) {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});

app.put("/tasks/:id", (req, res) => {
  const { completed } = req.body;
  db.run("UPDATE tasks SET completed = ? WHERE id = ?", [completed, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err });
    res.json({ updated: this.changes });
  });
});

app.delete("/tasks/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));