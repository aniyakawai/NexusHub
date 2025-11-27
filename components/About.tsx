import React from 'react';
import { motion } from 'framer-motion';
import { Users, History, Target } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const About: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <div className="py-16 px-4 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t.title}</h2>
        <p className="text-xl text-gray-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-none"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.missionTitle}</h3>
          </div>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
            {t.missionDesc}
          </p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           className="relative h-64 rounded-2xl overflow-hidden"
        >
          <img 
            src="https://picsum.photos/600/400?random=20" 
            alt="Mission" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-primary-900/20 mix-blend-overlay"></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800"
        >
          <Users className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.teamTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">{t.teamDesc}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800"
        >
          <History className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.historyTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">{t.historyDesc}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center text-center"
        >
          <div className="flex -space-x-2 mb-4">
             {[1,2,3].map(i => (
               <img key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src={`https://picsum.photos/100?random=${i+50}`} alt="Team" />
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-bold">+20</div>
          </div>
          <p className="text-xs font-medium text-primary-600 dark:text-primary-400">Join our growing team</p>
        </motion.div>
      </div>
    </div>
  );
};
