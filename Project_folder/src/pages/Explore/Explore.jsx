import React from 'react';
import { Link } from 'react-router-dom';

export default function Explore() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Explore startups & gigs</h1>

      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 border rounded mb-3">
          <h3 className="font-semibold">Startup / Gig {i + 1}</h3>
          <Link to={`/startup/${i + 1}`} className="text-blue-600 text-sm">Open</Link>
        </div>
      ))}
    </div>
  );
}
