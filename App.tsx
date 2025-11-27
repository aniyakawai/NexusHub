import React, { useState, useMemo, useEffect } from 'react';
import { Hero } from './components/Hero';
import { SmartSearch } from './components/SmartSearch';
import { AgentCard } from './components/AgentCard';
import { Pricing } from './components/Pricing';
import { Enterprise } from './components/Enterprise';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Industry, Agent, SearchResponse, Language, Theme, View } from './types';
import { AGENTS } from './constants';
import { translations } from './translations';
import { LayoutGrid, Cpu, Globe, Scale, Stethoscope, ShoppingBag, Factory, Palette, Database, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(Industry.ALL);
  const [aiRecommendations, setAiRecommendations] = useState<SearchResponse | null>(null);
  
  // App State
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('home');

  // Handle Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');

  // Filter Logic
  const filteredAgents = useMemo(() => {
    let agents = AGENTS;

    if (aiRecommendations && aiRecommendations.recommendedAgentIds.length > 0) {
      agents = agents.filter(a => aiRecommendations.recommendedAgentIds.includes(a.id));
    } else if (selectedIndustry !== Industry.ALL) {
      agents = agents.filter(a => a.industry === selectedIndustry);
    }

    return agents;
  }, [selectedIndustry, aiRecommendations]);

  const handleSearchResults = (results: SearchResponse | null) => {
    setAiRecommendations(results);
    if (results && results.recommendedAgentIds.length > 0) {
        setSelectedIndustry(Industry.ALL);
    }
  };

  const getIndustryIcon = (ind: Industry) => {
    switch (ind) {
      case Industry.FINANCE: return <Scale className="w-4 h-4" />;
      case Industry.HEALTHCARE: return <Stethoscope className="w-4 h-4" />;
      case Industry.RETAIL: return <ShoppingBag className="w-4 h-4" />;
      case Industry.MANUFACTURING: return <Factory className="w-4 h-4" />;
      case Industry.CREATIVE: return <Palette className="w-4 h-4" />;
      case Industry.LEGAL: return <Scale className="w-4 h-4" />;
      case Industry.DATA: return <Database className="w-4 h-4" />;
      case Industry.SALES: return <TrendingUp className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const renderHome = () => {
    const t = translations[lang];
    const industryMap = translations[lang].industries;

    return (
      <>
        <Hero lang={lang} />
        <SmartSearch onSearchResults={handleSearchResults} lang={lang} />

        {/* Industry Tabs */}
        {!aiRecommendations && (
          <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar justify-start md:justify-center px-4">
            {Object.values(Industry).map((ind) => (
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
                {industryMap[ind as keyof typeof industryMap] || ind}
              </button>
            ))}
          </div>
        )}

        {/* Grid Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-300 dark:border-slate-800">
              <Cpu className="w-12 h-12 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-slate-300">{t.common.noResults}</h3>
              <p className="text-gray-500 dark:text-slate-500">{t.common.tryAdjusting}</p>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="pb-20">
        {currentView === 'home' && renderHome()}
        {currentView === 'pricing' && <Pricing lang={lang} />}
        {currentView === 'enterprise' && <Enterprise lang={lang} />}
        {currentView === 'about' && <About lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-12 bg-gray-50 dark:bg-slate-950 text-gray-500 dark:text-slate-400 text-center text-sm transition-colors duration-300">
        <p>© 2024 Nexus Intelligent Systems. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
