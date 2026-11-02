const GigRow = ({ gig, onViewProposals }) => {
  const getBadgeStyle = (count) => {
    if (!count || count === 0) return 'bg-gray-600/20 text-gray-400';
    if (count < 5) return 'bg-yellow-600/20 text-yellow-400';
    return 'bg-green-600/20 text-green-400';
  };

  const acceptedCount = gig.acceptedProposalCount || 0;
  const rejectedCount = gig.rejectedProposalCount || 0;

  return (
    <button
      type="button"
      onClick={() => onViewProposals(gig)}
      className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[64px] w-full text-left hover:bg-white/10 hover:border-white/20 transition"
    >

      {/* Left: Title & Budget */}
      <div className="min-w-0 pr-3">
        <h3 className="text-sm font-medium text-white capitalize truncate">
          {gig.title}
        </h3>
        <p className="text-xs text-gray-400">
          ₹{gig.price}
        </p>
      </div>

      {/* Right: Proposal Badges + Date */}
      <div className="flex flex-wrap items-center justify-end gap-2">

        {/* Proposal Count Badge */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getBadgeStyle(gig.proposalCount)}`}>
          {gig.proposalCount || 0} Proposals
        </span>

        {acceptedCount > 0 && (
          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
            ✓ {acceptedCount} Accepted
          </span>
        )}

        {rejectedCount > 0 && (
          <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
            × {rejectedCount} Rejected
          </span>
        )}

        {/* Date */}
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {new Date(gig.createdAt).toLocaleDateString()}
        </span>

      </div>
    </button>
  );
};

export default GigRow;
