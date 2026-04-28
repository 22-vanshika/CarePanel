// Manages global UI preferences like theme, sidebar state, and selected analytics date ranges.
import { create } from 'zustand';

interface StoreState {
    isSidebarOpen: boolean;
    theme: 'light' | 'dark';
    dateRange: { start: string; end: string };
}

interface StoreActions {
    toggleSidebar: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setDateRange: (start: string, end: string) => void;
}

export const useUiStore = create<StoreState & StoreActions>((set) => ({
    isSidebarOpen: true,
    theme: 'light',
    dateRange: { start: '', end: '' },
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setTheme: (theme) => set({ theme }),
    setDateRange: (start, end) => set({ dateRange: { start, end } }),
}));