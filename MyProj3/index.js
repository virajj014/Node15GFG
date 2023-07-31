const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
require('dotenv').config();
const app =express();
require('./db')
const Todo = require('./MODELS/Todo');


app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('API works!!')
});

app.get('/gettodos', async (req, res) => {
    const alltodos = await Todo.find();
    res.json(alltodos);
});


app.post('/addtodo', async (req, res) => {
    const {task , completed} = req.body;
    const todo = new Todo({
        task,
        completed
    })

    const savedTodo = await todo.save();
    res.json({
        message: 'Todo saved successfully',
        savedTodo : savedTodo
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

