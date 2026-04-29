import React from 'react';

export interface AlertRowProps {
  patientName: string;
  ward: string;
  readingLabel: string;
  readingValue: string;
}

export const AlertRow: React.FC<AlertRowProps> = ({ patientName, ward, readingLabel, readingValue }) => {
  return (
    <div className="bg-[var(--color-bg)] rounded-[var(--radius-md)] p-[var(--space-3)] border-l-2 border-l-[var(--color-error)] border-y border-r border-y-[var(--color-border)] border-r-[var(--color-border)]">
      <div className="flex justify-between items-start mb-1">
        <span className="text-[var(--color-text)] font-medium text-[var(--text-sm)]">{patientName}</span>
        <span className="text-[0.75rem] bg-[var(--color-error)]/10 text-[var(--color-error)] px-[var(--space-2)] py-[2px] rounded-[var(--radius-sm)] border border-[var(--color-error)]/20">
          {readingLabel}: {readingValue}
        </span>
      </div>
      <div className="text-[0.75rem] text-[var(--color-text-muted)]">{ward}</div>
    </div>
  );
};
