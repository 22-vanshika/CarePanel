import type { PatientStatus } from '../types';

export const statusBadgeClass = (status: PatientStatus): string => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-[var(--color-success)]/10 text-[var(--color-success)]';
    case 'CRITICAL':
      return 'bg-[var(--color-error)]/10 text-[var(--color-error)]';
    case 'OBSERVATION':
      return 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]';
    case 'DISCHARGED':
      return 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]';
    default:
      return 'bg-gray-100 text-[var(--color-text)]';
  }
};
