import useGigs from '../../hooks/useGigs';
import GigCard from '../../components/gigs/GigCard';
import FreelancerGrid from '../../components/freelancers/FreelancerGrid';
import { useAuth } from '../../contexts/AuthContext';

const Explore = () => {
  const { gigs, loading } = useGigs();
  const { user } = useAuth();
  
  const categories = [
    "Graphics & Design", "Programming & Tech", "Digital Marketing", 
    "Video & Animation", "Writing & Translation", "Music & Audio", 
    "Business", "Data", "Photography", "AI Services"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      
      {/* Categories Bar */}
      <div className="bg-slate-900 border-b border-white/5 pt-24 pb-3 overflow-x-auto no-scrollbar sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 whitespace-nowrap">
          {categories.map((cat, idx) => (
             <button key={idx} className="text-gray-400 hover:text-green-400 text-sm font-medium transition duration-200 hover:border-b-2 border-green-400 pb-1">
                {cat}
             </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Header */}
        <div className="mb-10">
           <h1 className="text-4xl font-bold text-white mb-2">
             Welcome back, <span className="text-white">{user?.name ? user.name.split(' ')[0] : 'User'}</span>
           </h1>
           <div className="flex items-center justify-between">
              <p className="text-gray-400 text-lg">
                Recommended Gigs for you
              </p>
           </div>
        </div>

        {/* GIG GRID (Always Visible) */}
        {gigs.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm mb-12">
            <h2 className="text-2xl font-bold text-gray-300 mb-2">No Gigs Found</h2>
            <p className="text-gray-500">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {gigs.map(gig => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}

        {/* FREELANCER GRID (Client/Startup Only) */}
        {user && ['client', 'startup'].includes(user.role) && (
            <FreelancerGrid />
        )}

      </div>
    </div>
  );
};

export default Explore;
