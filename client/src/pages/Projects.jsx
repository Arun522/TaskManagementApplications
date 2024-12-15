import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:5001/api/projects', {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        });
        setProjects(response.data); // Update state with fetched projects
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle creating a new project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5001/api/projects',
        newProject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects([...projects, response.data]); // Add new project to the list
      setNewProject({ title: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  // Handle deleting a project
  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((project) => project._id !== projectId)); // Remove project from the list
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Projects</h1>
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <p className="text-sm text-gray-500">Owner: {project.owner.name}</p>
              <p className="text-sm text-gray-500">
                Members: {project.members.length}
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <Link
                  to={`/projects/${project._id}`}
                  className="text-blue-600 hover:underline mr-4"
                >
                  View
                </Link>
                <Link
                  to={`/projects/edit/${project._id}`} // Assuming you have an edit route set up
                  className="text-green-600 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleCreateProject}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              required
              maxLength={50}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              maxLength={500}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Project
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Projects;
