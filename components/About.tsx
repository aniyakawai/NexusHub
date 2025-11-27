
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const About: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <div className="py-16 px-4 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t.title}</h2>
        <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="order-2 md:order-1"
        >
          <div className="flex items-center gap-3 mb-4 text-primary-600 dark:text-primary-400">
            <Target className="w-6 h-6" />
            <h3 className="text-2xl font-bold">{t.missionTitle}</h3>
          </div>
          <p className="text-lg text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
            {t.missionDesc}
          </p>
          <div className="flex gap-4">
             <div className="bg-primary-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">99.9%</div>
                <div className="text-sm text-gray-500 dark:text-slate-500">Uptime</div>
             </div>
             <div className="bg-primary-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                <div className="text-sm text-gray-500 dark:text-slate-500">Countries</div>
             </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="order-1 md:order-2 h-[400px] rounded-2xl overflow-hidden shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
            alt="Team Mission" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* History Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-[400px] rounded-2xl overflow-hidden shadow-2xl relative"
        >
           <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" 
            alt="Office Building" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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

      {/* Team Section */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-10 text-primary-600 dark:text-primary-400">
            <Users className="w-6 h-6" />
            <h3 className="text-2xl font-bold">{t.teamTitle}</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'Sarah Chen', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
            { name: 'David Miller', role: 'CTO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
            { name: 'Elena Rodriguez', role: 'Head of AI', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop' },
            { name: 'James Wilson', role: 'Product Lead', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop' }
          ].map((member, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm group"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary-100 dark:border-primary-900">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{member.name}</h4>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wide">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
