import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Dices, X, Check, Trash2 } from 'lucide-react';

type BucketType = 'red' | 'green' | 'blue';

interface Task {
  id: string;
  title: string;
  description: string;
  bucket: BucketType;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Calculus Chapter 4 Derivations', description: 'Practice 20 problems from the textbook.', bucket: 'red', completed: false },
  { id: '2', title: 'Physics Kinematics Equations', description: 'Derive the 4 main equations of motion.', bucket: 'red', completed: false },
  { id: '3', title: 'History Midterm Summary', description: 'Summarize chapters 1-5 key events.', bucket: 'green', completed: false },
  { id: '4', title: 'Biology Cell Structure', description: 'Memorize the organelles and their functions.', bucket: 'green', completed: false },
  { id: '5', title: 'Email Professor', description: 'Ask about the extension for the lab report.', bucket: 'blue', completed: false },
  { id: '6', title: 'Organize Notes', description: 'Sort loose papers into binders.', bucket: 'blue', completed: false },
];

export default function ThreeBuckets() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', bucket: 'red' as BucketType });
  const [randomTask, setRandomTask] = useState<Task | null>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        bucket: newTask.bucket,
        completed: false,
      }
    ]);
    setNewTask({ title: '', description: '', bucket: 'red' });
    setIsAdding(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const pickRandomTask = () => {
    const uncompleted = tasks.filter(t => !t.completed);
    if (uncompleted.length === 0) {
      alert("All tasks completed! Great job!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * uncompleted.length);
    setRandomTask(uncompleted[randomIndex]);
  };

  const buckets = [
    { id: 'red', name: 'Red Bucket', desc: 'Calculation & Derivation', color: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: '🔴' },
    { id: 'green', name: 'Green Bucket', desc: 'Reading & Memorization', color: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: '🟢' },
    { id: 'blue', name: 'Blue Bucket', desc: 'Miscellaneous Tasks', color: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: '🔵' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Task Allocation</h2>
            <p className="text-slate-500 mt-1">Categorize your study tasks to break the chaos of blind cramming.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
            <button
              onClick={pickRandomTask}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
            >
              <Dices className="w-4 h-4" />
              Random Cramming Mode
            </button>
          </div>
        </div>

        {/* Add Task Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAddTask} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">New Task</h3>
                  <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-3">
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={newTask.title}
                      onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={newTask.description}
                      onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <select
                      value={newTask.bucket}
                      onChange={e => setNewTask({ ...newTask, bucket: e.target.value as BucketType })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                    >
                      <option value="red">🔴 Red (Calculation)</option>
                      <option value="green">🟢 Green (Reading)</option>
                      <option value="blue">🔵 Blue (Admin/Misc)</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                    >
                      Save Task
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buckets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buckets.map(bucket => (
            <div key={bucket.id} className={`rounded-2xl border ${bucket.border} ${bucket.color} overflow-hidden flex flex-col h-[calc(100vh-240px)]`}>
              <div className="p-4 border-b border-black/5 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
                  <span>{bucket.icon}</span>
                  {bucket.name}
                </div>
                <div className={`text-xs mt-1 font-medium ${bucket.text} opacity-80 uppercase tracking-wider`}>
                  {bucket.desc}
                </div>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto space-y-3">
                <AnimatePresence>
                  {tasks.filter(t => t.bucket === bucket.id).map(task => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm group ${task.completed ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            task.completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 text-transparent hover:border-indigo-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium text-slate-900 truncate ${task.completed ? 'line-through' : ''}`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {tasks.filter(t => t.bucket === bucket.id).length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm font-medium">
                    No tasks yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Random Task Modal */}
      <AnimatePresence>
        {randomTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className={`h-32 ${
                randomTask.bucket === 'red' ? 'bg-red-500' : 
                randomTask.bucket === 'green' ? 'bg-emerald-500' : 'bg-blue-500'
              } flex items-center justify-center relative`}>
                <button 
                  onClick={() => setRandomTask(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <Dices className="w-16 h-16 text-white/20 absolute" />
                <div className="text-5xl relative z-10">
                  {randomTask.bucket === 'red' ? '🔴' : randomTask.bucket === 'green' ? '🟢' : '🔵'}
                </div>
              </div>
              
              <div className="p-8 text-center space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-2">
                  Your Random Task
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{randomTask.title}</h3>
                {randomTask.description && (
                  <p className="text-slate-600">{randomTask.description}</p>
                )}
                
                <div className="pt-6">
                  <button
                    onClick={() => {
                      toggleTask(randomTask.id);
                      setRandomTask(null);
                    }}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
