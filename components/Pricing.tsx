import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const Pricing: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].pricing;
  
  const plans = [
    { ...t.free, highlight: false },
    { ...t.pro, highlight: true },
    { ...t.enterprise, highlight: false }
  ];

  return (
    <div className="py-16 px-4 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h2>
        <p className="text-xl text-gray-600 dark:text-slate-400">{t.subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 rounded-2xl border ${
              plan.highlight 
                ? 'bg-white dark:bg-slate-900 border-primary-500 shadow-2xl shadow-primary-500/10 scale-105 z-10' 
                : 'bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800'
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Popular
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
              {plan.price !== 'Custom' && plan.price !== '定制' && <span className="text-gray-500 ml-2">/mo</span>}
            </div>
            <p className="text-gray-600 dark:text-slate-400 text-sm mb-6 min-h-[40px]">{plan.desc}</p>
            
            <button className={`w-full py-2.5 rounded-lg text-sm font-semibold mb-8 transition-colors ${
              plan.highlight 
                ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90'
            }`}>
              {t.cta}
            </button>

            <ul className="space-y-4">
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start text-sm text-gray-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-primary-500 mr-2 mt-0.5 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
