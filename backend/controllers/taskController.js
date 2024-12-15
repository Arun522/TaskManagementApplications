const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, project, assignedTo, deadline } = req.body;

    // Verify project exists and user is a member
    const projectExists = await Project.findOne({ 
      _id: project, 
      $or: [
        { owner: req.user._id },
        { members: req.user._id }
      ]
    });

    if (!projectExists) {
      return res.status(403).json({ message: 'Project not found or access denied' });
    }

    // Verify if the user exists by email (assignedTo)
    const assignedUser = await User.findOne({ email: assignedTo });
    if (!assignedUser) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    // Create the task and assign to the user
    const task = await Task.create({
      title,
      description,
      status,
      project,
      assignedTo,  // Store email of the user here
      createdBy: req.user._id,
      deadline
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message ,
      stack: error.stack
    });
  }
};


// @desc    Get tasks for a project
// @route   GET /api/tasks/:projectId
exports.getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email')  // If assignedTo is an ObjectId and you're populating it
      .populate('createdBy', 'name email');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, deadline } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      { title, description, status, assignedTo, deadline },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get tasks assigned to the logged-in user
// @route   GET /api/tasks/assigned
exports.getAssignedTasks = async (req, res) => {
  try {
    const userEmail = req.user.email;  
    console.log('User Email from getAssignedTasks:', req.user.email);  
    
    const tasks = await Task.find({ assignedTo: req.user.email });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};


// @desc    Update the status of a task
// @route   PUT /api/tasks/:id
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;  // Expect the status in the request body

    // Find the task and update its status
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      { status },
      { new: true, runValidators: true }  // Ensures the task is updated and validated
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

