import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Loader2, Bot, User } from 'lucide-react';
import { findMatchingAgents } from '../services/geminiService';
import { SearchResponse, Language } from '../types';
import { translations } from '../translations';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartSearchProps {
  onSearchResults: (results: SearchResponse | null) => void;
  lang: Language;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onSearchResults, lang }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].search;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsSearching(true);

    const results = await findMatchingAgents(userMsg);
    
    if (results) {
      setMessages(prev => [...prev, { role: 'assistant', content: results.chatResponse }]);
      onSearchResults(results);
    } else {
       // Fallback if API fails
      setMessages(prev => [...prev, { role: 'assistant', content: lang === 'zh' ? '抱歉，服务暂时不可用。' : 'Sorry, the service is temporarily unavailable.' }]);
    }
    
    setIsSearching(false);
  };

  const handleClear = () => {
    setMessages([]);
    onSearchResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 relative z-20">
      
      {/* Chat History Window - Only shows if there are messages */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-t-xl border-x border-t border-gray-200 dark:border-slate-700 overflow-hidden shadow-2xl mb-[-10px] pb-4"
          >
            <div className="max-h-[300px] overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant' 
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' 
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400'
                  }`}>
                    {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                    msg.role === 'assistant'
                      ? 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-slate-700 shadow-sm rounded-tl-none'
                      : 'bg-primary-600 text-white rounded-tr-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isSearching && (
                <div className="flex items-center gap-2 text-gray-400 text-xs ml-12">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {t.thinking}
                </div>
              )}
            </div>
            
            <div className="px-4 flex justify-end">
               <button onClick={handleClear} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                 {t.clear}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className={`relative group ${messages.length > 0 ? 'rounded-b-xl rounded-t-none' : 'rounded-xl'}`}>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 transition duration-500"></div>
        
        <form onSubmit={handleSearch} className={`relative flex items-center bg-white dark:bg-slate-900 p-1.5 border border-gray-200 dark:border-slate-700 shadow-xl shadow-gray-200/50 dark:shadow-black/50 ${messages.length > 0 ? 'rounded-b-xl border-t-0' : 'rounded-xl'}`}>
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
            disabled={isSearching || !query.trim()}
            className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg ml-2 border border-gray-200 dark:border-slate-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
      
      {messages.length === 0 && (
        <p className="text-center text-gray-400 dark:text-slate-500 text-xs mt-3">
          {t.poweredBy}
        </p>
      )}
    </div>
  );
};
