const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    completed:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;