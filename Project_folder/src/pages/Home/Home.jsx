import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "const platform = new Marketplace('Startups', 'Freelancers');";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content Area (Replacing traditional Hero) */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Text & CTA */}
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Build the Future. <br />
            <span className="text-white">Hire the Best.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Connect with top-tier developers, designers, and innovators. 
            The marketplace where startups scale and freelancers thrive.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to="/explore"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold shadow-lg hover:shadow-purple-500/25 transition transform hover:-translate-y-1 block"
            >
              Start Exploring
            </Link>
            <Link
              to="/gigs"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold backdrop-blur-md hover:bg-white/10 transition block"
            >
              Browse Gigs
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-slate-950"></div>
              ))}
            </div>
            <p>Trusted by 500+ Startups</p>
          </div>
        </div>

        {/* Right: Code/Animation Visual */}
        <div className="flex-1 w-full max-w-lg">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-black/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-500 font-mono">marketplace.js</span>
              </div>
              
              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-400">// Initialize connection</div>
                <div className="text-purple-400">
                  {typedText}<span className="animate-pulse">|</span>
                </div>
                <br />
                <div className="text-blue-400">await <span className="text-yellow-300">platform.connect()</span>;</div>
                <div className="text-green-400">console.log(<span className="text-orange-300">"Success!"</span>);</div>
                
                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>STATUS</span>
                    <span className="text-green-400">ONLINE</span>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-3/4 animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Info Grid */}
      <section className="relative z-10 py-24 px-6 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Explore Opportunities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you need a full-stack developer, a UI designer, or a growth hacker, 
              find the perfect match for your next big idea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'For Startups', desc: 'Post gigs, manage projects, and hire top talent instantly.', icon: '🚀', link: '/signup', linkText: 'Hire Talent' },
              { title: 'For Freelancers', desc: 'Find high-quality projects that match your skills.', icon: '💻', link: '/gigs', linkText: 'Find Work' },
              { title: 'Secure Payments', desc: 'Escrow protection and milestone-based releases.', icon: '🛡️', link: '/signup', linkText: 'Learn More' },
            ].map((card, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition hover:-translate-y-2">
                <div className="text-4xl mb-6">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{card.title}</h3>
                <p className="text-gray-400 mb-6">{card.desc}</p>
                <Link to={card.link} className="inline-flex items-center text-blue-400 font-bold group-hover:text-blue-300">
                  {card.linkText} <span className="ml-2 transform group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs Teaser (Mock Data or Dynamic if we wanted, sticking to static for landing) */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Gigs</h2>
            <p className="text-gray-400">Latest opportunities added to the platform</p>
          </div>
          <Link to="/gigs" className="text-blue-400 hover:text-blue-300 font-medium mt-4 md:mt-0">
            View All Gigs →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition group">
              <div className="h-32 bg-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:scale-105 transition duration-500"></div>
              </div>
              <div className="p-4">
                <div className="h-4 w-24 bg-white/10 rounded mb-3"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-white/5 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
