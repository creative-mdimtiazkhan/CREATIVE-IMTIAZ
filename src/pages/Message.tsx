import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Message() {
  const { addMessage } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setIsSuccess(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    
    // Hide success after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-4 pt-8 max-w-2xl mx-auto min-h-screen">
      <div className="bg-[#111] p-6 rounded-2xl border border-zinc-800 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-[#00aaff] flex items-center gap-2">
          <Send size={24} />
          Send Message
        </h2>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 size={64} className="text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
            <p className="text-zinc-400">We will get back to you shortly.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form id="messageForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                autoFocus
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-white"
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-white"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-white"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2">What's your problem?</label>
              <textarea 
                placeholder="Explain your digital problem"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-white resize-y"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="mt-2 w-full bg-[#2196f3] hover:bg-[#1976d2] text-white font-bold py-3.5 rounded-lg transition text-lg flex justify-center items-center gap-2"
            >
              <Send size={20} />
              Send Message
            </button>
            <div className="flex justify-center mt-2">
              <a href="https://wa.me/8801533975029" target="_blank" rel="noopener noreferrer" className="text-[#25D366] text-sm hover:underline">
                Or contact via WhatsApp
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
