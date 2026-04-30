import React from 'react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useUiStore } from '../../../app/store/uiStore';
import { AdmissionsChart } from '../components/AdmissionsChart';
import { StatusPieChart } from '../components/StatusPieChart';
import { DiagnosisChart } from '../components/DiagnosisChart';
import { Card } from '@shared/components/Card/Card';

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
        return (
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[var(--color-text)]">Detailed Analytics</h1>
                </div>
                <Card className="h-[400px] animate-pulse" padding="none" elevation="sm" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <Card className="h-[400px] animate-pulse" padding="none" elevation="sm" />
                    <Card className="h-[400px] animate-pulse" padding="none" elevation="sm" />
                </div>
            </div>
        );
    }

    const dateDisplay = dateRangeStart && dateRangeEnd
        ? `${dateRangeStart} to ${dateRangeEnd}`
        : 'Last 7 Days';

    return (
        <div className="p-8 space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between ">
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
