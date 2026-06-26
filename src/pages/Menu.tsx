import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Menu() {
  const navigate = useNavigate();
  const { language } = useAppContext();

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-5">
      <div className="flex items-center mb-10">
        <button onClick={() => navigate(-1)} className="mr-4 hover:text-[#00aaff] transition cursor-pointer">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">{language === 'bn' ? 'মেনু' : 'Menu'}</h1>
      </div>

      <div className="flex flex-col gap-8 max-w-md mx-auto">
        {/* Account Section */}
        <div className="flex flex-col gap-4 bg-theme-card p-6 rounded-2xl border border-theme-border shadow-md">
          <h2 className="text-sm text-theme-muted uppercase tracking-wider font-semibold mb-2">
            {language === 'bn' ? 'অ্যাকাউন্ট' : 'Account'}
          </h2>
          <Link to="/login" className="w-full bg-[#00aaff] hover:bg-[#0088cc] text-white font-bold py-3 px-4 rounded-xl text-center transition cursor-pointer">
            {language === 'bn' ? 'লগইন' : 'Login'}
          </Link>
          <Link to="/signup" className="w-full border border-theme-border hover:bg-neutral-100 dark:hover:bg-neutral-800 text-theme-text font-bold py-3 px-4 rounded-xl text-center transition cursor-pointer">
            {language === 'bn' ? 'সাইনআপ' : 'Signup'}
          </Link>
        </div>

        {/* Social Login Section */}
        <div className="flex flex-col gap-4 bg-theme-card p-6 rounded-2xl border border-theme-border shadow-md">
          <h2 className="text-sm text-theme-muted uppercase tracking-wider font-semibold mb-2">
            {language === 'bn' ? 'সোশ্যাল লগইন' : 'Social Login'}
          </h2>
          <button className="w-full bg-[#db4437] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl text-center transition cursor-pointer">
            {language === 'bn' ? 'গুগল দিয়ে লগইন' : 'Login with Google'}
          </button>
          <button className="w-full bg-[#1877f2] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl text-center transition cursor-pointer">
            {language === 'bn' ? 'ফেসবুক দিয়ে লগইন' : 'Login with Facebook'}
          </button>
        </div>

        {/* Admin Link Section */}
        <div className="flex flex-col mt-4">
          <Link to="/admin/login" className="text-theme-muted text-sm hover:text-[#00aaff] transition text-center underline">
            {language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড লগইন' : 'Admin Dashboard Login'}
          </Link>
        </div>
      </div>
    </div>
  );
}
