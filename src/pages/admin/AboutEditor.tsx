import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Save } from 'lucide-react';

export default function AboutEditor() {
  const { state, updateAbout } = useAppContext();
  const [about, setAbout] = useState(state.about);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(about);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#111] rounded-2xl border border-[#222] p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-2 text-white">About Me Setup</h2>
        <p className="text-gray-400 text-sm mb-6">Leave empty to hide this section from the frontend.</p>
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-xl mb-6">
            About section updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea 
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={12}
              className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white resize-y" 
              placeholder="Write a detailed description about yourself, your skills, and what you do..."
            />
          </div>

          <div className="pt-4 border-t border-[#222] flex gap-3">
            <button type="submit" className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg">
              <Save size={20} /> Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => { setAbout(''); updateAbout(''); }}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 font-bold rounded-xl transition"
            >
              Clear & Hide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
