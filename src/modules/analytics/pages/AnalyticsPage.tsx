import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useUiStore } from '../../../app/store/uiStore';
import { AdmissionsChart } from '../components/AdmissionsChart';
import { StatusPieChart } from '../components/StatusPieChart';
import { DiagnosisChart } from '../components/DiagnosisChart';
import { IntelligenceInsights } from '../components/IntelligenceInsights';
import { OperationalLedger } from '../components/OperationalLedger';
import { Card } from '@shared/components/Card/Card';
import { StatCard } from '@shared/components/StatCard/StatCard';

export const AnalyticsPage: React.FC = () => {
    const { summary, isLoading, error } = useAnalyticsData();
    const dateRangeStart = useUiStore((state) => state.dateRange.start);
    const dateRangeEnd = useUiStore((state) => state.dateRange.end);

    if (error) {
        return (
            <div className="p-8">
                <Card className="p-4" padding="md" elevation="sm">
                    <div className="text-[var(--color-error)]">
                        <h2 className="font-semibold mb-1">Error Loading Analytics</h2>
                        <p className="text-sm">{error}</p>
                    </div>
                </Card>
            </div>
        );
    }

    if (isLoading || !summary) {
        return null; // Let the Suspense fallback (PageSkeleton) handle this with the correct layout
    }

    const dateDisplay = dateRangeStart && dateRangeEnd
        ? `${dateRangeStart} to ${dateRangeEnd}`
        : 'Apr 01 - Apr 30, 2026';

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="page-title">Clinical Performance</h1>
                    <p className="page-subtitle">
                        Advanced longitudinal analysis for <span className="text-[var(--color-text)] font-semibold tracking-normal">{dateDisplay}</span>. Tracking clinic throughput and patient outcomes.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5 rounded-xl text-xs font-medium">
                    <button className="px-4 py-1.5 rounded-lg hover:bg-[var(--color-border)] transition-colors">Daily</button>
                    <button className="px-4 py-1.5 rounded-lg hover:bg-[var(--color-border)] transition-colors">Weekly</button>
                    <button className="px-4 py-1.5 bg-[var(--color-primary)] text-white shadow-lg rounded-lg transition-all">Monthly</button>
                </div>
            </div>

            {/* TOP KPI ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Patient Volume"
                    value="1,742"
                    accessory={{ type: 'delta', value: 12.5, trend: 'up' }}
                />
                <StatCard
                    label="Avg. Wait Time"
                    value="14.2m"
                    accessory={{ type: 'delta', value: 4.1, trend: 'up' }}
                />
                <StatCard
                    label="Clinician Utilization"
                    value="92.4%"
                    accessory={{ type: 'delta', value: 1.2, trend: 'down' }}
                />
                <StatCard
                    label="Revenue Per Visit"
                    value="$248"
                    accessory={{ type: 'delta', value: 8.3, trend: 'up' }}
                />
            </div>

            {/* MAIN TREND CHART */}
            <div className="grid grid-cols-1 gap-6">
                <AdmissionsChart data={summary.charts.admissionsOverTime} title="Patient Volume Trends" />
            </div>

            {/* SECONDARY CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StatusPieChart data={summary.charts.patientsByStatus} title="Condition Mix" />
                <DiagnosisChart data={summary.charts.diagnosisBreakdown} title="Diagnosis Breakdown" />
            </div>

            {/* OPERATIONAL LEDGER */}
            <div className="grid grid-cols-1 gap-6">
                <OperationalLedger data={summary.operationalLedger} />
            </div>

            {/* LOWER INSIGHTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <IntelligenceInsights data={summary.insights} />
                </div>
                <Card className="flex flex-col items-center justify-center text-center p-8">
                    <div className="w-32 h-32 relative mb-6">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle className="text-[var(--color-border)]" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                            <circle className="text-[var(--color-primary)]" strokeWidth="8" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 0.999)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-[var(--color-text)]">99.9</span>
                            <span className="text-[10px] text-[var(--color-text-muted)] font-medium uppercase">Percent</span>
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">System Uptime</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">Platform stability across all clinical endpoints.</p>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsPage;
