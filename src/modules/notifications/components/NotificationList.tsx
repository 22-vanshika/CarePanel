import React from 'react';
import type { AppNotification, NotificationType } from '../types';

interface NotificationListProps {
    notifications: AppNotification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
}

const getRelativeTime = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const getTypeColor = (type: NotificationType) => {
    switch (type) {
        case 'SUCCESS': return 'border-green-500';
        case 'WARNING': return 'border-amber-500';
        case 'ERROR': return 'border-red-500';
        case 'INFO':
        default: return 'border-blue-500';
    }
};

export const NotificationList: React.FC<NotificationListProps> = ({
    notifications,
    onMarkAsRead,
    onMarkAllAsRead
}) => {
    const allRead = notifications.every(n => n.read);

    if (notifications.length === 0) {
        return (
            <div className="p-4 text-center text-sm text-[var(--color-text-muted)]">
                No notifications yet
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-h-96 overflow-y-auto bg-[var(--color-surface)]">
            {!allRead && (
                <div className="p-2 flex justify-end border-b border-slate-200">
                    <button
                        onClick={onMarkAllAsRead}
                        className="text-xs font-medium text-[var(--color-primary)] hover:underline"
                    >
                        Mark all as read
                    </button>
                </div>
            )}
            <ul className="flex flex-col">
                {notifications.map((notification) => (
                    <li
                        key={notification.id}
                        onClick={() => !notification.read && onMarkAsRead(notification.id)}
                        className={`p-3 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors ${!notification.read ? `border-l-4 ${getTypeColor(notification.type)}` : 'pl-4'}`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${!notification.read ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>
                                    {notification.title}
                                </span>
                                {!notification.read && (
                                    <span 
                                        className="inline-flex w-2 h-2 rounded-full bg-[var(--color-primary)]" 
                                        aria-label="Unread"
                                    />
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-400 whitespace-nowrap">
                                    {getRelativeTime(notification.timestamp)}
                                </span>
                                {!notification.read && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onMarkAsRead(notification.id);
                                        }}
                                        className="text-slate-400 hover:text-[var(--color-primary)] transition-colors p-1 -m-1 rounded-full hover:bg-slate-100"
                                        title="Mark as read"
                                        aria-label="Mark as read"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className={`text-sm ${!notification.read ? 'text-[var(--color-text-muted)]' : 'text-slate-400'}`}>
                            {notification.body}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
