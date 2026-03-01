import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Info } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'ai' | 'ta';
  content: string;
  timestamp: Date;
};

export default function QnA() {
  const [mode, setMode] = useState<'ai' | 'ta'>('ai');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hi! I'm your AI study assistant. I can help analyze questions, explain concepts, and find relevant knowledge points. What are you stuck on?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (mode === 'ai') {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: input,
          config: {
            systemInstruction: "You are a helpful, concise AI study assistant for college students cramming for exams. Explain concepts clearly and break down complex problems. Use markdown for formatting.",
          }
        });

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: response.text || "I'm sorry, I couldn't process that.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error generating content:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: "Sorry, I encountered an error connecting to the AI service. Please try again.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simulate TA response
      setTimeout(() => {
        const taMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ta',
          content: "Hi, I'm Sarah, a senior TA. I see your question. Let me break that down for you...",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, taMessage]);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dual-Track Q&A</h2>
            <p className="text-slate-500 text-sm mt-1">Get instant AI help or connect with a real Teaching Assistant.</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setMode('ai')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'ai' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-4 h-4" />
              AI Assistant
            </button>
            <button
              onClick={() => setMode('ta')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'ta' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              Real-Person TA
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner for TA mode */}
      <AnimatePresence>
        {mode === 'ta' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-emerald-50 border-b border-emerald-100 shrink-0"
          >
            <div className="max-w-4xl mx-auto p-3 flex items-start gap-3 text-emerald-800 text-sm">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                <strong>Social Impact Initiative:</strong> You are connecting with a recent graduate working as a transitional Teaching Assistant. This provides them with valuable experience while helping you ace your exams!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6 pb-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-900 text-white' : 
                msg.role === 'ai' ? 'bg-indigo-100 text-indigo-600' : 
                'bg-emerald-100 text-emerald-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : 
                 msg.role === 'ai' ? <Sparkles className="w-5 h-5" /> : 
                 <User className="w-5 h-5" />}
              </div>
              
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-sm' 
                  : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-sm'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">
                    {msg.role === 'user' ? 'You' : msg.role === 'ai' ? 'AI Assistant' : 'TA Sarah'}
                  </span>
                  <span className="text-xs opacity-50">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                mode === 'ai' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {mode === 'ai' ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2 text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">
                  {mode === 'ai' ? 'Analyzing question...' : 'Connecting to TA...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 shrink-0">
        <div className="max-w-4xl mx-auto">
          <form 
            onSubmit={handleSend}
            className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder={mode === 'ai' ? "Ask the AI assistant anything..." : "Describe your problem to a TA..."}
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 px-4 text-slate-900 placeholder-slate-400"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 mb-1 mr-1"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-slate-400">
            Press Enter to send, Shift + Enter for new line.
          </div>
        </div>
      </div>
    </div>
  );
}
