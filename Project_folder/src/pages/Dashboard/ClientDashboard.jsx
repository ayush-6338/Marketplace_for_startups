import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyGigs } from '../../services/dashboardApi';

const ClientDashboard = () => {
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
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Client Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg group">
          <h2 className="font-bold text-xl mb-3 group-hover:text-blue-400 transition">Your Posted Gigs</h2>
          <p className="text-gray-400 mb-6">
            You have posted <span className="text-white font-bold">{gigs.length}</span> active gigs.
          </p>
          <Link to="/dashboard/create-gig" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-lg shadow-blue-500/20 mb-6">
            + Post a Gig
          </Link>
          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading gigs...</p>
            ) : gigs.length === 0 ? (
              <p className="text-sm text-gray-500">No gigs posted yet.</p>
            ) : (
              gigs.slice(0, 3).map(gig => (
                <div key={gig._id} className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="font-semibold text-sm">{gig.title}</div>
                  <div className="text-xs text-gray-400 mt-1 flex justify-between">
                    <span>₹{gig.price}</span>
                    <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
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
