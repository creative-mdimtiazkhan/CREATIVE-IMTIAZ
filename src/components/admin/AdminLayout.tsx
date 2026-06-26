import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { LayoutDashboard, UserCircle, FileText, Phone, Link as LinkIcon, LogOut, Menu, X, MessageSquareText, Settings, Briefcase, CreditCard, Sparkles, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
  const { state, loginState } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  if (!state.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { path: '/admin/profile', label: 'Profile', icon: UserCircle },
    { path: '/admin/about', label: 'About Me', icon: FileText },
    { path: '/admin/featured-projects', label: 'Products', icon: Sparkles },
    { path: '/admin/orders', label: 'Manage Orders', icon: ShoppingBag },
    { path: '/admin/cards', label: 'Card Manager', icon: CreditCard },
    { path: '/admin/skills', label: 'My Skills', icon: Settings },
    { path: '/admin/contact', label: 'Contact Us', icon: Phone },
    { path: '/admin/socials', label: 'Social Links', icon: LinkIcon },
    { path: '/admin/reports', label: 'Client Report', icon: MessageSquareText },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase auth signout error:", e);
    }

    localStorage.clear();
    sessionStorage.clear();

    loginState(false);
    navigate('/', { replace: true });
  };

  const currentItem = navItems.find(item => location.pathname.startsWith(item.path));
  const pageHeaderLabel = currentItem ? currentItem.label : 'Dashboard';

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-[#111] w-64 border-r border-[#222] transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222]">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname.startsWith(item.path) 
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#222]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
          <Link to="/" className="mt-2 text-center block text-sm text-gray-500 hover:text-white">
            View Website
          </Link>
        </div>
      </aside>
 
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#111] border-b border-[#222] py-4 px-6 flex items-center md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-lg">{pageHeaderLabel}</span>
        </header>

        <main className="p-6 md:p-10 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
