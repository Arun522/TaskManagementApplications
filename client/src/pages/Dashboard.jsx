import Layout from '../components/Layout';

function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Projects</h2>
          {/* TODO: Add recent projects list */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Upcoming Tasks</h2>
          {/* TODO: Add upcoming tasks list */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Activity Feed</h2>
          {/* TODO: Add activity feed */}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

