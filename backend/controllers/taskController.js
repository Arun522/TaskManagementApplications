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
      assignedTo,  
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
      .populate('assignedTo', 'name email')  
      .populate('createdBy', 'name email');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};


// @desc    Get task by task ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    // Find the task by its ID and populate the necessary fields
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')  // Populate assigned user (name, email)
      .populate('createdBy', 'name email')  // Populate creator (name, email)
      .populate('project', 'title');        // Populate project (title)

    // If task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Return the task details
    res.json(task);
  } catch (error) {
    // Return an error response in case of failure
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
    console.log("params ID",req.params.id)
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
    const userEmail = req.userEmail;  
    console.log('User Email from getAssignedTasks:', req.userEmail);  
    
    //const tasks = await Task.find({ assignedTo: userEmail });
    //const tasks = await Task.find({ project: mongoose.Types.ObjectId(projectId) });

    const tasks = await Task.find({ assignedTo: userEmail })
                            .populate('project')  // Populate the project details
                            .populate('assignedTo')  // Populate assigned user details
                            .populate('createdBy');  // Populate creator details

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks assigned to this user.' });
    }

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
    const { status } = req.body;  

    // Find the task and update its status
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      { status },
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

