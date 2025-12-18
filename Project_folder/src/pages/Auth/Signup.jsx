import React, { useState } from 'react';
import { signup } from '../../services/authApi';

const Signup = () => {
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
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = form;
      const res = await signup(signupData);
      localStorage.setItem('token', res.data.token);
      alert('Signup successful');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 p-4 font-sans">
      {/* Main Container - Styled like Login */}
      <div className="w-full max-w-[370px] bg-gradient-to-b from-white to-[#f4f7fb] rounded-[40px] p-[25px_35px] border-[5px] border-white shadow-[0px_30px_30px_-20px_rgba(133,189,215,0.88)]">
        
        {/* Heading */}
        <h2 className="text-center font-black text-[30px] text-[#1089d3]">
          Register
        </h2>

        <p className="text-center text-[#aaaaaa] text-[12px] mt-2">
          Signup now and get full access to our app.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-1">
          <input
            required
            name="name"
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-[10px] shadow-[#cff0ff_0px_10px_10px_-5px] border-x-2 border-transparent focus:outline-none focus:border-x-[#12B1D1] placeholder:text-[#aaaaaa] transition-all"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          
          <input
            required
            name="email"
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-[10px] shadow-[#cff0ff_0px_10px_10px_-5px] border-x-2 border-transparent focus:outline-none focus:border-x-[#12B1D1] placeholder:text-[#aaaaaa] transition-all"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
          />

          {/* Role Dropdown - Styled to match inputs */}
          <div className="relative">
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-[10px] shadow-[#cff0ff_0px_10px_10px_-5px] border-x-2 border-transparent focus:outline-none focus:border-x-[#12B1D1] text-[#666] appearance-none cursor-pointer transition-all"
            >
              <option value="startup">Startup</option>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
            </select>
            <div className="absolute right-5 top-[28px] pointer-events-none border-t-4 border-t-[#aaaaaa] border-x-4 border-x-transparent"></div>
          </div>

          <input
            required
            name="password"
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-[10px] shadow-[#cff0ff_0px_10px_10px_-5px] border-x-2 border-transparent focus:outline-none focus:border-x-[#12B1D1] placeholder:text-[#aaaaaa] transition-all"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            required
            name="confirmPassword"
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-[10px] shadow-[#cff0ff_0px_10px_10px_-5px] border-x-2 border-transparent focus:outline-none focus:border-x-[#12B1D1] placeholder:text-[#aaaaaa] transition-all"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {/* Signup Button - Styled like Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`block w-full font-bold text-white py-[15px] mt-6 mb-3 rounded-[20px] shadow-[0px_20px_10px_-15px_rgba(133,189,215,0.88)] border-none transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 
              ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-[#1089d3] to-[#12b1d1] hover:shadow-[0px_23px_10px_-20px_rgba(133,189,215,0.88)]'}`}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-2">
          <span className="text-[11px] text-gray-400">Already have an account? </span>
          <a href="/login" className="text-[11px] text-[#0099ff] font-bold no-underline hover:underline">
            Sign In
          </a>
        </div>

        <span className="block text-center mt-[15px]">
          <a href="#" className="text-none text-[#0099ff] text-[9px]">
            Learn user licence agreement
          </a>
        </span>
      </div>
    </div>
  );
};

export default Signup;