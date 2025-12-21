const GigRow = ({ gig }) => {
  const getBadgeStyle = (count) => {
    if (!count || count === 0) return 'bg-gray-600/20 text-gray-400';
    if (count < 5) return 'bg-yellow-600/20 text-yellow-400';
    return 'bg-green-600/20 text-green-400';
  };

  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-[64px]">

      {/* Left: Title & Budget */}
      <div>
        <h3 className="text-sm font-medium text-white capitalize">
          {gig.title}
        </h3>
        <p className="text-xs text-gray-400">
          ₹{gig.price}
        </p>
      </div>

      {/* Right: Proposal Badge + Date */}
      <div className="flex items-center gap-4">

        {/* Proposal Count Badge */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getBadgeStyle(gig.proposalCount)}`}>
          {gig.proposalCount || 0} Proposals
        </span>

        {/* Date */}
        <span className="text-xs text-gray-500">
          {new Date(gig.createdAt).toLocaleDateString()}
        </span>

      </div>
    </div>
  );
};

export default GigRow;
