const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const taskSchema = new Schema({
  description: String,
  dueDate: Date,
  checked: Boolean,
  sprint: { type: Schema.Types.ObjectId, ref: 'Sprint' }
});
 
module.exports = model('Task', taskSchema);