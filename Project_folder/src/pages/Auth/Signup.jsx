import React, { useState } from 'react';
import { signup } from '../../services/authApi';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { showSuccess, showError } from '../../utils/toast';

const Signup = () => {
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'startup',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (form.password !== form.confirmPassword) {
      return showError('Passwords do not match');
    }

    setLoading(true);
    try {
      const res = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      // update context and storage
      loginAction(res.data.token, res.data.user);

      showSuccess('Signup successful');

      // 🔥 IMPORTANT: redirect after signup
      navigate('/explore');

    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      showError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden font-sans selection:bg-blue-500 selection:text-white">

      {/* 🔵 Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div className="absolute top-[40%] left-[20%] w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] animate-bounce duration-[10s]"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-white/5 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/10 mx-4 my-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Join our professional community today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 text-white p-4 rounded-xl mt-1 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
              E-mail
            </label>
            <input
              required
              name="email"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 text-white p-4 rounded-xl mt-1 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              I want to join as
            </label>
            <div className="relative mt-1">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-white/10 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="startup" className="bg-slate-900 text-gray-300">Startup (Hiring/Building)</option>
                <option value="freelancer" className="bg-slate-900 text-gray-300">Freelancer (Providing Services)</option>
                <option value="client" className="bg-slate-900 text-gray-300">Client (Looking for Experts)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
            />
            <input
              required
              name="confirmPassword"
              type="password"
              placeholder="Confirm"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold text-white py-4 mt-4 rounded-xl shadow-lg transition-all
              ${loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 transform hover:-translate-y-0.5'
              }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-white/5">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
