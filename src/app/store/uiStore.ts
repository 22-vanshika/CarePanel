import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UiState {
    dateRange: { start: string; end: string };
}

interface UiActions {
    setDateRange: (start: string, end: string) => void;
}

type UiStore = UiState & UiActions;

export const useUiStore = create<UiStore>()(
    devtools(
        (set) => ({
            dateRange: { start: '', end: '' },

            setDateRange: (start, end) => set(
                { dateRange: { start, end } },
                false,
                'ui/setDateRange'
            ),
        }),
        { name: 'UiStore' }
    )
);
