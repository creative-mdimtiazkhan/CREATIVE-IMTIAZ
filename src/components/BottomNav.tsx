import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useAppContext();

  // Don't show bottom nav on auth pages
  if (currentPath === '/menu' || currentPath === '/login' || currentPath === '/signup') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-theme-card border-t border-theme-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center p-3">
        <Link to="/" id="nav-item-home" className={`flex flex-col items-center gap-1 transition ${currentPath === '/' ? 'text-[#00aaff]' : 'text-theme-muted hover:text-[#00aaff]'}`}>
          <Home size={22} />
          <span className="text-[10px] font-medium">{t('home')}</span>
        </Link>
        <Link to="/projects" id="nav-item-projects" className={`flex flex-col items-center gap-1 transition ${currentPath === '/projects' ? 'text-[#00aaff]' : 'text-theme-muted hover:text-[#00aaff]'}`}>
          <FolderOpen size={22} />
          <span className="text-[10px] font-medium">{t('projects')}</span>
        </Link>
        <Link to="/message" id="nav-item-message" className={`flex flex-col items-center gap-1 transition ${currentPath === '/message' ? 'text-[#00aaff]' : 'text-theme-muted hover:text-[#00aaff]'}`}>
          <MessageSquare size={22} />
          <span className="text-[10px] font-medium">{t('message')}</span>
        </Link>
      </div>
    </nav>
  );
}
