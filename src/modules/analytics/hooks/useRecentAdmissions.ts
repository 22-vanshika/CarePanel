import { useState, useEffect } from 'react';
import type { AsyncState } from '../../../shared/types/common';
import { patientService, type RecentAdmission } from '../../patients/services/patientService';

export const useRecentAdmissions = () => {
    const [state, setState] = useState<AsyncState<RecentAdmission[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, isLoading: true, error: null }));
                const response = await patientService.getRecentAdmissions();
                if (mounted) {
                    setState({ data: response.data, isLoading: false, error: null });
                }
            } catch (error) {
                if (mounted) {
                    setState({
                        data: null,
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Failed to fetch recent admissions',
                    });
                }
            }
        };

        fetchData();
        return () => { mounted = false; };
    }, []);

    return state;
};
