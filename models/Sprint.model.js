const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const sprintSchema = new Schema({
  title: String,
  dueDate: Date,
  currentStatus: {
    type: String,
    enum: ["ongoing", "past", "upcoming"]
  },
  owner: {type: Schema.Types.ObjectId, ref: "User"},
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  
},
{
    timestamps: true
}
);

 
module.exports = model('Sprint', sprintSchema);