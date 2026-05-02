import { useState, useEffect, useCallback } from 'react';
import { useNotificationStore, selectUnreadCount } from '../store/notificationStore';
import { 
    createAppNotification, 
    showLocalNotification, 
    requestNotificationPermission, 
    getPermissionStatus 
} from '../services/notificationService';

export const useNotifications = () => {
    const notifications = useNotificationStore((state) => state.notifications);
    const unreadCount = useNotificationStore(selectUnreadCount);
    const markAsRead = useNotificationStore((state) => state.markAsRead);
    const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
    const addNotification = useNotificationStore((state) => state.addNotification);

    const [permission, setPermission] = useState<NotificationPermission>(getPermissionStatus());

    // Sync permission state on mount and when it might change
    useEffect(() => {
        const checkPermission = () => {
            const current = getPermissionStatus();
            if (current !== permission) {
                setPermission(current);
            }
        };

        checkPermission();
        
        // Listen for visibility change as permission might be updated in another tab/settings
        window.addEventListener('focus', checkPermission);
        return () => window.removeEventListener('focus', checkPermission);
    }, [permission]);

    const handleRequestPermission = async () => {
        const result = await requestNotificationPermission();
        setPermission(result);
        return result;
    };

    const triggerTestNotification = useCallback(async (): Promise<void> => {
        let currentPermission = permission;

        if (currentPermission === 'default') {
            currentPermission = await handleRequestPermission();
        }

        const title = 'New Patient Added';
        const body = 'A new patient record has been created for Dr. Smith.';

        const newNotification = createAppNotification(title, body, 'INFO');
        addNotification(newNotification);

        if (currentPermission === 'granted') {
            const success = await showLocalNotification(title, body);
            if (!success) {
                console.warn('Native notification failed, but added to internal list');
            }
        }
    }, [permission, addNotification]);

    return {
        notifications,
        unreadCount,
        permission,
        markAsRead,
        markAllAsRead,
        requestPermission: handleRequestPermission,
        triggerTestNotification
    };
};

