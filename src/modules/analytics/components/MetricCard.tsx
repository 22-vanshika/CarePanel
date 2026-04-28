import { memo } from 'react';
import type { MetricCard as MetricCardType } from '../types';

interface MetricCardProps {
    metric: MetricCardType;
}

export const MetricCard = memo<MetricCardProps>(({ metric }) => {
    const renderTrend = () => {
        if (metric.trendDirection === 'UP') {
            return (
                <span className="flex items-center text-green-500 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    {metric.trend}%
                </span>
            );
        }
        if (metric.trendDirection === 'DOWN') {
            return (
                <span className="flex items-center text-red-500 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    {Math.abs(metric.trend)}%
                </span>
            );
        }
        return (
            <span className="flex items-center text-slate-400 text-sm font-medium">
                <span className="mr-1">-</span>
                0%
            </span>
        );
    };

    return (
        <div className="card p-5 flex flex-col gap-2 transition-all hover:shadow-lg">
            <h3 className="text-slate-500 text-sm font-medium">{metric.label}</h3>
            <div className="flex items-end justify-between mt-1">
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-800">{metric.value}</span>
                    {metric.unit && <span className="text-sm text-slate-500 font-medium">{metric.unit}</span>}
                </div>
                {renderTrend()}
            </div>
        </div>
    );
});
