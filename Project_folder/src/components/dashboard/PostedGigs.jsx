import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GigRow from './GigRow';
import { getProposalsForGig, updateProposalStatus } from '../../services/proposalApi';

const PostedGigs = ({ gigs }) => {
  const [gigStats, setGigStats] = useState({});
  const [selectedGig, setSelectedGig] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const nextStats = {};

    gigs.forEach((gig) => {
      nextStats[gig._id] = {
        acceptedProposalCount: gig.acceptedProposalCount || 0,
        rejectedProposalCount: gig.rejectedProposalCount || 0,
      };
    });

    setGigStats(nextStats);
  }, [gigs]);

  const handleViewProposals = async (gig) => {
    setSelectedGig(gig);
    setLoading(true);
    setError('');

    try {
      const res = await getProposalsForGig(gig._id);
      setProposals(res.data);
      setGigStats((currentStats) => ({
        ...currentStats,
        [gig._id]: {
          acceptedProposalCount: res.data.filter((proposal) => proposal.status === 'accepted').length,
          rejectedProposalCount: res.data.filter((proposal) => proposal.status === 'rejected').length,
        },
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load proposals');
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (proposalId, status) => {
    setUpdatingId(proposalId);
    setError('');

    try {
      const res = await updateProposalStatus(proposalId, status);
      setProposals((current) => {
        const updatedProposals = current.map((proposal) =>
          proposal._id === proposalId ? { ...proposal, status: res.data.proposal.status } : proposal
        );

        if (selectedGig) {
          setGigStats((currentStats) => ({
            ...currentStats,
            [selectedGig._id]: {
              acceptedProposalCount: updatedProposals.filter((proposal) => proposal.status === 'accepted').length,
              rejectedProposalCount: updatedProposals.filter((proposal) => proposal.status === 'rejected').length,
            },
          }));
        }

        return updatedProposals;
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update proposal');
    } finally {
      setUpdatingId(null);
    }
  };

  const closeModal = () => {
    setSelectedGig(null);
    setProposals([]);
    setError('');
  };

  const getStatusStyle = (status) => {
    if (status === 'accepted') return 'bg-green-500/15 text-green-400 border-green-500/20';
    if (status === 'rejected') return 'bg-red-500/15 text-red-400 border-red-500/20';
    return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20';
  };

  return (
    <>
      <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 w-full h-full flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Posted Gigs
            </h2>
            <p className="text-sm text-gray-400">
              You have posted {gigs.length} active gigs.
            </p>
          </div>

          <Link to="/dashboard/create-gig" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-red-500/20 whitespace-nowrap">
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
              <GigRow
                key={gig._id}
                gig={{ ...gig, ...(gigStats[gig._id] || {}) }}
                onViewProposals={handleViewProposals}
              />
            ))
          )}
        </div>
      </div>

      {selectedGig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-2xl border border-white/10 bg-[#020617] shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                  Proposal Review
                </p>
                <h3 className="mt-1 text-xl font-bold text-white truncate">
                  {selectedGig.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Freelancers who applied for this gig.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
              >
                Close
              </button>
            </div>

            <div className="max-h-[64vh] overflow-y-auto p-6 custom-scrollbar">
              {error && (
                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="py-12 text-center text-sm text-gray-400">
                  Loading proposals...
                </div>
              ) : proposals.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-10 text-center">
                  <p className="text-sm font-medium text-white">No proposals yet</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Applicants will show here with their freelancer details.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((proposal) => {
                    const applicant = proposal.applicant || {};
                    const isUpdating = updatingId === proposal._id;

                    return (
                      <div key={proposal._id} className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex gap-4 min-w-0">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white">
                              {(applicant.name || 'F').charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-base font-semibold text-white truncate">
                                {applicant.name || 'Freelancer'}
                              </h4>
                              <p className="text-sm text-gray-400 truncate">
                                {applicant.email || 'Email not available'}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                {applicant.location && (
                                  <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">
                                    {applicant.location}
                                  </span>
                                )}
                                {applicant.experience && (
                                  <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">
                                    {applicant.experience}
                                  </span>
                                )}
                                {applicant.skills?.slice(0, 4).map((skill) => (
                                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-gray-300">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(proposal.status)}`}>
                            {proposal.status}
                          </span>
                        </div>

                        {applicant.bio && (
                          <p className="mt-4 text-sm text-gray-300">
                            {applicant.bio}
                          </p>
                        )}

                        <div className="mt-4 rounded-lg bg-black/20 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Proposal Message
                          </p>
                          <p className="mt-2 text-sm text-gray-300">
                            {proposal.message}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            disabled={isUpdating || proposal.status === 'accepted'}
                            onClick={() => handleStatusUpdate(proposal._id, 'accepted')}
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isUpdating ? 'Updating...' : 'Accept Proposal'}
                          </button>
                          <button
                            type="button"
                            disabled={isUpdating || proposal.status === 'rejected'}
                            onClick={() => handleStatusUpdate(proposal._id, 'rejected')}
                            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Reject
                          </button>
                          {applicant.portfolio && (
                            <a
                              href={applicant.portfolio}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                              View Portfolio
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostedGigs;
