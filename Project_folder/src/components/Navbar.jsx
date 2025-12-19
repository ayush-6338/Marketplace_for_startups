import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        {/* Left: Logo and Main Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-3xl font-bold tracking-tighter hover:opacity-90 transition">
            <span className="text-white">Market</span><span className="text-green-500">place</span><span className="text-green-500">.</span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-300">
             <Link to="/explore" className="hover:text-green-400 transition">Explore</Link>
             <Link to="/gigs" className="hover:text-green-400 transition">Gigs</Link>
            </div>
          )}
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-6">
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-white font-semibold hover:text-green-400 transition">Sign In</Link>
              <Link to="/signup" className="px-5 py-2 hover:bg-green-600 border border-white hover:border-transparent rounded-md text-white font-semibold transition">
                Join
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              
              {/* Role Badge */}
              <span className="hidden md:inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-green-400">
                {user.role}
              </span>

              {/* Icons (Wishlist, Bell) */}
              <button className="text-gray-300 hover:text-white transition relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
              
              <button className="text-gray-300 hover:text-white transition relative">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                 <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-slate-900"></span>
              </button>

              {/* User Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                 <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white cursor-pointer relative"
                 >
                    {getInitials(user.name)}
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></span>
                 </button>

                 {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white text-slate-900 rounded-md shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm">Signed in as</p>
                            <p className="text-sm font-bold truncate">{user.name}</p>
                        </div>
                        <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 transition">Dashboard</Link>
                        <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 transition">Profile</Link>
                        <div className="border-t border-gray-100 mt-1"></div>
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                            Logout
                        </button>
                    </div>
                 )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
