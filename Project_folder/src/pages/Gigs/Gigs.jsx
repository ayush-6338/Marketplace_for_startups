import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import GigCard from '../../components/gigs/GigCard';
import CategoryBar from '../../components/gigs/CategoryBar';
import { showError } from '../../utils/toast';

const Gigs = () => {
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
      showError('Failed to load gigs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* Category Filter */}
      <div className="pt-24 px-6 md:px-12">
          <CategoryBar selected={category} onSelect={setCategory} />
      </div>

      {/* Scrollable Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <h1 className="text-2xl font-bold mb-6">All Gigs</h1>

        {loading ? (
             <div className="flex justify-center py-20">
                <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
        ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {gigs.map(gig => (
                    <GigCard key={gig._id} gig={gig} />
                ))}
             </div>
        )}
        
        {!loading && gigs.length === 0 && (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm mb-12">
            <h2 className="text-2xl font-bold text-gray-300 mb-2">No Gigs Found</h2>
            <p className="text-gray-500">No gigs available in {category}. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
