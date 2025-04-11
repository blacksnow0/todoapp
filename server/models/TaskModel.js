const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Tasks", TaskSchema);

module.exports = Task;
