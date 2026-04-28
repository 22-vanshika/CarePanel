import React from 'react';
import type { Patient } from '../types';
import { statusBadgeClass } from '../utils/statusStyles';

interface PatientCardProps {
  patient: Patient;
  onClick: (id: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  return (
    <div
      onClick={() => onClick(patient.id)}
      className="card cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-slate-500">Age: {patient.age} • {patient.gender}</p>
        </div>
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadgeClass(patient.status)}`}>
          {patient.status}
        </span>
      </div>
      
      <div className="space-y-2 flex-grow">
        <div className="flex items-start">
          <span className="text-sm font-medium text-slate-500 w-24">Diagnosis:</span>
          <span className="text-sm text-slate-900 flex-1">{patient.diagnosis}</span>
        </div>
        <div className="flex items-start">
          <span className="text-sm font-medium text-slate-500 w-24">Doctor:</span>
          <span className="text-sm text-slate-900 flex-1">{patient.assignedDoctor}</span>
        </div>
      </div>
    </div>
  );
};
