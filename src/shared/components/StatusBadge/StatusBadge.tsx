import React from 'react';
import type { PatientStatus } from '../../types/common';
import { statusBadgeClass } from '../../utils/statusStyles';

export interface StatusBadgeProps {
  status: PatientStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadgeClass(status)} ${className}`.trim()}>
      {status}
    </span>
  );
};
