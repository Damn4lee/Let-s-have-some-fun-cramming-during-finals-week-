import { useState } from 'react';
import { BookOpen, BrainCircuit, CheckSquare, LayoutDashboard, MessageSquare, Sparkles, User, Users } from 'lucide-react';
import ThreeBuckets from './components/ThreeBuckets';
import Resources from './components/Resources';
import QnA from './components/QnA';

export default function App() {
  const [activeTab, setActiveTab] = useState<'buckets' | 'resources' | 'qna'>('buckets');

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            C
          </div>
          <h1 className="font-bold text-xl tracking-tight">CramMate</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('buckets')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'buckets' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            Three Buckets
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'resources' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Intensive Resources
          </button>
          <button
            onClick={() => setActiveTab('qna')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'qna' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Dual-Track Q&A
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-sm font-medium">Student User</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'buckets' && <ThreeBuckets />}
        {activeTab === 'resources' && <Resources />}
        {activeTab === 'qna' && <QnA />}
      </main>
    </div>
  );
}
