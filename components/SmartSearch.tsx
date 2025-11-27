
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Loader2 } from 'lucide-react';
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
  text: string;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onSearchResults, lang }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].search;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsSearching(true);

    const results = await findMatchingAgents(userMsg);
    
    setIsSearching(false);
    if (results) {
      setMessages(prev => [...prev, { role: 'assistant', text: results.chatResponse }]);
      onSearchResults(results);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', text: lang === 'zh' ? '抱歉，我现在无法连接到服务，请稍后再试。' : 'Sorry, I cannot connect to the service right now.' }]);
    }
  };

  const clearChat = () => {
    setMessages([]);
    onSearchResults(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12 relative z-20">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col min-h-[300px] max-h-[500px]">
        
        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-slate-950/50 custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-slate-500 opacity-60">
              <Bot className="w-12 h-12 mb-2" />
              <p>{t.placeholder}</p>
            </div>
          )}
          
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border border-gray-100 dark:border-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isSearching && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                  <Bot className="w-5 h-5" />
               </div>
               <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-2 text-sm text-gray-500">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 {t.thinking}
               </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          <form onSubmit={handleSearch} className="flex gap-2 relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all placeholder-gray-400"
            />
            <button 
              type="submit"
              disabled={isSearching || !query.trim()}
              className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
            
            {messages.length > 0 && (
              <button 
                type="button" 
                onClick={clearChat}
                className="absolute -top-12 right-2 text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-md border border-gray-200 dark:border-slate-700 shadow-sm transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                {t.clear}
              </button>
            )}
          </form>
          <div className="text-center mt-2">
             <p className="text-[10px] text-gray-400 dark:text-slate-600 uppercase tracking-wider font-medium">
              {t.poweredBy}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
