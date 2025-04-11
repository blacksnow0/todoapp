const express = require("express");
const {
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");

const router = express.Router();

router.get("/", getTask);

router.post("/", addTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
