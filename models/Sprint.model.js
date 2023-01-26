const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const sprintSchema = new Schema({
  title: String,
  dueDate: Date,
  timestamps: true,
  status: {
    type: String,
    enum: ["ongoing", "past", "upcoming"]
  },
  owner: {type: Schema.Types.ObjectId, ref: "User"},
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  // owner will be added later on
});
 
module.exports = model('Sprint', sprintSchema);