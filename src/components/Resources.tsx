import { useState } from 'react';
import { Play, Star, Clock, BookOpen, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  category: string;
  image: string;
  tags: string[];
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Calculus 1 in 4 Hours: The Ultimate Cram Session',
    instructor: 'Prof. Math Genius',
    duration: '4h 15m',
    rating: 4.9,
    category: 'Math',
    image: 'https://picsum.photos/seed/math/400/250',
    tags: ['Derivatives', 'Integrals', 'Limits']
  },
  {
    id: '2',
    title: 'Physics Mechanics: Final Exam Review',
    instructor: 'Dr. Science',
    duration: '3h 30m',
    rating: 4.8,
    category: 'Physics',
    image: 'https://picsum.photos/seed/physics/400/250',
    tags: ['Kinematics', 'Forces', 'Energy']
  },
  {
    id: '3',
    title: 'Organic Chemistry Reactions Cheat Sheet',
    instructor: 'Chem Wizard',
    duration: '2h 45m',
    rating: 4.7,
    category: 'Chemistry',
    image: 'https://picsum.photos/seed/chemistry/400/250',
    tags: ['SN1/SN2', 'Alkenes', 'Synthesis']
  },
  {
    id: '4',
    title: 'Microeconomics: Graphs & Formulas Only',
    instructor: 'Econ Master',
    duration: '1h 50m',
    rating: 4.6,
    category: 'Economics',
    image: 'https://picsum.photos/seed/econ/400/250',
    tags: ['Supply/Demand', 'Elasticity', 'Market Structures']
  },
  {
    id: '5',
    title: 'Computer Science 101: Python Crash Course',
    instructor: 'Code Ninja',
    duration: '5h 00m',
    rating: 4.9,
    category: 'Computer Science',
    image: 'https://picsum.photos/seed/code/400/250',
    tags: ['Loops', 'Functions', 'OOP']
  },
  {
    id: '6',
    title: 'World History Since 1500: Key Events',
    instructor: 'History Buff',
    duration: '3h 10m',
    rating: 4.5,
    category: 'History',
    image: 'https://picsum.photos/seed/history/400/250',
    tags: ['Revolutions', 'World Wars', 'Cold War']
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Math', 'Physics', 'Chemistry', 'Economics', 'Computer Science', 'History'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Intensive Resources</h2>
            <p className="text-slate-500 mt-1">Curated, high-efficiency courses to save you time.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search subjects, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 transition-all group cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-indigo-600 backdrop-blur-sm">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  {course.category}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    {course.rating}
                  </div>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Intensive
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No courses found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
