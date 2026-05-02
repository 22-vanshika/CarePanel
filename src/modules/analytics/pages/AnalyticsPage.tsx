import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useUiStore } from '../../../app/store/uiStore';
import analyticsPageData from '../../../mocks/analytics/analytics-page-kpis.json';
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
        : analyticsPageData.defaultDateRange;

    return (
        <div className="p-4 md:p-8 space-y-6 md:space-y-10 max-w-7xl mx-auto">
            {/* HEADER SECTION */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
                <div className="space-y-1.5 md:space-y-2">
                    <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-text)] tracking-tight font-display">Clinical Performance</h1>
                    <p className="text-[var(--text-sm)] md:text-[var(--text-base)] text-[var(--color-text-muted)] max-w-2xl font-sans leading-relaxed text-pretty">
                        Advanced longitudinal analysis for <span className="text-[var(--color-text)] font-semibold tracking-normal bg-[var(--color-primary)]/5 px-2 py-0.5 rounded-md border border-[var(--color-primary)]/10 whitespace-nowrap inline-block my-1">{dateDisplay}</span>. Tracking clinic throughput and patient outcomes across all departments.
                    </p>
                </div>
                <div className="flex items-center w-full lg:w-auto bg-[var(--color-surface)] border border-[var(--color-border)] p-1 rounded-xl text-xs font-medium shadow-sm">
                    <button className="flex-1 lg:px-6 py-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors">Daily</button>
                    <button className="flex-1 lg:px-6 py-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors">Weekly</button>
                    <button className="flex-1 lg:px-6 py-2.5 bg-[var(--color-primary)] text-white shadow-md rounded-lg transition-all font-semibold">Monthly</button>
                </div>
            </div>

            {/* TOP KPI ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {analyticsPageData.kpis.map(kpi => (
                    <StatCard
                        key={kpi.label}
                        label={kpi.label}
                        value={kpi.value}
                        accessory={{ type: 'delta', value: kpi.deltaValue, trend: kpi.trend as 'up' | 'down' }}
                    />
                ))}
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
                            <circle className="text-[var(--color-primary)]" strokeWidth="8" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - analyticsPageData.systemUptime / 100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-[var(--color-text)]">{analyticsPageData.systemUptime}</span>
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
