import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

function EditProject() {
  const { id } = useParams(); // Get project ID from the URL
  const [project, setProject] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the project details when the component mounts
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(response.data.project); // Set project data into state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Handle editing the project
  const handleEditProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5001/api/projects/${id}`,
        project,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Redirect to the project page after successful update
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error editing project:', error);
    }
  };

  if (loading) {
    return <p>Loading project...</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Edit Project</h1>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleEditProject}>
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
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
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
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              maxLength={500}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditProject;
