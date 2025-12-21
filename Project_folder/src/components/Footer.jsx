import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-slate-800 text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">

        {/* BRAND */}
        <div className="lg:col-span-2">
          <h2 className="text-white text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            GigNova
          </h2>
          <p className="text-base leading-relaxed text-slate-400 max-w-sm">
            GigNova is a professional platform that connects startups and
            clients with skilled freelancers to collaborate, build, and scale
            projects efficiently.
          </p>
        </div>

        {/* PLATFORM LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-blue-400 transition">
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-not-allowed opacity-70 hover:text-slate-300 transition-colors">Help Center</li>
            <li className="cursor-not-allowed opacity-70 hover:text-slate-300 transition-colors">Privacy Policy</li>
            <li className="cursor-not-allowed opacity-70 hover:text-slate-300 transition-colors">Terms of Service</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm text-slate-400">support@marketplace.com</p>
          <p className="text-sm mt-1 text-slate-400">India</p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
