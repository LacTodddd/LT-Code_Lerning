import { useUserStore, LEVELS } from '../store/userStore';
import { ProgressBar } from '../components/ProgressBar';
import { GlassCard } from '../components/GlassCard';
import { Trophy, Zap, Star, Target, Timer } from 'lucide-react';
import pythonData from '../data/python.json';

const ProfilePage = () => {
  const { xp, level, streak, badges, topicProgress, personalBests, completedQuestions } = useUserStore();
  
  const currentLevelInfo = LEVELS[level];
  const nextLevelInfo = LEVELS[level + 1];
  
  const xpForNextLevel = nextLevelInfo ? nextLevelInfo.minXp - currentLevelInfo.minXp : 0;
  const currentLevelXp = xp - currentLevelInfo.minXp;
  const progressPercent = nextLevelInfo ? (currentLevelXp / xpForNextLevel) * 100 : 100;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      <header>
        <h1 className="text-4xl font-bold mb-2">Developer Profile</h1>
        <p className="text-slate-400">Track your learning journey and showcase your achievements.</p>
      </header>

      <GlassCard className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-accent shadow-lg shadow-accent/20">
              <span className="text-4xl font-bold text-accent">Lvl {level}</span>
            </div>
            {level >= 3 && (
              <div className="absolute -top-2 -right-2 bg-xp p-2 rounded-full text-slate-900 shadow-lg">
                <Star className="w-5 h-5 fill-current" />
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">{currentLevelInfo?.name || 'Grandmaster'}</h2>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <span className="text-xp font-medium flex items-center gap-1"><Zap className="w-4 h-4" /> {xp} Total XP</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">{completedQuestions.length} Questions Solved</span>
            </div>
            
            {nextLevelInfo && (
              <div className="space-y-2 max-w-md mx-auto md:mx-0">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress to {nextLevelInfo.name}</span>
                  <span className="text-accent font-medium">{currentLevelXp} / {xpForNextLevel} XP</span>
                </div>
                <ProgressBar progress={progressPercent} className="h-3" />
              </div>
            )}
          </div>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-6 text-center hover:border-orange-500/30 transition-colors">
          <h3 className="text-slate-400 text-sm mb-2 font-medium uppercase tracking-wider">Current Streak</h3>
          <p className="text-4xl font-bold text-orange-500 flex items-center justify-center gap-2">
            {streak} <span className="text-2xl">🔥</span>
          </p>
        </GlassCard>
        <GlassCard className="p-6 text-center hover:border-success/30 transition-colors">
          <h3 className="text-slate-400 text-sm mb-2 font-medium uppercase tracking-wider">Badges Earned</h3>
          <p className="text-4xl font-bold text-success flex items-center justify-center gap-2">
            {badges.length} <Trophy className="w-8 h-8" />
          </p>
        </GlassCard>
        <GlassCard className="p-6 text-center hover:border-blue-400/30 transition-colors">
          <h3 className="text-slate-400 text-sm mb-2 font-medium uppercase tracking-wider">Topics Mastery</h3>
          <p className="text-4xl font-bold text-blue-400 flex items-center justify-center gap-2">
            {Object.values(topicProgress).filter(p => p >= 100).length} <Target className="w-8 h-8" />
          </p>
        </GlassCard>
        <GlassCard className="p-6 text-center hover:border-purple-400/30 transition-colors">
          <h3 className="text-slate-400 text-sm mb-2 font-medium uppercase tracking-wider">Speed Run PB</h3>
          <p className="text-4xl font-bold text-purple-400 flex items-center justify-center gap-2">
            {personalBests['speedrun'] || 0} <Timer className="w-8 h-8" />
          </p>
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-accent" /> Topic Progress</h3>
          <div className="space-y-3">
            {pythonData.topics.slice(0, 4).map(topic => {
              const progress = topicProgress[topic.id] || 0;
              return (
                <div key={topic.id} className="glass-panel p-4 rounded-xl">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{topic.name}</span>
                    <span className="text-slate-400">{Math.round(progress)}%</span>
                  </div>
                  <ProgressBar progress={progress} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-xp" /> Recent Badges</h3>
          {badges.length === 0 ? (
            <div className="glass-panel p-8 rounded-xl text-center text-slate-400 border-dashed border-2 border-slate-700 bg-transparent">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No badges earned yet. Keep learning to unlock achievements!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, idx) => (
                <div key={idx} className="glass-panel p-3 rounded-xl flex items-center gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg text-accent">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">{badge}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
