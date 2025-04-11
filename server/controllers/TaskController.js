const Task = require("../models/TaskModel");

const getTask = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments();

    res.status(200).json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const addTask = async (req, res) => {
  const { title = "Title", description = "Description...." } = req.body;

  try {
    const newTask = await Task.create({ title, description });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task. " });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Both title and description are required for update." });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task." });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task." });
  }
};

module.exports = { getTask, addTask, deleteTask, updateTask };
