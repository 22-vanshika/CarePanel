import { useState, useEffect } from 'react';
import type { Patient } from '../types';
import type { AsyncState } from '../../../shared/types/common';
import { patientApi } from '../services/patientApi';
import { usePatientStore } from '../store/patientStore';

export function usePatients() {
    const activeFilters = usePatientStore(state => state.activeFilters);

    const [state, setState] = useState<AsyncState<Patient[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;

        const fetchPatients = async () => {
            setState(prev => ({ ...prev, isLoading: true, error: null }));

            try {
                const response = await patientApi.getPatients(activeFilters);

                if (isMounted) {
                    setState({
                        data: response.data,
                        isLoading: false,
                        error: null
                    });
                    setTotalCount(response.pagination.total);
                }
            } catch (err) {
                if (isMounted) {
                    const message = err instanceof Error ? err.message : 'Failed to load patients';
                    setState({
                        data: null,
                        isLoading: false,
                        error: message
                    });
                }
            }
        };

        fetchPatients();

        return () => {
            isMounted = false;
        };
    }, [activeFilters]);

    return {
        patients: state.data || [],
        isLoading: state.isLoading,
        error: state.error,
        totalCount
    };
}
