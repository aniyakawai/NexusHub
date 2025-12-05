import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Plus, Menu, MessageSquare, Settings, HelpCircle, User, Sparkles, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';

interface ChatInterfaceProps {
  lang: Language;
  onBack: () => void;
  // 未来预留：这里以后需要接收当前选中的智能体信息
  // agent?: Agent; 
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ lang, onBack }) => {
  const [input, setInput] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // 模拟 AI 回复 (未来这里对接 API)
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: lang === 'zh' ? '接口对接准备就绪。界面风格已同步。' : 'API ready. UI style synchronized.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    // 1. 背景色改为与 App.tsx 一致的 Slate 色系，支持日/夜模式
    <div className="flex h-full bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans overflow-hidden transition-colors duration-300">
      
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex-shrink-0"
          >
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
               <div className="flex items-center gap-2 font-bold text-lg text-primary-600 dark:text-primary-400">
                 <Sparkles className="w-5 h-5" />
                 <span>Nexus<span className="text-gray-500 font-light">Chat</span></span>
               </div>
               <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
                 <Menu className="w-5 h-5 text-gray-500" />
               </button>
            </div>

            <div className="p-4">
              <button 
                onClick={() => setMessages([])}
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white w-full py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                {lang === 'zh' ? '新对话' : 'New Chat'}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1">
              <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{lang === 'zh' ? '历史记录' : 'History'}</p>
              {/* 模拟历史记录 */}
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors text-sm text-gray-600 dark:text-gray-300">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="truncate">测试对话记录 {i}</span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors text-sm text-gray-600 dark:text-gray-300">
                <Settings className="w-4 h-4" />
                <span>{lang === 'zh' ? '设置' : 'Settings'}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors text-sm text-gray-600 dark:text-gray-300">
                <HelpCircle className="w-4 h-4" />
                <span>{lang === 'zh' ? '帮助' : 'Help'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <div className="h-16 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
             {!isSidebarOpen && (
               <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <Menu className="w-5 h-5" />
               </button>
             )}
             {/* 返回按钮 */}
             <button onClick={onBack} className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
             </button>
             <span className="font-medium">MaxKB Agent</span>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center opacity-50">
                <Sparkles className="w-16 h-16 text-primary-500 mb-4" />
                <p className="text-xl font-medium">{lang === 'zh' ? '准备好开始了吗？' : 'Ready to start?'}</p>
             </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* 头像 */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'assistant' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {msg.role === 'assistant' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* 消息气泡 */}
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-6 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - 优化版 */}
        <div className="p-4 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto flex items-end gap-3">
             
             {/* 输入框容器：包含左侧加号、中间输入框、右侧麦克风 */}
             <div className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl flex items-end p-2 transition-colors focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500">
               
               {/* 左侧上传按钮：图标改大，点击区域更舒适 */}
               <button 
                 className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
                 title="上传文件 (预留)"
               >
                  <Plus className="w-6 h-6" /> {/* 图标从 w-5 改为 w-6 */}
               </button>

               {/* 中间输入框：行高调整，去掉多余纵向padding */}
               <textarea 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSendMessage();
                   }
                 }}
                 placeholder={lang === 'zh' ? "输入消息..." : "Type a message..."}
                 // min-h 改小，py 改小，实现“变窄”的效果
                 className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2.5 px-2 min-h-[40px] max-h-32 text-sm text-gray-900 dark:text-white placeholder-gray-500 leading-relaxed"
                 rows={1}
                 // 自动调整高度的小技巧：根据内容行数变化
                 style={{ height: 'auto', overflow: 'hidden' }}
                 onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                 }}
               />

               {/* 右侧语音按钮：预留位置，一直显示 */}
               <button 
                 className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
                 title="语音输入 (预留)"
               >
                  <Mic className="w-5 h-5" />
               </button>
             </div>

             {/* 独立的发送按钮：放在外面，更像现代 AI 聊天软件 */}
             {/* 独立的发送按钮：增加 mb-1 让它视觉居中 */}
             <button 
               onClick={handleSendMessage}
               disabled={!input.trim()}
               className={`w-12 h-12 mb-2 flex items-center justify-center rounded-2xl transition-all shadow-sm shrink-0 ${
                 input.trim() 
                   ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer hover:shadow-md hover:scale-105 active:scale-95' 
                   : 'bg-gray-200 dark:bg-slate-800 text-gray-400 cursor-not-allowed'
               }`}
             >
                <Send className="w-5 h-5" />
             </button>

          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
             AI generated content may be inaccurate.
          </p>
        </div>
      </div>
    </div>
  );
};