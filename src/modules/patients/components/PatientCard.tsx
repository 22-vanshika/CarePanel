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
      className="cursor-pointer hover:bg-[var(--color-surface)]/80 transition-colors flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-[var(--space-4)]">
        <div>
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] leading-tight">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-1)]">
            Age: {patient.age} • {patient.gender}
          </p>
        </div>
        <StatusBadge status={patient.status} />
      </div>

      <div className="space-y-[var(--space-3)] flex-grow mt-[var(--space-2)]">
        <div className="flex items-start">
          <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-24">Diagnosis</span>
          <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium flex-1">{patient.diagnosis}</span>
        </div>
        <div className="flex items-start">
          <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-24">Doctor</span>
          <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium flex-1">{patient.assignedDoctor}</span>
        </div>
      </div>
    </Card>
  );
});
