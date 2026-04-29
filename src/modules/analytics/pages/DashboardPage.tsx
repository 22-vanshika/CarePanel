import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { MetricCard } from '../components/MetricCard';
import { AdmissionsChart } from '../components/AdmissionsChart';

export const DashboardPage: React.FC = () => {
    const { summary, isLoading, error } = useAnalyticsData();

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-[var(--color-error)]/10 text-[var(--color-error)] p-4 rounded-xl border border-[var(--color-error)]/20">
                    <h2 className="font-semibold mb-1">Error Loading Dashboard</h2>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (isLoading || !summary) {
        return (
            <div className="p-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-text)]">Dashboard Overview</h1>
                    <p className="text-[var(--color-text-muted)]">Loading your metrics...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-secondary)]/10 h-28 rounded-xl animate-pulse"></div>
                    ))}
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-secondary)]/10 h-[400px] rounded-xl animate-pulse mt-6"></div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Dashboard Overview</h1>
                <p className="text-[var(--color-text-muted)]">Summary of key performance indicators.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summary.metrics.slice(0, 4).map((metric) => (
                    <MetricCard key={metric.id} metric={metric} />
                ))}
            </div>

            <div className="mt-8">
                <AdmissionsChart data={summary.charts.admissionsOverTime} title="Admissions Over Time (Last 7 Days)" />
            </div>
        </div>
    );
};

export default DashboardPage;