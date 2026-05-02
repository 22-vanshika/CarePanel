import React, { memo } from 'react';
import { Card } from '../Card/Card';

type DeltaAccessory = {
  type: 'delta';
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  text?: string;
};

type ProgressAccessory = {
  type: 'progress';
  value: number; // 0–100
};

type BadgeAccessory = {
  type: 'badge';
  label: string;
  color?: 'error' | 'warning' | 'success' | 'muted';
};

type FootnoteAccessory = {
  type: 'footnote';
  label: string;
};

type StatCardAccessory =
  | DeltaAccessory
  | ProgressAccessory
  | BadgeAccessory
  | FootnoteAccessory;

export interface StatCardProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'danger';
  accessory?: StatCardAccessory;
}

const DeltaPill: React.FC<DeltaAccessory> = ({ value, trend, text }) => {
  const colors = {
    up: 'bg-[var(--color-success)]/10 ',
    down: 'bg-[var(--color-error)]/10   text-[var(--color-error)]',
    neutral: 'bg-[var(--color-secondary)]/10 text-[var(--color-text-muted)]',
  };
  const icons = {
    up: <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>,
    down: <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
    neutral: <span className="mr-1">—</span>,
  };
  return (
    <span className={`text-[12px] font-medium flex items-center px-[var(--space-2)] py-[var(--space-1)] rounded-full ${colors[trend]}`}>
      {icons[trend]}
      {value}
      {text && <span className="ml-1 text-[8px]">{text}</span>}
    </span>
  );
};

const ProgressBar: React.FC<ProgressAccessory> = ({ value }) => (
  <div className="w-16 h-1.5 bg-[var(--color-bg)] rounded-full overflow-hidden mb-2">
    <div
      className="h-full bg-[var(--color-warning)] transition-all duration-500"
      style={{ width: `${value}%` }}
    />
  </div>
);

const BadgePill: React.FC<BadgeAccessory> = ({ label, color = 'muted' }) => {
  const colors = {
    error: 'bg-[var(--color-error)]/10   text-[var(--color-error)]   border-[var(--color-error)]/20',
    warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20',
    success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
    muted: 'bg-[var(--color-secondary)]/10 text-[var(--color-text-muted)] border-[var(--color-secondary)]/20',
  };
  return (
    <span className={`text-[0.7rem] font-medium px-[var(--space-2)] py-[2px] rounded-full border ${colors[color]}`}>
      {label}
    </span>
  );
};

const Footnote: React.FC<FootnoteAccessory> = ({ label }) => (
  <span className="text-[0.75rem] text-[var(--color-text-muted)] opacity-60 font-medium mb-1">
    {label}
  </span>
);

const AccessoryRenderer: React.FC<{ accessory: StatCardAccessory }> = ({ accessory }) => {
  switch (accessory.type) {
    case 'delta': return <DeltaPill    {...accessory} />;
    case 'progress': return <ProgressBar  {...accessory} />;
    case 'badge': return <BadgePill    {...accessory} />;
    case 'footnote': return <Footnote     {...accessory} />;
  }
};

export const StatCard = memo<StatCardProps>(({
  label, value, variant = 'default', accessory
}) => {
  const isDanger = variant === 'danger';

  return (
    <Card
      padding="md"
      elevation="md"
      className={`flex flex-col relative overflow-hidden ${isDanger
        ? 'bg-[var(--color-error)]/[0.03] border border-[var(--color-error)]/[0.12]'
        : ''
        }`}
    >
      {isDanger && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-error)]/5 rounded-bl-full -mr-4 -mt-4 blur-xl" />
      )}

      <h3 className={`text-[0.75rem] font-medium uppercase tracking-wider mb-2 opacity-80 ${isDanger ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]'
        }`}>
        {label}
      </h3>

      <div className="flex items-end justify-between flex-1 relative z-10">
        <span className={`text-[var(--text-2xl)] font-bold opacity-85 ${isDanger ? 'text-[var(--color-error)]' : 'text-[var(--color-text)]'
          }`}>
          {value}
        </span>

        {accessory && <AccessoryRenderer accessory={accessory} />}
      </div>
    </Card>
  );
});
