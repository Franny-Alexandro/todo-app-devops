const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/TodoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("AppTodo", taskSchema);

module.exports = Task;
