import { useNavigate } from 'react-router-dom';
import pythonData from '../data/python.json';
import { useUserStore } from '../store/userStore';
import { useGameStore } from '../store/gameStore';
import { generateQuizSession, canUnlockBossBattle } from '../utils/game';
import { Question } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { Lock, Unlock, ShieldAlert } from 'lucide-react';

const TopicTreePage = () => {
  const navigate = useNavigate();
  const { topicProgress } = useUserStore();
  const { startSession } = useGameStore();

  const handleStartTopic = (topicId: string, isBoss: boolean = false) => {
    const questions = pythonData.questions as Question[];
    const topicQuestions = questions.filter(q => q.topic === topicId);
    
    if (isBoss) {
      // Boss battle is 10 questions, maybe mixed or harder
      const bossQuestions = topicQuestions.filter(q => q.difficulty !== 'beginner');
      startSession(generateQuizSession(bossQuestions, 10));
      navigate(`/quiz?mode=boss&topic=${topicId}`);
    } else {
      // Standard topic practice
      startSession(generateQuizSession(topicQuestions, 5));
      navigate(`/quiz?mode=practice&topic=${topicId}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Python Path</h1>
        <p className="text-slate-400">Master Python from basics to advanced concepts.</p>
      </header>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-800 rounded-full z-0 hidden md:block"></div>

        <div className="space-y-6 relative z-10">
          {pythonData.topics.map((topic, index) => {
            const progress = topicProgress[topic.id] || 0;
            const isUnlocked = index === 0 || (topicProgress[pythonData.topics[index - 1].id] || 0) >= 50;
            const bossUnlocked = canUnlockBossBattle(topic.id, topicProgress);

            return (
              <div key={topic.id} className="flex gap-6 items-start">
                <div className="hidden md:flex flex-col items-center mt-4">
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center bg-background
                    ${isUnlocked ? 'border-accent text-accent' : 'border-slate-700 text-slate-600'}
                  `}>
                    {isUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                  </div>
                </div>

                <div className={`flex-1 glass-panel p-6 rounded-2xl transition-all ${isUnlocked ? 'opacity-100 hover:border-accent/30' : 'opacity-60 grayscale'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{topic.name}</h2>
                      <p className="text-sm text-slate-400">{topic.subtopics.join(', ')}</p>
                    </div>
                    {isUnlocked && <span className="text-accent font-bold text-lg">{Math.round(progress)}%</span>}
                  </div>

                  {isUnlocked && (
                    <div className="mb-6">
                      <ProgressBar progress={progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button 
                      disabled={!isUnlocked}
                      onClick={() => handleStartTopic(topic.id)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        isUnlocked 
                          ? 'bg-white/10 hover:bg-white/20 text-white' 
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {progress > 0 ? 'Continue' : 'Start Topic'}
                    </button>

                    {isUnlocked && (
                      <button 
                        disabled={!bossUnlocked}
                        onClick={() => handleStartTopic(topic.id, true)}
                        className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                          bossUnlocked
                            ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Boss Battle {bossUnlocked ? '' : '(80% req)'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopicTreePage;
