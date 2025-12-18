import React, { useState } from 'react';
import { signup } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

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
      return alert('Passwords do not match');
    }

    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = form;

      const res = await signup(signupData);

      // store token
      localStorage.setItem('token', res.data.token);

      alert('Signup successful');

      // 🔥 IMPORTANT: redirect after signup
      navigate('/explore');

    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Signup failed');
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a] overflow-hidden font-sans">

      {/* 🔵 Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-white/90 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/20 mx-4">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Join our community and start your journey today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-100/60 p-4 rounded-2xl mt-1 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">
              E-mail
            </label>
            <input
              required
              name="email"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-100/60 p-4 rounded-2xl mt-1 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              I want to join as
            </label>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-gray-100/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/30 text-gray-700 appearance-none cursor-pointer"
              >
                <option value="startup">Startup (Hiring/Building)</option>
                <option value="freelancer">Freelancer (Providing Services)</option>
                <option value="client">Client (Looking for Experts)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
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
              className="w-full bg-gray-100/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/30"
            />
            <input
              required
              name="confirmPassword"
              type="password"
              placeholder="Confirm"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-100/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold text-white py-4 mt-4 rounded-2xl shadow-xl transition-all
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:-translate-y-1 hover:shadow-blue-500/40'
              }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
