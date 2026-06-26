import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { state, t } = useAppContext();
  const { profile } = state;

  return (
    <section className="p-4 pt-8 max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-theme-card p-5 rounded-2xl shadow-lg border border-theme-border"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-tr from-[#00aaff] to-sky-400 overflow-hidden flex items-center justify-center shrink-0 border-2 border-theme-border">
            {profile.imageUrl ? (
              <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-theme-text" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-theme-text leading-tight">{profile.name}</h1>
            <p className="text-[#00aaff] text-sm mt-1">{profile.workType}</p>
          </div>
        </div>
        
        <p className="text-theme-muted text-sm leading-relaxed mb-5 whitespace-pre-wrap">
          {profile.bio}
        </p>
 
        <div className="flex gap-3">
          <Link to="/message" className="flex-1 bg-[#00aaff] hover:bg-[#0088cc] text-white text-center py-2.5 rounded-lg text-sm font-bold transition">{t('contact_me')}</Link>
          <Link to="/message" className="flex-1 border border-theme-border hover:border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-theme-text text-center py-2.5 rounded-lg text-sm font-bold transition">{t('hire_me')}</Link>
        </div>
      </motion.div>
    </section>
  );
}
