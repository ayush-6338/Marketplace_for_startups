import { Link } from 'react-router-dom';
import GigRow from './GigRow';

const PostedGigs = ({ gigs }) => {
  return (
    <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 w-full h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Posted Gigs
          </h2>
          <p className="text-sm text-gray-400">
            You have posted {gigs.length} active gigs.
          </p>
        </div>

        <Link to="/dashboard/create-gig" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-red-500/20">
          + Post a Gig
        </Link>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {gigs.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No gigs posted yet.
          </div>
        ) : (
          gigs.map((gig) => (
            <GigRow key={gig._id} gig={gig} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostedGigs;
