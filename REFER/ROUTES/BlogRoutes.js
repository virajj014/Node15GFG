// src/routes/todos.js
const express = require('express');
const router = express.Router();
const Blog = require('../MODELS/Blog');
const auth = require('../middlewares/auth');

// Create a new blog
router.post('/', auth, async (req, res) => {
  try{
    const blog = new Blog({
        ...req.body,
        owner: req.user._id
    });
    await blog.save();
    res.status(201).json({blog, message: "Blog Created Successfully"});
   }
   catch(err){
         res.status(400).send({error: err});
   }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// get a blog by id
router.get('/:id', async (req, res) => {
  try{
    const blog = await Blog.findById(req.params.id);
    if(!blog){
      return res.status(404).json({message: 'Blog not found'});
    }
    res.json(blog);
  }
  catch(err){
    res.status(500).json({ message: 'Server Error' });
  }
});


// update a blog by id
router.patch('/:id', auth, async (req, res) => {
   try{
      const blog = await Blog.findOne({_id: req.params.id, owner: req.user._id});
      if(!blog){
        return res.status(404).json({message: 'Blog not found'});
      }
      blog.title = req.body.title;
      blog.blog = req.body.blog;
      await blog.save();
      res.json(blog);
   }
    catch(err){
      res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
