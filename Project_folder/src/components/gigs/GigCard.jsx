import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toggleFavorite } from '../../services/userApi';

const GigCard = ({ gig }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation(); // prevent navigation
    e.preventDefault();
    try {
        await toggleFavorite(gig._id);
        setIsSaved(!isSaved);
    } catch {
        console.error("Failed to save gig");
    }
  };

  // Only show for Freelancers
  const showSave = user && user.role === 'freelancer';

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-green-500/50 transition duration-300 group hover:bg-slate-900/80 flex flex-col h-full relative">
       {showSave && (
          <button 
            onClick={handleSave}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition z-10 p-2 bg-slate-900/50 rounded-full"
          >
             {isSaved ? '❤️' : '🤍'} 
          </button>
      )}

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2 pr-8">
            <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition">
                {gig.title}
            </h3>
            <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/20">
                {gig.category || 'Development'}
            </span>
        </div>

        <p className="text-xs text-gray-500 mb-3">
             Expected delivery: {gig.deliveryDays || '3-5'} days
        </p>

        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
            {gig.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
        <div>
           <p className="text-xs text-gray-500 uppercase font-semibold">Budget</p> 
           <span className="text-green-400 font-bold text-lg">
            ₹{gig.price.toLocaleString()}
           </span>
        </div>

        <Link
          to={`/gigs/${gig._id}`}
          className="px-4 py-2 bg-white/5 hover:bg-green-500 hover:text-white text-gray-300 text-sm font-semibold rounded-lg transition border border-white/10"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GigCard;
