import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to the Startup Marketplace</h1>
      <p className="mt-2 text-gray-600">Showcase your startup or find talent.</p>

      <div className="mt-4 flex gap-3">
        <Link to="/explore" className="px-4 py-2 border rounded">Explore</Link>
        <Link to="/startup/1" className="px-4 py-2 bg-black text-white rounded">Example startup</Link>
      </div>
    </div>
  );
}

