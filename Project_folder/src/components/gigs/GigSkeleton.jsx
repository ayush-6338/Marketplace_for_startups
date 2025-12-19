import React from 'react';

const GigSkeleton = () => {
  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 animate-pulse">
      {/* Title Placeholder */}
      <div className="h-6 bg-slate-800 rounded w-3/4 mb-4"></div>
      
      {/* Description Placeholders */}
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-slate-800 rounded w-full"></div>
        <div className="h-3 bg-slate-800 rounded w-5/6"></div>
        <div className="h-3 bg-slate-800 rounded w-4/6"></div>
      </div>

      {/* Footer Placeholder */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
        <div className="h-5 bg-slate-800 rounded w-20"></div>
        <div className="h-8 bg-slate-800 rounded w-24"></div>
      </div>
    </div>
  );
};

export default GigSkeleton;
