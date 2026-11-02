import { useEffect, useState } from 'react';
import { getMyGigs } from '../../services/dashboardApi';
import PostedGigs from '../../components/dashboard/PostedGigs';

const ClientDashboard = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    getMyGigs()
      .then(res => setGigs(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6 text-white min-h-[500px]">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Client Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Replaced with new Component */}
        <div className="h-[400px]">
          <PostedGigs gigs={gigs} />
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg group">
          <h2 className="font-bold text-xl mb-3 group-hover:text-green-400 transition">Received Proposals</h2>
          <p className="text-gray-400 mb-6">
            Review proposals from freelancers and hire the best talent.
          </p>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition shadow-lg shadow-green-500/20">
            View All Proposals
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
