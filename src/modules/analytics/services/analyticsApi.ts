import type { AnalyticsSummary, LedgerEntry, Insight } from '../types';
import type { ApiResponse } from '../../../shared/types/common';
import dashboardData from '../../../mocks/analytics/dashboard-metrics.json';
import operationalLedger from '../../../mocks/analytics/operational-ledger.json';
import intelligenceInsights from '../../../mocks/analytics/intelligence-insights.json';

export const analyticsApi = {
    getAnalyticsSummary: async (): Promise<ApiResponse<AnalyticsSummary>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        ...dashboardData.data,
                        operationalLedger: operationalLedger as LedgerEntry[],
                        insights: intelligenceInsights as Insight[],
                    } as AnalyticsSummary
                });
            }, 150);
        });
    }
};
