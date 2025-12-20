import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getFavorites } from '../services/userApi';
import FreelancerCard from '../components/freelancers/FreelancerCard';
import GigCard from '../components/gigs/GigCard';

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavorites();
                setFavorites(data);
            } catch (error) {
                console.error("Failed to fetch favorites");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading favorites...</p>
        </div>
      </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <div className="max-w-7xl mx-auto px-6 pt-24">
                <h1 className="text-3xl font-bold text-white mb-8">
                    {user.role === 'freelancer' ? 'Saved Gigs' : 'Favorite Freelancers'}
                </h1>

                {favorites.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-gray-300 mb-2">No Favorites Yet</h2>
                        <p className="text-gray-500">
                             {user.role === 'freelancer' ? 'Save gigs you like to view them here.' : 'Save freelancers to view them here.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.role === 'freelancer' ? (
                            favorites.map(gig => (
                                <GigCard key={gig._id} gig={gig} />
                            ))
                        ) : (
                            favorites.map(freelancer => (
                                <FreelancerCard key={freelancer._id} freelancer={freelancer} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
