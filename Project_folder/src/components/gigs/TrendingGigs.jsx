import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import GigCard from './GigCard';

const TrendingGigs = ({ title = "Trending Gigs", showCategory = true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/gigs/trending')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch trending gigs", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null; // Or a skeleton if preferred
  if (!data || !data.gigs || data.gigs.length === 0) return null;

  return (
    <section className="relative z-10 py-2">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
          {showCategory && (
            <p className="text-gray-400">
              Most active category: <span className="text-blue-400 font-semibold">{data.category}</span>
            </p>
          )}
        </div>
        {/* Only show "View All" if it's the home page trending section, or maybe always? 
            User didn't specify, but "View All Gigs" links to /gigs. Keeps it consistent.
        */}
        <Link to="/gigs" className="text-blue-400 hover:text-blue-300 font-medium mt-4 md:mt-0 transition">
          View All Gigs →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </section>
  );
};

export default TrendingGigs;
