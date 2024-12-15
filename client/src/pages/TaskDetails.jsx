import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost/5001/api/tasks/${id}`);
        setTask(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

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
        <p className="text-sm text-gray-600">Status: {task.status}</p>
        <p className="text-sm text-gray-600">Project: <Link to={`/projects/${task.project._id}`} className="text-blue-600 hover:underline">{task.project.title}</Link></p>
        <p className="text-sm text-gray-600"> Assigned To: {task.assignedTo?.name} </p>
        <p className="text-sm text-gray-600"> Created By: {task.createdBy?.name} </p>
        <p className="text-sm text-gray-600">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">Created At: {new Date(task.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex space-x-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Edit Task
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete Task
        </button>
      </div>
    </Layout>
  );
}

export default TaskDetails;
