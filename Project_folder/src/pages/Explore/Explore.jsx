import { useAuth } from '../../contexts/AuthContext';
import TrendingGigs from '../../components/gigs/TrendingGigs';
import FreelancerGrid from '../../components/freelancers/FreelancerGrid';

const Explore = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pt-24 px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-6">
           <h1 className="text-3xl font-bold text-white mb-2">
             Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}
           </h1>
           <p className="text-gray-400">
             Here are some gigs recommended for you based on network activity.
           </p>
        </div>

        {/* Recommended Section (Reusing Trending Logic) */}
        <TrendingGigs title="Recommended Gigs for You" />

        {/* FREELANCER GRID (Client/Startup Only) */}
        {user && ['client', 'startup'].includes(user.role) && (
            <div className="mt-8">
              <FreelancerGrid />
            </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
