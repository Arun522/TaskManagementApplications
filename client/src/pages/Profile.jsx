import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

function Profile() {
  const [user, setUser] = useState(null); 
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(true); 

  // Fetch user profile on component load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:5001/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword.new !== newPassword.confirm) {
      alert('New passwords do not match!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5001/api/users/change-password',
        {
          currentPassword: newPassword.current,
          newPassword: newPassword.new,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Password updated successfully!');
      setNewPassword({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert(
        error.response?.data?.message || 'Failed to update password. Please try again.'
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <h1 className="text-2xl font-semibold mb-4">Loading Profile...</h1>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <h1 className="text-2xl font-semibold mb-4">Profile not found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">User Information</h2>
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit Profile
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="currentPassword"
              type="password"
              placeholder="Current Password"
              value={newPassword.current}
              onChange={(e) => setNewPassword({ ...newPassword, current: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="New Password (min. 6 characters)"
              value={newPassword.new}
              onChange={(e) => setNewPassword({ ...newPassword, new: e.target.value })}
              required
              minLength={6}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={newPassword.confirm}
              onChange={(e) => setNewPassword({ ...newPassword, confirm: e.target.value })}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Profile;
