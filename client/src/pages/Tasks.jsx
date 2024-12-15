import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');  // For filtering by status
  const [deadlineFilter, setDeadlineFilter] = useState('');  // For filtering by deadline
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    project: '',
    assignedTo: '',  // This will be set dynamically based on the logged-in user
    deadline: '',
  });

  const getUserEmail = () => {
    // This function should return the logged-in user's email. 
    // In a real app, this should come from your authentication mechanism.
    return localStorage.getItem('userEmail') || 'user@example.com'; // Example email for testing
  };

  // Fetch tasks assigned to the logged-in user
  useEffect(() => {
    const userEmail = getUserEmail();

    axios.get('http://localhost:5001/api/tasks/assigned', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assuming JWT token is in localStorage
      },
    })
      .then((response) => {
        setTasks(response.data);  // Set the tasks in the state
        setFilteredTasks(response.data);  // Initially show all tasks
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  // Filter tasks based on selected status and deadline
  useEffect(() => {
    let filtered = tasks;

    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (deadlineFilter) {
      filtered = filtered.filter(task => new Date(task.deadline) <= new Date(deadlineFilter));
    }

    setFilteredTasks(filtered);
  }, [statusFilter, deadlineFilter, tasks]);  // Re-run the filter whenever statusFilter, deadlineFilter, or tasks change

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

      {/* Filter options */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="text-sm font-semibold">Status</label>
          <select
            className="ml-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">Deadline</label>
          <input
            type="date"
            className="ml-2"
            value={deadlineFilter}
            onChange={(e) => setDeadlineFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <div key={task._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-sm text-gray-600">Status: {task.status}</p>
            <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
            <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
            <p className="text-sm text-gray-600">Project: {task.project.title}</p>
            <div className="mt-4">
              <Link to={`/tasks/${task._id}`} className="text-blue-600 hover:underline mr-4">View</Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Tasks;





// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';

// function Tasks() {
//   const [tasks, setTasks] = useState([
//     { id: 1, title: 'Task 1', status: 'To-Do', assignedTo: 'John Doe', deadline: '2023-05-15', project: 'Project 1' },
//     { id: 2, title: 'Task 2', status: 'In Progress', assignedTo: 'Jane Smith', deadline: '2023-05-20', project: 'Project 2' },
//   ]);

//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     status: 'To-Do',
//     project: '',
//     assignedTo: '',
//     deadline: '',
//   });

//   const handleCreateTask = (e) => {
//     e.preventDefault();
//     // TODO: Implement task creation logic
//     console.log('Create task', newTask);
//   };

//   return (
//     <Layout>
//       <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//         {tasks.map((task) => (
//           <div key={task.id} className="bg-white p-4 rounded shadow">
//             <h2 className="text-lg font-semibold">{task.title}</h2>
//             <p className="text-sm text-gray-600">Status: {task.status}</p>
//             <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
//             <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
//             <p className="text-sm text-gray-600">Project: {task.project}</p>
//             <div className="mt-4">
//               <Link to={`/tasks/${task.id}`} className="text-blue-600 hover:underline mr-4">View</Link>
//               <button className="text-green-600 hover:underline mr-4">Edit</button>
//               <button className="text-red-600 hover:underline">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//     </Layout>
//   );
// }

// export default Tasks;






// <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
//         <form onSubmit={handleCreateTask}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//               Title
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="title"
//               type="text"
//               placeholder="Task Title"
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               required
//               maxLength={100}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="description"
//               placeholder="Task Description"
//               value={newTask.description}
//               onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//               maxLength={500}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
//               Status
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="status"
//               value={newTask.status}
//               onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
//             >
//               <option value="To-Do">To-Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project">
//               Project
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="project"
//               type="text"
//               placeholder="Project Name"
//               value={newTask.project}
//               onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">
//               Assigned To
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="assignedTo"
//               type="text"
//               placeholder="Assigned To"
//               value={newTask.assignedTo}
//               onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
//               Deadline
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="deadline"
//               type="date"
//               value={newTask.deadline}
//               onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
//             />
//           </div>
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//           >
//             Create Task
//           </button>
//         </form>
//       </div>