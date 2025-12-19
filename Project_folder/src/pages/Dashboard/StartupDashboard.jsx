import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyGigs } from '../../services/dashboardApi';

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

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg group">
          <h2 className="font-bold text-xl mb-3 group-hover:text-red-400 transition">Posted Gigs</h2>
          <p className="text-gray-400 mb-6">
            You have posted <span className="text-white font-bold">{gigs.length}</span> active gigs.
          </p>
          <Link to="/dashboard/create-gig" className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition shadow-lg shadow-red-500/20 mb-6">
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
      </div>
    </div>
  );
};

export default StartupDashboard;
