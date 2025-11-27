
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'framer-motion';

interface SmartSearchProps {
  onSearch: (query: string) => void;
  lang: Language;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onSearch, lang }) => {
  const [query, setQuery] = useState('');
  const t = translations[lang].search;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 relative z-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={lang === 'zh' ? '搜索智能体名称、描述或能力...' : 'Search by agent name, description, or capability...'}
          className="block w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-lg shadow-gray-200/20 dark:shadow-none text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </motion.div>
    </div>
  );
};
