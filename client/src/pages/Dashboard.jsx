import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    todo: 0,
    inProgress: 0,
    completed: 0,
  });
  const [userName, setUserName] = useState(''); 

  const getUserEmail = () => {
    return localStorage.getItem('userEmail') || 'user@example.com'; 
  };


  useEffect(() => {
    const userEmail = getUserEmail();

    // Fetch user details for the welcome message
    axios.get('http://localhost:5001/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setUserName(response.data.name); 
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });

    // Fetch tasks
    axios.get('http://localhost:5001/api/tasks/assigned', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        const tasksData = response.data;
        setTasks(tasksData);

        // Count tasks based on their status
        const counts = tasksData.reduce(
          (acc, task) => {
            if (task.status === 'To-Do') acc.todo++;
            if (task.status === 'In Progress') acc.inProgress++;
            if (task.status === 'Completed') acc.completed++;
            return acc;
          },
          { todo: 0, inProgress: 0, completed: 0 }
        );

        setStatusCounts(counts); 
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []); 

  return (
    <Layout>
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Welcome, {userName || 'User'}!</h1>
      </div>

      {/* Display task status counts */}
      <h2 className="text-xl font-semibold mb-4">Your Task Summary</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="bg-white p-7 rounded shadow">
          <h3 className="text-lg font-semibold">To-Do</h3>
          <p>{statusCounts.todo} tasks</p>
        </div>
        <div className="bg-white p-7 rounded shadow">
          <h3 className="text-lg font-semibold">In Progress</h3>
          <p>{statusCounts.inProgress} tasks</p>
        </div>
        <div className="bg-white p-7 rounded shadow">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p>{statusCounts.completed} tasks</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
