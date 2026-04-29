import React from 'react';
import { Card } from '../Card/Card';

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
    text?: string;
  };
  children?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, delta, children }) => {
  return (
    <Card padding="md" elevation="md" className="flex flex-col relative overflow-hidden">
      <h3 className="text-[var(--color-text-muted)] text-[0.75rem] font-medium uppercase tracking-wider mb-2">
        {label}
      </h3>
      <div className="flex items-end justify-between flex-1">
        <span className="text-[var(--text-2xl)] font-bold text-[var(--color-text)] relative z-10">{value}</span>
        
        {delta && (
          <span 
            className={`text-[var(--text-sm)] font-medium flex items-center px-[var(--space-2)] py-[var(--space-1)] rounded-full relative z-10
              ${delta.trend === 'up' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : ''}
              ${delta.trend === 'down' ? 'bg-[var(--color-error)]/10 text-[var(--color-error)]' : ''}
              ${delta.trend === 'neutral' ? 'bg-[var(--color-secondary)]/10 text-[var(--color-text-muted)]' : ''}
            `}
          >
            {delta.trend === 'up' && (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            )}
            {delta.trend === 'down' && (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            )}
            {delta.value}
            {delta.text && <span className="ml-1">{delta.text}</span>}
          </span>
        )}
      </div>
      {children}
    </Card>
  );
};
