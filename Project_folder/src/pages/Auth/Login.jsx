import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Main Container */}
      <div className="w-full max-w-[350px] bg-gradient-to-b from-white to-[#f4f7fb] rounded-[40px] p-[25px_35px] border-[5px] border-white shadow-[0px_30px_30px_-20px_rgba(133,189,215,0.88)]">
        
        {/* Heading */}
        <h2 className="text-center font-black text-[30px] text-[#1089d3]">
          Sign In
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
          <input
            required
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] border-x-2 border-transparent focus:outline-none focus:border-x-[#12B1D1] placeholder:text-[#aaaaaa]"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            required
            className="w-full bg-white border-none p-[15px_20px] rounded-[20px] mt-[15px] shadow-[#cff0ff_0px_10px_10px_-5px] border-x-2 border-transparent focus:outline-none focus:border-x-[#12B1D1] placeholder:text-[#aaaaaa]"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          
          <span className="block mt-[10px] ml-[10px]">
            <a href="#" className="text-[11px] text-[#0099ff] no-underline">
              Forgot Password ?
            </a>
          </span>

          {/* Login Button */}
          <button
            type="submit"
            className="block w-full font-bold bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white py-[15px] my-5 rounded-[20px] shadow-[0px_20px_10px_-15px_rgba(133,189,215,0.88)] border-none transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[0px_23px_10px_-20px_rgba(133,189,215,0.88)] active:scale-95 active:shadow-[0px_15px_10px_-10px_rgba(133,189,215,0.88)]"
          >
            Sign In
          </button>
        </form>

        {/* Social Section */}
        <div className="mt-[25px]">
          <span className="block text-center text-[10px] text-[#aaaaaa]">
            Or Sign in with
          </span>
          
        </div>

        {/* Footer Link */}
        <span className="block text-center mt-[15px]">
          <a href="#" className="text-none text-[#0099ff] text-[9px]">
            Learn user licence agreement
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;