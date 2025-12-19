import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* Left */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-green-600">
          Marketplace
        </Link>

        {user && (
          <>
            <Link to="/explore">Explore</Link>
            <Link to="/gigs">Gigs</Link>

            {/* Role-based links */}
            {user.role === 'client' && (
              <Link to="/orders">Orders</Link>
            )}

            {user.role === 'freelancer' && (
              <Link to="/my-proposals">My Proposals</Link>
            )}

            {user.role === 'startup' && (
              <Link to="/my-startups">My Startups</Link>
            )}

            {user.role === 'admin' && (
              <Link to="/admin">Admin Panel</Link>
            )}
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600">
              Welcome, <b>{user.name}</b>
            </span>

            <span className="px-3 py-1 text-xs bg-gray-100 rounded-full capitalize">
              {user.role}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
