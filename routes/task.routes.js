const router = require("express").Router();
const mongoose = require('mongoose');

const Task = require("../models/Task.model")

//  POST /api/tasks  -  Creates a new task
router.post('/tasks', (req, res, next) => {
    const { description, dueDate, checked, sprintId } = req.body;
   
    Task.create({ description, dueDate, checked, sprint: sprintId })
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });

 
// DELETE - /api/tasks/:taskId  - Delete specified project

router.delete("/tasks/:taskId ", (req, res)=>{
    const { taskId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Task.findByIdAndDelete(taskId)
            .then(deletedTask => res.json(deletedTask))
            .catch(err => console.log(err))
})

module.exports = router;