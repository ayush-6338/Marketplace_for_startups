import { useAuth } from '../../contexts/AuthContext';
import ClientDashboard from './ClientDashboard';
import FreelancerDashboard from './FreelancerDashboard';
import StartupDashboard from './StartupDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {(() => {
          switch (user.role) {
            case 'client':
              return <ClientDashboard />;
            case 'freelancer':
              return <FreelancerDashboard />;
            case 'startup':
              return <StartupDashboard />;
            case 'admin':
              return <AdminDashboard />;
            default:
              return (
                <div className="text-center py-20">
                  <h2 className="text-xl text-red-500">Invalid Role</h2>
                  <p className="text-gray-400">Please contact support.</p>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default Dashboard;
