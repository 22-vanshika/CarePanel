import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AppNotification } from '../types';
import mockData from '../../../mocks/notifications/feed.json';

export interface NotificationStore {
    notifications: AppNotification[];
    setNotifications: (notifications: AppNotification[]) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    addNotification: (notification: AppNotification) => void;
}

export const useNotificationStore = create<NotificationStore>()(
    devtools(
        (set) => ({
            notifications: (mockData.data as any[]).map(n => ({
                ...n,
                type: n.type as 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
            })),
            setNotifications: (notifications) => set({ notifications }),
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