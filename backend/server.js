const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');

const Task = require('./models/Task');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { authMiddleware } = require('./middleware/auth');

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.get('/api/tasks/assigned',authMiddleware, async(req,res)=>{
    try {
        //const userEmail = req.user.email;  
        //console.log('User Email from getAssignedTasks:', req.userEmail);  
        const tasks = await Task.find({ assignedTo: req.userEmail });
        //console.log('Tasks:', tasks)
        res.json(tasks)
    }catch (error) {
            res.status(500).json({
            message: 'Server error',
            error: error.message
            });
    }
})
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging

    // Determine error status and message
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
    });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});