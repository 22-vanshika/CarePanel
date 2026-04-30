import type { ApiResponse, PatientStatus } from '../types/common';
import statsMockData from '../../mocks/patients/patient-stats.json';
import alertsMockData from '../../mocks/patients/critical-alerts.json';
import appointmentsMockData from '../../mocks/patients/appointments.json';
import admissionsMockData from '../../mocks/patients/recent-admissions.json';

// Types
export interface PatientStats {
  totalPatients: number;
  totalPatientsDelta: { trend: 'up' | 'down' | 'neutral'; value: string };
  admissionsToday: number;
  admissionsTodayDelta: { trend: 'up' | 'down' | 'neutral'; value: string };
  bedOccupancy: number; // percentage
  appointmentsToday: number;
  appointmentsRemaining: number;
  patientFlow: Array<{ day: string; admissions: number; discharges: number }>;
}

export interface CriticalAlert {
  id: string;
  patientName: string;
  ward: string;
  readingLabel: string;
  readingValue: string;
}

export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  type: string;
  accentColor: 'blue' | 'purple' | 'green' | 'red' | 'amber';
}

export interface RecentAdmission {
  id: string;
  name: string;
  initials: string;
  department: string;
  timeAgo: string;
  status: PatientStatus;
}

// Cast imported JSON data to appropriate types
const statsMock = statsMockData as PatientStats;
const alertsMock = alertsMockData as CriticalAlert[];
const appointmentsMock = appointmentsMockData as Appointment[];
const admissionsMock = admissionsMockData as RecentAdmission[];

// Service
export const patientService = {
  getPatientStats: async (): Promise<ApiResponse<PatientStats>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ data: statsMock, success: true }), 150));
  },
  getCriticalAlerts: async (): Promise<ApiResponse<CriticalAlert[]>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ data: alertsMock, success: true }), 150));
  },
  getTodayAppointments: async (): Promise<ApiResponse<Appointment[]>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ data: appointmentsMock, success: true }), 150));
  },
  getRecentAdmissions: async (): Promise<ApiResponse<RecentAdmission[]>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ data: admissionsMock, success: true }), 150));
  }
};
