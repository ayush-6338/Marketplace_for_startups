import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGigById } from '../../services/gigApi';
import { useAuth } from '../../contexts/AuthContext';
import { applyToGig } from '../../services/proposalApi';

const GigDetail = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getGigById(id)
      .then(res => {
        setGig(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load gig');
        setLoading(false);
      });
  }, [id]);

  const handleApply = async () => {
    try {
      await applyToGig({
        gigId: gig._id,
        message: 'I am interested in this gig',
      });
      alert('Applied successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Apply failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          Loading details...
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Gig not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6 md:px-12 pb-12 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <Link to="/gigs" className="text-gray-400 hover:text-white mb-6 inline-flex items-center gap-2 transition">
          ← Back to Gigs
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left Column: Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {gig.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="bg-white/10 px-3 py-1 rounded-full">Posted 2 days ago</span>
                <span>•</span>
                <span>Remote / Worldwide</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 border-b border-white/10 pb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {gig.description}
              </p>
            </div>

            {/* Use Mock Data for visual richness if backend doesn't have it yet */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {(gig.skills || ['React', 'Node.js', 'MongoDB', 'UI/UX']).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Project Scope</h3>
               <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between">
                  <span>Duration:</span>
                  <span className="text-white">1 - 3 Months</span>
                </li>
                <li className="flex justify-between">
                  <span>Experience Level:</span>
                  <span className="text-white">Intermediate</span>
                </li>
                <li className="flex justify-between">
                  <span>Commitment:</span>
                  <span className="text-white">Part-time</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md sticky top-24">
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Budget</p>
                <div className="text-3xl font-bold text-green-400">₹{gig.price}</div>
                <p className="text-xs text-gray-500 mt-1">Fixed Price</p>
              </div>

              {user && user.role === 'freelancer' ? (
                <button
                  onClick={handleApply}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition transform hover:-translate-y-1 block text-center"
                >
                  Apply Now
                </button>
              ) : user && (user.role === 'client' || user.role === 'startup') ? (
                 <div className="w-full py-4 bg-gray-800 text-gray-400 font-semibold rounded-xl border border-gray-700 text-center cursor-not-allowed">
                    Only Freelancers can apply
                 </div>
              ) : !user ? (
                <Link
                  to="/login"
                  className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl border border-gray-600 transition block text-center"
                >
                  Login to Apply
                </Link>
              ) : null}
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-semibold mb-4">About the Client</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                  <div>
                    <div className="font-medium">TechStartup Inc.</div>
                    <div className="text-xs text-gray-400">Verified Client</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <span>📍</span> Silicon Valley, USA
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⭐</span> 4.9/5 Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💼</span> 12 Jobs Posted
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetail;
