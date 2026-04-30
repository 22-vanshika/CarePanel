import React from 'react';
import type { ViewMode } from '../types';
import { Button } from '@shared/components/Button/Button';

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className="flex items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-1)]">
      <Button
        type="button"
        variant={viewMode === 'GRID' ? 'secondary' : 'ghost'}
        size="sm"
        className="rounded-[var(--radius-sm)]"
        onClick={() => onToggle('GRID')}
      >
        Grid
      </Button>
      <Button
        type="button"
        variant={viewMode === 'LIST' ? 'secondary' : 'ghost'}
        size="sm"
        className="rounded-[var(--radius-sm)]"
        onClick={() => onToggle('LIST')}
      >
        List
      </Button>
    </div>
  );
};
