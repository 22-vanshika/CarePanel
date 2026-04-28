import React from 'react';
import type { Patient, PatientStatus } from '../types';

interface PatientListItemProps {
  patient: Patient;
  onClick: (id: string) => void;
}

const statusColors: Record<PatientStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  CRITICAL: 'bg-red-100 text-red-800',
  OBSERVATION: 'bg-amber-100 text-amber-800',
  DISCHARGED: 'bg-slate-100 text-slate-800',
};

export const PatientListItem: React.FC<PatientListItemProps> = ({ patient, onClick }) => {
  return (
    <div
      onClick={() => onClick(patient.id)}
      className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between"
    >
      <div className="flex items-center space-x-6 flex-1">
        <div className="w-48">
          <h3 className="text-base font-semibold text-slate-900">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-slate-500">Age: {patient.age} • {patient.gender}</p>
        </div>
        
        <div className="flex-1 hidden md:block">
          <p className="text-sm font-medium text-slate-900">{patient.diagnosis}</p>
          <p className="text-sm text-slate-500">Diagnosis</p>
        </div>

        <div className="w-48 hidden lg:block">
          <p className="text-sm text-slate-900">{patient.assignedDoctor}</p>
          <p className="text-sm text-slate-500">Assigned Doctor</p>
        </div>
      </div>

      <div className="ml-4 flex items-center">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[patient.status]}`}>
          {patient.status}
        </span>
      </div>
    </div>
  );
};
