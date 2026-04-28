import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { MetricCard } from '../components/MetricCard';
import { AdmissionsChart } from '../components/AdmissionsChart';

export const DashboardPage: React.FC = () => {
    const { summary, isLoading, error } = useAnalyticsData();

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
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
                    <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                    <p className="text-slate-500">Loading your metrics...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 h-28 rounded-xl animate-pulse"></div>
                    ))}
                </div>
                <div className="bg-slate-50 border border-slate-100 h-[400px] rounded-xl animate-pulse mt-6"></div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500">Summary of key performance indicators.</p>
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