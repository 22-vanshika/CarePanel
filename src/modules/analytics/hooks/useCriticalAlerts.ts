import { useState, useEffect } from 'react';
import type { AsyncState } from '../../../shared/types/common';
import { patientService, type CriticalAlert } from '../../patients/services/patientService';

export const useCriticalAlerts = () => {
    const [state, setState] = useState<AsyncState<CriticalAlert[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, isLoading: true, error: null }));
                const response = await patientService.getCriticalAlerts();
                if (mounted) {
                    setState({ data: response.data, isLoading: false, error: null });
                }
            } catch (error) {
                if (mounted) {
                    setState({
                        data: null,
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Failed to fetch critical alerts',
                    });
                }
            }
        };

        fetchData();
        return () => { mounted = false; };
    }, []);

    return state;
};
