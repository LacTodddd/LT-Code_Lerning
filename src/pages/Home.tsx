import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useGameStore } from '../store/gameStore';
import { generateDailyChallenge } from '../utils/daily';
import pythonData from '../data/python.json';
import { Question } from '../types';
import { GlassCard } from '../components/GlassCard';

const HomePage = () => {
  const navigate = useNavigate();
  const { streak } = useUserStore();
  const { startSession } = useGameStore();

  const handleStartDaily = () => {
    // In a real app we'd fetch all possible questions across unlocked topics.
    // For now, we just use the python data.
    const questions = pythonData.questions as Question[];
    const dailyQuestions = generateDailyChallenge(questions, 5);
    startSession(dailyQuestions);
    navigate('/quiz?mode=daily');
  };

  const handleStartSpeedRun = () => {
    const questions = pythonData.questions as Question[];
    // Take 10 random questions
    const speedRunQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    startSession(speedRunQuestions);
    navigate('/quiz?mode=speedrun');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="text-center space-y-4 mb-12 mt-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent pb-2">
          Welcome back, Developer!
        </h1>
        <p className="text-slate-400 text-lg">Ready to level up your coding skills today?</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <GlassCard hoverable className="group" onClick={handleStartDaily}>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              Daily Challenge <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded-full">+50 XP</span>
            </h2>
            <p className="text-slate-400 mb-8 flex-grow">Complete 5 random questions seeded for today. Every developer gets the same challenge!</p>
            <button className="btn-primary w-full shadow-lg shadow-accent/20">Start Challenge</button>
          </div>
        </GlassCard>

        <GlassCard hoverable className="group border-orange-500/20" onClick={handleStartSpeedRun}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-2 text-orange-400">Speed Run</h2>
            <p className="text-slate-400 mb-8 flex-grow">Answer 10 questions as fast as possible. Test your reflexes and set a personal best!</p>
            <button className="btn-secondary w-full hover:bg-orange-500/20 hover:text-orange-400">Start Speed Run</button>
          </div>
        </GlassCard>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8 flex justify-center">
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <span className="text-slate-300 font-medium">Current Streak: <span className="text-orange-500 font-bold">{streak} days</span></span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
