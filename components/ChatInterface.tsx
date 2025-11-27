
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image as ImageIcon, Plus, Menu, MessageSquare, Settings, HelpCircle, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';

interface ChatInterfaceProps {
  lang: Language;
  onBack: () => void;
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
  const [messages, setMessages] = useState<Message[]>([]); // Start empty to show Greeting
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

    // Simulate AI Thinking
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: lang === 'zh' ? '这是一个模拟回复。API接口已预留。我正在模仿 Gemini 的界面风格。' : 'This is a simulated response. API endpoints are reserved. I am mimicking the Gemini UI style.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1200);
  };

  const handleVoiceInput = () => {
    alert(lang === 'zh' ? '语音接口预留位置' : 'Voice API Placeholder');
  };

  const handleImageUpload = () => {
    alert(lang === 'zh' ? '图片上传接口预留位置' : 'Image API Placeholder');
  };

  return (
    <div className="flex h-full bg-[#131314] text-[#e3e3e3] font-sans overflow-hidden">
      {/* Sidebar - Gemini Style */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex flex-col h-full bg-[#1e1f20] p-4 flex-shrink-0"
          >
            <div className="mb-6 px-2">
               <div className="flex items-center gap-2 text-xl font-medium text-white mb-6">
                 <Menu className="w-6 h-6 cursor-pointer" onClick={() => setSidebarOpen(false)} />
               </div>
               <button 
                onClick={() => setMessages([])}
                className="flex items-center gap-3 bg-[#282a2c] hover:bg-[#37393b] text-[#e3e3e3] px-4 py-3 rounded-full text-sm font-medium transition-colors w-full"
               >
                 <Plus className="w-4 h-4" />
                 {lang === 'zh' ? '发起新对话' : 'New chat'}
               </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 px-2">
              <p className="text-xs font-medium text-gray-400 px-3 mb-2">{lang === 'zh' ? '近期' : 'Recent'}</p>
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#282a2c] rounded-full cursor-pointer transition-colors text-sm truncate">
                <MessageSquare className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">{lang === 'zh' ? '你好 问好' : 'Greeting Hello'}</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#282a2c] rounded-full cursor-pointer transition-colors text-sm truncate">
                <MessageSquare className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">{lang === 'zh' ? '今天天气怎么样' : 'Video description task'}</span>
              </div>
            </div>

            <div className="mt-auto space-y-1 px-2">
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#282a2c] rounded-full cursor-pointer transition-colors text-sm">
                <HelpCircle className="w-4 h-4 text-gray-400" />
                <span>{lang === 'zh' ? '帮助' : 'Help'}</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#282a2c] rounded-full cursor-pointer transition-colors text-sm">
                <Settings className="w-4 h-4 text-gray-400" />
                <span>{lang === 'zh' ? '设置' : 'Settings'}</span>
              </div>
              <div className="pt-4 border-t border-[#444746] mt-2 flex items-center gap-2 px-3">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <span className="text-xs text-gray-400">Singapore</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full max-w-full">
        {/* Top Navbar */}
        <div className="flex items-center justify-between p-4 bg-[#131314]">
          <div className="flex items-center gap-3">
             {!isSidebarOpen && (
               <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-[#282a2c] rounded-full transition-colors">
                  <Menu className="w-5 h-5 text-gray-300" />
               </button>
             )}
             <span className="text-lg font-medium text-gray-200">MaxKB</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-[#282a2c] px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 flex items-center gap-1">
               <Sparkles className="w-3 h-3 text-yellow-500" />
               Try MaxKB
             </div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold border border-white/10">
               U
             </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {messages.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center -mt-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-2"
                >
                  <h1 className="text-5xl md:text-6xl font-medium bg-gradient-to-r from-blue-400 via-indigo-400 to-red-400 bg-clip-text text-transparent pb-2">
                    {lang === 'zh' ? '你好, Nexus 用户' : 'Hello, Nexus User'}
                  </h1>
                  <h2 className="text-4xl md:text-5xl font-medium text-[#444746] dark:text-[#5e5e5e]">
                     {lang === 'zh' ? '今天我可以帮您做什么？' : 'How can I help you today?'}
                  </h2>
                </motion.div>
                
                {/* Suggestion Chips */}
                <div className="flex gap-4 mt-12 overflow-x-auto max-w-full px-4 no-scrollbar">
                   {['Help write an email', 'Plan a trip', 'Code a react component', 'Analyze data'].map((item, i) => (
                      <div key={i} className="bg-[#1e1f20] hover:bg-[#282a2c] text-gray-300 px-4 py-3 rounded-xl cursor-pointer transition-colors whitespace-nowrap text-sm font-medium">
                         {item}
                      </div>
                   ))}
                </div>
             </div>
          ) : (
            <div className="max-w-3xl mx-auto py-8 space-y-8">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' ? (
                     <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 flex items-center justify-center shrink-0 mt-1">
                        <Sparkles className="w-4 h-4 text-white" />
                     </div>
                  ) : (
                     <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                     </div>
                  )}
                  
                  <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block text-[15px] leading-7 ${msg.role === 'user' ? '' : 'text-gray-200'}`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Floating Input Area - Gemini Style */}
        <div className="p-4 bg-[#131314]">
          <div className="max-w-3xl mx-auto relative bg-[#1e1f20] rounded-3xl transition-all border border-[#444746]/50 focus-within:bg-[#282a2c] focus-within:border-gray-500">
             <div className="flex items-end p-2 gap-2">
                <button className="p-2 text-gray-400 hover:bg-[#37393b] hover:text-white rounded-full transition-colors" onClick={handleImageUpload}>
                   <Plus className="w-5 h-5" />
                </button>
                
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={lang === 'zh' ? "输入指令..." : "Enter a prompt here"}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 resize-none max-h-32 min-h-[48px] py-3"
                  rows={1}
                />

                <div className="flex items-center gap-1">
                   {!input && (
                      <button className="p-2 text-gray-400 hover:bg-[#37393b] hover:text-white rounded-full transition-colors" onClick={handleVoiceInput}>
                         <Mic className="w-5 h-5" />
                      </button>
                   )}
                   {input && (
                      <button 
                        onClick={handleSendMessage}
                        className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-200 transition-colors"
                      >
                         <Send className="w-4 h-4" />
                      </button>
                   )}
                </div>
             </div>
          </div>
          <p className="text-center text-[11px] text-gray-500 mt-3">
             MaxKB may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>

      </div>
    </div>
  );
};
