import React from 'react';

const FreelancerCard = ({ freelancer }) => {
  return (
    <div className="bg-[#0b1220] border border-gray-700 rounded-xl p-5 hover:border-blue-500 transition">
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

        <button className="text-sm text-blue-400 hover:underline">
          View Profile →
        </button>
      </div>
    </div>
  );
};

export default FreelancerCard;
