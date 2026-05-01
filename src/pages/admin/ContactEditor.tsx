import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Save, Mail, Phone, MessageCircle } from 'lucide-react';

export default function ContactEditor() {
  const { state, updateContact } = useAppContext();
  const [formData, setFormData] = useState(state.contact);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#111] rounded-2xl border border-[#222] p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Contact Settings</h2>
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-xl mb-6">
            Contact information updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                value={formData.gmail}
                onChange={(e) => setFormData({...formData, gmail: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white" 
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white" 
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number</label>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="tel" 
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white" 
                placeholder="+1 234 567 890"
              />
            </div>
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
