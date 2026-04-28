import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ViewMode, PatientFilters } from '../types';

interface PatientState {
  viewMode: ViewMode;
  selectedPatientId: string | null;
  activeFilters: PatientFilters;
}

interface PatientActions {
  setViewMode: (mode: ViewMode) => void;
  setSelectedPatient: (id: string | null) => void;
  updateFilters: (filters: Partial<PatientFilters>) => void;
  resetFilters: () => void;
}

type PatientStore = PatientState & PatientActions;

const initialFilters: PatientFilters = {
  page: 1,
  pageSize: 12
};

export const usePatientStore = create<PatientStore>()(
  devtools(
    (set) => ({
      viewMode: 'GRID',
      selectedPatientId: null,
      activeFilters: initialFilters,

      setViewMode: (mode) => set({ viewMode: mode }, false, 'patient/setViewMode'),
      
      setSelectedPatient: (id) => set({ selectedPatientId: id }, false, 'patient/setSelectedPatient'),
      
      updateFilters: (filters) => set(
        (state) => ({ activeFilters: { ...state.activeFilters, ...filters } }), 
        false, 
        'patient/updateFilters'
      ),
      
      resetFilters: () => set({ activeFilters: initialFilters }, false, 'patient/resetFilters')
    }),
    { name: 'PatientStore' }
  )
);

// Atomic Selectors
export const selectViewMode = (state: PatientStore) => state.viewMode;
export const selectSelectedPatientId = (state: PatientStore) => state.selectedPatientId;
export const selectActiveFilters = (state: PatientStore) => state.activeFilters;