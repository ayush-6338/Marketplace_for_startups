import { useEffect, useState } from 'react';
import { getAllGigs } from '../../services/gigApi';
import { applyToGig } from '../../services/proposalApi';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    getAllGigs()
      .then(res => setGigs(res.data))
      .catch(() => alert('Failed to load gigs'));
  }, []);

  const handleApply = async (gigId) => {
    try {
      await applyToGig({
        gigId,
        message: 'I am interested in this gig',
      });
      alert('Applied successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Apply failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Gigs</h1>

      {gigs.map(gig => (
        <div
          key={gig._id}
          className="border p-4 mb-4 rounded shadow-sm"
        >
          <h2 className="font-semibold text-lg">{gig.title}</h2>
          <p className="text-gray-600">{gig.description}</p>
          <p className="mt-1 font-medium">₹{gig.price}</p>

          {/* 🔘 APPLY BUTTON — ADD HERE */}
          <button
            onClick={() => handleApply(gig._id)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};

export default Gigs;
