import { useNotificationStore, selectUnreadCount } from '../store/notificationStore';
import { createAppNotification, showLocalNotification } from '../services/notificationService';

export const useNotifications = () => {
    const notifications = useNotificationStore((state) => state.notifications);
    const unreadCount = useNotificationStore(selectUnreadCount);
    const markAsRead = useNotificationStore((state) => state.markAsRead);
    const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
    const addNotification = useNotificationStore((state) => state.addNotification);

    const triggerTestNotification = async (): Promise<void> => {
        const title = 'New Patient Added';
        const body = 'A new patient record has been created.';
        const newNotification = createAppNotification(title, body, 'INFO');
        addNotification(newNotification);
        await showLocalNotification(title, body);
    };

    return {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        triggerTestNotification
    };
};
