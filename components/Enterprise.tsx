import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Building2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const Enterprise: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].enterprise;

  const icons = [Shield, Zap, Globe];

  return (
    <div className="py-16 px-4 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-6">
          <Building2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t.title}</h2>
        <p className="text-xl text-gray-600 dark:text-slate-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        {t.features.map((feature, idx) => {
          const Icon = icons[idx];
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-none"
            >
              <div className="w-12 h-12 bg-primary-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          )
        })}
      </div>

      <div className="border-t border-gray-200 dark:border-slate-800 pt-16 text-center">
        <p className="text-sm font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-8">
          {t.trustedBy}
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Mock Logos */}
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-32 bg-gray-400 dark:bg-slate-700 rounded animate-pulse" />
            ))}
        </div>
      </div>
    </div>
  );
};
