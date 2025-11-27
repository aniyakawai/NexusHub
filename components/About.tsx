
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const About: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <div className="py-16 px-4 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t.title}</h2>
        <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="order-2 md:order-1"
        >
          <div className="flex items-center gap-3 mb-4 text-primary-600 dark:text-primary-400">
            <Target className="w-6 h-6" />
            <h3 className="text-2xl font-bold">{t.missionTitle}</h3>
          </div>
          <p className="text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
            {t.missionDesc}
          </p>
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="order-1 md:order-2 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center text-white"
        >
          {/* Placeholder for Mission Image */}
          <Target className="w-20 h-20 opacity-50" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center"
        >
           {/* Placeholder for History Image */}
           <Clock className="w-20 h-20 text-gray-300 dark:text-slate-600" />
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-4 text-primary-600 dark:text-primary-400">
            <Clock className="w-6 h-6" />
            <h3 className="text-2xl font-bold">{t.historyTitle}</h3>
          </div>
          <p className="text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
            {t.historyDesc}
          </p>
        </motion.div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-8 text-primary-600 dark:text-primary-400">
            <Users className="w-6 h-6" />
            <h3 className="text-2xl font-bold">{t.teamTitle}</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="w-20 h-20 bg-gray-200 dark:bg-slate-800 rounded-full mx-auto mb-4 animate-pulse" />
              <div className="h-4 w-24 bg-gray-100 dark:bg-slate-800 rounded mx-auto mb-2" />
              <div className="h-3 w-16 bg-gray-50 dark:bg-slate-800/50 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
