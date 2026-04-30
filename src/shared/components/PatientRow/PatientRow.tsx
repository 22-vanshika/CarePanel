import React from 'react';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import type { PatientStatus } from '../../types/common';

export interface PatientRowProps {
  name: string;
  initials: string;
  department: string;
  timeAgo: string;
  status: PatientStatus;
}

export const PatientRow: React.FC<PatientRowProps> = ({ name, initials, department, timeAgo, status }) => {
  const getInitialsClasses = (status: PatientStatus) => {
    switch (status) {
      case 'CRITICAL': return 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20';
      case 'ACTIVE': return 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20';
      case 'OBSERVATION': return 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20';
      case 'DISCHARGED': return 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20';
      default: return 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20';
    }
  };

  return (
    <tr className="hover:bg-[var(--color-border)]/50 transition-colors border-b border-[var(--color-border)] last:border-0 even:bg-[var(--color-surface)]/[0.02]">
      <td className="px-[var(--space-5)] py-[var(--space-3)]">
        <div className="flex items-center gap-[var(--space-3)]">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${getInitialsClasses(status)} font-medium`}>
            {initials}
          </div>
          <span className="text-[var(--color-text)] text-[var(--text-sm)] font-medium">{name}</span>
        </div>
      </td>
      <td className="px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-muted)] text-[var(--text-xs)]">{department}</td>
      <td className="px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-muted)] text-[var(--text-xs)]">{timeAgo}</td>
      <td className="px-[var(--space-5)] py-[var(--space-3)] text-right text-[var(--text-xs)]">
        <StatusBadge status={status} />
      </td>
    </tr>
  );
};
