// src/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../MODELS/Todo');

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
