import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const CreateGig = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Development',
    deliveryDays: '',
  });

  const categories = [
    "Graphics & Design", "Programming & Tech", "Digital Marketing", 
    "Video & Animation", "Writing & Translation", "Music & Audio", 
    "Business", "Data", "Photography", "AI Services"
  ];

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post('/gigs', form);
      alert('Gig created successfully');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 font-sans flex items-center justify-center">
        {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                Post a New Gig
            </h1>
            <p className="text-gray-400 mb-8">
                Share your requirements and find the perfect talent.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Gig Title</label>
                    <input
                        required
                        name="title"
                        placeholder="e.g. Build a React Website for Startup"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600"
                    />
                </div>

                {/* Category & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Budget (₹)</label>
                        <input
                            required
                            name="price"
                            type="number"
                            placeholder="e.g. 5000"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600"
                        />
                    </div>
                </div>

                {/* Delivery */}
                <div>
                     <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Time (Days)</label>
                     <input
                        required
                        name="deliveryDays"
                        type="number"
                        placeholder="e.g. 7"
                        value={form.deliveryDays}
                        onChange={handleChange}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea
                        required
                        name="description"
                        rows="5"
                        placeholder="Describe your project details, requirements, and deliverables..."
                        value={form.description}
                        onChange={handleChange}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition placeholder-gray-600 resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition transform hover:-translate-y-0.5
                        ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-green-600 hover:shadow-green-500/20'}
                    `}
                >
                    {loading ? 'Publishing...' : 'Publish Gig'}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;
