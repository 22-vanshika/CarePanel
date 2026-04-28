import { useState, useEffect } from 'react';
import type { AnalyticsSummary } from '../types';
import type { AsyncState } from '../../../shared/types/common';
import { analyticsApi } from '../services/analyticsApi';

export const useAnalyticsData = () => {
    const [state, setState] = useState<AsyncState<AnalyticsSummary>>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, isLoading: true, error: null }));
                const response = await analyticsApi.getAnalyticsSummary();
                if (mounted) {
                    setState({ data: response.data, isLoading: false, error: null });
                }
            } catch (error) {
                if (mounted) {
                    setState({
                        data: null,
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Failed to fetch analytics data',
                    });
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, []);

    return {
        summary: state.data,
        isLoading: state.isLoading,
        error: state.error,
    };
};
