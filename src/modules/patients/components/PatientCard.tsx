import { memo } from 'react';
import type { Patient } from '../types';
import { StatusBadge } from '../../../shared/components/StatusBadge/StatusBadge';
import { Card } from '../../../shared/components/Card/Card';

interface PatientCardProps {
  patient: Patient;
  onClick: (id: string) => void;
}

export const PatientCard = memo<PatientCardProps>(({ patient, onClick }) => {
  return (
    <Card
      onClick={() => onClick(patient.id)}
      padding="none"
      className="cursor-pointer hover:bg-[var(--color-surface)]/80 transition-colors flex flex-col h-full p-3 md:p-6"
    >
      <div className="flex justify-between items-start mb-2 md:mb-[var(--space-4)]">
        <div className="min-w-0 flex-1 mr-2">
          <h3 className="text-sm md:text-[var(--text-lg)] font-semibold text-[var(--color-text)] leading-tight truncate">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-[10px] md:text-[var(--text-sm)] text-[var(--color-text-muted)] mt-0.5 md:mt-[var(--space-1)]">
            {patient.age}y • {patient.gender}
          </p>
        </div>
        <StatusBadge 
          status={patient.status} 
          className="text-[9px] px-1.5 py-0.5 md:text-xs md:px-2.5 md:py-1 shrink-0" 
        />
      </div>

      <div className="space-y-1 md:space-y-[var(--space-3)] flex-grow mt-1 md:mt-[var(--space-2)]">
        <div className="flex flex-col md:flex-row md:items-start">
          <span className="text-[10px] md:text-[var(--text-sm)] text-[var(--color-text-muted)] md:w-24">Diagnosis</span>
          <span className="text-[10px] md:text-[var(--text-sm)] text-[var(--color-text)] font-medium truncate md:flex-1">{patient.diagnosis}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-start">
          <span className="text-[10px] md:text-[var(--text-sm)] text-[var(--color-text-muted)] md:w-24">Doctor</span>
          <span className="text-[10px] md:text-[var(--text-sm)] text-[var(--color-text)] font-medium truncate md:flex-1">{patient.assignedDoctor}</span>
        </div>
      </div>
    </Card>
  );
});
