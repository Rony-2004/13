const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TodoList = require("../models/todosList");

// Add a new todo

router.post("/add", async (req, res) => {
  // Validate request body
  if (!req.body || !req.body.description) {
    return res.status(400).json({ message: "Description is required" });
  }

  const description = req.body.description;
  try {
    const newTodo = new TodoList({ description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error adding todo", error });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await TodoList.find();
    // Check if todos exist
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// Update a todo
router.put("/update/:id", async (req, res) => {
    // Validate request parameters
    if (!req.params || !req.params.id) {
      return res.status(400).json({ message: "ID is required" });
    }
  const id  = req.params.id;

  // Valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Validate request body
  if (!req.body || !req.body.description) {
    return res.status(400).json({ message: "Description is required" });
  }
  const description = req.body.description;

  // Validate request body
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    const updatedTodo = await TodoList.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

// Delete a todo
router.delete("/delete/:id", async (req, res) => {
  // Validate request parameters
  if (!req.params || !req.params.id) {
    return res.status(400).json({ message: "ID is required" });
  }
  const id = req.params.id;

  // Valid mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deletedTodo = await TodoList.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

module.exports = router;
