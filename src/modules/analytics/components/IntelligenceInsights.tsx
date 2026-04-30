import React from 'react';
import { Card } from '@shared/components/Card/Card';
import { type Insight } from '../types';

interface IntelligenceInsightsProps {
    data: Insight[];
}

export const IntelligenceInsights: React.FC<IntelligenceInsightsProps> = ({ data }) => {
    return (
        <Card className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h2 className="text-lg font-semibold text-[var(--color-text)] tracking-tight">Intelligence Insights</h2>
            </div>

            <div className="space-y-6 flex-1">
                {data.map((insight, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-[var(--color-bg)]/50 border border-[var(--color-border)]/5 hover:border-[var(--color-primary)]/30 transition-all cursor-default group">
                        <div className="mt-1 shrink-0 group-hover:scale-110 transition-transform">
                            {insight.type === 'ALERT' ? (
                                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            ) : (
                                <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-[var(--color-text)] mb-1">{insight.title}</h4>
                            <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">{insight.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-6 w-full py-2.5 px-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors">
                View Recommendation Hub
            </button>
        </Card>
    );
};
