import { Link, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const navigate = useNavigate();
  const user = { name: 'Arunkumar velu', email: 'Arun522@greatlearning.com' }; // TODO: Replace with actual user data
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className='flex flex-col justify-between'>
        <nav className="mt-4">
          <Link to="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Dashboard</Link>
          <Link to="/projects" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Projects</Link>
          <Link to="/tasks" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Tasks</Link>
          <Link to="/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Profile</Link>
        </nav>
        <div className="p-2 mt-64 flex justify-center h-11 bg-slate-500">
          <button className="text-white" onClick={handleLogout}>Logout</button>
        </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;

