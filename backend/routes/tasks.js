const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

// Validation rules
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
];

// All routes are protected
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
