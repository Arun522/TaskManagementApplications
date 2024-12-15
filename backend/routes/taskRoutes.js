const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getTaskById, 
  updateTask,
  getAssignedTasks
} = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, createTask);
router.get('/:id', authMiddleware, getTaskById);
//router.get('/assigned', authMiddleware, getAssignedTasks);

router.put('/:id', authMiddleware, updateTask);

module.exports = router;