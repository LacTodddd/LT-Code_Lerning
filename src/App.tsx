import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, User, Zap } from 'lucide-react';
import { useUserStore } from './store/userStore';
import HomePage from './pages/Home';
import TopicTreePage from './pages/TopicTree';
import QuizSessionPage from './pages/QuizSession';
import ProfilePage from './pages/Profile';

const Navigation = () => {
  const location = useLocation();
  const { level, xp } = useUserStore();

  return (
    <nav className="fixed bottom-0 w-full glass-panel border-t md:top-0 md:bottom-auto md:border-b md:border-t-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex items-center gap-2 font-bold text-xl text-accent">
            <Zap className="w-6 h-6" />
            <span>DevQuiz</span>
          </div>
          
          <div className="flex w-full md:w-auto justify-around md:justify-end md:gap-8">
            <Link to="/" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${location.pathname === '/' ? 'text-accent' : 'text-slate-400 hover:text-slate-200'}`}>
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1 md:hidden">Home</span>
            </Link>
            <Link to="/topics" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${location.pathname.startsWith('/topics') ? 'text-accent' : 'text-slate-400 hover:text-slate-200'}`}>
              <BookOpen className="w-6 h-6" />
              <span className="text-xs mt-1 md:hidden">Learn</span>
            </Link>
            <Link to="/profile" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${location.pathname === '/profile' ? 'text-accent' : 'text-slate-400 hover:text-slate-200'}`}>
              <User className="w-6 h-6" />
              <span className="text-xs mt-1 md:hidden">Profile</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1">
              <span className="text-sm font-medium text-slate-300">Lvl {level}</span>
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-xp" style={{ width: `${(xp % 500) / 500 * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen pb-16 md:pb-0 md:pt-16">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topics" element={<TopicTreePage />} />
            <Route path="/quiz" element={<QuizSessionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
