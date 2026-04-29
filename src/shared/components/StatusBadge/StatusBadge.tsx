import React from 'react';

export type StatusType = 'Critical' | 'Stable' | 'Recovering' | 'Discharged';

export interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClasses = (status: StatusType) => {
    switch(status) {
      case 'Critical': return 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20';
      case 'Stable': return 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20';
      case 'Recovering': return 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20';
      case 'Discharged': return 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20';
      default: return 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20';
    }
  };

  return (
    <span className={`inline-block px-[calc(var(--space-2)+2px)] py-[var(--space-1)] rounded-full text-[var(--text-sm)] font-medium border ${getStatusClasses(status)}`}>
      {status}
    </span>
  );
};
