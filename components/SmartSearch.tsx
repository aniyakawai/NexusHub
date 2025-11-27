import React, { useState } from 'react';
import { Sparkles, Search, Loader2 } from 'lucide-react';
import { findMatchingAgents } from '../services/geminiService';
import { SearchResponse, Language } from '../types';
import { translations } from '../translations';

interface SmartSearchProps {
  onSearchResults: (results: SearchResponse | null) => void;
  lang: Language;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onSearchResults, lang }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const t = translations[lang].search;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      onSearchResults(null);
      return;
    }

    setIsSearching(true);
    const results = await findMatchingAgents(query);
    onSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 relative z-20">
      <div className="relative group">
        {/* Subtle glow in dark mode, minimal in light */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 transition duration-500"></div>
        
        <form onSubmit={handleSearch} className="relative flex items-center bg-white dark:bg-slate-900 rounded-xl p-1.5 border border-gray-200 dark:border-slate-700 shadow-xl shadow-gray-200/50 dark:shadow-black/50">
          <div className="pl-4 text-primary-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="w-full bg-transparent text-gray-900 dark:text-white p-3 focus:outline-none placeholder-gray-400 dark:placeholder-slate-500 text-sm md:text-base"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg ml-2 border border-gray-200 dark:border-slate-700 transition-colors disabled:opacity-50"
          >
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>
      </div>
      <p className="text-center text-gray-400 dark:text-slate-500 text-xs mt-3">
        {t.poweredBy}
      </p>
    </div>
  );
};
