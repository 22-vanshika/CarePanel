import React from 'react';
import type { Patient } from '../types';
import { statusBadgeClass } from '../utils/statusStyles';

interface PatientListItemProps {
  patient: Patient;
  onClick: (id: string) => void;
}

export const PatientListItem: React.FC<PatientListItemProps> = ({ patient, onClick }) => {
  return (
    <div
      onClick={() => onClick(patient.id)}
      className="card p-4 cursor-pointer hover:bg-[var(--color-surface)] transition-colors flex items-center justify-between"
    >
      <div className="flex items-center space-x-6 flex-1">
        <div className="w-48">
          <h3 className="text-base font-semibold text-[var(--color-text)]">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">Age: {patient.age} • {patient.gender}</p>
        </div>
        
        <div className="flex-1 hidden md:block">
          <p className="text-sm font-medium text-[var(--color-text)]">{patient.diagnosis}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Diagnosis</p>
        </div>

        <div className="w-48 hidden lg:block">
          <p className="text-sm text-[var(--color-text)]">{patient.assignedDoctor}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Assigned Doctor</p>
        </div>
      </div>

      <div className="ml-4 flex items-center">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadgeClass(patient.status)}`}>
          {patient.status}
        </span>
      </div>
    </div>
  );
};
