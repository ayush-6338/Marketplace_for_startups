import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-bold">StartUpHub</Link>
        <Link to="/explore" className="text-sm text-gray-600">Explore</Link>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
            <Link to="/signup" className="px-3 py-1 bg-black text-white rounded">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
