import type { AnalyticsSummary } from '../types';
import type { ApiResponse } from '../../../shared/types/common';
import mockData from '../../../mocks/analytics/dashboard-metrics.json';

export const analyticsApi = {
    getAnalyticsSummary: async (): Promise<ApiResponse<AnalyticsSummary>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockData as ApiResponse<AnalyticsSummary>);
            }, 150);
        });
    }
};
