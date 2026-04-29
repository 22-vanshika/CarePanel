import type { ApiResponse } from '../../../shared/types/common';
import type { StatusType } from '../../../shared/components/StatusBadge/StatusBadge';

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
  accentColor: 'blue' | 'purple' | 'green' | 'red';
}

export interface RecentAdmission {
  id: string;
  name: string;
  initials: string;
  department: string;
  timeAgo: string;
  status: StatusType;
}

// Mock Data
const statsMock: PatientStats = {
  totalPatients: 1284,
  totalPatientsDelta: { trend: 'up', value: '12%' },
  admissionsToday: 24,
  admissionsTodayDelta: { trend: 'up', value: '+4' },
  bedOccupancy: 86,
  appointmentsToday: 42,
  appointmentsRemaining: 6,
  patientFlow: [
    { day: 'Mon', admissions: 12, discharges: 8 },
    { day: 'Tue', admissions: 15, discharges: 10 },
    { day: 'Wed', admissions: 9, discharges: 14 },
    { day: 'Thu', admissions: 14, discharges: 12 },
    { day: 'Fri', admissions: 18, discharges: 15 },
    { day: 'Sat', admissions: 8, discharges: 18 },
    { day: 'Sun', admissions: 5, discharges: 10 },
  ]
};

const alertsMock: CriticalAlert[] = [
  { id: '1', patientName: 'Robert K.', ward: 'Ward A • Bed 12', readingLabel: 'HR', readingValue: '135 bpm' },
  { id: '2', patientName: 'Alice M.', ward: 'ICU • Bed 04', readingLabel: 'SpO2', readingValue: '88%' }
];

const appointmentsMock: Appointment[] = [
  { id: '1', time: '09:30 AM', patientName: 'Thomas G.', type: 'General Checkup', accentColor: 'blue' },
  { id: '2', time: '10:15 AM', patientName: 'Maria S.', type: 'Cardiology Consult', accentColor: 'purple' },
  { id: '3', time: '11:00 AM', patientName: 'William P.', type: 'Post-Op Review', accentColor: 'green' }
];

const admissionsMock: RecentAdmission[] = [
  { id: '1', name: 'Sarah J.', initials: 'SJ', department: 'Cardiology', timeAgo: '10 mins ago', status: 'Critical' },
  { id: '2', name: 'Michael R.', initials: 'MR', department: 'Neurology', timeAgo: '2 hours ago', status: 'Stable' },
  { id: '3', name: 'Emily C.', initials: 'EC', department: 'Pediatrics', timeAgo: '4 hours ago', status: 'Recovering' },
  { id: '4', name: 'David L.', initials: 'DL', department: 'Orthopedics', timeAgo: '5 hours ago', status: 'Discharged' },
  { id: '5', name: 'Jessica W.', initials: 'JW', department: 'Emergency', timeAgo: '8 hours ago', status: 'Stable' }
];

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
