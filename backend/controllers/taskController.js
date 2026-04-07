const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const logger = require('../config/logger');

// Get all tasks for logged in user
const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    
    const query = { user: req.user._id };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching tasks'
    });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Task creation validation failed: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const task = await Task.create({
      ...req.body,
      user: req.user._id
    });

    logger.info(`Task created: ${task._id} by user: ${req.user.email}`);
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    logger.error(`Create task error: ${error.message}`);
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating task'
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      logger.warn(`Task not found for update: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      logger.warn(`Unauthorized task update attempt: ${req.params.id} by user: ${req.user.email}`);
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    logger.info(`Task updated: ${req.params.id} by user: ${req.user.email}`);
    res.json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    logger.error(`Update task error: ${error.message}`);
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating task'
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      logger.warn(`Task not found for deletion: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      logger.warn(`Unauthorized task deletion attempt: ${req.params.id} by user: ${req.user.email}`);
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await task.deleteOne();

    logger.info(`Task deleted: ${req.params.id} by user: ${req.user.email}`);
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    logger.error(`Delete task error: ${error.message}`);
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting task'
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
