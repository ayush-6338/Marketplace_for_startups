
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import GigCard from '../../components/gigs/GigCard';
import FreelancerGrid from '../../components/freelancers/FreelancerGrid';
import { useAuth } from '../../contexts/AuthContext';
import CategoryBar from '../../components/gigs/CategoryBar';

const Explore = () => {
  const { user } = useAuth();
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchGigs();
  }, [category]);

  const fetchGigs = async () => {
    setLoading(true);
    try {
      const url = category === 'All' 
        ? '/gigs' 
        : `/gigs?category=${encodeURIComponent(category)}`;
      
      const res = await apiClient.get(url);
      setGigs(res.data);
    } catch (err) {
      console.error('Failed to fetch gigs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      
      {/* Categories Bar */}
      <div className="pt-20">
          <CategoryBar selected={category} onSelect={setCategory} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
           <h1 className="text-3xl font-bold text-white mb-2">
             {category === 'All' ? `Welcome back, ${user?.name ? user.name.split(' ')[0] : 'User'}` : category}
           </h1>
           <div className="flex items-center justify-between">
              <p className="text-gray-400">
                {category === 'All' ? 'Recommended Gigs for you' : `Browsing ${category} gigs`}
              </p>
           </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
           <div className="min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400 animate-pulse">Loading opportunities...</p>
                </div>
            </div>
        ) : (
            <>
                {/* GIG GRID */}
                {gigs.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm mb-12">
                    <h2 className="text-2xl font-bold text-gray-300 mb-2">No Gigs Found</h2>
                    <p className="text-gray-500">No gigs available in {category}. Check back soon!</p>
                </div>
                ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {gigs.map(gig => (
                    <GigCard key={gig._id} gig={gig} />
                    ))}
                </div>
                )}

                {/* FREELANCER GRID (Client/Startup Only - Only show on 'All') */}
                {category === 'All' && user && ['client', 'startup'].includes(user.role) && (
                    <FreelancerGrid />
                )}
            </>
        )}

      </div>
    </div>
  );
};

export default Explore;
