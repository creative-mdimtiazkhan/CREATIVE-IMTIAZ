import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Save, Camera, User } from 'lucide-react';

export default function ProfileEditor() {
  const { state, updateProfile } = useAppContext();
  const [formData, setFormData] = useState(state.profile);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#111] rounded-2xl border border-[#222] p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Profile Settings</h2>
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-xl mb-6">
            Profile updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative w-32 h-32 rounded-full border-4 border-[#222] overflow-hidden cursor-pointer group bg-[#1a1a1a] flex items-center justify-center transition-all hover:border-blue-500"
            >
              {formData.imageUrl ? (
                <img 
                  src={formData.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={64} className="text-gray-600" />
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={32} />
              </div>
            </div>
            
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            <p className="text-xs text-gray-500 mt-3 font-medium">Click image to upload new profile picture</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Creative Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Work Type / Title</label>
            <select 
              value={formData.workType}
              onChange={(e) => setFormData({...formData, workType: e.target.value})}
              className="w-full p-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white appearance-none"
            >
              <option value="Web Developer">Web Developer</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Social Media Growth Advisor">Social Media Growth Advisor</option>
              <option value="Creative Director">Creative Director</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Short Bio</label>
            <textarea 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              className="w-full p-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white" 
              required
            />
          </div>

          <div className="pt-4 border-t border-[#222]">
            <button type="submit" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg">
              <Save size={20} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
