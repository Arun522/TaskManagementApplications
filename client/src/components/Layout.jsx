import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Layout({ children }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:5001/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Set user data from response
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile. Please try again.');
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="absolute top-3 right-3 z-20 md:hidden bg-gray-700 text-white p-1 rounded"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'X' : '|||'}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 bg-white shadow-md w-64 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="p-4">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </>
          ) : (
            <p>User not found</p>
          )}
        </div>
        <nav className="flex-1 mt-4">
          <Link to="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Dashboard
          </Link>
          <Link to="/projects" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Projects
          </Link>
          <Link to="/tasks" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Tasks
          </Link>
          <Link to="/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Profile
          </Link>
        </nav>
        <div className="p-4 bg-slate-500">
          <button className="w-full text-white py-2 rounded hover:bg-slate-600" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto md:ml-30">
        {children}
      </main>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Layout;
