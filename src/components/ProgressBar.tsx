import React from 'react';
import { cn } from './GlassCard';

interface ProgressBarProps {
  progress: number; // 0 to 100
  colorClass?: string;
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  colorClass = "bg-accent", 
  className,
  showLabel = false 
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-end mb-1 text-xs text-slate-400">
          {Math.round(clampedProgress)}%
        </div>
      )}
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-1000 ease-out", colorClass)}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
