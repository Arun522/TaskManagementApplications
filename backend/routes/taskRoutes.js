const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getProjectTasks, 
  updateTask,
  getAssignedTasks
} = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, createTask);
router.get('/:projectId', authMiddleware, getProjectTasks);
router.get('/assigned', authMiddleware, getAssignedTasks);  // This route should call getAssignedTasks

router.put('/:id', authMiddleware, updateTask);

module.exports = router;