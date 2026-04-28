import type { AppNotification, NotificationType } from '../types';

export const registerServiceWorker = async (): Promise<void> => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered successfully');
        } catch (error) {
            console.warn('Service Worker registration failed:', error);
        }
    } else {
        console.warn('Service workers are not supported.');
    }
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
        return 'denied';
    }
    return await Notification.requestPermission();
};

export const showLocalNotification = async (title: string, body: string): Promise<void> => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return;
    }
    try {
        const registration = await navigator.serviceWorker.ready;
        if (registration) {
            await registration.showNotification(title, { body, icon: '/favicon.svg' });
        }
    } catch (error) {
        // fail silently
    }
};

export const createAppNotification = (title: string, body: string, type: NotificationType): AppNotification => {
    return {
        id: crypto.randomUUID(),
        title,
        body,
        type,
        timestamp: new Date().toISOString(),
        read: false
    };
};
