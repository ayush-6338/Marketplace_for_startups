import { useEffect, useState } from 'react';
import { getMyProposals } from '../../services/dashboardApi';

const FreelancerDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProposals()
      .then(res => setProposals(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 text-white min-h-[500px]">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        Freelancer Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg group">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-2xl">💼</div>
          <h2 className="font-bold text-xl mb-3 group-hover:text-purple-400 transition">Applied Gigs</h2>
          <p className="text-gray-400 mb-6">
            You have applied to <span className="text-white font-bold">{proposals.length}</span> gigs.
          </p>
          
          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading applications...</p>
            ) : proposals.length === 0 ? (
              <p className="text-sm text-gray-500">No applications found.</p>
            ) : (
              proposals.slice(0, 3).map(p => (
                <div key={p._id} className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="font-semibold text-sm">{p.gig?.title || 'Unknown Gig'}</div>
                  <div className="text-xs text-gray-400 mt-1 flex justify-between items-center">
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                      p.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 
                      p.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>{p.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg group">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4 text-2xl">📊</div>
          <h2 className="font-bold text-xl mb-3 group-hover:text-pink-400 transition">Proposal Status</h2>
          <p className="text-gray-400 mb-6">
            Check detailed status of your proposals and client responses.
          </p>
          <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition shadow-lg shadow-pink-500/20">
            Check Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
