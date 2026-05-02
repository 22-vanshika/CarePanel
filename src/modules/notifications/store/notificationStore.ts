import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AppNotification } from '../types';
import mockData from '../../../mocks/notifications/feed.json';

export interface NotificationStore {
    notifications: AppNotification[];
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    addNotification: (notification: AppNotification) => void;
}

export const useNotificationStore = create<NotificationStore>()(
    devtools(
        (set) => ({
            notifications: (mockData.data as AppNotification[]),
            markAsRead: (id) => set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === id ? { ...n, read: true } : n
                )
            })),
            markAllAsRead: () => set((state) => ({
                notifications: state.notifications.map((n) => ({ ...n, read: true }))
            })),
            addNotification: (notification) => set((state) => ({
                notifications: [notification, ...state.notifications]
            }))
        }),
        { name: 'NotificationStore' }
    )
);

export const selectUnreadCount = (state: NotificationStore) =>
    state.notifications.filter(n => !n.read).length;