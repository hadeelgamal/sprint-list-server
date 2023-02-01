const router = require("express").Router();
const mongoose = require('mongoose');

const Sprint = require("../models/Sprint.model")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//  POST /api/sprints  -  Creates a new sprint
router.post('/sprints',  isAuthenticated, (req, res, next) => {
    const { title, dueDate, currentStatus } = req.body;
   console.log("req.body: ", req.body)
    Sprint.create({ title, dueDate, currentStatus, tasks: [], owner: req.payload._id })
      .then(response => {
        console.log("response: ", response)
        res.json(response)})

      .catch(err => res.json(err));
  });

  // GET /api/sprints - Returns all the sprints
router.get('/sprints',  isAuthenticated, (req, res) => {
  const userId = req.payload._id;
  console.log(userId)

    Sprint.find({owner: userId})
            .sort({ createdAt: 'asc'})
            .populate('tasks')
            .then(allsprints => {
              console.log("all sprints: ", allsprints)
              res.json(allsprints)})
            .catch(err => {
              console.log(err)
              res.json(err)
            })
})

// GET /api/sprints/:sprintId - Return the specified sprint using the id
router.get("/sprints/:sprintId", isAuthenticated, (req, res) => {
    const { sprintId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sprintId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Sprint.findById(sprintId)
            .populate('tasks')
            .then(foundSprint => res.json(foundSprint))
            .catch(err => console.log(err))
})

// PUT  /api/sprints/:sprintId - Edit specified sprint
router.put("/sprints/:sprintId", isAuthenticated, (req, res)=>{
    const { sprintId } = req.params;
    const { title, dueDate, currentStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(sprintId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Sprint.findByIdAndUpdate(sprintId, {title, dueDate, currentStatus}, {new: true})
            .then(updatedSprint => res.json(updatedSprint))
            .catch(err => console.log(err))

})

// DELETE - /api/sprints/:sprintId  - Delete specified project

router.delete("/sprints/:sprintId", isAuthenticated, (req, res)=>{
    const { sprintId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(sprintId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Sprint.findByIdAndDelete(sprintId)
            .then(deletedSprint => res.json(deletedSprint))
            .catch(err => console.log(err))
})

module.exports = router;