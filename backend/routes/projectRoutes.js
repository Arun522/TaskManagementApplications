const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getUserProjects, 
  getProjectById, 
  editProject, 
  deleteProject 
} = require('../controllers/projectController');
const { authMiddleware } = require('../middleware/auth');

// Create a new project
router.post('/', authMiddleware, createProject);

// Get all user's projects
router.get('/', authMiddleware, getUserProjects);

// Get details of a single project
router.get('/:id', authMiddleware, getProjectById);

// Edit a project
router.put('/:id', authMiddleware, editProject);

// Delete a project
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
