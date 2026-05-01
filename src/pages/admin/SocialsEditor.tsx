import { useState } from 'react';
import { SocialLink, useAppContext } from '../../context/AppContext';
import { Save, Plus, Trash2, Link as LinkIcon } from 'lucide-react';

export default function SocialsEditor() {
  const { state, updateSocialLinks } = useAppContext();
  const [links, setLinks] = useState<SocialLink[]>(state.socialLinks || []);
  const [success, setSuccess] = useState(false);

  const handleAddLink = () => {
    setLinks([...links, { id: Date.now().toString(), platform: 'Facebook', url: '' }]);
  };

  const handleUpdateLink = (id: string, field: keyof SocialLink, value: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleSubmit = () => {
    updateSocialLinks(links);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#111] rounded-2xl border border-[#222] p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Social Links</h2>
          <button 
            onClick={handleAddLink}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition text-sm font-bold"
          >
            <Plus size={16} /> Add Link
          </button>
        </div>
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-xl mb-6">
            Social links updated successfully.
          </div>
        )}

        <div className="space-y-4 mb-8">
          {links.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No social links added yet.</p>
          ) : (
            links.map((link) => (
              <div key={link.id} className="flex flex-col sm:flex-row gap-3 bg-[#1a1a1a] p-4 rounded-xl border border-[#333]">
                <div className="sm:w-1/3">
                  <select 
                    value={link.platform}
                    onChange={(e) => handleUpdateLink(link.id, 'platform', e.target.value)}
                    className="w-full p-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white appearance-none"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex-1 relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="url" 
                    value={link.url}
                    onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#222] border border-[#444] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white" 
                    placeholder="https://"
                    required
                  />
                </div>
                <button 
                  onClick={() => handleRemoveLink(link.id)}
                  className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition flex items-center justify-center shrink-0"
                  title="Remove Link"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-[#222]">
          <button 
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg"
          >
            <Save size={20} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
