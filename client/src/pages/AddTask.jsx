import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

function AddTask() {
  const { id } = useParams(); // Get project ID from the URL
  const navigate = useNavigate();
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    assignedTo: '',
    deadline: '',
  });

  const handleCreateTask = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5001/api/tasks`,
        { 
          ...newTask, 
          project: id, 
          assignedTo: newTask.assignedTo, // Here, assignedTo should be an email
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      // Redirect to project details page after task is created
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Create Task for Project</h1>
      <form onSubmit={handleCreateTask}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            maxLength={500}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">
                Assigned To (Email)
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="assignedTo"
                type="email"
                placeholder="Assigned To (Email)"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
            />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
            Deadline
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deadline"
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </Layout>
  );
}

export default AddTask;
