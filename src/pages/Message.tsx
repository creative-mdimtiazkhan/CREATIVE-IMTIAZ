import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Message() {
  const { addMessage, language, t } = useAppContext();
  
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
    <div className="p-4 pt-8 max-w-2xl mx-auto min-h-screen text-theme-text">
      <div className="bg-theme-card p-6 rounded-2xl border border-theme-border shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-[#00aaff] flex items-center gap-2">
          <Send size={24} />
          {language === 'bn' ? 'মেসেজ পাঠান' : 'Send Message'}
        </h2>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 size={64} className="text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-theme-text mb-2">
              {language === 'bn' ? 'মেসেজ সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
            </h3>
            <p className="text-theme-muted">
              {language === 'bn' ? 'আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।' : 'We will get back to you shortly.'}
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-6 px-6 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-theme-text rounded-lg transition cursor-pointer"
            >
              {language === 'bn' ? 'আরেকটি মেসেজ পাঠান' : 'Send Another'}
            </button>
          </div>
        ) : (
          <form id="messageForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input 
                type="text" 
                placeholder={language === 'bn' ? 'আপনার নাম' : 'Your Name'} 
                required
                autoFocus
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 bg-theme-bg border border-theme-border rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-theme-text placeholder-neutral-400"
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder={language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'} 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 bg-theme-bg border border-theme-border rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-theme-text placeholder-neutral-400"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder={language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'} 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 bg-theme-bg border border-theme-border rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-theme-text placeholder-neutral-400"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-theme-muted mb-2">
                {language === 'bn' ? 'আপনার ডিজিটাল সমস্যা বা প্রয়োজনটি বলুন' : "What's your problem?"}
              </label>
              <textarea 
                placeholder={language === 'bn' ? 'এখানে বিস্তারিত লিখুন...' : 'Explain your digital problem'}
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-3 bg-theme-bg border border-theme-border rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-theme-text resize-y placeholder-neutral-400"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="mt-2 w-full bg-[#00aaff] hover:bg-[#0088cc] text-white font-bold py-3.5 rounded-lg transition text-lg flex justify-center items-center gap-2 cursor-pointer shadow-md"
            >
              <Send size={20} />
              {language === 'bn' ? 'মেসেজ পাঠান' : 'Send Message'}
            </button>
            <div className="flex justify-center mt-2">
              <a href="https://wa.me/8801533975029" target="_blank" rel="noopener noreferrer" className="text-[#25D366] text-sm hover:underline">
                {language === 'bn' ? 'অথবা হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করুন' : 'Or contact via WhatsApp'}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
