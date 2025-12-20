import { useEffect, useState } from 'react';
import { getAllGigs } from '../../services/gigApi';
import GigCard from '../../components/gigs/GigCard';
import { showError } from '../../utils/toast';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGigs()
      .then(res => setGigs(res.data))
      .catch(() => showError('Failed to load gigs'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
          All Gigs
        </h1>

        {loading ? (
             <div className="flex justify-center py-20">
                <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
        ) : (
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {gigs.map(gig => (
                    <GigCard key={gig._id} gig={gig} />
                ))}
             </div>
        )}
        
        {!loading && gigs.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No gigs available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
