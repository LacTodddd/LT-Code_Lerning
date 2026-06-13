import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useUserStore } from '../store/userStore';
import { XP_REWARDS } from '../utils/game';
import { QuestionRenderer } from '../components/QuestionRenderer';
import { ProgressBar } from '../components/ProgressBar';
import { GlassCard } from '../components/GlassCard';
import { ArrowRight, Lightbulb, Clock } from 'lucide-react';

const QuizSessionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'practice';
  const topicId = searchParams.get('topic');
  
  const { currentSession, currentQuestionIndex, nextQuestion, endSession } = useGameStore();
  const { addXp, updateStreak, markQuestionComplete, updateTopicProgress, topicProgress, updatePersonalBest } = useUserStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mode === 'speedrun' ? 60 : 0);

  useEffect(() => {
    if (!currentSession || currentSession.length === 0) {
      navigate('/topics');
    }
  }, [currentSession, navigate]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (mode === 'speedrun' && timeLeft > 0 && !showExplanation) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (mode === 'speedrun' && timeLeft === 0 && !showExplanation) {
      handleFinishSession();
    }
    return () => clearInterval(timer);
  }, [mode, timeLeft, showExplanation]);

  if (!currentSession || currentSession.length === 0) return null;

  const currentQuestion = currentSession[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentSession.length - 1;

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const timeTaken = (Date.now() - startTime) / 1000;
    
    // Check correctness
    let isCorrect = false;
    if (Array.isArray(currentQuestion.answer) && Array.isArray(selectedAnswer)) {
      isCorrect = currentQuestion.answer.length === selectedAnswer.length && 
                  currentQuestion.answer.every((val, idx) => val === selectedAnswer[idx]);
    } else {
      isCorrect = currentQuestion.answer === selectedAnswer;
    }

    if (isCorrect) {
      setSessionScore(prev => prev + 1);
      
      let earnedXp = XP_REWARDS.CORRECT;
      if (!usedHint) earnedXp += XP_REWARDS.NO_HINT_BONUS;
      if (timeTaken < 5 && mode !== 'speedrun') earnedXp += XP_REWARDS.SPEED_BONUS;

      setSessionXp(prev => prev + earnedXp);
      markQuestionComplete(currentQuestion.id);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleFinishSession();
    } else {
      setSelectedAnswer(null);
      setShowExplanation(false);
      setUsedHint(false);
      setStartTime(Date.now());
      nextQuestion();
    }
  };

  const handleFinishSession = () => {
    // Add XP
    let totalXp = sessionXp;
    if (mode === 'daily') totalXp += XP_REWARDS.DAILY_CHALLENGE;
    if (mode === 'boss' && sessionScore >= 8) totalXp += XP_REWARDS.BOSS_BATTLE;
    
    addXp(totalXp);
    updateStreak();

    if (mode === 'speedrun') {
      updatePersonalBest('speedrun', sessionScore);
    }

    // Update topic progress if in practice mode
    if (mode === 'practice' && topicId) {
      const currentProg = topicProgress[topicId] || 0;
      // Simple logic: each complete session adds 20% progress
      updateTopicProgress(topicId, Math.min(100, currentProg + 20));
    }

    endSession();
    navigate('/profile');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header Stats */}
      <div className="flex justify-between items-center glass-panel p-4 rounded-xl">
        <div className="flex gap-4 items-center">
          <div className="text-sm text-slate-400">
            Question <span className="text-white font-bold">{currentQuestionIndex + 1}</span> of {currentSession.length}
          </div>
          <div className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full font-medium">
            {currentQuestion.difficulty.toUpperCase()}
          </div>
        </div>
        
        {mode === 'speedrun' && (
          <div className={`flex items-center gap-2 font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}>
            <Clock className="w-5 h-5" />
            <span>0:{timeLeft.toString().padStart(2, '0')}</span>
          </div>
        )}
        
        {mode !== 'speedrun' && (
          <div className="text-sm font-bold text-xp">
            {sessionXp} XP Earned
          </div>
        )}
      </div>

      <ProgressBar 
        progress={((currentQuestionIndex) / currentSession.length) * 100} 
        className="h-1 mb-8"
      />

      <GlassCard className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="text-sm text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">
            {currentQuestion.subtopic}
          </div>
          {currentQuestion.hint && !usedHint && !showExplanation && (
            <button 
              onClick={() => setUsedHint(true)}
              className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 bg-amber-400/10 px-3 py-1 rounded-full transition-colors"
            >
              <Lightbulb className="w-4 h-4" /> Show Hint (-15 XP bonus)
            </button>
          )}
        </div>

        {usedHint && !showExplanation && currentQuestion.hint && (
          <div className="mb-6 p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-200 text-sm flex gap-3">
            <Lightbulb className="w-5 h-5 shrink-0" />
            <p>{currentQuestion.hint}</p>
          </div>
        )}

        <QuestionRenderer 
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={setSelectedAnswer}
          showExplanation={showExplanation}
        />

        <div className="mt-8 flex justify-end">
          {!showExplanation ? (
            <button 
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              {isLastQuestion ? 'Finish Session' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default QuizSessionPage;
