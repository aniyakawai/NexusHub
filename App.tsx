
import React, { useState, useMemo, useEffect } from 'react';
import { Hero } from './components/Hero';
import { SmartSearch } from './components/SmartSearch';
import { AgentCard } from './components/AgentCard';
import { Pricing } from './components/Pricing';
import { Enterprise } from './components/Enterprise';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { BackToTop } from './components/BackToTop';
import { ChatInterface } from './components/ChatInterface';
import { Industry, Language, Theme, View } from './types';
import { AGENTS } from './constants';
import { translations } from './translations';
import { LayoutGrid, Globe, Scale, Stethoscope, ShoppingBag, Factory, Palette, Database, TrendingUp,MessageSquare, FileText, CheckCircle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  
  // App State - Default to ZH (Chinese)
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('zh');
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Handle Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle Routing via URL Query Params (for New Tab support)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'chat') {
      setCurrentView('chat');
    }
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');

  // Filter Logic
  const filteredAgents = useMemo(() => {
    let agents = AGENTS;

    // Filter by Search Query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      agents = agents.filter(a => 
        a.name[lang].toLowerCase().includes(lowerQuery) ||
        a.description[lang].toLowerCase().includes(lowerQuery) ||
        a.capabilities.some(c => c[lang].toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by Industry
    if (selectedIndustry !== Industry.ALL) {
      agents = agents.filter(a => a.industry === selectedIndustry);
    }

    return agents;
  }, [selectedIndustry, searchQuery, lang]);

  const getIndustryIcon = (ind: Industry) => {
    switch (ind) {
      // --- 旧图标逻辑 (暂时隐藏) ---
      /*
      case Industry.FINANCE: return <Scale className="w-4 h-4" />;
      case Industry.HEALTHCARE: return <Stethoscope className="w-4 h-4" />;
      case Industry.RETAIL: return <ShoppingBag className="w-4 h-4" />;
      case Industry.MANUFACTURING: return <Factory className="w-4 h-4" />;
      case Industry.CREATIVE: return <Palette className="w-4 h-4" />;
      case Industry.LEGAL: return <Scale className="w-4 h-4" />;
      case Industry.DATA: return <Database className="w-4 h-4" />;
      case Industry.SALES: return <TrendingUp className="w-4 h-4" />;
      */

      // --- 新图标逻辑 (新增) ---
      case Industry.SMART_QA: return <MessageSquare className="w-4 h-4" />;
      case Industry.SMART_DATA: return <Database className="w-4 h-4" />;
      case Industry.SMART_AUDIT: return <CheckCircle className="w-4 h-4" />;
      case Industry.SMART_GEN: return <Sparkles className="w-4 h-4" />;
  
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const handleNavigate = (path: string) => {
    // Legacy support for internal navigation if needed, 
    // but now most agents open in new tab via AgentCard logic.
    if (path === '/chat') {
      setCurrentView('chat');
    }
  };

  const renderHome = () => {
    const t = translations[lang];
    return (
      <>
        <Hero lang={lang} />
        <SmartSearch onSearch={setSearchQuery} lang={lang} />

        {/* Industry Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar justify-start md:justify-center px-4">
          {Object.values(Industry).map((ind) => {
             // Translate the industry label
             const label = translations[lang].industries[ind as keyof typeof translations['en']['industries']] || ind;
             
             return (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                  selectedIndustry === ind
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg transform scale-105'
                    : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-600'
                }`}
              >
                {ind === Industry.ALL ? <LayoutGrid className="w-4 h-4" /> : getIndustryIcon(ind)}
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  lang={lang} 
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-300 dark:border-slate-800">
              <Globe className="w-12 h-12 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-slate-300">{t.common.noResults}</h3>
              <p className="text-gray-500 dark:text-slate-500">{t.common.tryAdjusting}</p>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-slate-950">
      {/* Conditionally render Navbar: Hide on Chat Interface */}
      {currentView !== 'chat' && (
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme}
          lang={lang}
          toggleLang={toggleLang}
          currentView={currentView}
          setCurrentView={setCurrentView}
          onLoginClick={() => setIsLoginOpen(true)}
        />
      )}

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} lang={lang} />
      <BackToTop />

      <main className={currentView === 'chat' ? 'h-screen overflow-hidden' : 'pb-20'}>
        {currentView === 'home' && renderHome()}
        {currentView === 'pricing' && <Pricing lang={lang} />}
        {currentView === 'enterprise' && <Enterprise lang={lang} />}
        {currentView === 'about' && <About lang={lang} />}
        {currentView === 'chat' && <ChatInterface lang={lang} onBack={() => window.location.href = '/'} />}
      </main>

      {/* Footer - Hide on chat view */}
      {currentView !== 'chat' && (
        <footer className="border-t border-gray-200 dark:border-slate-800 py-12 bg-gray-50 dark:bg-slate-950 text-gray-500 dark:text-slate-400 text-center text-sm transition-colors duration-300">
          <p>© 2024 Nexus Intelligent Systems. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Contact</a>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
