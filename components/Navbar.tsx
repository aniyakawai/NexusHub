import React from 'react';
import { Command, Moon, Sun, Languages } from 'lucide-react';
import { Theme, Language, View } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  theme, toggleTheme, lang, toggleLang, currentView, setCurrentView 
}) => {
  const t = translations[lang].nav;

  const NavItem = ({ view, label }: { view: View; label: string }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`text-sm font-medium transition-colors ${
        currentView === view 
          ? 'text-primary-600 dark:text-primary-400 font-semibold' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentView('home')}
        >
          <div className="bg-primary-600 dark:bg-primary-500 p-2 rounded-lg text-white shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-105">
            <Command className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Nexus<span className="font-light text-gray-500 dark:text-gray-400">Hub</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavItem view="home" label={t.home} />
          <NavItem view="enterprise" label={t.enterprise} />
          <NavItem view="pricing" label={t.pricing} />
          <NavItem view="about" label={t.about} />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLang}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
            title="Switch Language"
          >
            <Languages className="w-4 h-4" />
            <span className="sr-only">Switch Language</span>
            <span className="text-xs ml-1 font-medium">{lang.toUpperCase()}</span>
          </button>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button className="hidden sm:block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md">
            {t.login}
          </button>
        </div>
      </div>
    </nav>
  );
};
