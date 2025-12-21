import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { getMyNotifications, markNotificationAsRead } from '../services/notificationApi';
import { showInfo } from '../utils/toast';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const { notifications, unreadCount } = await getMyNotifications();
      setNotifications(notifications);
      setUnreadCount(unreadCount);
    } catch (err) {
      console.error('Failed to fetch notifications');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      fetchNotifications();
    } catch (err) {
        console.error("Failed mark read");
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-white transition relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center border border-slate-900">
             {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-slate-900 text-white rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5">
            <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-sm">
                <span className="font-bold text-sm tracking-wide">Notifications</span>
                {unreadCount > 0 && (
                    <button onClick={() => handleMarkRead('all')} className="text-xs text-green-400 hover:text-green-300 font-medium transition">Mark all read</button>
                )}
            </div>
            <div className="max-h-80 overflow-y-auto no-scrollbar">
                {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-400 text-sm flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        No new notifications
                    </div>
                ) : (
                    notifications.map(n => (
                        <div 
                            key={n._id} 
                            onClick={() => !n.isRead && handleMarkRead(n._id)}
                            className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 cursor-pointer transition ${!n.isRead ? 'bg-green-500/10 border-l-2 border-l-green-500' : ''}`}
                        >
                            <p className={`text-sm ${!n.isRead ? 'text-gray-100 font-medium' : 'text-gray-400'}`}>{n.message}</p>
                            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{new Date(n.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
      )}
    </div>
  );
};

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
    showInfo('Logged out successfully');
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
            <span className="text-white">Gig</span><span className="text-green-500">Nova</span><span className="text-green-500">.</span>
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
            <div className="flex items-center gap-6">
               <Link to="/" className="text-gray-300 hover:text-white transition text-sm font-semibold">Home</Link>
               <Link to="/about" className="text-gray-300 hover:text-white transition text-sm font-semibold">About</Link>
               <Link to="/contact" className="text-gray-300 hover:text-white transition text-sm font-semibold">Contact</Link>
               <div className="h-4 w-px bg-white/10"></div>
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

              {/* Favorites */}
              <Link to="/favorites" className="text-gray-300 hover:text-white transition relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </Link>
              
              {/* Notifications */}
              <NotificationDropdown />

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
                    <div className="absolute right-0 mt-4 w-56 bg-slate-900 text-white rounded-xl shadow-2xl border border-white/10 py-2 animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5 z-50">
                        <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                            <p className="text-sm font-bold truncate text-white">{user.name}</p>
                        </div>
                        <div className="py-1">
                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                Dashboard
                            </Link>
                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                Profile
                            </Link>
                        </div>
                        <div className="border-t border-white/10 mt-1 pt-1">
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Sign Out
                            </button>
                        </div>
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
