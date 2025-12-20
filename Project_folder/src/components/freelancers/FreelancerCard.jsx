import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toggleFavorite } from '../../services/userApi';

const FreelancerCard = ({ freelancer }) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false); // ideally pass from parent or check user.favorites

  const handleFavorite = async (e) => {
    e.stopPropagation(); // prevent navigation
    e.preventDefault();
    try {
        await toggleFavorite(freelancer._id);
        setIsFavorited(!isFavorited);
    } catch (err) {
        console.error("Failed to toggle favorite");
    }
  };

  // Only show for Clients/Startups
  const showFavorite = user && ['client', 'startup'].includes(user.role);

  return (
    <div className="bg-[#0b1220] border border-gray-700 rounded-xl p-5 hover:border-blue-500 transition relative group">
      {showFavorite && (
          <button 
            onClick={handleFavorite}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition p-1"
          >
             {isFavorited ? '❤️' : '🤍'} 
          </button>
      )}

      <h3 className="text-lg font-semibold text-white">
        {freelancer.name}
      </h3>

      <p className="text-gray-400 text-sm mt-2">
        {freelancer.skills?.length > 0 ? freelancer.skills.join(', ') : 'Skills not listed'}
      </p>

      <div className="flex justify-between items-center mt-5">
        <span className="text-blue-400 text-sm">
          ⭐ {freelancer.rating || 'New'}
        </span>

        <Link 
            to={`/profile/${freelancer._id}`}
            className="text-sm text-blue-400 hover:underline"
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
};

export default FreelancerCard;
