import React from 'react';
import type { ViewMode } from '../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-[var(--color-secondary)]/20 shadow-sm">
      <button
        onClick={() => onToggle('GRID')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'GRID'
            ? 'bg-[var(--color-primary)]/10 text-blue-700'
            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
        }`}
      >
        Grid
      </button>
      <button
        onClick={() => onToggle('LIST')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'LIST'
            ? 'bg-[var(--color-primary)]/10 text-blue-700'
            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
        }`}
      >
        List
      </button>
    </div>
  );
};
