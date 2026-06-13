import React from 'react';
import { Question } from '../types';

interface QuestionRendererProps {
  question: Question;
  selectedAnswer: string | string[] | null;
  onAnswerSelect: (answer: string | string[]) => void;
  showExplanation?: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  showExplanation = false
}) => {
  const { type, question: qText, code, options, explanation, answer } = question;

  const isCorrect = (ans: string | string[]) => {
    if (Array.isArray(answer) && Array.isArray(ans)) {
      return answer.length === ans.length && answer.every((val, index) => val === ans[index]);
    }
    return ans === answer;
  };

  const getOptionClass = (opt: string) => {
    if (!showExplanation) {
      return selectedAnswer === opt 
        ? "border-accent bg-accent/20" 
        : "border-slate-700 hover:border-slate-500 bg-slate-800/50";
    }
    if (opt === answer) return "border-success bg-success/20";
    if (selectedAnswer === opt && opt !== answer) return "border-error bg-error/20";
    return "border-slate-800 bg-slate-800/30 opacity-50";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">{qText}</h2>
      
      {code && (
        <div className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto text-sm font-mono text-slate-300 shadow-inner">
          <pre>{code}</pre>
        </div>
      )}

      {(type === 'mcq' || type === 'concept' || type === 'debug') && options && (
        <div className="space-y-3">
          {options.map((opt, idx) => (
            <button
              key={idx}
              disabled={showExplanation}
              onClick={() => onAnswerSelect(opt)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${getOptionClass(opt)}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {(type === 'output_guess' || type === 'code_fill') && (
        <div>
          <input 
            type="text" 
            disabled={showExplanation}
            placeholder="Type your answer here..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-accent disabled:opacity-50"
            value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
            onChange={(e) => onAnswerSelect(e.target.value)}
          />
          {showExplanation && (
            <div className={`mt-2 font-medium ${isCorrect(selectedAnswer || '') ? 'text-success' : 'text-error'}`}>
              Correct answer: <span className="font-mono bg-slate-800 px-2 py-1 rounded">{answer as string}</span>
            </div>
          )}
        </div>
      )}

      {showExplanation && (
        <div className={`p-4 rounded-xl mt-6 border ${isCorrect(selectedAnswer || '') ? 'bg-success/10 border-success/30' : 'bg-error/10 border-error/30'}`}>
          <h3 className={`font-bold mb-2 ${isCorrect(selectedAnswer || '') ? 'text-success' : 'text-error'}`}>
            {isCorrect(selectedAnswer || '') ? 'Correct!' : 'Incorrect'}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};
