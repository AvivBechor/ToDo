const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'The task must have a name'],
        minLength:[2, 'The name must be at least 2 characters or more'],
        maxLength:[25, 'The name cannot be over 25 characters'],
        default: "default task"
    },
    time:{
        type: String,
        required: [true, 'The task must have a time'],
        default: "00:00"
    }, 
    taskNo:{
        type: Number,
        required:[true, 'The task must have an id'],
        unique: [true, 'Task no must be unique']
    },
    currentStatus:{
        type: Boolean,
        required:[true, "Task must have a status"],
        default: false
    }
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task