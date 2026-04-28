// Holds the global array of notifications and unread counts.
import { create } from 'zustand';
import type { AppNotification } from '../types';

interface StoreState {
    notifications: AppNotification[];
}

interface StoreActions {
    setNotifications: (notifications: AppNotification[]) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    addNotification: (notification: AppNotification) => void;
}

export const useNotificationStore = create<StoreState & StoreActions>((set) => ({
    notifications: [],
    setNotifications: (notifications) => set({ notifications }),
    markAsRead: (id) =>
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
            ),
        })),
    markAllAsRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
    addNotification: (notification) =>
        set((state) => ({
            notifications: [notification, ...state.notifications],
        })),
}));