import type { AppNotification, NotificationType } from '../types';

/**
 * Service for handling browser-level notifications and service worker registration.
 */

export const registerServiceWorker = async (): Promise<void> => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');

        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    } else {
        console.warn('Service workers are not supported.');
    }
};

export const getPermissionStatus = (): NotificationPermission => {
    if (!('Notification' in window)) return 'denied';
    return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
        console.warn('This browser does not support desktop notifications');
        return 'denied';
    }

    try {
        const permission = await Notification.requestPermission();
        return permission;
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return 'denied';
    }
};

export const showLocalNotification = async (title: string, body: string): Promise<boolean> => {
    if (!('Notification' in window)) return false;

    if (Notification.permission !== 'granted') {
        return false;
    }

    try {
        // Try using Service Worker if available for background/robustness
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            if (registration) {
                await registration.showNotification(title, {
                    body,
                    icon: '/favicon.svg',
                    badge: '/favicon.svg',
                    tag: 'healthcare-notification',
                    renotify: true
                } as any);
                return true;
            }
        }

        // Fallback to native Notification object if SW not ready
        new Notification(title, { body, icon: '/favicon.svg' });
        return true;
    } catch (error) {
        console.error('Failed to show notification:', error);
        return false;
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

