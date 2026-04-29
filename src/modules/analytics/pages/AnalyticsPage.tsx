import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useUiStore } from '../../../app/store/uiStore';
import { AdmissionsChart } from '../components/AdmissionsChart';
import { StatusPieChart } from '../components/StatusPieChart';
import { DiagnosisChart } from '../components/DiagnosisChart';

export const AnalyticsPage: React.FC = () => {
    const { summary, isLoading, error } = useAnalyticsData();
    const dateRangeStart = useUiStore((state) => state.dateRange.start);
    const dateRangeEnd = useUiStore((state) => state.dateRange.end);

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-[var(--color-error)]/10 text-[var(--color-error)] p-4 rounded-xl border border-[var(--color-error)]/20">
                    <h2 className="font-semibold mb-1">Error Loading Analytics</h2>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (isLoading || !summary) {
        return (
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[var(--color-text)]">Detailed Analytics</h1>
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-secondary)]/10 h-[400px] rounded-xl animate-pulse"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="bg-[var(--color-surface)] border border-[var(--color-secondary)]/10 h-[400px] rounded-xl animate-pulse"></div>
                    <div className="bg-[var(--color-surface)] border border-[var(--color-secondary)]/10 h-[400px] rounded-xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    const dateDisplay = dateRangeStart && dateRangeEnd 
        ? `${dateRangeStart} to ${dateRangeEnd}` 
        : 'Last 7 Days';

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-text)]">Detailed Analytics</h1>
                    <p className="text-[var(--color-text-muted)]">Showing data for: <span className="font-medium text-[var(--color-text)]">{dateDisplay}</span></p>
                </div>
            </div>

            <div>
                <AdmissionsChart data={summary.charts.admissionsOverTime} title="Admissions Trend" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <StatusPieChart data={summary.charts.patientsByStatus} title="Patients by Status" />
                <DiagnosisChart data={summary.charts.diagnosisBreakdown} title="Diagnosis Breakdown" />
            </div>
        </div>
    );
};

export default AnalyticsPage;
