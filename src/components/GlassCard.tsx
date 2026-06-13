import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hoverable = false, ...props }) => {
  return (
    <div 
      className={cn(
        "glass-panel p-6 rounded-2xl relative overflow-hidden transition-all duration-300",
        hoverable && "cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:border-white/20",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-glass-gradient pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
