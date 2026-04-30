import { useState, useEffect } from 'react';
import type { Patient } from '../types';
import type { AsyncState } from '../../../shared/types/common';
import { patientApi } from '../services/patientApi';

export function usePatient(patientId: string | undefined) {
  const [state, setState] = useState<AsyncState<Patient>>({
    data: null,
    isLoading: !!patientId, // Only loading if we have a patientId
    error: patientId ? null : 'Patient ID is required',
  });

  useEffect(() => {
    if (!patientId) {
      return; // Don't do anything if no patientId
    }

    let isMounted = true;

    const fetchPatient = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await patientApi.getPatientById(patientId);

        if (isMounted) {
          setState({
            data: response.data,
            isLoading: false,
            error: null
          });
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Patient not found';
          setState({
            data: null,
            isLoading: false,
            error: message
          });
        }
      }
    };

    fetchPatient();

    return () => {
      isMounted = false;
    };
  }, [patientId]);

  return {
    patient: state.data,
    isLoading: state.isLoading,
    error: state.error
  };
}
