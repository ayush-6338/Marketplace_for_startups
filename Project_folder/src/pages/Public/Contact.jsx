
import React from 'react';
import { showError, showSuccess } from '../../utils/toast';

const Contact = () => {
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    showSuccess('Message sent! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-24 font-sans selection:bg-green-500 selection:text-white overflow-hidden">
        
       {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
         <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-bounce duration-[12s]"></div>
      </div>

      <div className="relative z-10 px-6">
          
        {/* HERO */}
        <section className="text-center py-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            Contact <span className="text-white">Us</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
            Have questions, feedback, or need support?  
            We’d love to hear from you.
            </p>
        </section>

        {/* CONTENT */}
        <section className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 gap-12 items-start">

            {/* CONTACT INFO */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Get in Touch</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                Reach out to us for partnerships, support, or general inquiries. Our team is ready to assist you.
                </p>
            </div>

            <div className="space-y-6">
                <Info title="Email" icon="📧">
                    support@marketplace.com
                </Info>

                <Info title="Phone" icon="📞">
                    +91 9XXXXXXXXX
                </Info>

                <Info title="Location" icon="📍">
                    Bangalore, India
                </Info>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-gray-300 flex items-center gap-3">
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    We typically respond within <span className="text-white font-semibold">24 hours</span>.
                </p>
            </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000 relative group hover:border-green-500/30 transition-all">
             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white relative z-10">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="group/input">
                    <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all font-medium"
                    required
                    />
                </div>

                <div className="group/input">
                    <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all font-medium"
                    required
                    />
                </div>

                <div className="group/input">
                    <textarea
                    rows="5"
                    placeholder="Your Message..."
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all resize-none font-medium"
                    required
                    />
                </div>

                <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-4 rounded-xl font-bold text-white shadow-lg shadow-green-500/25 hover:from-green-500 hover:to-emerald-500 transition transform hover:-translate-y-1 active:translate-y-0"
                >
                Send Message
                </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center relative z-10">
                *This form is for demonstration purposes.
            </p>
            </div>

        </section>
      </div>

    </div>
  );
};

const Info = ({ title, children, icon }) => (
  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-white/5 transition duration-300">
    <div className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center text-2xl border border-white/10 shrink-0">
        {icon}
    </div>
    <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-xl text-white font-medium">{children}</p>
    </div>
  </div>
);

export default Contact;
