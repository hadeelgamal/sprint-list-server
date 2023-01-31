const router = require("express").Router();
const mongoose = require("mongoose");
const { findById } = require("../models/Sprint.model");
const Sprint = require("../models/Sprint.model");
const Task = require("../models/Task.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//  POST /api/tasks  -  Creates a new task
router.post("/tasks", isAuthenticated, async (req, res, next) => {
  const { description, dueDate, checked, sprintId } = req.body;

  const newTask = await Task.create({
    description,
    dueDate,
    checked,
    sprint: sprintId,
  });

  Sprint.findByIdAndUpdate(
    sprintId,
    { $push: { tasks: newTask._id } },
    { new: true }
  )
    .then((foundSprint) => {
      return foundSprint.save();
    })
    .then(() => {
      res.json(newTask);
    })
    .catch((err) => res.json(err));
});

// PUT /api/tasks  -  update tasks
router.put("/tasks/:taskId",isAuthenticated, async (req, res) => {
  const { taskId } = req.params;
  const { checked } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  await Task.findByIdAndUpdate(taskId, { checked }, {new: true})
   .then(( foundTask) => {
    console.log("found task from server:", foundTask)
    res.json(foundTask);
   

  })
});

// DELETE - /api/tasks/:taskId  - Delete specified task

router.delete("/tasks/:sprintId/:taskId", isAuthenticated, async (req, res) => {
  const { taskId, sprintId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const deletedTask = await Task.findByIdAndDelete(taskId);
  Sprint.findByIdAndUpdate(
    sprintId,
    { $pull: { tasks: deletedTask._id } },
    { new: true }
  )
    .then((updatedSprint) => {
      updatedSprint.save();
      res.json(updatedSprint.tasks);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
