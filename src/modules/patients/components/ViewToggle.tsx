import React from 'react';
import type { ViewMode } from '../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
      <button
        onClick={() => onToggle('GRID')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'GRID'
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        Grid
      </button>
      <button
        onClick={() => onToggle('LIST')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'LIST'
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        List
      </button>
    </div>
  );
};
