import FreelancerCard from './FreelancerCard';
import useFreelancers from '../../hooks/useFreelancers';

const FreelancerGrid = () => {
  const { freelancers, loading } = useFreelancers();

  if (loading) {
    return (
        <div className="py-10 text-center">
            <div className="inline-block h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-gray-400">Loading freelancers...</p>
        </div>
    );
  }

  if (freelancers.length === 0) {
    return (
      <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl">
        <p className="text-gray-400">No freelancers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-semibold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
        Top Freelancers
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map(f => (
          <FreelancerCard key={f._id} freelancer={f} />
        ))}
      </div>
    </div>
  );
};

export default FreelancerGrid;
