import { memo } from 'react';

export interface AlertRowProps {
  patientName: string;
  ward: string;
  readingLabel: string;
  readingValue: string;
}

export const AlertRow = memo<AlertRowProps>(function AlertRow({ patientName, ward, readingLabel, readingValue }) {
  return (
    <div className="bg-[var(--color-error)]/[0.03] rounded-[var(--radius-md)] p-[var(--space-3)] border border-[var(--color-border)]">
      <div className="flex justify-between items-start mb-1">
        <span className="text-[var(--color-text)] font-medium text-[var(--text-sm)]">{patientName}</span>
        <span className="text-[0.75rem] bg-[var(--color-error)]/[0.08] text-[var(--color-error)] opacity-80 px-[var(--space-2)] py-[2px] rounded-full border border-[var(--color-error)]/[0.12]">
          {readingLabel}: {readingValue}
        </span>
      </div>
      <div className="text-[0.75rem] text-[var(--color-text-muted)]">{ward}</div>
    </div>
  );
});
