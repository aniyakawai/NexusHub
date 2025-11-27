import React from 'react';
import { Agent, Language } from '../types';
import { ExternalLink, Star, Users, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

interface AgentCardProps {
  agent: Agent;
  lang: Language;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, lang }) => {
  const t = translations[lang].common;
  const isAvailable = agent.redirectUrl && agent.redirectUrl.length > 0;

  const handleRedirect = () => {
    if (isAvailable) {
      window.open(agent.redirectUrl, '_blank');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: isAvailable ? -5 : 0 }}
      className={`group relative bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all duration-300 ${isAvailable ? 'hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-primary-900/20' : 'opacity-80'}`}
    >
      {/* Image Header */}
      <div className="h-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10 opacity-60" />
        <img 
          src={agent.imageUrl} 
          alt={agent.name[lang]} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? 'group-hover:scale-105 saturate-50 group-hover:saturate-100' : 'grayscale'}`}
        />
        <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-gray-800 dark:text-slate-200 border border-gray-200 dark:border-slate-700 shadow-sm">
          {agent.industry}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-lg font-bold text-gray-900 dark:text-white transition-colors ${isAvailable ? 'group-hover:text-primary-600 dark:group-hover:text-primary-400' : ''}`}>
            {agent.name[lang]}
          </h3>
          {isAvailable && (
            <div className="flex items-center text-amber-500 text-sm font-medium">
              <Star className="w-3.5 h-3.5 fill-current mr-1" />
              <span>{agent.stats.rating}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 dark:text-slate-400 text-sm mb-5 line-clamp-2 min-h-[40px] leading-relaxed">
          {agent.description[lang]}
        </p>

        {/* Capabilities Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {agent.capabilities.slice(0, 3).map((cap, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 px-2 py-1 rounded-md">
              {cap[lang]}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center text-gray-500 dark:text-slate-500 text-xs">
            {isAvailable ? (
              <>
                <Users className="w-3.5 h-3.5 mr-1.5" />
                {agent.stats.users} {t.users}
              </>
            ) : (
              <span className="italic text-gray-400">Coming Soon</span>
            )}
          </div>
          
          <button 
            onClick={handleRedirect}
            disabled={!isAvailable}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              isAvailable 
                ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-800 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white' 
                : 'text-gray-400 bg-gray-50 dark:bg-slate-800/50 cursor-not-allowed'
            }`}
          >
            {isAvailable ? (
              <>
                {t.launch}
                <ExternalLink className="w-3 h-3" />
              </>
            ) : (
              <>
                Coming Soon
                <Lock className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
