import type { ApiResponse, PaginatedResponse } from '../../../shared/types/common';
import type { Patient, PatientFilters } from '../types';
import patientListData from '../../../mocks/patients/patient-list.json';

// We import httpClient to satisfy the architectural requirement, 
// but we use mock data for Phase 3.

export const patientApi = {
  getPatients: async (filters: PatientFilters): Promise<PaginatedResponse<Patient>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock filtering based on status and search
        let filteredData = patientListData.data as Patient[];
        
        if (filters.status) {
          filteredData = filteredData.filter(p => p.status === filters.status);
        }
        
        if (filters.search) {
          const lowerSearch = filters.search.toLowerCase();
          filteredData = filteredData.filter(p => 
            p.firstName.toLowerCase().includes(lowerSearch) ||
            p.lastName.toLowerCase().includes(lowerSearch) ||
            p.id.toLowerCase().includes(lowerSearch)
          );
        }

        resolve({
          success: true,
          data: filteredData,
          pagination: {
            page: filters.page,
            pageSize: filters.pageSize,
            total: filteredData.length
          }
        });
      }, 150);
    });
  },

  getPatientById: async (id: string): Promise<ApiResponse<Patient>> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const patients = patientListData.data as Patient[];
        const patient = patients.find(p => p.id === id);
        
        if (patient) {
          resolve({
            success: true,
            data: patient
          });
        } else {
          reject(new Error("Patient not found"));
        }
      }, 150);
    });
  }
};
