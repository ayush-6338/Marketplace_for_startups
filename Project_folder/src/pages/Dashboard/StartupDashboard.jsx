import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyGigs } from '../../services/dashboardApi';
import PostedGigs from '../../components/dashboard/PostedGigs';

const StartupDashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyGigs()
      .then(res => setGigs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 text-white min-h-[500px]">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
        Startup Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg group">
          <h2 className="font-bold text-xl mb-3 group-hover:text-orange-400 transition">Your Startups</h2>
          <p className="text-gray-400 mb-6">
             Manage your startup profiles, update information, and track growth.
          </p>
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition shadow-lg shadow-orange-500/20">
            Manage Startups
          </button>
        </div>

        {/* Replaced with new Component */}
        <div className="h-[400px]">
          <PostedGigs gigs={gigs} />
        </div>
      </div>
    </div>
  );
};

export default StartupDashboard;
