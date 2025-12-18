import React, { useState } from 'react';
import { login } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(formData);

      // store token
      localStorage.setItem('token', res.data.token);

      alert('Login successful');

      // redirect after login
      navigate('/explore');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a] overflow-hidden font-sans">

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[400px] p-6 mx-4">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl border border-white/20">

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              required
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />

            <input
              required
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-100/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold text-white py-4 rounded-2xl transition-all
                ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:-translate-y-1 hover:shadow-xl'
                }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-blue-600 font-bold hover:underline">
                Create one
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
