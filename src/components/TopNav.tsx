import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Globe, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, toggleTheme, language, setLanguage } = useAppContext();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (currentPath === '/menu' || currentPath === '/login' || currentPath === '/signup') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-theme-card text-theme-text border-b border-theme-border shadow-sm">
      <div className="flex justify-between items-center px-5 py-4 max-w-7xl mx-auto">
        <Link to="/" id="header-logo" className="font-bold text-xl text-theme-text tracking-tight hover:opacity-85 transition">
          IMTIAZ
        </Link>
        
        <div className="flex items-center gap-4 relative">
          {/* Language Switcher Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button 
              id="language-toggle-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition text-theme-text cursor-pointer flex items-center justify-center"
              aria-label="Toggle language menu"
            >
              <Globe size={20} />
            </button>
            
            {langDropdownOpen && (
              <div 
                id="language-dropdown"
                className="absolute right-0 mt-2 w-48 bg-theme-card border border-theme-border rounded-xl shadow-xl py-2 z-50"
              >
                <div className="px-4 py-1.5 text-xs font-semibold text-theme-muted border-b border-theme-border mb-1 flex items-center gap-1.5">
                  <Globe size={14} />
                  <span>{language === 'bn' ? 'ভাষা নির্বাচন' : 'Language'}</span>
                </div>
                <button
                  id="lang-option-bn"
                  onClick={() => {
                    setLanguage('bn');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer ${language === 'bn' ? 'font-bold text-[#00aaff]' : 'text-theme-text'}`}
                >
                  <span>🇧🇩</span>
                  <span>বাংলা</span>
                </button>
                <button
                  id="lang-option-en"
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer ${language === 'en' ? 'font-bold text-[#00aaff]' : 'text-theme-text'}`}
                >
                  <span>🇺🇸</span>
                  <span>English</span>
                </button>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition text-theme-text cursor-pointer flex items-center justify-center animate-out duration-150"
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Three Line Menu Icon */}
          <Link 
            to="/menu" 
            id="hamburguer-menu-btn"
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition text-theme-text flex items-center justify-center"
            aria-label="Main menu"
          >
            <Menu size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
