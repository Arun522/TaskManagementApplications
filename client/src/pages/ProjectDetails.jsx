import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // To handle redirection after delete
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch project details
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch project details.');
        console.error('Error fetching project details:', err);
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  // Handle deleting project
  const handleDeleteProject = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/projects'); // Redirect to projects list after successful deletion
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">{project.project.title}</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="mb-2">{project.project.description}</p>
        <p className="text-sm text-gray-600">Owner: {project.project.owner.name}</p>
        <p className="text-sm text-gray-600">
          Members: {project.project.members.map((member) => member.name).join(', ')}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {project.tasks.map((task) => (
          <div key={task._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">Description: {task.description}</p>
            <p className="text-sm text-gray-600">Status: {task.status}</p>
            <p className="text-sm text-gray-600">Assigned To: {task.assignedTo || 'Unassigned'}</p> {/* Display name or 'Unassigned' */}
            <p className="text-sm text-gray-600">Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not Set'}</p>
          </div>
        ))}
        
        </div>
        <Link
          to={`/projects/${id}/add-task`}
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </Link>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(`/projects/edit/${id}`)}
        >
          Edit Project
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteProject}
        >
          Delete Project
        </button>
      </div>
    </Layout>
  );
}

export default ProjectDetails;
