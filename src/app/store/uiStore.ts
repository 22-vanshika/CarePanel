import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UiState {
    isSidebarOpen: boolean;
    theme: 'light' | 'dark';
    dateRange: { start: string; end: string };
}

interface UiActions {
    toggleSidebar: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setDateRange: (start: string, end: string) => void;
}

type UiStore = UiState & UiActions;

export const useUiStore = create<UiStore>()(
    devtools(
        (set) => ({
            isSidebarOpen: true,
            theme: 'light',
            dateRange: { start: '', end: '' },

            toggleSidebar: () => set(
                (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
                false,
                'ui/toggleSidebar'
            ),

            setTheme: (theme) => set(
                { theme },
                false,
                'ui/setTheme'
            ),

            setDateRange: (start, end) => set(
                { dateRange: { start, end } },
                false,
                'ui/setDateRange'
            ),
        }),
        { name: 'UiStore' }
    )
);

// Atomic Selectors
export const selectIsSidebarOpen = (state: UiStore) => state.isSidebarOpen;
export const selectTheme = (state: UiStore) => state.theme;
export const selectDateRange = (state: UiStore) => state.dateRange;