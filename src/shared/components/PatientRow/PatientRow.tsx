import React from 'react';
import { StatusBadge, type StatusType } from '../StatusBadge/StatusBadge';

export interface PatientRowProps {
  name: string;
  initials: string;
  department: string;
  timeAgo: string;
  status: StatusType;
}

export const PatientRow: React.FC<PatientRowProps> = ({ name, initials, department, timeAgo, status }) => {
  const getInitialsClasses = (status: StatusType) => {
    switch(status) {
      case 'Critical': return 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20';
      case 'Stable': return 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20';
      case 'Recovering': return 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20';
      case 'Discharged': return 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20';
      default: return 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20';
    }
  };

  return (
    <tr className="hover:bg-[var(--color-border)] transition-colors border-b border-[var(--color-border)] last:border-0">
      <td className="px-[var(--space-5)] py-[var(--space-3)]">
        <div className="flex items-center gap-[var(--space-3)]">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-sm)] font-bold border ${getInitialsClasses(status)}`}>
            {initials}
          </div>
          <span className="text-[var(--color-text)] font-medium">{name}</span>
        </div>
      </td>
      <td className="px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-muted)]">{department}</td>
      <td className="px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-muted)]">{timeAgo}</td>
      <td className="px-[var(--space-5)] py-[var(--space-3)] text-right">
        <StatusBadge status={status} />
      </td>
    </tr>
  );
};
