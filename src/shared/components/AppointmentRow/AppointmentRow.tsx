import React from 'react';

export interface AppointmentRowProps {
  time: string;
  patientName: string;
  type: string;
  accentColor: 'blue' | 'purple' | 'green' | 'red';
}

export const AppointmentRow: React.FC<AppointmentRowProps> = ({ time, patientName, type, accentColor }) => {
  const getAccentBorder = (color: string) => {
    switch(color) {
      case 'blue': return 'border-l-[var(--color-primary)]';
      case 'purple': return 'border-l-purple-500';
      case 'green': return 'border-l-[var(--color-success)]';
      case 'red': return 'border-l-[var(--color-error)]';
      default: return 'border-l-[var(--color-primary)]';
    }
  };

  const getHoverBg = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-[var(--color-primary)]/5';
      case 'purple': return 'bg-purple-500/5';
      case 'green': return 'bg-[var(--color-success)]/5';
      case 'red': return 'bg-[var(--color-error)]/5';
      default: return 'bg-[var(--color-primary)]/5';
    }
  };

  return (
    <div className="flex gap-[var(--space-3)]">
      <div className="text-[0.75rem] font-medium text-[var(--color-text-muted)] w-16 pt-1">{time}</div>
      <div className={`flex-1 bg-[var(--color-bg)] rounded-[var(--radius-md)] p-[var(--space-3)] border-l-2 border-y border-r border-y-[var(--color-border)] border-r-[var(--color-border)] relative overflow-hidden group ${getAccentBorder(accentColor)}`}>
        <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${getHoverBg(accentColor)}`}></div>
        <div className="text-[var(--text-sm)] font-medium text-[var(--color-text)] relative z-10">{patientName}</div>
        <div className="text-[0.75rem] text-[var(--color-text-muted)] relative z-10">{type}</div>
      </div>
    </div>
  );
};
