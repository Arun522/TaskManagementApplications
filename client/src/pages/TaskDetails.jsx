import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(''); // For storing the updated status

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');  // Get token from localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:5001/api/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,  // Pass the token to the backend
          },
        });
        console.log("taskDetails:", response.data )
        setTask(response.data);
        setStatus(response.data.status);  // Set the status from the task data
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Handle status change
  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(
        `http://localhost:5001/api/tasks/${id}`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log("Task status changed", response.data);
      setTask(response.data);  // Update the task state with the new status
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating task status');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">{task.title}</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="mb-2">{task.description}</p>
        <p className="text-lg text-gray-600">Status: 
          <select
            className="ml-2 p-1 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)} // Update status when changed
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </p>
        <p className="text-sm text-gray-600">
          Project: Project Name
          {/*<Link to={`/projects/${task.project._id}`} className="text-blue-600 hover:underline">
            {task.project.title}
          </Link>
          */}
        </p>
        <p className="text-sm text-gray-600">Assigned To: {task.assignedTo?.name || 'No assigned user'}</p>
        <p className="text-sm text-gray-600">Created By: {task.createdBy?.name || 'No creator'}</p>
        <p className="text-sm text-gray-600">
          Deadline: {new Date(task.deadline).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Created At: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleStatusChange}  // Call the function to handle status change
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Status
        </button>
      </div>
    </Layout>
  );
}

export default TaskDetails;
