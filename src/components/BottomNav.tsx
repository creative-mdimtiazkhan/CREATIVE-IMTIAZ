import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, MessageSquare } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Don't show bottom nav on auth pages
  if (currentPath === '/menu' || currentPath === '/login' || currentPath === '/signup') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#f8fafc] border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center p-3">
        <Link to="/" className={`flex flex-col items-center gap-1 transition ${currentPath === '/' ? 'text-[#00aaff]' : 'text-slate-500 hover:text-slate-700'}`}>
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/projects" className={`flex flex-col items-center gap-1 transition ${currentPath === '/projects' ? 'text-[#00aaff]' : 'text-slate-500 hover:text-slate-700'}`}>
          <FolderOpen size={22} />
          <span className="text-[10px] font-medium">Projects</span>
        </Link>
        <Link to="/message" className={`flex flex-col items-center gap-1 transition ${currentPath === '/message' ? 'text-[#00aaff]' : 'text-slate-500 hover:text-slate-700'}`}>
          <MessageSquare size={22} />
          <span className="text-[10px] font-medium">Message</span>
        </Link>
      </div>
    </nav>
  );
}
