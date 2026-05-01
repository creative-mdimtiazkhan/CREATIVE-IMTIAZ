import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === '/menu' || currentPath === '/login' || currentPath === '/signup') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#111] text-white">
      <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-800">
        <Link to="/" className="font-bold text-xl text-white tracking-tight">IMTIAZ</Link>
        <Link to="/menu" className="text-white hover:text-[#00aaff] transition">
          <Menu size={24} />
        </Link>
      </div>
    </header>
  );
}
