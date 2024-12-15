import { useEffect, useState } from 'react';
import Axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks assigned to the logged-in user
    const fetchAssignedTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await Axios.get('http://localhost:5001/api/tasks/assigned', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    fetchAssignedTasks();
  }, []);

  return (
    <div>
      <h1>Assigned Tasks</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task">
            <h2>{task.title}</h2>
            <p>Status: {task.status}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Project: {task.project}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
