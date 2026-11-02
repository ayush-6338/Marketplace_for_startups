import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, getPublicProfile } from '../../services/userApi';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); // rename to avoid conflict
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const avatarInputRef = useRef(null);

  const currentUserId = currentUser?._id || currentUser?.id;
  const isOwnProfile = !id || currentUserId === id;

  const initializeForm = (userData) => {
    setForm({
      name: userData.name || '',
      bio: userData.bio || '',
      location: userData.location || '',
      skills: userData.skills ? (Array.isArray(userData.skills) ? userData.skills.join(', ') : userData.skills) : '',
      experience: userData.experience || '',
      portfolio: userData.portfolio || '',
      companyName: userData.companyName || '',
      industry: userData.industry || '',
      website: userData.website || '',
      teamSize: userData.teamSize || '',
      avatar: userData.avatar || ''
    });
  };

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (isOwnProfile) {
        data = await getProfile();
      } else {
        data = await getPublicProfile(id);
      }
      setUser(data);
      initializeForm(data);
    } catch {
      toast.error('Failed to load profile');
      navigate('/dashboard'); // redirect if failed
    } finally {
      setLoading(false);
    }
  }, [id, isOwnProfile, navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resizeAvatar = (file) => new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const maxSize = 512;
      const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);

      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(imageUrl);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error('Invalid image file'));
    };

    image.src = imageUrl;
  });

  const handleAvatarFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    try {
      const avatar = await resizeAvatar(file);
      setForm((currentForm) => ({ ...currentForm, avatar }));

      const updatedUser = await updateProfile({ avatar });
      setUser((currentUserData) => ({
        ...currentUserData,
        avatar: updatedUser.avatar,
      }));
      setForm((currentForm) => ({
        ...currentForm,
        avatar: updatedUser.avatar,
      }));
      toast.success('Profile image updated');
    } catch {
      toast.error('Failed to update profile image');
    }
  };

  const handleSave = async () => {
    try {
      const dataToSend = { ...form };
      // Convert skills string back to array if needed
      if (typeof dataToSend.skills === 'string') {
        dataToSend.skills = dataToSend.skills.split(',').map(s => s.trim()).filter(s => s);
      }
      
      const updatedUser = await updateProfile(dataToSend);
      setUser(updatedUser);
      initializeForm(updatedUser);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">User not found</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-20">
        <div className="h-60 bg-gradient-to-r from-blue-900/40 to-purple-900/40 relative">
             <div className="absolute inset-0 bg-black/20" />
        </div>
        
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-10 gap-6">
          <div className="flex items-end gap-6">
            <div className="relative group">
                <div className="w-32 h-32 rounded-2xl bg-gray-800 border-4 border-[#020617] overflow-hidden shadow-2xl flex items-center justify-center">
                    {(isEditing ? form.avatar : user.avatar) ? (
                        <img
                        src={isEditing ? form.avatar : user.avatar}
                        alt="profile"
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-4xl font-bold text-gray-400">{user.name.charAt(0)}</span>
                    )}
	                </div>
		                {isOwnProfile && (
		                    <>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        onChange={handleAvatarFileChange}
                      />
		                    <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-full border-2 border-[#020617] shadow-lg cursor-pointer hover:bg-blue-500 transition"
                        aria-label="Upload profile image"
                        title="Upload profile image"
                      >
		                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
		                    </button>
                      </>
	                )}
	            </div>
            
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                    {user.role}
                </span>
                <span className="text-gray-400 text-sm">{user.email}</span>
              </div>
            </div>
          </div>

          {isOwnProfile && (
            <button
                onClick={() => {
                    if(isEditing) initializeForm(user); // Reset form on cancel
                    setIsEditing(!isEditing);
                }}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isEditing 
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
                    : 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5'
                }`}
            >
                {isEditing ? (
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Cancel
                    </>
                ) : (
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    Edit Profile
                    </>
                )}
            </button>
          )}
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-xl">
             {/* VIEW MODE */}
            {!isEditing && (
            <ViewProfile user={user} />
            )}

            {/* EDIT MODE */}
            {isEditing && (
            <EditProfile
                user={user}
                form={form}
                handleChange={handleChange}
                handleSave={handleSave}
            />
            )}
        </div>

      </div>
    </div>
  );
}

// 👀 VIEW PROFILE COMPONENT
const ViewProfile = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
      <div className="col-span-1 md:col-span-2">
         <Info title="About" value={user.bio} fullWidth />
      </div>
      
      <Info title="Location" value={user.location} />
      <Info title="Email" value={user.email} />

      {user.role === 'freelancer' && (
        <>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
                 {user.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm">
                            {skill}
                        </span>
                    ))
                 ) : (
                    <span className="text-gray-600 italic">No skills added yet</span>
                 )}
            </div>
          </div>
          <Info title="Experience" value={user.experience} />
          <Info title="Portfolio" value={user.portfolio} isLink />
        </>
      )}

      {['client', 'startup'].includes(user.role) && (
        <>
          <Info title="Company" value={user.companyName} />
          <Info title="Industry" value={user.industry} />
          <Info title="Website" value={user.website} isLink />
          <Info title="Team Size" value={user.teamSize} />
        </>
      )}
    </div>
  );
};

// ✏️ EDIT PROFILE COMPONENT
const EditProfile = ({ user, form, handleChange, handleSave }) => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="name" label="Full Name" value={form.name} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
        <textarea
            name="bio"
            placeholder="Tell us about yourself..."
            value={form.bio}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition h-32 resize-none"
        />
      </div>

      <Input name="location" label="Location" value={form.location} onChange={handleChange} />

      {user.role === 'freelancer' && (
        <>
          <Input 
            name="skills" 
            label="Skills (comma separated)" 
            placeholder="e.g. React, Node.js, UI Design" 
            value={form.skills} 
            onChange={handleChange} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="experience" label="Experience" value={form.experience} onChange={handleChange} />
            <Input name="portfolio" label="Portfolio URL" value={form.portfolio} onChange={handleChange} />
          </div>
        </>
      )}

      {['client', 'startup'].includes(user.role) && (
        <>
          <Input name="companyName" label="Company Name" value={form.companyName} onChange={handleChange} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="industry" label="Industry" value={form.industry} onChange={handleChange} />
            <Input name="teamSize" label="Team Size" value={form.teamSize} onChange={handleChange} />
          </div>
          <Input name="website" label="Website URL" value={form.website} onChange={handleChange} />
        </>
      )}

      <div className="pt-4 flex justify-end">
        <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
        >
            Save Changes
        </button>
      </div>
    </div>
  );
};

// 🧩 REUSABLE COMPONENTS
const Info = ({ title, value, isLink, fullWidth }) => {
  if (!value) return null;
  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <h3 className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">{title}</h3>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
          {value}
        </a>
      ) : (
        <p className="text-lg text-gray-200 font-medium leading-relaxed">{value}</p>
      )}
    </div>
  );
};

const Input = ({ name, label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <input
            type="text"
            name={name}
            placeholder={placeholder || label}
            value={value}
            onChange={onChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
    </div>
);
