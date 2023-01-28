const router = require("express").Router();
const mongoose = require("mongoose");
const { findById } = require("../models/Sprint.model");
const Sprint = require("../models/Sprint.model");
const Task = require("../models/Task.model");

//  POST /api/tasks  -  Creates a new task
router.post("/tasks", async (req, res, next) => {
  const { description, dueDate, checked, sprintId } = req.body;

  const newTask = await Task.create({
    description,
    dueDate,
    checked,
    sprint: sprintId,
  });

  Sprint.findByIdAndUpdate(sprintId, { $push: { tasks: newTask._id } })
    .then((foundSprint) => {
      return foundSprint.save();
    })
    .then(() => {
      res.json(newTask);
    })
    .catch((err) => res.json(err));
});

// DELETE - /api/tasks/:taskId  - Delete specified task

router.delete("/tasks/:sprintId/:taskId", async (req, res) => {
  const { taskId, sprintId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const deletedTask = await Task.findByIdAndDelete(taskId);
  Sprint.findByIdAndUpdate(sprintId, { $pull: {tasks: deletedTask._id } })
  .then(updatedSprint => {
    updatedSprint.save()
    res.json(updatedSprint.tasks)})
    .catch((err) => console.log(err));
});

module.exports = router;
