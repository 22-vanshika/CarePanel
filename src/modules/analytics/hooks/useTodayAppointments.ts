import { useState, useEffect } from 'react';
import type { AsyncState } from '../../../shared/types/common';
import { patientService, type Appointment } from '../../patients/services/patientService';

export const useTodayAppointments = () => {
    const [state, setState] = useState<AsyncState<Appointment[]>>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, isLoading: true, error: null }));
                const response = await patientService.getTodayAppointments();
                if (mounted) {
                    setState({ data: response.data, isLoading: false, error: null });
                }
            } catch (error) {
                if (mounted) {
                    setState({
                        data: null,
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Failed to fetch today appointments',
                    });
                }
            }
        };

        fetchData();
        return () => { mounted = false; };
    }, []);

    return state;
};
