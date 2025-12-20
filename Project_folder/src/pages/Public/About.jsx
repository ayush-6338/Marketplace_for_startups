
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-24 font-sans selection:bg-blue-500 selection:text-white overflow-hidden">

       {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div className="absolute top-[40%] left-[20%] w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] animate-bounce duration-[10s]"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="text-center py-20 px-6">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 animate-in fade-in slide-in-from-bottom-4 duration-700">
            About <span className="">Marketplace</span>
            </h1>
            <p className="max-w-3xl mx-auto text-gray-300 text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            A modern platform that connects <span className="text-white font-semibold">startups</span> and <span className="text-white font-semibold">clients</span> with <span className="text-white font-semibold">skilled freelancers</span> to collaborate, build, and grow together.
            </p>
        </section>

        {/* MISSION & VISION */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 hover:border-blue-500/30 transition duration-500 hover:bg-white/10 group shadow-2xl">
            <div className="h-12 w-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
                Our mission is to simplify collaboration between startups, clients,
                and freelancers by providing a transparent, secure, and efficient
                marketplace for project-based work.
            </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 hover:border-purple-500/30 transition duration-500 hover:bg-white/10 group shadow-2xl">
            <div className="h-12 w-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💡</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
                We envision a future where talent meets opportunity seamlessly,
                empowering individuals and organizations to achieve more together.
            </p>
            </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
            How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
            <Step
                title="Create an Account"
                desc="Sign up as a client, startup, or freelancer and set up your profile."
                icon="👤"
                delay="0"
            />
            <Step
                title="Post or Explore Gigs"
                desc="Clients and startups post gigs, freelancers explore and apply."
                icon="🔍"
                delay="100"
            />
            <Step
                title="Collaborate Securely"
                desc="Work together with proposals, notifications, and role-based access."
                icon="🤝"
                delay="200"
            />
            </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 px-6 relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm skew-y-3 transform origin-top-left -z-10"></div>
            <h2 className="text-4xl font-bold text-center mb-16 text-white relative z-10">
            Why Choose Us
            </h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 relative z-10">
            <Feature text="Role-based dashboards" icon="⚡" delay="0" />
            <Feature text="Secure authentication" icon="🔒" delay="100" />
            <Feature text="Category-based gig discovery" icon="📂" delay="200" />
            <Feature text="Notification & proposal system" icon="🔔" delay="300" />
            </div>
        </section>

        {/* CTA */}
        <section className="text-center py-32 px-6">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                
                <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to get started?
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                Join our marketplace today and experience the future of freelance collaboration.
                </p>
                <div className="flex justify-center gap-4">
                     <Link
                    to="/signup"
                    className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
                    >
                    Create an Account
                    </Link>
                    <Link
                    to="/gigs"
                    className="inline-block bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition"
                    >
                    Explore Gigs
                    </Link>
                </div>
            </div>
        </section>

        {/* Footer-like bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

const Step = ({ title, desc, icon, delay }) => (
  <div 
    className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition duration-300 group hover:-translate-y-2"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="text-5xl mb-6 bg-slate-900/50 w-20 h-20 mx-auto rounded-full flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-lg">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Feature = ({ text, icon, delay }) => (
  <div 
    className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center text-gray-300 hover:border-blue-500/50 hover:text-white transition duration-300 flex flex-col items-center gap-4 group hover:shadow-lg hover:shadow-blue-900/20"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">{icon}</div>
    <span className="font-semibold text-lg">{text}</span>
  </div>
);

export default About;
