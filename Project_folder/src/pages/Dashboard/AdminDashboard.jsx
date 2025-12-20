import { useEffect, useState } from 'react';
import { getAdminStats } from '../../services/dashboardApi';
import { getAllUsers, getAllGigsAdmin, suspendUser, hideGig } from '../../services/adminApi';

import { showError } from '../../utils/toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, gigs: 0, startups: 0 });
  const [users, setUsers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, gigsRes] = await Promise.all([
        getAdminStats(),
        getAllUsers(),
        getAllGigsAdmin()
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setGigs(gigsRes.data);
    } catch (error) {
      console.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSuspend = async (userId) => {
    try {
      await suspendUser(userId);
      // update local state
      setUsers(users.map(u => u._id === userId ? { ...u, isSuspended: !u.isSuspended } : u));
    } catch (error) {
      showError('Action failed');
    }
  };

  const handleHideGig = async (gigId) => {
    try {
      await hideGig(gigId);
      // update local state
      setGigs(gigs.map(g => g._id === gigId ? { ...g, isHidden: !g.isHidden } : g));
    } catch (error) {
      showError('Action failed');
    }
  };

  return (
    <div className="p-6 text-white min-h-[500px] space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg">
            <h2 className="font-bold text-xl mb-3 text-blue-400">Users</h2>
            <div className="text-4xl font-bold mb-2">{loading ? '...' : stats.users}</div>
            <p className="text-gray-400 text-sm">Total users</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg">
            <h2 className="font-bold text-xl mb-3 text-purple-400">Gigs</h2>
            <div className="text-4xl font-bold mb-2">{loading ? '...' : stats.gigs}</div>
            <p className="text-gray-400 text-sm">Total posted gigs</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition backdrop-blur-md shadow-lg">
            <h2 className="font-bold text-xl mb-3 text-orange-400">Startups</h2>
            <div className="text-4xl font-bold mb-2">{loading ? '...' : stats.startups}</div>
             <p className="text-gray-400 text-sm">Active startups</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* User Moderation */}
        <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-gray-200">User Management</h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
            {users.map(user => (
              <div key={user._id} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5 hover:bg-white/10 transition">
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-gray-400 capitalize">{user.role} • {user.email}</div>
                </div>
                <button
                  onClick={() => handleSuspend(user._id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                     user.isSuspended 
                     ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30' 
                     : 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                  }`}
                >
                  {user.isSuspended ? 'Unsuspend' : 'Suspend'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gig Moderation */}
        <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-gray-200">Gig Moderation</h2>
           <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
            {gigs.map(gig => (
              <div key={gig._id} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5 hover:bg-white/10 transition">
                <div>
                  <div className="font-semibold">{gig.title}</div>
                  <div className="text-xs text-gray-400">₹{gig.price} • {gig.owner?.name}</div>
                </div>
                <button
                   onClick={() => handleHideGig(gig._id)}
                   className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                     gig.isHidden 
                     ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30' 
                     : 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                  }`}
                >
                  {gig.isHidden ? 'Unhide' : 'Hide'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
